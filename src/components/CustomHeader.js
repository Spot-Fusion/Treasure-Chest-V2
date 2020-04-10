import * as React from 'react'
import { IoIosMenu } from "react-icons/io";
import { Navbar } from 'react-bootstrap';

function CustomHeader({slideMenu}) {
  
    return (
        <header>
            <Navbar style={{backgroundColor: '#223843', width: '100%', height: '30px', top: '30px' }}>               
                <IoIosMenu style={{left: '30px', color: '#F1F3F5'}} size={40} onClick={slideMenu} />   
                <Navbar.Brand style={{alignSelf: 'center', color: '#F1F3F5'}} >Header</Navbar.Brand>            
            </Navbar>
        </header>
    )
}

export default CustomHeader;
