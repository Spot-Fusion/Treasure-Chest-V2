import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const MessagesPage = ({title}) => {
  title("Messages");
  const [users, setUsers] = React.useState([]);
  const id = 13 || window.$user.id;

  React.useEffect(() => {
    const getUsers = async () => {
      let users = await axios.get(`http://localhost:8080/message/users/${id}`)
      setUsers(users.data);
    }
    getUsers();
    let intId = setInterval(() => { getUsers() }, 1000);
    return () => clearInterval(intId);
  }, [id]);

  return (
    <div>
      <div>
        {!!users.length && users.map((user) => (
          <Link to={{ pathname: "/chat", state: { id_recipient: user.id_sender === id ? user.id_recipient : user.id_sender, recipient_icon: user.icon, recipient_name: user.name } }} style={style.link} key={user.id_message}>
            <div>
              <div>
                <img src={user.icon} alt='' style={style.icon} />
                <div style={style.name}>{user.name}</div>
                <div style={style.date}>{user.last_sent_at.replace('T', ' ').replace('Z', '').split('.')[0]}</div>
                <div style={style.message}>{user.text}</div>
              </div>
              <hr />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const style = {
  // icon: {
  //   width: '50px',
  //   height: '50px',
  //   objectFit: 'cover',
  //   borderRadius: '50%',
  //   position: 'relative',
  //   right: '160px',
  // },

  // link: {
  //   textDecoration: 'none',
  //   color: 'black',
  // },

  // name: {
  //   position: 'relative',
  //   textAlign: 'left',
  //   left: '90px',
  //   top: '-52px',
  //   padding: 0,
  //   margin: 0
  // },

  // date: {
  //   position: 'relative',
  //   textAlign: 'right',
  //   right: '20px',
  //   top: '-75px',
  //   padding: 0,
  //   margin: 0
  // },

  // message: {
  //   position: 'relative',
  //   textAlign: 'left',
  //   left: '90px',
  //   top: '-72px',
  //   padding: 0,
  //   margin: 0
  // }
}

export default MessagesPage
