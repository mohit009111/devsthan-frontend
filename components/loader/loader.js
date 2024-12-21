import React from 'react'
import styles from './loader.module.css'
const loader = () => {
  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <span className={styles['loader']}></span>
    </div>
  )
}

export default loader
