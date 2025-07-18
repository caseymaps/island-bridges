import React, { useState, useEffect } from 'react';
import { MessageCircle, Users, Shield, Globe, TrendingUp, Award, Phone, AlertTriangle, CheckCircle, Map, Heart, BookOpen, Mic, Send } from 'lucide-react';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Barangay Captain Maria', message: 'Kumusta ang fishing rights discussion sa inyong isla?', time: '2 min ago', language: 'Tagalog', status: 'resolved' },
    { id: 2, sender: 'Imam Abdullah', message: 'Salamat sa peaceful resolution ng water dispute', time: '1 hour ago', language: 'Tausug', status: 'resolved' },
    { id: 3, sender: 'Datu Miguel', message: 'Need mediation for land boundary issue', time: '3 hours ago', language: 'Maguindanaon', status: 'pending' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [conflictMetrics, setConflictMetrics] = useState({
    resolved: 127,
    active: 8,
    prevented: 45,
    communities: 23
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setConflictMetrics(prev => ({
        ...prev,
        resolved: prev.resolved + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'You',
        message: newMessage,
        time: 'now',
        language: 'English',
        status: 'sent'
      }]);
      setNewMessage('');
    }
  };

  const TabButton = ({ id, icon: Icon, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
        active ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  const MetricCard = ({ icon: Icon, label, value, color = 'blue' }) => (
    <div className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${
      color === 'green' ? 'border-green-500' : 
      color === 'yellow' ? 'border-yellow-500' : 
      color === 'purple' ? 'border-purple-500' : 'border-blue-500'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className={`text-3xl font-bold ${
            color === 'green' ? 'text-green-600' : 
            color === 'yellow' ? 'text-yellow-600' : 
            color === 'purple' ? 'text-purple-600' : 'text-blue-600'
          }`}>{value}</p>
        </div>
        <Icon className={`${
          color === 'green' ? 'text-green-500' : 
          color === 'yellow' ? 'text-yellow-500' : 
          color === 'purple' ? 'text-purple-500' : 'text-blue-500'
        }`} size={32} />
      </div>
    </div>
  );

  const MessageCard = ({ message }) => (
    <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-500 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800">{message.sender}</h4>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{message.language}</span>
          <span className={`text-xs px-2 py-1 rounded ${
            message.status === 'resolved' ? 'bg-green-100 text-green-800' : 
            message.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {message.status}
          </span>
        </div>
      </div>
      <p className="text-gray-700 mb-2">{message.message}</p>
      <p className="text-xs text-gray-500">{message.time}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Globe className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Island Bridges</h1>
                <p className="text-gray-600">AI-Powered Peace Platform for the Philippines</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">23 Communities Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <TabButton id="dashboard" icon={TrendingUp} label="Dashboard" active={activeTab === 'dashboard'} onClick={setActiveTab} />
          <TabButton id="dialogue" icon={MessageCircle} label="Peace Dialogue" active={activeTab === 'dialogue'} onClick={setActiveTab} />
          <TabButton id="mediation" icon={Users} label="AI Mediation" active={activeTab === 'mediation'} onClick={setActiveTab} />
          <TabButton id="blockchain" icon={Shield} label="Peace Agreements" active={activeTab === 'blockchain'} onClick={setActiveTab} />
          <TabButton id="education" icon={BookOpen} label="Peace Education" active={activeTab === 'education'} onClick={setActiveTab} />
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard icon={CheckCircle} label="Conflicts Resolved" value={conflictMetrics.resolved} color="green" />
              <MetricCard icon={AlertTriangle} label="Active Mediations" value={conflictMetrics.active} color="yellow" />
              <MetricCard icon={Shield} label="Conflicts Prevented" value={conflictMetrics.prevented} color="blue" />
              <MetricCard icon={Map} label="Connected Communities" value={conflictMetrics.communities} color="purple" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Regional Peace Index</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Maguindanao</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <span className="text-sm text-green-600 font-medium">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Lanao del Sur</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-sm text-blue-600 font-medium">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Basilan</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '52%' }}></div>
                      </div>
                      <span className="text-sm text-yellow-600 font-medium">52%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Award className="text-green-600" size={20} />
                    <div>
                      <p className="font-medium text-green-900">Water Rights Agreement</p>
                      <p className="text-sm text-green-700">3 barangays resolved fishing territory dispute</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Heart className="text-blue-600" size={20} />
                    <div>
                      <p className="font-medium text-blue-900">Youth Peace Council</p>
                      <p className="text-sm text-blue-700">150 young leaders trained in conflict resolution</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Users className="text-purple-600" size={20} />
                    <div>
                      <p className="font-medium text-purple-900">Inter-faith Dialogue</p>
                      <p className="text-sm text-purple-700">5 religious groups committed to peace compact</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dialogue Tab */}
        {activeTab === 'dialogue' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Community Dialogue Center</h3>
                <div className="space-y-4 mb-6">
                  {messages.map(message => (
                    <MessageCard key={message.id} message={message} />
                  ))}
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message... (Auto-translates to recipient's language)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <button
                    onClick={sendMessage}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4">Active Participants</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">M</div>
                    <div>
                      <p className="font-medium">Brgy. Captain Maria</p>
                      <p className="text-sm text-gray-600">Cotabato City</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">A</div>
                    <div>
                      <p className="font-medium">Imam Abdullah</p>
                      <p className="text-sm text-gray-600">Marawi City</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">D</div>
                    <div>
                      <p className="font-medium">Datu Miguel</p>
                      <p className="text-sm text-gray-600">Maguindanao</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4">Language Support</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['Tagalog', 'Cebuano', 'Tausug', 'Maranao', 'Maguindanaon', 'Ilocano', 'Hiligaynon', 'English'].map(lang => (
                    <div key={lang} className="bg-gray-100 rounded-lg p-2 text-center text-sm font-medium">
                      {lang}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Mediation Tab */}
        {activeTab === 'mediation' && (
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Kapitan AI Mediator</h3>
              <p className="text-gray-600">AI-powered mediation trained on traditional Filipino conflict resolution</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-blue-900 mb-4">Current Mediation Case</h4>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-medium text-gray-900">Land Boundary Dispute</p>
                    <p className="text-sm text-gray-600 mt-1">Between Barangay San Miguel and Barangay San Juan</p>
                    <p className="text-sm text-blue-600 mt-2">Status: AI analyzing traditional rido settlement patterns</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-medium text-gray-900">Cultural Context Analysis</p>
                    <p className="text-sm text-gray-600 mt-1">✓ Pakikipagkapwa principles identified</p>
                    <p className="text-sm text-gray-600">✓ Bayanihan opportunities mapped</p>
                    <p className="text-sm text-gray-600">✓ Islamic shura consultation recommended</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="font-bold text-green-900 mb-4">AI Recommendations</h4>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm font-medium text-green-900">Traditional Approach</p>
                    <p className="text-xs text-green-700">Suggest community barangay session with both elders</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm font-medium text-green-900">Compensation Framework</p>
                    <p className="text-xs text-green-700">Mutual benefit sharing based on ancestral practices</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm font-medium text-green-900">Timeline</p>
                    <p className="text-xs text-green-700">7-day cooling period, then 3-session mediation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blockchain Tab */}
        {activeTab === 'blockchain' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Blockchain-Verified Peace Agreements</h3>
              <div className="space-y-4">
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-green-900">Fishing Rights Compact</h4>
                    <div className="flex items-center gap-2">
                      <Shield className="text-green-600" size={16} />
                      <span className="text-sm text-green-700">Blockchain Verified</span>
                    </div>
                  </div>
                  <p className="text-sm text-green-800 mb-3">Agreement between 3 coastal barangays on sustainable fishing practices</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-600">Signatories</p>
                      <p className="font-medium text-green-900">3 Barangay Captains</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-600">Smart Contract</p>
                      <p className="font-medium text-green-900">₱2.5M Development Fund</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-600">Status</p>
                      <p className="font-medium text-green-900">85% Milestones Complete</p>
                    </div>
                  </div>
                </div>

                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-blue-900">Inter-Faith Peace Covenant</h4>
                    <div className="flex items-center gap-2">
                      <Shield className="text-blue-600" size={16} />
                      <span className="text-sm text-blue-700">Blockchain Verified</span>
                    </div>
                  </div>
                  <p className="text-sm text-blue-800 mb-3">Religious leaders commitment to peaceful coexistence</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-600">Signatories</p>
                      <p className="font-medium text-blue-900">5 Religious Leaders</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-600">Smart Contract</p>
                      <p className="font-medium text-blue-900">₱1.8M Education Fund</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-600">Status</p>
                      <p className="font-medium text-blue-900">62% Milestones Complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Peace Education Modules</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                  <h4 className="font-bold mb-2">Understanding Rido</h4>
                  <p className="text-sm opacity-90">Traditional conflict resolution in Muslim communities</p>
                  <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs mt-1">150 students completed</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-4 text-white">
                  <h4 className="font-bold mb-2">Bayanihan Spirit</h4>
                  <p className="text-sm opacity-90">Community cooperation and mutual aid</p>
                  <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                  <p className="text-xs mt-1">230 students completed</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white">
                  <h4 className="font-bold mb-2">Digital Citizenship</h4>
                  <p className="text-sm opacity-90">Online peace and respectful communication</p>
                  <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <p className="text-xs mt-1">95 students completed</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Youth Peace Champions</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="text-white" size={32} />
                  </div>
                  <h4 className="font-bold text-gray-900">Peace Ambassador Program</h4>
                  <p className="text-gray-600 text-sm mt-2">Training the next generation of peacebuilders</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-600">127</p>
                    <p className="text-sm text-yellow-800">Active Ambassadors</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-orange-600">23</p>
                    <p className="text-sm text-orange-800">Schools Participating</p>
                  </div>
