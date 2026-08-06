#!/usr/bin/env bash
# ============================================================
#  MBA Compass — one-shot setup.
#
#  Run:  ./setup.sh
#
#  Nothing secret is written to disk by this script, and nothing
#  secret is echoed. Secrets go straight into Cloudflare, which
#  encrypts them at rest with no read-back.
# ============================================================
set -euo pipefail

cd "$(dirname "$0")"
BOLD=$'\033[1m'; DIM=$'\033[2m'; GRN=$'\033[32m'; YEL=$'\033[33m'; RED=$'\033[31m'; OFF=$'\033[0m'
say()  { printf "\n${BOLD}%s${OFF}\n" "$*"; }
ok()   { printf "  ${GRN}✓${OFF} %s\n" "$*"; }
warn() { printf "  ${YEL}!${OFF} %s\n" "$*"; }
die()  { printf "\n  ${RED}✗ %s${OFF}\n\n" "$*"; exit 1; }

command -v node >/dev/null || die "Node.js is required. Install it from nodejs.org, then re-run."

# ---------------------------------------------------------------
say "1/6  Dependencies"
cd worker
[ -d node_modules ] || { echo "  installing…"; npm install --silent; }
ok "worker dependencies ready"
WR="npx --yes wrangler@latest"

# ---------------------------------------------------------------
say "2/6  Cloudflare login"
if $WR whoami >/dev/null 2>&1; then
  ok "already logged in as $($WR whoami 2>/dev/null | grep -oE '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+' | head -1)"
else
  echo "  A browser window will open. Approve access, then come back here."
  $WR login || die "Cloudflare login failed."
  ok "logged in"
fi

# ---------------------------------------------------------------
say "3/6  Database"
if grep -q 'PASTE_YOUR_D1_DATABASE_ID_HERE' wrangler.toml; then
  echo "  creating D1 database…"
  OUT=$($WR d1 create mbacompass 2>&1) || true
  ID=$(printf '%s' "$OUT" | grep -oE '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}' | head -1)
  if [ -z "$ID" ]; then
    # Already exists from a previous run — look it up instead.
    ID=$($WR d1 list --json 2>/dev/null | node -e \
      'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const m=JSON.parse(s).find(x=>x.name==="mbacompass");if(m)console.log(m.uuid)}catch{}})')
  fi
  [ -n "$ID" ] || die "Could not create or find the D1 database. Run '$WR d1 create mbacompass' by hand and paste the id into worker/wrangler.toml."
  perl -pi -e "s/PASTE_YOUR_D1_DATABASE_ID_HERE/$ID/" wrangler.toml
  ok "database ready ($ID)"
else
  ok "database already configured"
fi

# ---------------------------------------------------------------
say "4/6  Secrets"
echo "  ${DIM}These go straight to Cloudflare. They are not saved locally and not printed.${OFF}"

have_secret() { $WR secret list 2>/dev/null | grep -q "\"$1\""; }

if have_secret ANTHROPIC_API_KEY; then
  ok "ANTHROPIC_API_KEY already set  ${DIM}(delete & re-run to change)${OFF}"
else
  echo
  echo "  Paste your Anthropic API key (console.anthropic.com → API keys)."
  echo "  ${DIM}It will not appear as you type.${OFF}"
  $WR secret put ANTHROPIC_API_KEY || die "Failed to set ANTHROPIC_API_KEY"
  ok "ANTHROPIC_API_KEY stored, encrypted"
fi

if have_secret ALLOWED_EMAILS; then
  ok "ALLOWED_EMAILS already set"
else
  echo
  echo "  Paste the allowed Google accounts, comma-separated, no spaces."
  echo "  ${DIM}Anyone not on this list is refused by the server.${OFF}"
  $WR secret put ALLOWED_EMAILS || die "Failed to set ALLOWED_EMAILS"
  ok "ALLOWED_EMAILS stored, encrypted"
fi

if have_secret CANDIDATE_BRIEF; then
  ok "CANDIDATE_BRIEF already set"
elif [ -f candidate-brief.txt ]; then
  $WR secret put CANDIDATE_BRIEF < candidate-brief.txt || die "Failed to set CANDIDATE_BRIEF"
  ok "CANDIDATE_BRIEF stored, encrypted  ${DIM}(from the gitignored local file)${OFF}"
else
  warn "candidate-brief.txt missing — agents will ask about her background instead of knowing it"
fi

# ---------------------------------------------------------------
say "5/6  Deploy"
grep -q 'PASTE_YOUR_GOOGLE_CLIENT_ID_HERE' wrangler.toml && \
  die "GOOGLE_CLIENT_ID is still a placeholder in worker/wrangler.toml."
DEPLOY=$($WR deploy 2>&1) || { echo "$DEPLOY"; die "Deploy failed."; }
URL=$(printf '%s' "$DEPLOY" | grep -oE 'https://[a-z0-9.-]+\.workers\.dev' | head -1)
[ -n "$URL" ] || { echo "$DEPLOY"; die "Deployed, but could not read the URL from the output."; }
ok "deployed → $URL"

# ---------------------------------------------------------------
say "6/6  Verify"
sleep 3
HEALTH=$(curl -s -m 15 "$URL/api/health" || true)
printf '%s' "$HEALTH" | grep -q '"ok":true' \
  && ok "worker responding: $HEALTH" \
  || warn "health check didn't answer yet — give it a few seconds and open $URL/api/health"

CODE=$(curl -s -o /dev/null -w '%{http_code}' -m 15 "$URL/api/me" || echo "?")
[ "$CODE" = "401" ] \
  && ok "unauthenticated requests are refused (401) — the gate works" \
  || warn "expected 401 from /api/me without a token, got $CODE"

GID=$(grep GOOGLE_CLIENT_ID wrangler.toml | cut -d'"' -f2)
cat <<EOF

${BOLD}${GRN}Done.${OFF}

  Open  ${BOLD}https://avi-debugquanta.github.io/mba-compass/#ai${OFF}
  and paste these two into the Connect panel:

    Worker URL        ${BOLD}$URL${OFF}
    Google client ID  ${BOLD}$GID${OFF}

  Then sign in. Only the accounts in ALLOWED_EMAILS will get through.

  ${DIM}Logs:    cd worker && npx wrangler tail
  Access:  cd worker && npx wrangler secret put ALLOWED_EMAILS${OFF}

EOF
