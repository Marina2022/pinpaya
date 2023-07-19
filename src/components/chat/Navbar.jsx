import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import {useStateContext} from "../../contexts/ContextProvider";


const Navbar = () => {
    const {currentUser} = useContext(AuthContext)
    const {user} = useStateContext();
    return (
        <div className='navbar'>
            <span className="logo">{user.name}</span>
            <div className="user">
                {/*<img src={currentUser.photoURL} alt="" />*/}
                <span>{currentUser.displayName}</span>
            </div>
        </div>
    )
}

export default Navbar