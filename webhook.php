<?php
/**
 * GitHub webhook — auto-deploy do branch main para o servidor Hostinger.
 *
 * Setup:
 *   1) Gere o secret (qualquer string aleatória forte) e salve em
 *      /home/u444566027/.eneva-webhook-secret  (fora do public_html, sem extensão).
 *      Ex: openssl rand -hex 32 > /home/u444566027/.eneva-webhook-secret
 *           chmod 600 /home/u444566027/.eneva-webhook-secret
 *
 *   2) Configure no GitHub (Settings > Webhooks > Add):
 *        - Payload URL: https://white-porpoise-733348.hostingersite.com/webhook.php
 *        - Content type: application/json
 *        - Secret: <o mesmo conteúdo do arquivo acima>
 *        - Events: Just the push event
 *        - Active: ✓
 *
 *   3) GitHub envia um "ping" inicial. Se voltar 200, está tudo certo.
 *
 * Segurança:
 *   - Verifica HMAC SHA-256 do payload (X-Hub-Signature-256)
 *   - Aceita apenas POST + evento "push" no ref refs/heads/main
 *   - Usa `git pull --ff-only` (jamais reset --hard ou força)
 *   - Logs em /home/u444566027/eneva-webhook.log (fora do web tree)
 */

declare(strict_types=1);

// ── Config ──────────────────────────────────────────────────────────
$REPO_DIR    = __DIR__; // public_html
$SECRET_FILE = '/home/u444566027/.eneva-webhook-secret';
$LOG_FILE    = '/home/u444566027/eneva-webhook.log';
$ALLOW_REF   = 'refs/heads/main';

// ── Helpers ─────────────────────────────────────────────────────────
header('Content-Type: application/json');

function fail(int $code, string $msg): void {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $msg]);
    exit;
}

function logmsg(string $msg): void {
    global $LOG_FILE;
    @file_put_contents($LOG_FILE, '[' . date('c') . '] ' . $msg . "\n", FILE_APPEND);
}

// ── 1. Aceitar apenas POST ─────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail(405, 'POST only');
}

// ── 2. Carregar secret ─────────────────────────────────────────────
if (!is_readable($SECRET_FILE)) {
    logmsg('Secret file not readable: ' . $SECRET_FILE);
    fail(500, 'webhook secret missing on server');
}
$secret = trim((string) file_get_contents($SECRET_FILE));
if ($secret === '') {
    fail(500, 'webhook secret is empty');
}

// ── 3. Verificar assinatura HMAC ────────────────────────────────────
$payload   = file_get_contents('php://input');
$sigHeader = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
if ($sigHeader === '') fail(401, 'missing signature');

$expected = 'sha256=' . hash_hmac('sha256', $payload, $secret);
if (!hash_equals($expected, $sigHeader)) {
    logmsg('Signature mismatch from ' . ($_SERVER['REMOTE_ADDR'] ?? '?'));
    fail(401, 'invalid signature');
}

// ── 4. Roteamento por evento ────────────────────────────────────────
$event = $_SERVER['HTTP_X_GITHUB_EVENT'] ?? '';

if ($event === 'ping') {
    logmsg('Ping received — webhook configured OK');
    echo json_encode(['ok' => true, 'event' => 'ping']);
    exit;
}

if ($event !== 'push') {
    echo json_encode(['ok' => true, 'event' => $event, 'skipped' => true]);
    exit;
}

// ── 5. Validar branch ───────────────────────────────────────────────
$data = json_decode($payload, true);
if (!is_array($data)) fail(400, 'invalid json');

$ref = $data['ref'] ?? '';
if ($ref !== $ALLOW_REF) {
    logmsg('Skipping push to ' . $ref);
    echo json_encode(['ok' => true, 'skipped' => true, 'ref' => $ref]);
    exit;
}

// ── 6. git pull ─────────────────────────────────────────────────────
$commit = $data['after'] ?? '';
$short  = substr((string) $commit, 0, 7);
logmsg('Deploying commit ' . $short);

$cmd = sprintf('cd %s && git pull --ff-only 2>&1', escapeshellarg($REPO_DIR));
$out = shell_exec($cmd) ?? '';
$out = trim($out);
logmsg("git pull output:\n" . $out);

echo json_encode([
    'ok'     => true,
    'commit' => $commit,
    'output' => $out,
]);
