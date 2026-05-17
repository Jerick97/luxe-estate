import React from 'react'
import styles from '../admin.module.css'

type Property = {
  id: string
  title: string
  location: string
  price: number
  status: string
  type: string
}

export default function PropertiesList({ properties }: { properties: Property[] }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price)
  }

  const getStatusClass = (status: string) => {
    if (status.toLowerCase() === 'for sale' || status.toLowerCase() === 'sale') return 'forSale'
    if (status.toLowerCase() === 'for rent' || status.toLowerCase() === 'rent') return 'forRent'
    return ''
  }

  return (
    <div className={styles.sectionContent}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong>{property.title}</strong>
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>{property.location}</span>
                </div>
              </td>
              <td>{property.type}</td>
              <td><strong>{formatPrice(property.price)}</strong></td>
              <td>
                <span className={`${styles.badge} ${styles[getStatusClass(property.status)]}`}>
                  {property.status}
                </span>
              </td>
            </tr>
          ))}
          {properties.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', opacity: 0.5 }}>
                No active properties found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
