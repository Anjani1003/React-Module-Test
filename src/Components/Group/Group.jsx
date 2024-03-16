import React ,{useState}from 'react'
import styles from './Group.module.css'



function Group(props) {

    const[bgcolor,setBgcolor] = useState(false)
   
    const handleGroupSelect = (selectedId) => {
        const selectedGroupData = props.updatedata.find((group) => group.id === selectedId);
        props.setSelectedGroup(selectedGroupData);
        props.setShownotes(true)
        window.localStorage.setItem("showNotes", true);
        props.setId(props.id)
        
      };
      const handleMouseOver = () => {
        setBgcolor(true);
    };

    const handleMouseOut = () => {
        setBgcolor(false);
    };
  return (
    <div className={styles.group} onClick={()=>{handleGroupSelect(props.id)}} onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}  style={{ backgroundColor: bgcolor ? '#2F2F2F2B' : 'initial' }}
    >
        <div className={styles.groupleft} style={{backgroundColor:props.color}}>{props.initials}</div>
        <div className={styles.groupright}>{props.name}</div>
    </div>
  )
}

export default Group