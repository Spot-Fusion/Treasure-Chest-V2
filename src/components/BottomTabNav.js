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
          <Navbar style={{ position: 'fixed', backgroundColor: '#223843', width: '101%', height: '45px', bottom: '0', zIndex: '1000',}}>
              <div style={{display: 'flex', 
              flexDirection: 'row',
              }}>
              <div style={{marginRight: 105, marginLeft: 40, marginBottom: 10}}>             
                <Link to="/home"><IoMdHome color={'#F1F3F5'} size={30} style={{marginTop: 15, alignSelf: 'left'}} /></Link>
              </div>
              <div style={{marginRight: 105, marginBottom: 10}}>             
                <Link to="/createlisting"><IoMdAddCircleOutline color={'#F1F3F5'} size={30} style={{marginTop: 15}} /></Link>
              </div>
              <div style={{marginBottom: 10}}>             
                <Link to="/messages"><MdMessage color={'#F1F3F5'} size={30} style={{marginTop: 15}} /></Link>
              </div>
              </div>
          </Navbar>
        </div>
    )
}

export default BottomTabNav;
