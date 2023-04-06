import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navigation({userObj}) {

  
  console.log('userObj->',userObj);
  return (
    <nav>
      <ul style={{display:"flex", justifyContent:"center", marginTop:50}}>
        <li>
          <Link to={'/'} style={{marginRight:10}}>
            <FontAwesomeIcon icon="fa-brands fa-twitter" size='2x' color={"#04aaff"} />
          </Link>
        </li>
        <li>
          <Link to={'/profile'} style={{display:"flex", flexDirection:"column",
          alignItems:"center", marginLeft:10, fontSize:12}}>
            <FontAwesomeIcon icon="fa-solid fa-user" color={"#04aaff"} size='2x' />
            <span style={{marginTop:10}}>
              {userObj.displayName ? `${userObj.displayName}의 My profile` : "Profile"} 
              
            </span>
            <img src='' alt='' />

        </Link></li> 
      </ul>
    </nav>
  )
}

export default Navigation