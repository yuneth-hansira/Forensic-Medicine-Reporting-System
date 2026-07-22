const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.isFile() && fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove DashboardLayout import
      content = content.replace(/^import\s+DashboardLayout.*?(?:'|");\n?/gm, '');
      
      // Remove <DashboardLayout> and </DashboardLayout> tags
      content = content.replace(/<DashboardLayout[^>]*>\s*/g, '');
      content = content.replace(/<\/DashboardLayout>\s*/g, '');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir('d:/forensic med/Forensic-Medicine-Reporting-System/Frontend/src/pages');
console.log('Finished updating pages.');
