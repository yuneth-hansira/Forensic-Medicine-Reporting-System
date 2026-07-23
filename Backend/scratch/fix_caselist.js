const fs = require('fs');
const path = 'D:/SEM 4/DataBase/Mini Project/Frontend/src/pages/cases/CaseList.jsx';
let content = fs.readFileSync(path, 'utf8');

// Ensure imports
if (!content.includes('import { canCreate, canEdit, canDelete }')) {
    content = content.replace("import { authService } from '../../services/authService';", 
    "import { authService } from '../../services/authService';\nimport { canCreate, canEdit, canDelete } from '../../utils/permissions';");
}

// Ensure user var
if (!content.includes('const user = authService.getUser();')) {
    content = content.replace("const [query, setQuery] = useState('');",
    "const user = authService.getUser();\n  const [query, setQuery] = useState('');");
}

// Wrap Create Button
const addBtnOrig = `<button className="pm-btn pm-btn-primary" onClick={()=>window.location.href='/cases/register'}>\n              <FolderPlus size={16}/> New Case\n            </button>`;
const addBtnNew = `{canCreate(user) && (\n              <button className="pm-btn pm-btn-primary" onClick={()=>window.location.href='/cases/register'}>\n                <FolderPlus size={16}/> New Case\n              </button>\n            )}`;
content = content.replace(addBtnOrig, addBtnNew);

// Wrap Delete Button
const delBtnOrig = `<button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#ef4444', borderColor: '#fee2e2'}} title="Close Case" onClick={() => handleClose(c.Case_ID)}>\n                          <Trash2 size={14}/>\n                        </button>`;
const delBtnNew = `{canDelete(user) && (\n                          <button className="pm-btn pm-btn-secondary pm-btn-sm" style={{padding:'0.3rem 0.6rem', color: '#ef4444', borderColor: '#fee2e2'}} title="Close Case" onClick={() => handleClose(c.Case_ID)}>\n                            <Trash2 size={14}/>\n                          </button>\n                        )}`;
content = content.replace(delBtnOrig, delBtnNew);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed CaseList.jsx');
