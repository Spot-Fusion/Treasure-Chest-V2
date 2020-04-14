import * as React from 'react';
import axios from 'axios';
import TextClamp from 'react-string-clamp';
import { Link } from 'react-router-dom'

const MessagesPage = ({ title }) => {
  title("Messages");
  const [users, setUsers] = React.useState([]);
  const id = 13 || window.$user.id;

  const dConvert = (date) => {
    const newDate = new Date();
    date = date.replace('T', ' ').replace('Z', '').split('.')[0].split(' ')[0].split('-');
    date[1] = newDate.getDate();
    date = [...date.filter(e => e !== date[0]), date[0]].join('/');
    return date
  }

  const tConvert = (time) => {
    time = time.replace('T', ' ').replace('Z', '').split('.')[0].split(' ')[1];
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      time = time.slice(1);
      time[0] = time[0] >= 10 ? time[0] -= 10 : time[0] += 2;
      time[5] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = +time[0] % 12 || 12;
    }
    time.splice(-3, 1);
    return time
  }

  React.useEffect(() => {
    const getUsers = async () => {
      let users = await axios.get(`http://localhost:8080/message/users/${id}`)
      setUsers(users.data);
    }
    getUsers();
    // let intId = setInterval(() => { getUsers() }, 1000);
    // return () => clearInterval(intId);
  }, [id]);

  return (
    <div>
      <div style={style.users}>
        {!!users.length && users.map((user) => {
          let date = dConvert(user.last_sent_at)
          const time = tConvert(user.last_sent_at);
          return (
            <div key={user.id_message}>
              <Link to={{ pathname: "/chat", state: { id_recipient: user.id_sender === id ? user.id_recipient : user.id_sender, recipient_icon: user.icon, recipient_name: user.name } }} style={style.link}>
                <div>
                  <div>
                    <img src={user.icon} alt='' style={style.icon} />
                    <div>
                      <div style={style.name}>{user.name}</div>
                      <div style={style.date}>{date} {time}</div>
                      <br />
                      <TextClamp
                        text={user.text}
                        lines={1}
                        styles={style.message}
                      />
                    </div>
                  </div>
                </div>
                <br />
              </Link>
              <br />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const style = {

  users: {
    position: 'relative',
    padding: '50px 0px 50px',
    backgroundColor: '#F1F3F5',
  },

  link: {
    textDecoration: 'none',
    color: 'black',
  },

  icon: {
    width: '45px',
    height: '45px',
    objectFit: 'cover',
    borderRadius: '50%',
    position: 'relative',
    float: 'left',
    top: '3px',
    left: '16px'
  },

  name: {
    position: 'relative',
    textAlign: 'left',
    fontWeight: 'bold',
    float: 'left',
    left: '30px',
  },

  message: {
    position: 'relative',
    textAlign: 'left',
    left: '30px',
    top: '5px',
    width: '360px',
  },

  date: {
    position: 'relative',
    textAlign: 'left',
    float: 'right',
    right: '20px'
  },
}

export default MessagesPage
