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
            <Navbar style={{backgroundColor: '#223843', width: '100%', height: '30px', bottom: '0'}}>
            <ul style={{display: 'flex', flexDirection: 'row', alignContent: 'space-around', listStyleType: 'none'}}>
            <li>
              <IoMdHome color={'#F1F3F5'} size={20} />
              <Link to="/home">Home</Link>
            </li>
            <li>
              <IoMdAddCircle color={'#F1F3F5'} size={20} />
              <Link to="/createlisting">Create Listing</Link>
            </li>
            <li>
              <MdMessage color={'#F1F3F5'} size={20} />
              <Link to="/messages">Messages</Link>
            </li>
            </ul>
            </Navbar>
        </div>
    )
}

export default BottomTabNav;
