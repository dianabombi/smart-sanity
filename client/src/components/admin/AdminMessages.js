import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import ApiService from '../../services/api';

const AdminMessages = ({ onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [stats, setStats] = useState({});
  // const [pagination, setPagination] = useState({});

  useEffect(() => {
    loadMessages();
    loadStats();
  }, [statusFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMessages = async (page = 1) => {
    try {
      setLoading(true);
      const result = await ApiService.getMessages(statusFilter, page, 20);
      if (result.success) {
        setMessages(result.messages);
        // setPagination(result.pagination);
      } else {
        setError('Chyba pri načítavaní správ');
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setError('Chyba pri načítavaní správ');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const result = await ApiService.getMessageStats();
      if (result.success) {
        setStats(result.stats);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      const result = await ApiService.markMessageAsRead(messageId);
      if (result.success) {
        loadMessages();
        loadStats();
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleStatusChange = async (messageId, status) => {
    try {
      const result = await ApiService.updateMessageStatus(messageId, status);
      if (result.success) {
        loadMessages();
        loadStats();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (window.confirm('Naozaj chcete odstrániť túto správu?')) {
      try {
        const result = await ApiService.deleteMessage(messageId);
        if (result.success) {
          loadMessages();
          loadStats();
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('sk-SK');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'read': return 'bg-yellow-500';
      case 'replied': return 'bg-green-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Nová';
      case 'read': return 'Prečítaná';
      case 'replied': return 'Odpovedaná';
      case 'archived': return 'Archivovaná';
      default: return status;
    }
  };

  const MessageModal = () => {
    if (!selectedMessage) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="p-6 border-b border-gray-700 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {selectedMessage.subject}
              </h2>
              <p className="text-gray-300 text-sm mt-1">
                Od: {selectedMessage.name} ({selectedMessage.email})
              </p>
            </div>
            <button
              onClick={() => setSelectedMessage(null)}
              className="text-gray-400 hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Meno:</span>
                  <span className="text-white ml-2">{selectedMessage.name}</span>
                </div>
                <div>
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white ml-2">{selectedMessage.email}</span>
                </div>
                <div>
                  <span className="text-gray-400">Telefón:</span>
                  <span className="text-white ml-2">{selectedMessage.phone || 'Neuvedené'}</span>
                </div>
                <div>
                  <span className="text-gray-400">Dátum:</span>
                  <span className="text-white ml-2">{formatDate(selectedMessage.createdAt)}</span>
                </div>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Správa:</h3>
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-300 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Status Controls */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
                <div>
                  <label className="text-gray-300 text-sm">Status:</label>
                  <select
                    value={selectedMessage.status}
                    onChange={(e) => handleStatusChange(selectedMessage._id, e.target.value)}
                    className="ml-2 bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm"
                  >
                    <option value="new">Nová</option>
                    <option value="read">Prečítaná</option>
                    <option value="replied">Odpovedaná</option>
                    <option value="archived">Archivovaná</option>
                  </select>
                </div>
                
                {!selectedMessage.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(selectedMessage._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Označiť ako prečítané
                  </button>
                )}
                
                <button
                  onClick={() => handleDeleteMessage(selectedMessage._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                  Odstrániť
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700 flex justify-end">
            <button
              onClick={() => setSelectedMessage(null)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
            >
              Zavrieť
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout onLogout={onLogout}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-300">Načítavam správy...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout onLogout={onLogout}>
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
          <h3 className="text-red-400 font-medium mb-2">Chyba</h3>
          <p className="text-red-300">{error}</p>
          <button
            onClick={() => loadMessages()}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Skúsiť znovu
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Správa kontaktných správ
          </h2>
          <p className="text-gray-300">
            Spravujte správy prijaté z kontaktného formulára
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">{stats.total || 0}</p>
              <p className="text-sm text-gray-300">Celkom správ</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">{stats.unread || 0}</p>
              <p className="text-sm text-gray-300">Neprečítané</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{stats.replied || 0}</p>
              <p className="text-sm text-gray-300">Odpovedané</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">{stats.recent || 0}</p>
              <p className="text-sm text-gray-300">Za 30 dní</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-4">
            <label className="text-gray-300">Filter:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2"
            >
              <option value="all">Všetky správy</option>
              <option value="new">Nové</option>
              <option value="read">Prečítané</option>
              <option value="replied">Odpovedané</option>
              <option value="archived">Archivované</option>
            </select>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-gray-800 rounded-lg shadow border border-gray-700">
          {messages.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400">Žiadne správy neboli nájdené</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Odosielateľ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Predmet
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Dátum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Akcie
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {messages.map((message) => (
                    <tr
                      key={message._id}
                      className={`hover:bg-gray-700 cursor-pointer ${!message.isRead ? 'bg-gray-750' : ''}`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className={`text-sm font-medium ${!message.isRead ? 'text-white' : 'text-gray-300'}`}>
                            {message.name}
                          </div>
                          <div className="text-sm text-gray-400">{message.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm ${!message.isRead ? 'text-white font-medium' : 'text-gray-300'}`}>
                          {message.subject}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatDate(message.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(message.status)}`}>
                          {getStatusText(message.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMessage(message);
                          }}
                          className="text-blue-400 hover:text-blue-300 mr-3"
                        >
                          Zobraziť
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMessage(message._id);
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          Odstrániť
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Message Modal */}
      <MessageModal />
    </AdminLayout>
  );
};

export default AdminMessages;
