import * as React from 'react'
import { Link } from 'react-router-dom'
import { 
    IoMdContact,
    IoMdExit,
    IoMdHome,
} from "react-icons/io";
import { MdMessage } from 'react-icons/md'
import ProfileDrawer from './ProfileDrawer';

function DrawerNav({ slideMenu }) {
    return (
    <div id="slidenav" className="sidenav" style={styles}>
      <ProfileDrawer slideMenu={slideMenu}/>
        <nav>
          <div style={{listStyleType: 'none', display: 'flex', flexDirection: 'column', textAlign: 'left'}}>            
            {/* <div onClick={slideMenu} style={{left: '5px'}}>
              <IoMdHome color={'#223843'} size={20} />
              <Link to="/home">Home</Link>
            </div> */}
            {/* <div onClick={slideMenu}>
              <MdMessage color={'#223843'} size={20} />
              <Link to="/messages">Messages</Link>
            </div> */}
            <div onClick={slideMenu}>
              <IoMdContact color={'#223843'} size={20} />
              <Link to="/profile">Profile</Link>
            </div>
            {/* <div onClick={slideMenu}>
              <IoMdContact color={'#223843'} size={20} />
              <Link to="/users">Users</Link>
            </div> */}
            <div onClick={slideMenu}>
              <IoMdExit color={'#223843'} size={20} />
              <Link to="/">LogOut</Link>
            </div>
          </div>
        </nav>
        </div>
    )
}

export default DrawerNav

var styles = {  
 
    position: 'fixed',
    zIndex: '1',
    top: '0',
    left: '0',
    backgroundColor: '#F1F3F5',
    // padding: '2.5em 1.5em 0',
    height: '100%',
    width: '250px', 
    opacity: '1',
    overflowX: 'hidden',
    paddingTop: '60px',
    transition: '0.5s', 
  
}
