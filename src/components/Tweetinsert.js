import React, { useState } from 'react'
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from 'fbase';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "styles/tweetinsert.scss"

function Tweetinsert({userObj}) {
  const[tweet, setTweet] = useState('');
  const [attachment, setAttachment] = useState(""); //공백문자 false

  const onChange = async (e) => {
    e.preventDefault();
    const{target:{value}} = e;
    setTweet(value);
    }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (tweet !== ""){
      try {
        let attachmentUrl = "";
        if(attachment !== ""){
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, attachment, 'data_url');
        console.log('response->',response);      
        attachmentUrl =  await  getDownloadURL(ref(storage, response.ref)) //https:
        }
        const docRef = await addDoc(collection(db,"tweets"),{
          text: tweet,
          createdAt: Date.now(),
          creatorId: userObj.uid,
          attachmentUrl
        })
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.log("Error adding document: ", e);
      }
      setTweet("");
      setAttachment("");
    }
  } // input-submit에 온클릭이 아닌 폼에 온서브밋으로 해주어야함.

  const onFilechange = (e) => {
    console.log('e->',e);
    const {target:{files}} = e;
    const theFile = files[0];
    console.log('theFile->', theFile)//jpg
    
    const reader = new FileReader(); // 선택한 파일을 브라우저상에서 보이게 하기 위해
    reader.onloadend = (finishedEvent) => {
      console.log ('finshedEvent->',finishedEvent);
      const{currentTarget:{result}} = finishedEvent //data:image
      setAttachment(result); 
    }      
    reader.readAsDataURL(theFile); //file이름 dataurl로 변경

  }

  const onclearAttachment = () => {
    setAttachment('');
  }

  return (
    <form onSubmit={onSubmit} className='InsertForm'>
      <div className='InsertInput__container'>
        <input type='text' placeholder="What's on your mind" 
        value={tweet} onChange={onChange} maxLength={120} className='InsertInput__input'/>
        <input type='submit' value= '&rarr;' className='Insertinput__arrow' />
      </div>
      <label htmlFor="attach-file" className='InsertInput__label'>
        <input type='file' accept='image/*' onChange={onFilechange} id='attach-file' 
        style={{display:'none'}}/>
        <span>Add photos</span>
        <FontAwesomeIcon icon="fa-solid fa-plus" />
      </label>

      {attachment && (
        <div className='Insertform__attachment'>
          <img src={attachment} style={{backgroundImage:attachment}} alt="" />
          <div className='Insertform__clear' onClick={onclearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </div>
        </div>
      )}
    </form>
  )
}

export default Tweetinsert