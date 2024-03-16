import { useState, useEffect, useRef } from "react";
import styles from "./App.module.css";
import Model from "./Components/Model/Model";
import Group from "./Components/Group/Group";
import Groupnotes from "./Components/Groupnotes/Groupnotes";
import Notes from "./Components/Notes/Notes";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Mobileviewpageone from "./Components/Mobileviewpageone/Mobileviewpageone";
import Mobileviewpagetwo from "./Components/Mobileviewpagetwo/Mobileviewpagetwo";

function App() {
  const [showModal, setShowModal] = useState(
    JSON.parse(localStorage.getItem("showModal")) || false
  );
  const [updatedata, setUpdateData] = useState(
    JSON.parse(localStorage.getItem("updatedata")) || []
  );
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [shownotes, setShownotes] = useState(
    JSON.parse(localStorage.getItem("showNotes")) || false
  );
  const [note, setNote] = useState("");
  const [id, setId] = useState(window.localStorage.getItem("id") || "");
  const [submitarrow, setSubmitarrow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [groupdata, setGroupData] = useState({});

  const currentDate = new Date();

  const handlechange = (e) => {
    setShowModal(true);
    e.stopPropagation();
  };

  const closeModel = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (note.trim() !== "") {
      setSubmitarrow(true);
    } else {
      setSubmitarrow(false);
    }
  }, [note]);

  const handleAddNote = (e) => {
    setNote(e.target.value);
  };
  const handleUpdateGroupData = (dataToAdd) => {
    const updatedGroups = updatedata.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          groupdata: [...element.groupdata, dataToAdd],
        };
      }
      return element;
    });
    setUpdateData(updatedGroups);

    // Clear note
    setNote("");
  };

  useEffect(()=>{
       
    if(updatedata){
      let storedId = window.localStorage.getItem("id");
      setId(storedId);
      setSelectedGroup(updatedata.find(data => data.id == storedId));
    }
  },[])

  useEffect(() => {
    const handleResize = () => {
        console.log('Window width:', window.innerWidth);
        setIsMobile(window.innerWidth < 400);
    };

    // Initial check for mobile view
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);


  useEffect(() => {
    localStorage.setItem("showModal", JSON.stringify(showModal));
    localStorage.setItem("updatedata", JSON.stringify(updatedata));
    
    if (updatedata) {
      const selectedGroupData = updatedata.find((group) => group.id == id);
      setGroupData(selectedGroupData ? selectedGroupData.groupdata : []);
    }
  }, [showModal, updatedata]);

  useEffect(() => {
    if (updatedata) {
      const selectedGroupData = updatedata.find((group) => group.id == id);
      setGroupData(selectedGroupData ? selectedGroupData.groupdata : []);
    }
    localStorage.setItem("id", id);
  },[id]);


  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("main")) {
      closeModel();
    }
  };

  console.log("mobile",isMobile)

  return (
    <>
      {isMobile ? (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Mobileviewpageone updatedata={updatedata} setSelectedGroup={setSelectedGroup}
              setShownotes={setShownotes}
              setId={setId}
              handlechange={handlechange} 
              closeModel={closeModel}
              setUpdateData={setUpdateData}
              
              setShowModal={setShowModal}
              showModal={showModal}
              handleOutsideClick={handleOutsideClick}/>}

            />
            <Route path="/mobileviewpagetwo" 
            element={<Mobileviewpagetwo shownotes={shownotes} selectedGroup={selectedGroup}
            groupdata = {groupdata} note={note} handleAddNote={handleAddNote} submitarrow={submitarrow}
            handleUpdateGroupData={handleUpdateGroupData} currentDate={currentDate}/>} />
          </Routes>
        </BrowserRouter>
      ) : (
        <div className="main" onClick={handleOutsideClick}>
          <div
            className={styles.mainpage}
            style={
              showModal
                ? { filter: "blur(5px)", pointerEvents: "none", opacity: 0.5 }
                : {}
            }
          >
            <div className={styles.mainpageleft}>
              <div className={styles.heading}>Pocket Notes</div>
              <div className={styles.groupdisplay}>
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

            <div className={styles.mainpageright}>
              {!shownotes &&(<div className={styles.layout}>
                <img className={styles.logo} src="Image/image-removebg-preview 1.png"/>
                <div className={styles.head}>Pocket Notes</div>
                <div className={styles.headdown}>Send and receive messages without keeping your phone online.<br/>
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone</div>

                <div className={styles.bottom}><img src="Image/Vector (3).png"/>end-to-end encrypted</div>

              </div>)}
              {shownotes && (
                <div className={styles.mainpagerightone}>
                  <Groupnotes
                    id={selectedGroup?.id}
                    color={selectedGroup?.groupcolor}
                    name={selectedGroup?.groupname}
                    initials={selectedGroup?.groupnameinitials}
                    data={selectedGroup?.groupdata}
                  />
                </div>
              )}
    
              {shownotes && (
                <div className={styles.mainpagerightthree}>
                  {groupdata.length > 0 &&
                    groupdata
                      .slice()
                      .reverse()
                      .map((element, id) => (
                        <Notes
                          key={id} // Ensure each component has a unique key
                          id={id}
                          note={element.note}
                          date={element.date}
                          time={element.time}
                        />
                      ))}
                </div>
              )}
              {shownotes && (
                <div className={styles.mainpagerighttwo}>
                  <div>
                    <textarea
                      className={styles.noteinput}
                      type="text"
                      placeholder="Enter your text here..........."
                      value={note}
                      onChange={handleAddNote}
                      name="note"
                    />
                  </div>
                  {submitarrow ? (
                    <img
                      className={styles.submitarrowimg}
                      src="Image/Vector (2).png"
                      onClick={() =>
                        handleUpdateGroupData({
                          note: note,
                          date: currentDate.toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }),
                          time: currentDate.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          }),
                        })
                      }
                    />
                  ) : (
                    <img
                      src="Image/Vector (1).png"
                      className={styles.submitarrowimg}
                    />
                  )}
                </div>
              )}
            </div>
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
        )}
    </>
  );
}

export default App;
