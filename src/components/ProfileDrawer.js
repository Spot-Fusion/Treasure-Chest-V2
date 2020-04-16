import * as React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ProfileDrawer({slideMenu}) {
    const [user, setUser] = React.useState({});
    const [followingCount, setFollowingCount] = React.useState(0)
    const [followersCount, setFollowersCount] = React.useState(0)

    let url = 'localhost' 
  
    const getProfile = async (id) => {
      await axios.get(`http://${url}:8080/user/id/${id}`)
        .then(post => setUser(post.data))
        .catch(e => console.error(e));
    }
    const countFollowing = async (id) => {
      await axios.get(`http://localhost:8080/follow/following/count/${id}`)
          .then(res => setFollowingCount(res.data))
          .catch(e => console.error(e));
      }
    
    const countFollowers = async (id) => {
      await axios.get(`http://localhost:8080/follow/followed_by/count/${id}`)
          .then(res => setFollowersCount(res.data))
          .catch(e => console.error(e));
      }
  
    let idUser = window.$user.id;
    React.useEffect(() =>{
      getProfile(idUser)
      countFollowers(idUser)
     countFollowing(idUser)
    }, []);

    return (
        <div /*style={{backgroundColor: '#F1F3F5'}}*/>
            <img alt="http://pngimg.com/uploads/tiger/tiger_PNG23245.png"
          style={{ height: 100, width: 100, borderRadius: 50 }}
          src={user.icon} />
            <h5 style={{ color: "#223843", alignSelf: "flex-end", fontSize: 18 }}>
            {!user ? "Coach O" : user.name} 
            </h5>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}} >
                <Link to={{pathname: "/users", state: {id: idUser, display: 'Following'},}} onClick={slideMenu}><h4>{`${followingCount}`}</h4><p>Following</p></Link>
                <Link to={{pathname: "/users", state: {id: idUser, display: 'Followers'},}} onClick={slideMenu}><h4>{`${followersCount}`}</h4><p>Followers</p></Link>
            </div>
        </div>
    )
}

export default ProfileDrawer
