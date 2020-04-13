import * as React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ProfileDrawer({slideMenu}) {
    const [user, setUser] = React.useState({})

    let url = 'localhost' 
  
    const getProfile = async (id) => {
      await axios.get(`http://${url}:8080/user/id/${id}`)
        .then(post => setUser(post.data))
        .catch(e => console.error(e));
    }
  
    let idUser = window.$user.id;
    React.useEffect(() =>{
      getProfile(idUser)
    }, []);
    // console.log(user);
    // console.log(window.$user);
    return (
        <div /*style={{backgroundColor: '#F1F3F5'}}*/>
            <img alt="http://pngimg.com/uploads/tiger/tiger_PNG23245.png"
          style={{ height: 100, width: 100, borderRadius: 50 }}
          src={user.icon} />
            <h5 style={{ color: "#223843", alignSelf: "flex-end", fontSize: 18 }}>
            {!user ? "Coach O" : user.name} 
            </h5>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}} >
                <Link to="/users" onClick={slideMenu}><h4>{`${idUser}`}</h4><p>Following</p></Link>
                <Link to="/users" onClick={slideMenu}><h4>{`${idUser}`}</h4><p>Followers</p></Link>
            </div>
        </div>
    )
}

export default ProfileDrawer
