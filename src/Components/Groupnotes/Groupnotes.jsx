import React from 'react'
import styles from './Groupnotes.module.css'

function Groupnotes(props) {
  return (
   
        <div className={styles.groupnotes}> 
            <div className={styles.groupnotesleft} style={{backgroundColor:props.color}}>{props.initials}</div>
            <div className={styles.groupnotesright}>{props.name}</div>
        </div>
       

  )
}

export default Groupnotes