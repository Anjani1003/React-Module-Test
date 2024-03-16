import React from 'react';
import Groupnotes from '../Groupnotes/Groupnotes';
import styles from './Mobileviewpagetwo.module.css';
import Notes from '../Notes/Notes';

function Mobileviewpagetwo({ shownotes, selectedGroup,groupdata,note,handleAddNote
    ,submitarrow,handleUpdateGroupData,currentDate })
    
    {
        console.log(groupdata)
  return (
    <div className={styles.main}>
      <div className={styles.mainpageright}>
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
              groupdata.slice().reverse().map((element, id) => (
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
                    date: currentDate.toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }),
                    time: currentDate.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
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
  );
}

export default Mobileviewpagetwo;
