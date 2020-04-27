import * as React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  IoMdContact,
  IoMdExit,
} from "react-icons/io";
import ProfileDrawer from './ProfileDrawer';

function DrawerNav(props) {
  const { slideMenu } = props;
  return (
    <div id="slidenav" className="sidenav" style={styles} onClick={slideMenu}>
      <ProfileDrawer slideMenu={slideMenu} />
      <nav onClick={slideMenu}>
        <div style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', textAlign: 'left', zIndex: '1000', position: 'fixed' }}>
          <div onClick={slideMenu} style={{ marginLeft: 20, marginTop: 25 }}>
            <IoMdContact color={'#223843'} size={30} />
            <Link to={{ pathname: "/profile", state:  window.$user.id  }} style={{ fontSize: 18, marginLeft: 10 }}>Profile</Link>
          </div>
          <div onClick={slideMenu} style={{ marginLeft: 20, marginTop: 25  }}>
            <IoMdExit color={'#223843'} size={30} />
            <Link to="/" style={{ fontSize: 18, marginLeft: 10 }}>LogOut</Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(DrawerNav);

var styles = {

  position: 'fixed',
  zIndex: '1001',
  top: '0',
  left: '0',
  backgroundColor: '#F1F3F5',
  height: '100%',
  width: '250px',
  opacity: '1',
  overflowX: 'hidden',
  paddingTop: '60px',
  transition: '0.5s',

}
