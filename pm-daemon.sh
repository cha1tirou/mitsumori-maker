#!/bin/bash
# 見積書メーカー PM Daemon
# 使い方: ./pm-daemon.sh
# 必要な環境変数: SLACK_WEBHOOK, GITHUB_TOKEN

SLACK_WEBHOOK="${SLACK_WEBHOOK:-}"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"
REPO="cha1tirou/mitsumori-maker"
DIR="$(cd "$(dirname "$0")" && pwd)"

if [ -z "$SLACK_WEBHOOK" ] || [ -z "$GITHUB_TOKEN" ]; then
  echo "ERROR: SLACK_WEBHOOK と GITHUB_TOKEN を環境変数に設定してください"
  echo "例: export SLACK_WEBHOOK=https://hooks.slack.com/..."
  echo "例: export GITHUB_TOKEN=ghp_..."
  exit 1
fi

log() { echo "[$(date '+%H:%M:%S')] $1"; }

get_approval() {
  curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$REPO/contents/.pm/approval.json" \
    | python3 -c "import sys,json,base64; d=json.load(sys.stdin); print(base64.b64decode(d['content']).decode())" 2>/dev/null
}

reset_approval() {
  local content=$(echo '{"status":"pending","value":null,"approvedAt":null}' | base64 -w 0)
  local sha=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "https://api.github.com/repos/$REPO/contents/.pm/approval.json" \
    | python3 -c "import sys,json; print(json.load(sys.stdin).get('sha',''))" 2>/dev/null)
  curl -s -X PUT -H "Authorization: token $GITHUB_TOKEN" -H "Content-Type: application/json" \
    "https://api.github.com/repos/$REPO/contents/.pm/approval.json" \
    -d "{\"message\":\"Reset approval\",\"content\":\"$content\",\"sha\":\"$sha\"}" > /dev/null
}

send_todo_to_slack() {
  local tasks="$1"
  curl -s -X POST "$SLACK_WEBHOOK" \
    -H "Content-Type: application/json" \
    -d "{
      \"blocks\": [
        {
          \"type\": \"header\",
          \"text\": {\"type\": \"plain_text\", \"text\": \"📋 見積書メーカー TODOリスト\"}
        },
        {
          \"type\": \"section\",
          \"text\": {\"type\": \"mrkdwn\", \"text\": \"$tasks\"}
        },
        {
          \"type\": \"actions\",
          \"elements\": [
            {
              \"type\": \"button\",
              \"text\": {\"type\": \"plain_text\", \"text\": \"✅ 全部承認\"},
              \"style\": \"primary\",
              \"value\": \"all\",
              \"action_id\": \"approve_all\"
            },
            {
              \"type\": \"button\",
              \"text\": {\"type\": \"plain_text\", \"text\": \"1️⃣ Task1のみ\"},
              \"value\": \"1\",
              \"action_id\": \"approve_1\"
            },
            {
              \"type\": \"button\",
              \"text\": {\"type\": \"plain_text\", \"text\": \"⏭️ スキップ\"},
              \"style\": \"danger\",
              \"value\": \"skip\",
              \"action_id\": \"skip\"
            }
          ]
        }
      ]
    }" > /dev/null
}

run_claude() {
  local approval="$1"
  log "Claude Code実行開始: $approval"
  cd "$DIR"
  git pull origin main --quiet

  claude --dangerously-skip-permissions --print "todo.mdとCLAUDE.mdを読み込み、承認値 '$approval' に基づいてタスクを実行してください。all=全タスク、1=Task1のみ。完了後にtodo.mdを更新しgit pushしてください。" 2>&1
}

send_completion() {
  local summary="$1"
  curl -s -X POST "$SLACK_WEBHOOK" \
    -H "Content-Type: application/json" \
    -d "{\"text\": \"✅ 作業完了！\n\`\`\`$(echo $summary | head -c 500)\`\`\`\"}" > /dev/null
}

log "🚀 PM Daemon 起動"
log "Ctrl+C で停止"

while true; do
  log "TODOリストを生成中..."
  cd "$DIR"
  git pull origin main --quiet 2>/dev/null

  TASKS=$(python3 -c "
import re
try:
    with open('todo.md') as f:
        content = f.read()
    tasks = re.findall(r'- \[ \] (.+)', content)
    if tasks:
        result = '*次のTODO:*\n'
        for i, t in enumerate(tasks[:3], 1):
            result += f'  *Task {i}*: {t}\n'
        print(result)
    else:
        print('*全タスク完了！バックログを確認してください。*')
except:
    print('*todo.mdを確認できませんでした*')
" 2>/dev/null)

  log "Slackに通知送信..."
  send_todo_to_slack "$TASKS"
  reset_approval

  log "承認待ち中（最大6時間）..."
  APPROVED=false
  for i in $(seq 1 720); do
    sleep 30
    APPROVAL_JSON=$(get_approval)
    STATUS=$(echo "$APPROVAL_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin).get('status','pending'))" 2>/dev/null)

    if [ "$STATUS" = "approved" ]; then
      VALUE=$(echo "$APPROVAL_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin).get('value','all'))" 2>/dev/null)
      log "承認検知: $VALUE"
      APPROVED=true
      break
    fi
  done

  if [ "$APPROVED" = false ]; then
    log "タイムアウト。再送信します..."
    continue
  fi

  if [ "$VALUE" = "skip" ]; then
    log "スキップされました"
    curl -s -X POST "$SLACK_WEBHOOK" -H "Content-Type: application/json" \
      -d '{"text": "⏭️ スキップしました。1時間後に再送信します..."}' > /dev/null
    sleep 3600
    continue
  fi

  RESULT=$(run_claude "$VALUE")
  send_completion "$RESULT"
  log "完了。次のサイクルへ..."
  sleep 10
done
