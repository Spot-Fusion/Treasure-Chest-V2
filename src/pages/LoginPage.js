import React from 'react';
import { GiChest } from "react-icons/gi";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class SignUpLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div style={{paddingBottom: '100%', paddingTop: 1, backgroundColor: '#E7E7EA'}}>
        <div style={{backgroundColor: '#E7E7EA', marginTop: '35%'}}>
          <GiChest color={'#223843'} size={130} ></GiChest>
          <p style={{fontSize: 24, color:'#223843', fontWeight: 'bold'}}>Treasure Chest</p>
          <div style={{marginTop: '30%'}}>
            <Button variant={'success'} >Sign In with Google</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpLogin;
