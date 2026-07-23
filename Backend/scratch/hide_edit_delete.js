const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Regexes for Edit buttons and links
  const editLinkRegex = /<Link\s+to=["'][^"']*\/edit["'][^>]*>[\s\S]*?<\/Link>/g;
  const editBtnRegex = /<button[^>]*onClick=\{[^\}]*(?:window\.location\.href|navigate)\s*=?\s*[`'"][^`'"]*\/edit[`'"][^\}]*\}[^>]*>[\s\S]*?<\/button>/g;
  // Fallback for Edit button that might just contain <Edit3> and "Edit"
  const plainEditBtnRegex = /<button[^>]*>[\s\S]*?<Edit3[^>]*>[\s\S]*?<\/button>/g;

  // Regex for Delete buttons
  const deleteBtnRegex = /<button[^>]*onClick=\{[^\}]*handleDelete[^\}]*\}[^>]*>[\s\S]*?<\/button>/g;
  // Fallback for Delete button that contains Trash2
  const plainDeleteBtnRegex = /<button[^>]*>[\s\S]*?<Trash2[^>]*>[\s\S]*?<\/button>/g;

  let needsCanEdit = editLinkRegex.test(content) || editBtnRegex.test(content) || plainEditBtnRegex.test(content);
  let needsCanDelete = deleteBtnRegex.test(content) || plainDeleteBtnRegex.test(content);

  if (!needsCanEdit && !needsCanDelete) return false;

  // Add imports if missing
  let importsAdded = false;
  let importStatement = 'import { ';
  if (needsCanEdit && !content.includes('canEdit')) importStatement += 'canEdit, ';
  if (needsCanDelete && !content.includes('canDelete')) importStatement += 'canDelete, ';
  importStatement = importStatement.replace(/, $/, '');
  importStatement += ' } from \'../../utils/permissions\';\n';

  if (importStatement !== 'import {  } from \'../../utils/permissions\';\n') {
    if (!content.includes('authService')) {
      content = content.replace(/(import React.*?;\n)/, '$1import { authService } from \'../../services/authService\';\n' + importStatement);
    } else {
      // Find the existing permissions import if it exists
      if (content.match(/import \{[^}]*\}\s+from\s+['"]\.\.\/\.\.\/utils\/permissions['"];/)) {
        content = content.replace(/(import \{)([^}]*)(\}\s+from\s+['"]\.\.\/\.\.\/utils\/permissions['"];)/, (m, p1, p2, p3) => {
          let imports = p2.split(',').map(s => s.trim()).filter(s => s);
          if (needsCanEdit && !imports.includes('canEdit')) imports.push('canEdit');
          if (needsCanDelete && !imports.includes('canDelete')) imports.push('canDelete');
          return p1 + ' ' + imports.join(', ') + ' ' + p3;
        });
      } else {
         content = content.replace(/(import \{ authService \}.*?;\n)/, '$1' + importStatement);
      }
    }
  }

  // Add authService.getUser()
  if (!content.includes('authService.getUser()') && !content.includes('const user = authService.getUser()')) {
    content = content.replace(/(const [A-Z][a-zA-Z0-9_]* = \([^)]*\) => {\n)/, '$1  const user = authService.getUser();\n');
  }

  function wrapWithPermission(match, offset, permFunc) {
    // Check if it's already wrapped by &&
    if (content.substring(Math.max(0, offset - 20), offset).includes('&&')) return match;
    return `{${permFunc}(user) && (\n` + '              ' + match.replace(/\n/g, '\n              ') + '\n            )}';
  }

  content = content.replace(editLinkRegex, (m, offset) => wrapWithPermission(m, offset, 'canEdit'));
  content = content.replace(editBtnRegex, (m, offset) => wrapWithPermission(m, offset, 'canEdit'));
  content = content.replace(plainEditBtnRegex, (m, offset) => {
    // avoid double wrapping if editBtnRegex already caught it
    if (m.includes('window.location.href') || m.includes('navigate')) return m;
    return wrapWithPermission(m, offset, 'canEdit');
  });

  content = content.replace(deleteBtnRegex, (m, offset) => wrapWithPermission(m, offset, 'canDelete'));
  content = content.replace(plainDeleteBtnRegex, (m, offset) => {
    if (m.includes('handleDelete')) return m;
    return wrapWithPermission(m, offset, 'canDelete');
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
