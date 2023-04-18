#!/usr/bin/bash

set -e
SESSION_NAME="Notes Manager"

if tmux has-session -t="$SESSION_NAME" 2> /dev/null; then
  tmux attach -t "$SESSION_NAME"
  exit
fi

tmux new-session -d -s "$SESSION_NAME"

tmux rename-session "$SESSION_NAME"

tmux rename-window "Server"
tmux send-keys "clear; npm start" Enter

tmux new-window

tmux rename-window "Editor"
tmux send-keys "nvim" Enter

tmux attach -t "$SESSION_NAME:Editor"
