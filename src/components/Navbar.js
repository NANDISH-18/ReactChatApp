import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
    const {currentUser} = useContext(AuthContext);


    return(
        
        <div className='navbar'>
            <span className='logo'>What's Chat</span>
            <div className="user">
            {currentUser ? (
          <>
            <img src={currentUser.photoURL} alt="myimg" />
            <span>{currentUser.displayName}</span>
            <button onClick={() => signOut(auth)}>logout</button>
          </>
        ) : (
          <span>Not logged in</span>
        )}
            </div>
        </div>
    )

}

export default Navbar;

