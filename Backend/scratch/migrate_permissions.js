const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../../Frontend/src/pages');

function getDepth(filePath) {
  const relPath = path.relative(path.join(__dirname, '../../Frontend/src'), filePath);
  const parts = relPath.split(path.sep);
  return parts.length - 1;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const depth = getDepth(filePath);
  const upDirs = '../'.repeat(depth);

  // Check if we need to inject
  const hasDelete = content.includes('Trash2');
  const hasEdit = content.includes('`/edit`') || content.includes('/edit"') || content.includes("'/edit'");
  const hasAdd = content.includes('Add ') || content.includes('Register ') || content.includes('New ');

  // Very naive approach: If it has Trash2, let's inject user and authService if missing.
  if (hasDelete || hasEdit || hasAdd) {
    if (!content.includes('import { authService }')) {
      // Find last import
      const lastImportIndex = content.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const endOfLastImport = content.indexOf('\n', lastImportIndex);
        content = content.slice(0, endOfLastImport + 1) + `import { authService } from '${upDirs}services/authService';\nimport { canCreate, canEdit, canDelete } from '${upDirs}utils/permissions';\n` + content.slice(endOfLastImport + 1);
        changed = true;
      }
    } else if (!content.includes('canDelete')) {
      const authServiceIndex = content.indexOf('import { authService }');
      content = content.slice(0, authServiceIndex) + `import { canCreate, canEdit, canDelete } from '${upDirs}utils/permissions';\n` + content.slice(authServiceIndex);
      changed = true;
    }

    // Inject const user = authService.getUser(); inside the component
    // Find the component definition
    const compMatch = content.match(/const\s+([A-Z][a-zA-Z0-9_]*)\s*=\s*\([^)]*\)\s*=>\s*\{/);
    if (compMatch && !content.includes('const user = authService.getUser();')) {
      const insertPos = compMatch.index + compMatch[0].length;
      content = content.slice(0, insertPos) + '\n  const user = authService.getUser();' + content.slice(insertPos);
      changed = true;
    }

    // Wrap Trash2 buttons
    // Typically: <button ... title="Delete" onClick={() => handleDelete(r.id)}> <Trash2 ... /> </button>
    // We can use a regex to find <button ... <Trash2 ... </button>
    // This is hard to do with regex perfectly.
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

walkDir(srcDir);
