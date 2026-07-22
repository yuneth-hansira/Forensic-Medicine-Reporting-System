const fs = require('fs');
const path = require('path');
const dir = 'd:/forensic med/Forensic-Medicine-Reporting-System/Frontend/src/pages/clinical';

fs.readdirSync(dir).forEach(f => {
  if (!f.endsWith('.jsx')) return;
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove min-h-screen from the inner content div
  const before = content;
  content = content.replace(
    /className="p-8 bg-\[#F8FAFC\] min-h-screen font-sans text-slate-800"/g,
    'className="font-sans text-slate-800"'
  );
  
  if (content !== before) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed: ' + f);
  } else {
    console.log('No change needed: ' + f);
  }
});
