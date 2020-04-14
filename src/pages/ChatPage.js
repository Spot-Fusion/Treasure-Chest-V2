import React from 'react';
import axios from 'axios';
import { Nav, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useLocation, NavLink } from 'react-router-dom'


const ChatPage = ({ title }) => {
  title("Chat");
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const location = useLocation();
  const { id, icon, name } = window.$user;
  // const id = 13, name = 'Christopher LeBoeuf', icon = 'https://lh3.googleusercontent.com/a-/AOh14GhytysnVGtyIsffBFPDNYjIBvz-hL6lrUN1rB_S=s96-c'
  const { id_recipient, recipient_icon, recipient_name } = location.state

  const bottomScroll = async () => {
    return window.scrollTo(0, document.body.scrollHeight);
  }

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
    bottomScroll()
    setInput('');
  }

  const profiles = () => (
    <div>
      <div style={style.navBar}>
        <Nav defaultActiveKey='/profile' as='ul' justify='true'>
          <Nav.Item as='li'>
            <Nav.Link style={style.link} activeStyle={style.link} as={NavLink} to={{ pathname: '/profile', state: id_recipient }}>
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
    </div>
  )

  React.useEffect(() => {
    getMessages();
    let intId = setInterval(() => { getMessages() }, 2000);
    return () => clearInterval(intId);
  }, []);

  return (
    <div style={style.messages}>
        {profiles()}
        <div>
          {!!messages.length && messages.map((message) => (
            <div key={message.id_message}>
              <div style={message.id_sender === id ? style.you : style.recipient}>{message.text}</div>
            </div>
          ))}
        </div>
        <div style={style.chatArea}>
          <InputGroup style={style.inputGroup}>
            <FormControl style={style.formControl} value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null} />
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

  navBar: {
    position: 'fixed',
    width: '100%',
    top: '40px',
    zIndex: '1000'
  },

  link: {
    textDecoration: 'none',
    color: 'black',
    backgroundColor: 'white',
    position: 'relative',
    float: 'top'
  },

  messages: {
    backgroundColor: '#F1F3F5',
    position: 'relative',
    overflow: 'hidden',
    padding: '100px 0px 90px',
  },

  chatArea: {
    backgroundColor: '#D8D8D8',
    padding: '3px 8px 3px 8px',
    position: 'fixed',
    width: '100%',
    bottom: '40px',
    zIndex: '1000'
  },

  sendButton: {
    backgroundColor: '#555555',
    marginLeft: '8px',
    fontSize: '12px',
  },

  formControl: {
    margin: 'auto',
    height: '95%',
    borderRadius: '4px',
  },

  you: {
    width: '200px',
    margin: '5px 10px 5px',
    borderRadius: '10px 10px 0px 10px',
    background: '#3EC184',
    padding: '10px',
    textAlign: 'left',
    color: 'white',
    fontFamily: 'arial',
    position: 'relative',
    float: 'right',
  },

  recipient: {
    width: '200px',
    margin: '5px 10px 5px',
    borderRadius: '10px 10px 10px 0px',
    backgroundColor: '#DCDDDF',
    padding: '10px',
    textAlign: 'left',
    color: 'black',
    fontFamily: 'arial',
    position: 'relative',
    float: 'left'
  }
}

export default ChatPage
