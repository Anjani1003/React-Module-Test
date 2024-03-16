import React, { useEffect } from 'react'
import styles from './Model.module.css'
import { useState } from 'react'

function Model({closeModel,setUpdateData,updatedata,setShowModal}) {

   const [groupData,setGroupData] = useState({
    id:"",
    groupname:"",
    groupnameinitials :"",
    groupcolor:"",
    groupdata:[]
})

const addToArray = () => {
    const id = updatedata.length + 1;
    setUpdateData(prevData => {
        return [...prevData, { ...groupData,id:id }];
    });
};

function extractFirstAndLastLetters(str) {
    const words = str.trim().split(/\s+/);

    if (words.length === 1) {
        
        return words[0][0]?.toUpperCase() || '';
    } else if (words.length > 1) {
       
        const firstLetter = words[0][0]?.toUpperCase() || '';
        const secondLetter = words[1][0]?.toUpperCase() || '';
        return `${firstLetter}${secondLetter}`;
    }

    return ''; 
}

const handleinputchange = (e)=>{
    const { name, value } = e.target;
        setGroupData(prevData => ({
            ...prevData,
            [name]: value,
            ["groupnameinitials"]: extractFirstAndLastLetters(value)
        }));
        
    };


const handlebtnchange = (e)=>{
    setGroupData(prevData => ({
        ...prevData,
        ["groupcolor"]: e.target.value
    }));
    
}

const handlecreatebtn = ()=>{
    
    if(groupData.groupname ==""){
        alert("Enter group name")
    }
    else if(groupData.groupcolor == ""){
        alert("Choose color")
    }

    else {
          addToArray();
          setGroupData({["groupname"]:"",["groupnameinitials"]:"",["groupcolor"]:""});
          setTimeout(()=>{
            closeModel()},
          );

}
}


  return ( <div className={styles.model}>
    
    <div className={styles.modelhead}>Create New group</div>
    <div className={styles.model2}>
        <div className={styles.modelhead}>GroupName</div>
        <input className={styles.input} placeholder='Enter group name' 
        type='text' value={groupData.groupname} onChange={handleinputchange} name='groupname'/>
    </div>
    <div className={styles.model3}>
        <div className={styles.modelhead}>Choose colour</div>
        <div className={styles.colorslct}>
            <button style={{backgroundColor:'#B38BFA'}} value={'#B38BFA'} onClick={handlebtnchange}></button>
            <button style={{backgroundColor:'#FF79F2'}} value={'#FF79F2'} onClick={handlebtnchange}></button>
            <button style={{backgroundColor:'#43E6FC'}} value={'#43E6FC'} onClick={handlebtnchange}></button>
            <button style={{backgroundColor:'#F19576'}} value={'#F19576'} onClick={handlebtnchange}></button>
            <button style={{backgroundColor:'#0047FF'}} value={'#0047FF'} onClick={handlebtnchange}></button>
            <button style={{backgroundColor:'#6691FF'}} value={'#6691FF'} onClick={handlebtnchange}></button>
        </div>
        
    </div>

    <button className={styles.createbtn} onClick={handlecreatebtn} >Create</button>
    </div>
    
  )
}

export default  Model ;
