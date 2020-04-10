import * as React from 'react'
import { GiChest } from "react-icons/gi";
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUpLogin = ({ setMenu }) => {

  const addUser = async (name, email, icon) => {
    let user = await axios.post(`http://localhost:8080/user/`, { name, email, icon, bio: '' });
    return user.data;
  }

  const getUser = async (email) => {
    let user = await axios.get(`http://localhost:8080/user/${email}`);
    return user.data;
  }

  const login = (response) => {
    if (response.accessToken) {
      console.log(response);
      const { name, email, imageUrl } = response.profileObj;
      addUser(name, email, imageUrl)
        .then((user) => {
          window.$user = user;
          setMenu();
        })
        .catch(() => {
          getUser(email).then((user) => {
            window.$user = user;
            setMenu();
          });
        });
    }
  }

  const handleLoginFailure = (response) => {
    console.log('Failed to log in')
  }

  return (
    <div style={{ paddingBottom: '60%', paddingTop: 1, backgroundColor: '#E7E7EA' }}>
      <div style={{ backgroundColor: '#E7E7EA', marginTop: '35%' }}>
        <GiChest color={'#223843'} size={130} ></GiChest>
        <p style={{ fontSize: 24, color: '#223843', fontWeight: 'bold' }}>Treasure Chest</p>
        <div style={{ marginTop: '30%' }}>
          <div>
            <GoogleLogin
              clientId={'429212164620-t05aq3o7i59dko6cnsd9d2obp0s8qdrn.apps.googleusercontent.com'}
              render={renderProps => (
                <Button variant={'success'} onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign In with Google</Button>
              )}
              buttonText='Login'
              // isSignedIn={true}
              onSuccess={login}
              onFailure={handleLoginFailure}
              cookiePolicy={'single_host_origin'}
              responseType='code,token'
            />
          </div>
        </div>
      </div>
    </div>
  );

}

export default SignUpLogin;
