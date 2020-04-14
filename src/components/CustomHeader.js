import * as React from 'react'
import { IoIosMenu } from "react-icons/io";
import { Navbar } from 'react-bootstrap';

function CustomHeader({slideMenu, location}) {
  let title = location/*.substr(1,1).toUpperCase() + location.substr(2)*/;
    return (
        <header>
            <Navbar style={{position: 'fixed', backgroundColor: '#223843', width: '100%', height: '40px', top: '0px', zIndex: 1000 }}>               
                <IoIosMenu style={{left: '30px', color: '#F1F3F5'}} size={40} onClick={slideMenu} />   
                <Navbar.Brand style={{flex: '1', alignSelf: 'center', color: '#F1F3F5'}} >{title}</Navbar.Brand>            
            </Navbar>
        </header>
    )
}

export default CustomHeader;
