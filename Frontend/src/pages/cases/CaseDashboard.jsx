import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText, Clock, CheckCircle, AlertTriangle, TrendingUp,
  FolderOpen, Plus, ArrowRight, Users, Calendar, Activity
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import DashboardLayout from '../../layouts/DashboardLayout';

const monthlyData = [
  { month: 'Feb', cases: 0 }, { month: 'Mar', cases: 0 },
  { month: 'Apr', cases: 0 }, { month: 'May', cases: 0 },
  { month: 'Jun', cases: 0 }, { month: 'Jul', cases: 0 },
];

const typeData = [
  { name: 'Medico-Legal', value: 0, color: '#2563EB' },
  { name: 'Postmortem', value: 0, color: '#8B5CF6' },
  { name: 'Injury', value: 0, color: '#F59E0B' },
  { name: 'Toxicology', value: 0, color: '#10B981' },
];

const recentCases = [];

const statusColors = {
  Pending:   'bg-amber-100 text-amber-700 border-amber-200',
  Completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Emergency: 'bg-red-100 text-red-700 border-red-200',
};

const kpis = [
  { label: 'Total Cases',   value: '0', change: '0%', icon: FileText,     color: 'bg-blue-50   text-blue-600',    border: 'border-blue-100'   },
  { label: 'Pending',       value: '0',    change: '0',   icon: Clock,        color: 'bg-amber-50  text-amber-600',   border: 'border-amber-100'  },
  { label: 'Completed',     value: '0',   change: '0%',  icon: CheckCircle,  color: 'bg-emerald-50 text-emerald-600',border: 'border-emerald-100'},
  { label: 'Emergency',     value: '0',    change: '0',   icon: AlertTriangle,color: 'bg-red-50    text-red-600',     border: 'border-red-100'    },
];

const CaseDashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-8 bg-slate-50 min-h-screen font-sans">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Case Management</h1>
            <p className="text-slate-500 text-sm mt-1">Overview of all forensic cases and activity</p>
          </div>
          <div className="flex gap-3">
            <Link to="/cases/list"
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium text-sm shadow-sm transition-colors">
              <FolderOpen size={16} /> All Cases
            </Link>
            <button
              onClick={() => navigate('/cases/new')}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm shadow-sm shadow-blue-600/20 transition-colors">
              <Plus size={16} /> New Case
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, idx) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -3 }}
              className={`bg-white p-6 rounded-[20px] shadow-sm border ${kpi.border} flex items-center gap-5`}
            >
              <div className={`p-4 rounded-2xl ${kpi.color}`}>
                <kpi.icon size={24} />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-semibold">{kpi.label}</p>
                <h3 className="text-2xl font-bold text-slate-800">{kpi.value}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  <span className="text-slate-500">{kpi.change}</span> this month
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-white rounded-[20px] p-6 shadow-sm border border-slate-200/60">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-slate-800">Monthly Case Volume</h3>
                <p className="text-xs text-slate-400 mt-0.5">Cases registered per month</p>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600">
                <TrendingUp size={14} /> 2026
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData} barSize={36}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: '#f1f5f9', radius: 8 }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                />
                <Bar dataKey="cases" fill="#2563EB" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-200/60">
            <h3 className="font-bold text-slate-800 mb-1">Cases by Type</h3>
            <p className="text-xs text-slate-400 mb-4">Current month breakdown</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={typeData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {typeData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {typeData.map(d => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-slate-600 font-medium">{d.name}</span>
                  </div>
                  <span className="font-bold text-slate-800">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Recent Cases + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Cases Table */}
          <div className="lg:col-span-2 bg-white rounded-[20px] shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Recent Cases</h3>
              <Link to="/cases/list" className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-slate-400 uppercase tracking-wider bg-slate-50/50">
                  <th className="px-6 py-3 font-semibold">Case</th>
                  <th className="px-6 py-3 font-semibold">Type</th>
                  <th className="px-6 py-3 font-semibold">Doctor</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentCases.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                      No recent cases to display.
                    </td>
                  </tr>
                ) : (
                  recentCases.map((c, idx) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.07 }}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/cases/${c.id}`)}
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-blue-600 text-sm">{c.id}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{c.examinee}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{c.type}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{c.doctor}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusColors[c.status]}`}>
                          {c.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-200/60">
            <h3 className="font-bold text-slate-800 mb-5">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { icon: Plus,      label: 'Create New Case',      desc: 'Register a new forensic case',           path: '/cases/new',                        color: 'bg-blue-600 text-white' },
                { icon: FolderOpen,label: 'Browse All Cases',     desc: 'Search and filter case records',         path: '/cases/list',                       color: 'bg-slate-100 text-slate-700' },
                { icon: Activity,  label: 'Case Timeline',        desc: 'View timeline for recent case',          path: '/cases/C2026-1045/timeline',        color: 'bg-slate-100 text-slate-700' },
                { icon: FileText,  label: 'Case Documents',       desc: 'Upload and manage documents',            path: '/cases/C2026-1045/documents',       color: 'bg-slate-100 text-slate-700' },
                { icon: Users,     label: 'Assign Doctor',        desc: 'Assign a JMO to a pending case',        path: '/cases/C2026-1045/assign',          color: 'bg-slate-100 text-slate-700' },
              ].map(a => (
                <button
                  key={a.label}
                  onClick={() => navigate(a.path)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all hover:scale-[1.01] ${a.color} ${a.color.includes('blue') ? 'shadow-md shadow-blue-600/20' : 'border border-slate-100 hover:bg-slate-50'}`}
                >
                  <div className={`p-2 rounded-lg ${a.color.includes('blue') ? 'bg-white/20' : 'bg-white border border-slate-200'}`}>
                    <a.icon size={18} className={a.color.includes('blue') ? 'text-white' : 'text-blue-600'} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-bold ${a.color.includes('blue') ? 'text-white' : 'text-slate-800'}`}>{a.label}</p>
                    <p className={`text-xs mt-0.5 ${a.color.includes('blue') ? 'text-blue-100' : 'text-slate-400'}`}>{a.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CaseDashboard;
