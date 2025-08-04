@echo off
echo Starting Claude Code with MCP servers...
cd /d "C:\Users\b\Documents\GitHub\broker-lead-engine"
set CLAUDE_MCP_CONFIG=%CD%\claude_desktop_config.json
claude %*