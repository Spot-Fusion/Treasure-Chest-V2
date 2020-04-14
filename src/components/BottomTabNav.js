import * as React from 'react'
import { Link } from 'react-router-dom'
import { 
    IoMdAddCircleOutline,
    IoMdAddCircle,
    IoMdHome,
} from "react-icons/io";
import { MdMessage } from 'react-icons/md'
import { Navbar } from 'react-bootstrap';

function BottomTabNav() {
    return (
        <div>
            <Navbar style={{ position: 'fixed', backgroundColor: '#223843', width: '100%', height: '40px', bottom: '0'}}>
            <ul style={{display: 'flex', 
            flexDirection: 'row', 
            flex: '1', 
            listStyleType: 'none', 
            justifyContent: 'space-around', 
            }}>
            <li>              
              <Link to="/home"><IoMdHome color={'#F1F3F5'} size={30} style={{marginTop: 10}} /></Link>
            </li>
            <li>              
              <Link to="/createlisting"><IoMdAddCircleOutline color={'#F1F3F5'} size={30} style={{marginTop: 10}} /></Link>
            </li>
            <li>              
              <Link to="/messages"><MdMessage color={'#F1F3F5'} size={30} style={{marginTop: 10}} /></Link>
            </li>
            </ul>
            </Navbar>
        </div>
    )
}

export default BottomTabNav;
