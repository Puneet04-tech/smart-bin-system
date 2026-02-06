"use client";

import React, { useState } from "react";
import { Bell, CheckCircle, AlertTriangle, Info, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "alert";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Static timestamps to avoid Date.now() during render
  const now = new Date();
  const notifications: Notification[] = [
    {
      id: "1",
      type: "success",
      title: "Bin Collection Completed",
      message: "BIN-001 at Connaught Place has been emptied successfully",
      timestamp: new Date(now.getTime() - 5 * 60000),
      read: false,
    },
    {
      id: "2",
      type: "warning",
      title: "Bin Near Capacity",
      message: "BIN-002 at Nehru Place is 95% full",
      timestamp: new Date(now.getTime() - 15 * 60000),
      read: false,
    },
    {
      id: "3",
      type: "alert",
      title: "Maintenance Required",
      message: "BIN-004 sensor anomaly detected",
      timestamp: new Date(now.getTime() - 30 * 60000),
      read: true,
    },
  ];
  
  const [notificationState, setNotificationState] = useState(notifications);

  const unreadCount = notificationState.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="w-5 h-5" style={{ color: '#10b981' }} />;
      case "warning": return <AlertTriangle className="w-5 h-5" style={{ color: '#f59e0b' }} />;
      case "alert": return <Zap className="w-5 h-5" style={{ color: '#ef4444' }} />;
      default: return <Info className="w-5 h-5" style={{ color: '#3b82f6' }} />;
    }
  };

  const formatTime = (date: Date) => {
    const minutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const markAsRead = (id: string) => {
    setNotificationState(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotificationState(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          padding: '8px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          color: '#16a34a',
        }}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '8px',
            height: '8px',
            background: '#ef4444',
            borderRadius: '50%',
            border: '2px solid white',
          }}></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '380px',
              maxHeight: '500px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              zIndex: 1000,
              overflow: 'hidden',
            }}
            className="content-card"
          >
            <div style={{
              padding: '16px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>
                Notifications
                {unreadCount > 0 && (
                  <span style={{
                    marginLeft: '8px',
                    padding: '2px 8px',
                    background: '#10b981',
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                  }}>
                    {unreadCount}
                  </span>
                )}
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  style={{
                    padding: '4px 12px',
                    background: 'transparent',
                    border: 'none',
                    color: '#10b981',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    fontWeight: '500',
                  }}
                >
                  Mark all read
                </button>
              )}
            </div>

            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {notificationState.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                  <Bell size={40} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notificationState.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    style={{
                      padding: '16px',
                      borderBottom: '1px solid #e5e7eb',
                      cursor: 'pointer',
                      background: notification.read ? 'transparent' : 'rgba(16, 185, 129, 0.05)',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = notification.read ? 'transparent' : 'rgba(16, 185, 129, 0.05)'}
                  >
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ flexShrink: 0 }}>
                        {getIcon(notification.type)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                          <h4 style={{ fontSize: '0.875rem', fontWeight: '600', margin: 0 }}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div style={{
                              width: '8px',
                              height: '8px',
                              background: '#10b981',
                              borderRadius: '50%',
                              flexShrink: 0,
                            }}></div>
                          )}
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 4px 0' }}>
                          {notification.message}
                        </p>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                          {formatTime(notification.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
