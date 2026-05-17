'use client'

import React, { useState } from 'react'
import styles from '../admin.module.css'
import { updateUserRole } from '../actions'

type UserProfile = {
  id: string
  email: string
  role: 'admin' | 'user'
}

export default function UsersRolesManager({ users }: { users: UserProfile[] }) {
  const [updating, setUpdating] = useState<string | null>(null)

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      setUpdating(userId)
      await updateUserRole(userId, newRole)
    } catch (error) {
      alert('Failed to update user role. You might not have permission.')
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div className={styles.sectionContent}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Email</th>
            <th>ID</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><strong>{user.email || 'No email provided'}</strong></td>
              <td><span style={{ fontSize: '0.75rem', color: '#888' }}>{user.id}</span></td>
              <td>
                <span className={`${styles.badge} ${user.role === 'admin' ? styles.admin : styles.user}`}>
                  {user.role}
                </span>
              </td>
              <td>
                <select
                  className={styles.select}
                  value={user.role}
                  disabled={updating === user.id}
                  onChange={(e) => handleRoleChange(user.id, e.target.value as 'admin' | 'user')}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', opacity: 0.5 }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
