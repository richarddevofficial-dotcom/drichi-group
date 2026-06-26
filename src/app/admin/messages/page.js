"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Trash2,
  Eye,
  CheckCircle,
  X,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const loadMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const unreadCount = messages.filter((m) => !m.isRead).length;

  const handleMarkAsRead = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg)),
    );
  };

  const handleDelete = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
    setSuccessMsg("Message deleted!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-brand-orange border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-gray-600">Messages</h1>
          <p className="text-brand-gray-400 mt-1">
            {messages.length} messages • {unreadCount} unread
          </p>
        </div>
        <button
          onClick={loadMessages}
          className="flex items-center gap-2 text-sm text-brand-gray-400 hover:text-brand-orange transition-colors"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-700 flex items-center justify-between">
          <span>✅ {successMsg}</span>
          <button
            onClick={() => setSuccessMsg("")}
            className="text-green-500 hover:text-green-700"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {messages.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Message List */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-brand-gray-100 overflow-hidden">
            <div className="p-4 border-b border-brand-gray-100 bg-brand-gray-50">
              <h3 className="text-sm font-semibold text-brand-gray-600">
                All Messages
              </h3>
            </div>
            <div className="divide-y divide-brand-gray-100 max-h-[600px] overflow-y-auto">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    handleMarkAsRead(msg.id);
                  }}
                  className={`w-full text-left p-4 hover:bg-brand-gray-50 transition-colors ${
                    selectedMessage?.id === msg.id
                      ? "bg-brand-orange/5 border-l-4 border-brand-orange"
                      : ""
                  } ${!msg.isRead ? "bg-blue-50/30" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p
                        className={`text-sm truncate ${!msg.isRead ? "font-bold text-brand-gray-600" : "text-brand-gray-500"}`}
                      >
                        {msg.name}
                      </p>
                      <p className="text-xs text-brand-gray-400 truncate mt-1">
                        {msg.email}
                      </p>
                    </div>
                    {!msg.isRead && (
                      <span className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-xs text-brand-gray-400 mt-2">
                    {new Date(msg.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-xl shadow-sm border border-brand-gray-100 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-brand-gray-600">
                      {selectedMessage.name}
                    </h3>
                    <p className="text-sm text-brand-gray-400">
                      {selectedMessage.email}
                    </p>
                    {selectedMessage.company && (
                      <p className="text-sm text-brand-gray-400">
                        {selectedMessage.company}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="p-2 text-brand-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="bg-brand-gray-50 rounded-lg px-3 py-1.5">
                      <span className="text-brand-gray-400">Service: </span>
                      <span className="font-medium text-brand-gray-600">
                        {selectedMessage.service || "Not specified"}
                      </span>
                    </div>
                    <div className="bg-brand-gray-50 rounded-lg px-3 py-1.5">
                      <span className="text-brand-gray-400">Date: </span>
                      <span className="font-medium text-brand-gray-600">
                        {new Date(selectedMessage.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-brand-gray-100 pt-4">
                    <h4 className="text-sm font-semibold text-brand-gray-600 mb-2">
                      Message:
                    </h4>
                    <p className="text-sm text-brand-gray-500 leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>

                  <div className="border-t border-brand-gray-100 pt-4">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: Inquiry from Drichi Group&body=Hello ${selectedMessage.name},%0D%0A%0D%0AThank you for contacting Drichi Group.%0D%0A%0D%0A`}
                      className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange-600 transition-all"
                    >
                      <Mail size={16} />
                      Reply via Email
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-brand-gray-100 p-12 text-center">
                <MessageSquare
                  size={48}
                  className="mx-auto text-brand-gray-300 mb-4"
                />
                <h3 className="text-lg font-bold text-brand-gray-600 mb-2">
                  No Message Selected
                </h3>
                <p className="text-brand-gray-400">
                  Select a message from the list to view its details.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-brand-gray-100 p-12 text-center">
          <Mail size={48} className="mx-auto text-brand-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-brand-gray-600 mb-2">
            No Messages Yet
          </h3>
          <p className="text-brand-gray-400">
            Messages from your contact form will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
