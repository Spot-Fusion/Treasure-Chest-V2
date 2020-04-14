import React, { useState } from 'react'
import { Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'

const UsersPage = () => {
  const [active, setActive] = useState('Followers');
  const location = useLocation();

  const setStyle = (name) => active === name ? style.active : style.link;

  const followNav = (name) => (
    <Nav.Item as='li' onClick={() => setActive(name)}>
      <Nav.Link style={setStyle(name)}>
        {name}
      </Nav.Link>
    </Nav.Item>
  )

  return (
    <div>
      <div style={style.navBar}>
        <Nav defaultActiveKey='/profile' as='ul' justify='true'>
          {followNav('Following')}
          {followNav('Followers')}
        </Nav>
      </div>
    </div>
  )
}

const style = {
  navBar: {
    position: 'fixed',
    width: '100%',
    top: '40px',
    zIndex: '1000'
  },

  link: {
    textDecoration: 'none',
    color: 'black',
    fontSize: '120%',
    backgroundColor: 'white',
    position: 'relative',
    float: 'top',
    borderBottom: '2px solid #D8D8D8'
  },

  active: {
    textDecoration: 'none',
    color: 'black',
    fontSize: '120%',
    backgroundColor: 'white',
    position: 'relative',
    float: 'top',
    borderBottom: '2px solid #83AE9A'
  }
}

export default UsersPage
