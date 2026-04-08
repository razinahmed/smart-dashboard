/**
 * Smart Dashboard - Sidebar Navigation Component
 * Provides navigation menu and theme toggle
 */

import React, { useState } from 'react';

/**
 * Sidebar Component
 * Renders navigation menu with collapsible functionality
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isDarkMode - Current theme mode
 * @param {Function} props.onThemeToggle - Theme toggle callback
 */
function Sidebar({ isDarkMode, onThemeToggle }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Navigation menu items
  const menuItems = [
    {
      id: 1,
      icon: '📊',
      label: 'Dashboard',
      href: '#',
      active: true,
    },
    {
      id: 2,
      icon: '📈',
      label: 'Analytics',
      href: '#analytics',
      active: false,
    },
    {
      id: 3,
      icon: '👥',
      label: 'Visitors',
      href: '#visitors',
      active: false,
    },
    {
      id: 4,
      icon: '💰',
      label: 'Revenue',
      href: '#revenue',
      active: false,
    },
    {
      id: 5,
      icon: '🎯',
      label: 'Conversions',
      href: '#conversions',
      active: false,
    },
    {
      id: 6,
      icon: '📱',
      label: 'Devices',
      href: '#devices',
      active: false,
    },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header with Logo */}
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">📊</span>
          {!isCollapsed && <span className="logo-text">SmartDash</span>}
        </div>
        <button
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle sidebar"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={`nav-link ${item.active ? 'active' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="nav-label">{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="footer-section">
          {!isCollapsed && (
            <div className="status-info">
              <div className="status-indicator online"></div>
              <div>
                <p className="status-text">Status</p>
                <p className="status-value">Online</p>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Section */}
        <div className="user-profile">
          <div className="avatar">AR</div>
          {!isCollapsed && (
            <div className="user-info">
              <p className="user-name">Abdul Rasak</p>
              <p className="user-email">admin@dashboard.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
