import React from 'react';
import axios from 'axios';
import { Nav, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useLocation, Link, NavLink } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';

const ChatPage = ({ title }) => {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const location = useLocation();
  const { id, icon, name } = window.$user;
  // const id = 13, name = 'Christopher LeBoeuf', icon = 'https://lh3.googleusercontent.com/a-/AOh14GhytysnVGtyIsffBFPDNYjIBvz-hL6lrUN1rB_S=s96-c'
  const { id_recipient, recipient_icon, recipient_name } = location.state;

  const nameShortener = (name) => {
    return name.split(' ')[0];
  }

  const getMessages = async () => {
    let messages = await axios.get(`http://localhost:8080/message/${id}/${id_recipient}`);
    setMessages(messages.data);
  }

  const sendMessage = async () => {
    await axios.post(`http://localhost:8080/message/${id}/${id_recipient}`, { text: input });
    await getMessages();
    setInput('');
  }

  const profiles = () => (
    <div style={style.link}>
      <Nav defaultActiveKey='/profile' as='ul' justify='true'>
        <Nav.Item as='li'>
          <Nav.Link style={style.link} activeStyle={style.link}  as={NavLink} to={{ pathname: '/profile', state: id_recipient }}>
            <img src={recipient_icon} alt='' style={style.icon} />
            {nameShortener(recipient_name)}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as='li'>
          <Nav.Link style={style.link} activeStyle={style.link} as={NavLink} to={{ pathname: '/profile', state: id }}>
            <img src={icon} alt='' style={style.icon} />
            {nameShortener(name)}
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )

  React.useEffect(() => {
    getMessages();
    // let intId = setInterval(() => { getMessages() }, 1000);
    // return () => clearInterval(intId);
  }, []);

  return (
    <div style={style.messages}>
      {profiles()}
      <div>
        {!!messages.length && messages.map((message) => (
          <div key={message.id_message}>
            <div>{message.text}</div>
          </div>
        ))}
      </div>
      <div style={style.messageArea}>
        <InputGroup style={style.inputGroup}>
          <FormControl style={style.formControl} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null} />
          <Button style={style.sendButton} onClick={() => sendMessage()}>Send</Button>
        </InputGroup>
      </div>
    </div>
  )
}

const style = {
  icon: {
    width: '30px',
    height: '30px',
    marginRight: '8px',
    objectFit: 'cover',
    borderRadius: '50%',
  },

  link: {
    textDecoration: 'none',
    color: 'black',
    backgroundColor: 'white'
  },

  messages: {
    backgroundColor: '#F1F3F5'
  },

  messageArea: {
    backgroundColor: '#D8D8D8',
    padding: '3px 8px 3px 8px',
  },

  sendButton: {
    backgroundColor: '#555555',
    marginLeft: '8px',
    fontSize: '12px',
  },

  formControl: {
    margin: 'auto',
    height: '95%',
    borderRadius: '4px'
  },

  you: {

  },

  messagedUser: {

  }
}

export default ChatPage
