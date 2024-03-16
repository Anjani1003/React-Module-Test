import React from 'react'
import styles from './Mobileviewpageone.module.css'
import Group from '../Group/Group'
import Model from '../Model/Model'
import { useNavigate } from 'react-router-dom'


function Mobileviewpageone({updatedata,setSelectedGroup,setShownotes,setId,handlechange,
closeModel,setShowModal,setUpdateData,showModal,handleOutsideClick}) {

    const navigate = useNavigate()
  return (
  <div className="main" onClick={handleOutsideClick}>
      <div className={styles.main} 
            style={
              showModal
                ? { filter: "blur(5px)", pointerEvents: "none", opacity: 0.5 }
                : {}
            }>
       <div className={styles.heading}>Pocket Notes</div>
       <div className={styles.groupdisplay} onClick={()=>{navigate("./mobileviewpagetwo")}}>
                {updatedata.map((element) => (
                  <Group
                    id={element.id}
                    color={element.groupcolor}
                    name={element.groupname}
                    initials={element.groupnameinitials}
                    updatedata={updatedata}
                    setSelectedGroup={setSelectedGroup}
                    setShownotes={setShownotes}
                    setId={setId}
                  />
                ))}
        </div>
    
              <button className={styles.addbtn} onClick={handlechange}>
                +
              </button>
        
              
    </div>
    <div className={styles.modal}>
            {showModal && (
              <Model
                closeModel={closeModel}
                setUpdateData={setUpdateData}
                updatedata={updatedata}
                setShowModal={setShowModal}
              />
            )}
          </div>
  </div>
    

  )
}

export default Mobileviewpageone