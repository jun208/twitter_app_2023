import React, { useEffect, useState } from 'react'
import { doc, deleteDoc,  updateDoc } from "firebase/firestore";
import { db, storage } from 'fbase';
import { ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'styles/tweet.scss'


function Tweet(props) {
  console.log("props->", props);
  const  {tweetObj:{text, id, createdAt, creatorId, attachmentUrl}, isOwner} = props;
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(text);
  const [nowDate, setNowDate] = useState(createdAt);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?")
      if(ok){
        const data = await deleteDoc(doc(db, "tweets", `/${id}`)); //문서 아이디 주소에 '/'들어가기 때문에 '/'넣어줌 (폴더 안 문서 삭제하는 것이기 때문)
        if(attachmentUrl !== ""){
          const desertRef = ref(storage, attachmentUrl );
          await deleteObject(desertRef);

        }
      }
  }
  const toggleEditing = () => setEditing((prev) => !prev); //토글기능
  
  const onChange = (e) => {
    const {target:{value}} = e
    setNewTweet(value);
   
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const newTweetRef = doc(db, "tweets", `/${id}`);

    await updateDoc(newTweetRef, {
    text: newTweet,
    createdAt: Date.now(),
  });
    setEditing(false);

  }

  useEffect(() => {
    let timeStamp = createdAt;
    const now = new Date(timeStamp);
    setNowDate(now.toDateString()); //.toUTCStiring() .toDateString()

  },[])

  return (


    <div className='tweet'>
       {editing ? (
        <>
          <form onSubmit={onSubmit} className='container tweetEdit'>
            <input type='text' onChange={onChange} value={newTweet} required className='formInput'/>
            <input type='submit' value='Update Tweet' className='formBtn'/>
          </form>
          <button onClick={toggleEditing} className='formBtn cancelBtn'>Cancel</button>
        </>

      ) : ( 
      <>
      <h4>{text}</h4>
      {attachmentUrl && (
        <img src={attachmentUrl} width='50' height='50' alt='' />
      )}
      <span>{nowDate}</span>
      
      {isOwner && (
        <div className='tweet__actions'>
          <span onClick={onDeleteClick}>
            <FontAwesomeIcon icon="fa-solid fa-trash" />
          </span>
          <span onClick={toggleEditing}>
            <FontAwesomeIcon icon="fa-solid fa-pencil" />
          </span>
        </div>
      )}
      </>
    )} 

    </div>
  )
}

// function Tweet({tweetObj}) {
//   console.log("tweetObj->", tweetObj)
//   return (
//     <div >
//       <h4>{tweetObj.text}</h4>
//     </div>
//   )
// }


export default Tweet