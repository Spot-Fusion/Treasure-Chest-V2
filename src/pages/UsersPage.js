import React, { useState, useEffect } from 'react';
import { Nav, Button, Modal } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const UsersPage = ({ title }) => {
  const location = useLocation();
  title('Users');
  const [active, setActive] = useState(location.state.display); // Add clicked state to profile page
  // const [active, setActive] = useState('Following');
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('username');
  const [clickedId, setId] = useState(0);
  const id = !location.state ? window.$user.id : location.state.id;

  const getFollowers = async () => {
    const followers = await axios.get(`http://localhost:8080/follow/followed_by/${id}`);
    setUsers(followers.data);
  }

  const getFollowing = async () => {
    const following = await axios.get(`http://localhost:8080/follow/following/${id}`);
    setUsers(following.data);
  }

  const unFollow = async () => {
    await axios.delete(`http://localhost:8080/follow/${id}/${clickedId}`);
    await getFollowing();
    setShow(false);
  }

  const getUsers = (name) => {
    setActive(name);
    setId(0);
    if (name === 'Followers') {
      getFollowers();
    } else {
      getFollowing();
    }
  }

  const showUserModel = (name, userId) => {
    setUsername(name);
    setId(userId);
    setShow(true);
  }

  const setStyle = (name) => active === name ? style.active : style.link;

  const followNav = (name) => (
    <Nav.Item as='li' onClick={() => getUsers(name)}>
      <Nav.Link style={setStyle(name)}>
        {name}
      </Nav.Link>
    </Nav.Item>
  )

  const modal = (name) => {
    return (
      <div>
        <Modal
          className="modal"
          show={show}
          style={style.modal}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Body>
            <div style={style.unfollow} onClick={() => unFollow()}>Unfollow @{name}?</div>
            <div onClick={() => setShow(false)}>Cancel</div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }

  useEffect(() => {
    getUsers(active);
  }, []);
 
  console.log(users);
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
          <div style={style.user} key={user.id}>
            <Link to={{ pathname: "/profile", state:  user.id  }} style={style.link}>
              <div>
                <img src={user.icon} alt='' style={style.icon} />
                <div style={style.name}>{user.name}</div>
              </div>
            </Link>
            {active === 'Following' && window.$user.id === id && <Button style={style.button} onClick={() => showUserModel(user.name, user.id)} variant="link">...</Button>}
            <br />
          </div>
        ))}
        {modal(username)}
      </div>
    </div>
  )
}

const style = {

  modal: {
    position: 'fixed',
    marginTop: '75%',
  },

  unfollow: {
    color: '#EA4335'
  },

  users: {
    position: 'relative',
    padding: '100px 0px 50px',
  },

  user: {
    padding: '15px 0px 15px',
  },

  icon: {
    width: '40px',
    height: '40px',
    marginRight: '8px',
    objectFit: 'cover',
    borderRadius: '50%',
    position: 'relative',
    float: 'left',
    left: '20px'
  },

  name: {
    position: 'relative',
    textAlign: 'left',
    float: 'left',
    left: '30px',
    top: '5px'
  },

  button: {
    textDecoration: 'none',
    color: 'black',
    position: 'relative',
    float: 'right'
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
    fontSize: '110%',
    backgroundColor: 'white',
    position: 'relative',
    borderBottom: '2px solid #D8D8D8'
  },

  active: {
    textDecoration: 'none',
    color: 'black',
    fontSize: '110%',
    backgroundColor: 'white',
    position: 'relative',
    borderBottom: '2px solid #83AE9A'
  },

}

export default UsersPage
