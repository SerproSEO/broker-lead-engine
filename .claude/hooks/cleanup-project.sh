#!/bin/bash

# Project Cleanup Hook - Removes unnecessary files while preserving important documents
# Run this periodically to keep your project clean

echo "🧹 Cleaning up project files..."

# Define patterns for files to remove
TEMP_PATTERNS=(
    # Generator scripts (PDFs already created)
    "**/generate-*.js"
    "**/generator-*.js"
    "**/convert-*.js"
    
    # Temporary and backup files
    "**/*.tmp"
    "**/*.temp"
    "**/*.bak"
    "**/*.backup"
    "**/*~"
    "**/.DS_Store"
    
    # Build artifacts
    "**/dist/"
    "**/build/"
    "**/*.log"
    
    # Test files
    "**/test-*.js"
    "**/test-*.html"
    "**/*.test.js"
    
    # Old versions
    "**/*-old.*"
    "**/*-backup.*"
    "**/*-copy.*"
    "**/*-draft.*"
    
    # Node artifacts (but not node_modules)
    "**/*.tsbuildinfo"
    "**/.npm/"
    
    # IDE files
    "**/.idea/"
    "**/.vscode/"
    "**/*.swp"
    "**/*.swo"
)

# Files to ALWAYS preserve
PRESERVE_PATTERNS=(
    "*.pdf"           # Keep all PDFs
    "*.html"          # Keep all HTML templates
    "*.md"            # Keep all documentation
    "*.png"           # Keep all images
    "*.jpg"           # Keep all images
    "*.svg"           # Keep all images
    "package*.json"   # Keep package files
    ".env*"           # Keep environment files
    "CLAUDE.md"       # Keep Claude instructions
)

# Counter for removed files
removed_count=0

# Function to check if file should be preserved
should_preserve() {
    local file=$1
    for pattern in "${PRESERVE_PATTERNS[@]}"; do
        if [[ "$file" == *$pattern* ]]; then
            return 0  # Preserve this file
        fi
    done
    return 1  # OK to remove
}

# Remove temporary files
for pattern in "${TEMP_PATTERNS[@]}"; do
    # Use find to locate files matching pattern
    while IFS= read -r file; do
        if [ -e "$file" ]; then
            # Check if file should be preserved
            if ! should_preserve "$file"; then
                rm -rf "$file" 2>/dev/null
                if [ $? -eq 0 ]; then
                    echo "  ✓ Removed: $file"
                    ((removed_count++))
                fi
            fi
        fi
    done < <(find . -path "*/node_modules" -prune -o -path "*/.git" -prune -o -name "$pattern" -print 2>/dev/null)
done

# Remove empty directories (except important ones)
echo ""
echo "🗂️ Removing empty directories..."
find . -type d -empty -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/assets" -not -path "*/contracts" -not -path "*/forms" -delete 2>/dev/null

# Clean up package-lock files if corrupted
if [ -f "package-lock.json" ]; then
    if ! npm ls &>/dev/null; then
        echo "  ⚠️ Package-lock.json may be corrupted. Run 'npm install' to fix."
    fi
fi

# Summary
echo ""
if [ $removed_count -gt 0 ]; then
    echo "✅ Cleanup complete! Removed $removed_count unnecessary files."
else
    echo "✅ Project is already clean!"
fi

# Show current project size
total_size=$(du -sh . 2>/dev/null | cut -f1)
echo "📊 Current project size: $total_size"

# Optional: List remaining files in key directories
echo ""
echo "📁 Key directories:"
echo "  business-core/: $(find business-core -type f -not -path "*/node_modules/*" 2>/dev/null | wc -l) files"
echo "  .claude/: $(find .claude -type f 2>/dev/null | wc -l) files"

exit 0