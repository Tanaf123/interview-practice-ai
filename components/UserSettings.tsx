import React, { useState } from 'react';

interface UserSettingsProps {
  isDarkMode: boolean;
  notifications: {
    email: boolean;
    browser: boolean;
    practiceReminders: boolean;
  };
  onToggleDarkMode: () => void;
  onToggleNotification: (type: 'email' | 'browser' | 'practiceReminders') => void;
  onDeleteAccount: () => void;
}

export default function UserSettings({
  isDarkMode,
  notifications,
  onToggleDarkMode,
  onToggleNotification,
  onDeleteAccount
}: UserSettingsProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>

          {/* Appearance */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Appearance</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700">Dark Mode</p>
                <p className="text-sm text-gray-500">Switch between light and dark theme</p>
              </div>
              <button
                onClick={onToggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  isDarkMode ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates and reminders via email</p>
                </div>
                <button
                  onClick={() => onToggleNotification('email')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    notifications.email ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      notifications.email ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">Browser Notifications</p>
                  <p className="text-sm text-gray-500">Get notified in your browser</p>
                </div>
                <button
                  onClick={() => onToggleNotification('browser')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    notifications.browser ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      notifications.browser ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">Practice Reminders</p>
                  <p className="text-sm text-gray-500">Get reminded about your practice schedule</p>
                </div>
                <button
                  onClick={() => onToggleNotification('practiceReminders')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    notifications.practiceReminders ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      notifications.practiceReminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="space-y-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700">Delete Account</p>
                  <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                </div>
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Delete Account
                  </button>
                ) : (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onDeleteAccount}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Confirm Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 