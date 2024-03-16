import React from 'react'
import styles from './Notes.module.css'

function Notes(props) {
  return (
    <div className={styles.notes}>
        <div className={styles.note}>{props.note}</div>
        <div className={styles.datetime}>
            <div>{props.date}</div>
            <div>• {props.time}</div>
        </div>

    </div>
  )
}

export default Notes