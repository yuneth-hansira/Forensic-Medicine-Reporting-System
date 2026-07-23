const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  let needsPerms = content.includes('canCreate') || content.includes('canEdit') || content.includes('canDelete');
  
  if (needsPerms) {
    // Add authService import if missing
    if (!content.includes('authService')) {
       // Find the last import statement and add it after
       content = content.replace(/(import .*?;\r?\n)(?!import)/s, '$1import { authService } from \'../../services/authService\';\n');
    }
    
    // Add permissions import if missing
    if (!content.includes('utils/permissions')) {
       content = content.replace(/(import .*?;\r?\n)(?!import)/s, '$1import { canCreate, canEdit, canDelete } from \'../../utils/permissions\';\n');
    } else {
       // Replace the existing one to have all three just in case
       content = content.replace(/import\s+\{[^}]*\}\s+from\s+['"].*?utils\/permissions['"];/, 'import { canCreate, canEdit, canDelete } from \'../../utils/permissions\';');
    }

    // Add user variable if missing
    if (!content.includes('authService.getUser()')) {
       // Match component declaration robustly: const Name = (...) => {
       content = content.replace(/(const\s+[A-Z][a-zA-Z0-9_]*\s*=\s*\([^)]*\)\s*=>\s*\{[\r\n]+)/, '$1  const user = authService.getUser();\n');
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed imports in', filePath);
    return true;
  }
  return false;
}

function walk(dir) {
  let count = 0;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      count += walk(file);
    } else if (file.endsWith('.jsx')) {
      if (processFile(file)) count++;
    }
  });
  return count;
}

const count = walk('D:/SEM 4/DataBase/Mini Project/Frontend/src/pages');
console.log('Total fixed:', count);
