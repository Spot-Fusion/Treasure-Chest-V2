import * as React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Redirect
} from "react-router-dom";
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'
import MessagesPage from './pages/MessagesPage'
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage'
import CreateListingPage from './pages/CreateListingPage'
import ChatPage from './pages/ChatPage'
import ShowListingPage from './pages/ShowListingPage'
import DrawerNav from './components/DrawerNav'
import CustomHeader from './components/CustomHeader'
import BottomTabNav from './components/BottomTabNav';

function App() {
  const [headerVisible, setHeaderVisible] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [footerVisible, setFooterVisible] = React.useState(false);
  const [location, setLocation] = React.useState('');

  const setMenu = () => {
    setHeaderVisible(!headerVisible);
    setRedirect(!redirect);
    setFooterVisible(!footerVisible);
  };

  const slideMenu = () => setMenuVisible(!menuVisible);


  const title = (e) => setLocation(e);

  // console.log("hello", document.getElementById('slidenav').style);

  return (
      // <div>
    <Router>
      <div className="App" styles={{height: '100%'}}>        
       {headerVisible ? <CustomHeader slideMenu={slideMenu} location={location}/> : null}
       <main styles={{marginTop: '50px'}}>
       {/* <DrawerNav slideMenu={slideMenu} /> */}
       {menuVisible ? <DrawerNav slideMenu={slideMenu} /> : null }   
       {redirect ? <Redirect to={{pathname: '/home'}} /> : null }
        <Switch>
          <Route exact path="/" render={() => (<LoginPage setMenu={setMenu}/>)} />
          <Route exact path="/messages" render={() => (<MessagesPage title={title} />)} />
          <Route exact path="/users" render={() => (<UsersPage title={title}/>)} />          
          <Route exact path="/home" render={() => (<HomePage title={title}/>)} /> 
          <Route exact path="/profile" render={() => (<ProfilePage title={title}/>)} /> 
          <Route exact path="/createlisting" render={() => (<CreateListingPage title={title}/>)} />
          <Route exact path="/chat" render={() => (<ChatPage title={title}/>)} />
          <Route exact path="/showlisting" render={() => (<ShowListingPage title={title}/>)} />
        </Switch>
       </main>
       {footerVisible ? <BottomTabNav /> : null}
      </div>
    </Router>
    // </div>
  )
}

export default App;
