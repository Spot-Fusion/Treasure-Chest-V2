import React, { useState, useEffect } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const UsersPage = () => {
  const [active, setActive] = useState('Followers');
  const [users, setUsers] = useState([]);
  // const location = useLocation();
  const id = 13;

  const getFollowers = async () => {
    let followers = await axios.get(`http://localhost:8080/follow/followed_by/${id}`);
    setUsers(followers.data);
    console.log('hit 1', users);
  }

  const getFollowing = async () => {
    let following = await axios.get(`http://localhost:8080/follow/following/${id}`);
    setUsers(following.data);
    console.log('hit 2', users);
  }

  const getUsers = (name) => {
    setActive(name)
    if(name === 'Followers'){
      getFollowers();
    } else {
      getFollowing();
    }
  }

  const setStyle = (name) => active === name ? style.active : style.link;

  const followNav = (name) => (
    <Nav.Item as='li' onClick={() => getUsers(name)}>
      <Nav.Link style={setStyle(name)}>
        {name}
      </Nav.Link>
    </Nav.Item>
  )

  useEffect(() => {
    getUsers(active);
  }, []);

  return (
    <div>
      <div style={style.navBar}>
        <Nav defaultActiveKey='/profile' as='ul' justify='true'>
          {followNav('Following')}
          {followNav('Followers')}
        </Nav>
      </div>
      <div style={style.users}>
        {!!users.length && users.map((user) => (
          <div key={user.id}>
            <div>
              <img src={user.icon} alt='' style={style.icon} />
              <span>{user.name}</span>
              {active === 'Following' && <Button style={style.button} variant="link">...</Button>}
              </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const style = {

  button: {
    textDecoration: 'none',
    color: 'black',
  },

  icon: {
    width: '30px',
    height: '30px',
    marginRight: '8px',
    objectFit: 'cover',
    borderRadius: '50%',
  },

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
  },

  users: {
    position: 'relative',
    padding: '100px 0px 50px',
  }
}

export default UsersPage
