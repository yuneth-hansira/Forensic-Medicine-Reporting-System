const fs = require('fs');
const files = [
  'BodyMap.jsx', 'ClinicalFindings.jsx', 'ExternalExamination.jsx',
  'InjuryRecording.jsx', 'InternalExamination.jsx', 'Measurements.jsx', 'Notes.jsx'
];
files.forEach(f => {
  const path = 'd:/forensic med/Forensic-Medicine-Reporting-System/Frontend/src/pages/clinical/' + f;
  let content = fs.readFileSync(path, 'utf8');
  
  if (!content.includes('DashboardLayout')) {
    // Add import
    content = content.replace(/(import clinicalService from '[^']+';\n?)/, '$1import DashboardLayout from \'../../layouts/DashboardLayout\';\n');
    
    if (!content.includes('DashboardLayout')) {
        content = content.replace(/(import .* from 'react';\n?)/, '$1import DashboardLayout from \'../../layouts/DashboardLayout\';\n');
    }

    // Replace opening div and remove ml-64
    content = content.replace(
      /return \(\s*<div className="p-8 bg-\[#F8FAFC\] min-h-screen (ml-64 )?font-sans text-slate-800">/,
      'return (\n    <DashboardLayout>\n    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans text-slate-800">'
    );
    
    // Replace closing div
    content = content.replace(
      /(\s*)<\/div>\s*\);\s*};\s*export default/m,
      '$1</div>\n    </DashboardLayout>\n  );\n};\n\nexport default'
    );

    fs.writeFileSync(path, content);
    console.log('Updated ' + f);
  }
});
