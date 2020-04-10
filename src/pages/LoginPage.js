import * as React from 'react'
import { GiChest } from "react-icons/gi";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const CLIENT_ID = '429212164620-t05aq3o7i59dko6cnsd9d2obp0s8qdrn.apps.googleusercontent.com';

const SignUpLogin = ({ setMenu }) => {
  // const [isLoggedIn, setLoggedIn] = React.useState(false);
  // const [accessToken, setAccessToken] = React.useState('');

  const login = (response) => {
    console.log(response);
    if (response.accessToken) {
      // setLoggedIn(true);
      // setAccessToken(response.accessToken);
      setMenu()
    }
  }

  // const logout = (response) => {
  //   setLoggedIn(false);
  //   setAccessToken('');
  // }

  const handleLoginFailure = (response) => {
    alert('Failed to log in')
  }

  const handleLogoutFailure = (response) => {
    alert('Failed to log out')
  }

  return (
    <div style={{ paddingBottom: '60%', paddingTop: 1, backgroundColor: '#E7E7EA' }}>
      <div style={{ backgroundColor: '#E7E7EA', marginTop: '35%' }}>
        <GiChest color={'#223843'} size={130} ></GiChest>
        <p style={{ fontSize: 24, color: '#223843', fontWeight: 'bold' }}>Treasure Chest</p>
        <div style={{ marginTop: '30%' }}>
          <div>
            {/* {isLoggedIn ?
              <GoogleLogout
                clientId={CLIENT_ID}
                buttonText='Logout'
                onLogoutSuccess={logout}
                onFailure={handleLogoutFailure}
              >
              </GoogleLogout> : */}
               <GoogleLogin
                clientId={CLIENT_ID}
                render={renderProps => (
                  <Button variant={'success'} onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign In with Google</Button>
                )}
                buttonText='Login'
                isSignedIn={true}
                onSuccess={login}
                onFailure={handleLoginFailure}
                cookiePolicy={'single_host_origin'}
                responseType='code,token'
              />
            {/* } */}
            {/* {accessToken ? <h5>Your Access Token: <br /><br /> {accessToken}</h5> : null} */}
          </div>
        </div>
      </div>
    </div>
  );

}

export default SignUpLogin;
