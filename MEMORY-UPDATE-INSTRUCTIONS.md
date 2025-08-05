# Memory Update Instructions

## 🔄 How to Update Claude's Memory

### Option 1: Manual Update (Easiest)
Before closing Claude, simply say:
```
"Update your memory"
```

I will then:
1. Update CLAUDE.md with current conversation context
2. Update timestamps
3. Save all recent decisions and changes

### Option 2: Batch File (Semi-Automatic)
Double-click `update-memory-on-close.bat` before closing Claude Code.

This will:
- Update timestamps in CLAUDE.md
- Commit changes to git
- Preserve all memory for next session

### Option 3: Claude Hooks (Automatic - Advanced)
Add this to your Claude settings.json:
```json
{
  "hooks": {
    "after_conversation": "node C:\\Users\\b\\Documents\\GitHub\\broker-lead-engine\\claude-memory-hook.js"
  }
}
```

### Option 4: Quick Terminal Command
Run this in terminal before closing:
```bash
cd C:\Users\b\Documents\GitHub\broker-lead-engine
git add CLAUDE.md Memory.md
git commit -m "Update memory - session end"
```

## 📝 What Gets Saved

When you update memory, these items are preserved:
- Current project status
- Recent decisions and changes
- API configurations
- Pricing updates
- Business strategies
- Technical solutions
- Problems solved
- Next steps

## 🚀 Best Practice

**Always update memory when:**
- Making significant changes
- Updating pricing or business model
- Solving complex problems
- Before long breaks
- When switching contexts

**Simple workflow:**
1. Work on project
2. Say "update your memory" before closing
3. I'll save everything important
4. Next session starts exactly where we left off

## 💡 Pro Tip

Create a Windows shortcut to the batch file on your desktop for one-click memory updates!