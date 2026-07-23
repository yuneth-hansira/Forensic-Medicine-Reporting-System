const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Use a regex that catches <Link ... to="...register..."> ... </Link>
  // and <button ... window.location.href="...register..." ...> ... </button>
  const linkRegex = /<Link\s+to=["'][^"']*\/register["'][^>]*>[\s\S]*?<\/Link>/g;
  const btnRegex = /<button[^>]*onClick=\{[^\}]*window\.location\.href=['"][^'"]*\/register['"][^\}]*\}[^>]*>[\s\S]*?<\/button>/g;

  let hasLinks = linkRegex.test(content);
  let hasBtns = btnRegex.test(content);

  if (!hasLinks && !hasBtns) return false;

  // Check if we already wrapped them all
  let alreadyWrappedAll = true;
  let lines = content.split('\n');
  
  if (!content.includes('authService')) {
    content = content.replace(/(import React.*?;\n)/, '$1import { authService } from \'../../services/authService\';\nimport { canCreate } from \'../../utils/permissions\';\n');
  } else if (!content.includes('canCreate')) {
    content = content.replace(/(import \{ authService \}.*?;\n)/, '$1import { canCreate } from \'../../utils/permissions\';\n');
  }

  if (!content.includes('authService.getUser()')) {
    content = content.replace(/(const [A-Z][a-zA-Z0-9_]* = \([^)]*\) => {\n)/, '$1  const user = authService.getUser();\n');
  }

  content = content.replace(linkRegex, (match, offset) => {
    // If it's preceded by && (, it's probably wrapped
    if (content.substring(Math.max(0, offset - 20), offset).includes('&&')) return match;
    return '{canCreate(user) && (\n              ' + match.replace(/\n/g, '\n              ') + '\n            )}';
  });

  content = content.replace(btnRegex, (match, offset) => {
    if (content.substring(Math.max(0, offset - 20), offset).includes('&&')) return match;
    return '{canCreate(user) && (\n              ' + match.replace(/\n/g, '\n              ') + '\n            )}';
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
}

function walk(dir) {
  let changedCount = 0;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      changedCount += walk(file);
    } else if (file.endsWith('.jsx')) {
      if (processFile(file)) {
        console.log('Updated', file);
        changedCount++;
      }
    }
  });
  return changedCount;
}

const count = walk('D:/SEM 4/DataBase/Mini Project/Frontend/src/pages');
console.log('Total files updated: ' + count);
