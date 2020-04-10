import * as React from 'react'
import { Link } from 'react-router-dom'
import { 
    IoMdContact,
    IoMdExit,
    IoMdHome,
} from "react-icons/io";
import { MdMessage } from 'react-icons/md'
// import { slide as Menu } from 'react-burger-menu'
import { Navbar } from 'react-bootstrap';

function DrawerNav({ slideMenu }) {
    return (
        <div >
        <Navbar styles={styles}>
          <ul>            
            <li onClick={slideMenu}>
              <IoMdHome color={'#223843'} size={20} />
              <Link to="/home">Home</Link>
            </li>
            <li onClick={slideMenu}>
              <MdMessage color={'#223843'} size={20} />
              <Link to="/messages">Messages</Link>
            </li>
            <li onClick={slideMenu}>
              <IoMdContact color={'#223843'} size={20} />
              <Link to="/profile">Profile</Link>
            </li>
            <li onClick={slideMenu}>
              <IoMdContact color={'#223843'} size={20} />
              <Link to="/users">Users</Link>
            </li>
            <li onClick={slideMenu}>
              <IoMdExit color={'#223843'} size={20} />
              <Link to="/">LogOut</Link>
            </li>
          </ul>
        </Navbar>
        </div>
    )
}

export default DrawerNav

var styles = {  
    position: 'fixed',
    zIndex: '200',
    top: '56px',
    left: '0',
    backgroundColor: '#F1F3F5',
    padding: '2.5em 1.5em 0',
    height: '100%',
    width: '75%', 
    opacity: '100%'
 
}
