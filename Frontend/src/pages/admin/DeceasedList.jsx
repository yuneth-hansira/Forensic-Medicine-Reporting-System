import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, Plus, Eye, Edit, Trash2, EyeOff, X } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { deceasedService } from '../../services/deceasedService';

const DeceasedList = () => {
  const [deceasedList, setDeceasedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [hiddenRecords, setHiddenRecords] = useState(new Set());
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    Deceased_ID: null,
    Case_ID: '',
    Hospital_ID: '',
    Ward_ID: '',
    Full_Name: '',
    Sex: 'Male',
    Age: '',
    BHT_No: '',
    Date_Of_Death: '',
    Place_Of_Death: '',
    Death_Type: 'Sudden'
  });

  useEffect(() => {
    fetchDeceased();
  }, []);

  const fetchDeceased = async () => {
    try {
      setLoading(true);
      const data = await deceasedService.getAllDeceased();
      setDeceasedList(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching deceased records:', err);
      setError('Failed to load deceased records. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleHide = (id) => {
    setHiddenRecords(new Set([...hiddenRecords, id]));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this deceased record?")) {
      try {
        await deceasedService.deleteDeceased(id);
        fetchDeceased();
      } catch (err) {
        alert("Failed to delete record.");
        console.error(err);
      }
    }
  };

  const handleEditClick = (record) => {
    setFormData({
      ...record,
      Date_Of_Death: record.Date_Of_Death ? new Date(record.Date_Of_Death).toISOString().split('T')[0] : ''
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleAddNewClick = () => {
    setFormData({
      Deceased_ID: null,
      Case_ID: '',
      Hospital_ID: '',
      Ward_ID: '',
      Full_Name: '',
      Sex: 'Male',
      Age: '',
      BHT_No: '',
      Date_Of_Death: '',
      Place_Of_Death: '',
      Death_Type: 'Sudden'
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await deceasedService.updateDeceased(formData.Deceased_ID, formData);
      } else {
        await deceasedService.createDeceased(formData);
      }
      setShowModal(false);
      fetchDeceased();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to save record.";
      alert("Error: " + msg);
      console.error(err);
    }
  };

  const filteredList = deceasedList.filter(d => 
    !hiddenRecords.has(d.Deceased_ID) &&
    ((d.Full_Name && d.Full_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (d.BHT_No && d.BHT_No.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (d.Case_ID && d.Case_ID.toString().includes(searchTerm)))
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-slate-50 min-h-screen">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <ShieldAlert className="text-red-500" size={28} />
              Deceased Management
            </h1>
            <p className="text-slate-500 mt-1">Manage and view all records of deceased individuals.</p>
          </div>
          
          <button onClick={handleAddNewClick} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
            <Plus size={18} />
            <span>New Record</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60 mb-6 flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Name, BHT No, or Case ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          {hiddenRecords.size > 0 && (
             <button onClick={() => setHiddenRecords(new Set())} className="text-sm font-semibold text-blue-600 hover:text-blue-800">
               Show Hidden ({hiddenRecords.size})
             </button>
          )}
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading deceased records...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500 bg-red-50">{error}</div>
          ) : filteredList.length === 0 ? (
            <div className="p-12 text-center">
              <ShieldAlert size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-700 mb-1">No Records Found</h3>
              <p className="text-slate-500">No deceased records match your search criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                    <th className="font-semibold p-4">ID</th>
                    <th className="font-semibold p-4">Full Name</th>
                    <th className="font-semibold p-4">Age / Sex</th>
                    <th className="font-semibold p-4">BHT No</th>
                    <th className="font-semibold p-4">Date of Death</th>
                    <th className="font-semibold p-4">Death Type</th>
                    <th className="font-semibold p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((deceased) => (
                    <tr key={deceased.Deceased_ID} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 text-sm font-medium text-slate-700">#{deceased.Deceased_ID}</td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-800">{deceased.Full_Name || 'Unknown'}</div>
                        <div className="text-xs text-slate-500">Case: {deceased.Case_ID}</div>
                      </td>
                      <td className="p-4 text-sm text-slate-600">
                        {deceased.Age ? `${deceased.Age} yrs` : 'N/A'} • {deceased.Sex || 'N/A'}
                      </td>
                      <td className="p-4 text-sm text-slate-600">
                        {deceased.BHT_No || 'N/A'}
                      </td>
                      <td className="p-4 text-sm text-slate-600">
                        {formatDate(deceased.Date_Of_Death)}
                        <div className="text-xs text-slate-400 mt-0.5">{deceased.Place_Of_Death}</div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          deceased.Death_Type === 'Sudden' ? 'bg-orange-100 text-orange-700' :
                          deceased.Death_Type === 'Homicide' ? 'bg-red-100 text-red-700' :
                          deceased.Death_Type === 'Suicide' ? 'bg-purple-100 text-purple-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {deceased.Death_Type || 'Unknown'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleHide(deceased.Deceased_ID)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="Hide Record">
                            <EyeOff size={18} />
                          </button>
                          <button onClick={() => handleEditClick(deceased)} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit Record">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => handleDelete(deceased.Deceased_ID)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Record">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">{isEditing ? 'Edit Deceased Record' : 'Add New Deceased Record'}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:bg-slate-100 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="deceased-form" onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                    <input type="text" name="Full_Name" required value={formData.Full_Name} onChange={handleFormChange} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Case ID *</label>
                    <input type="number" name="Case_ID" required value={formData.Case_ID} onChange={handleFormChange} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">BHT No</label>
                    <input type="text" name="BHT_No" value={formData.BHT_No} onChange={handleFormChange} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Age</label>
                    <input type="number" name="Age" value={formData.Age} onChange={handleFormChange} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Sex</label>
                    <select name="Sex" value={formData.Sex} onChange={handleFormChange} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Date of Death</label>
                    <input type="date" name="Date_Of_Death" value={formData.Date_Of_Death} onChange={handleFormChange} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Death Type</label>
                    <select name="Death_Type" value={formData.Death_Type} onChange={handleFormChange} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="Sudden">Sudden</option>
                      <option value="Homicide">Homicide</option>
                      <option value="Suicide">Suicide</option>
                      <option value="Accident">Accident</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Place of Death</label>
                    <input type="text" name="Place_Of_Death" value={formData.Place_Of_Death} onChange={handleFormChange} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  
                  {/* Optional relational IDs (Hospital, Ward) skipped for brevity, can be added easily */}
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
              <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button type="submit" form="deceased-form" className="px-5 py-2.5 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm">
                {isEditing ? 'Save Changes' : 'Create Record'}
              </button>
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
};

export default DeceasedList;
