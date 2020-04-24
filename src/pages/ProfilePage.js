import * as React from 'react'
import Button from 'react-bootstrap/Button';
import ImagePicker from '../components/ImagePicker';
import axios from 'axios'
import {useLocation, Link} from 'react-router-dom'
import DisplayListings from '../components/DisplayListings';
import { IoMdAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";

function ProfilePage({ title }) {
    let location = useLocation();
    title("Profile");
    const [userName, setUserName] = React.useState(window.$user.name);
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState(window.$user.icon);
    const [edit, setEdit] = React.useState(false);
    const [followBtn, setFollowBtn] = React.useState(false)
    const [followingCount, setFollowingCount] = React.useState(0)
    const [followersCount, setFollowersCount] = React.useState(0)
    const [sellList, setSellList] = React.useState([]);
    const [soldList, setSoldList] = React.useState([]);
    const [favList, setFavList] = React.useState([]);
    const [show, setShow] = React.useState(0)
 
    let url = 'localhost'; 
    let idUser = location.state;
    const getProfile = async (id) => {
     await axios.get(`http://${url}:8080/user/id/${id}`)
       .then(post => {
         setUserName(post.data.name)
         setDescription(post.data.bio)
         setImage(post.data.icon)
       })
       .catch(e => console.error(e));
   }
   const patchProfile = async (id, name, bio, icon) => {
    let post = await axios.post(`http://${url}:8080/user/update/${id}`, { name, bio, icon, id})
    setUserName(post.data.name)
    setDescription(post.data.bio)
    setImage(post.data.icon)
   }
 
   const getSellListings = async (id) => {
     await axios.get(`http://${url}:8080/listing/user/${id}/0`)
       .then(post => setSellList(post.data))
       .catch(e => console.error(e));
    }
 
    const getSoldListings = async (id) => {
     await axios.get(`http://${url}:8080/listing/user/${id}/1`)
       .then(post => setSoldList(post.data))
       .catch(e => console.error(e));
    }
 
    const getFavListings = async (id) => {
     await axios.get(`http://${url}:8080/favorite/${id}`)
       .then(post => setFavList(post.data))
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

    const checkIfFollowing = async (id) => {
      await axios.get(`http://localhost:8080/follow/isFollowing/${window.$user.id}/${id}`)
          .then(res => res.data ? setFollowBtn(true) : setFollowBtn(false))
          .catch(e => console.error(e));
      }

    const follow = async (id) => {
      await axios.post(`http://${url}:8080/follow/${window.$user.id}/${id}`)
        .then(post => {
          console.log("you're following", post)
          checkIfFollowing(id)
          countFollowers(id)
        })
        .catch(e => console.error(e));
    } 

    const unfollow = async (id) => {
      await axios.delete(`http://${url}:8080/follow/${window.$user.id}/${id}`)
        .then(post => {
          console.log("you're not following", post)
          checkIfFollowing(id)
          countFollowers(id)
        })
        .catch(e => console.error(e));
    } 
 
   const chooseImage = (img) => {
     setImage('' + img);
     console.log(`This is chosen: ${img}`);
   };
 
  
   React.useEffect(() =>{
     getProfile(idUser)
     getSellListings(idUser)
     getSoldListings(idUser)
     getFavListings(idUser)
     checkIfFollowing(idUser)
     countFollowers(idUser)
     countFollowing(idUser)
   }, [idUser]);

  const styles = {
    selected:{
      borderBottom: '2px solid #83AE9A',
      fontSize: 24,
      width: '33.3%',
    },
    unSelected:{
      borderBottom: '2px solid #D8D8D8',
      fontSize: 24,
      width: '33.3%',
    }
  }

    return (
        <div style={{paddingTop: 40}}>
           <div style={{display: 'flex', flexDirection: 'row'}}>
        <img alt=""
          style={{ margin: 30, height: 150, width: 150, borderRadius: 75, resizeMode: "contain" }}
          src={ image }
        />
        <div>
          {edit ? <ImagePicker chooseImage={chooseImage}/> : null}
          
          <h4 style={{marginVertical: 25 ,fontSize: 24}} >{userName}</h4>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Link to={{pathname: "/users", state: {id: idUser, display: 'Following'},}} style={{fontSize: 14, color: 'black', float: 'left'}} >{`${followingCount} Following`}</Link>
          <Link to={{pathname: "/users", state: {id: idUser, display: 'Followers'},}} style={{fontSize: 14, color: 'black', paddingLeft: 0}} >{`${followersCount} Followers`}</Link>
          </div>
          { edit ? <input
            type="text"
            value={userName}
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChange={(e) => setUserName(e.target.value)}
            placeholder='Input User Name...'
          /> : null}
          {idUser !== window.$user.id ? 
            (followBtn ? 
              <Button style={{width: 125,
              height: 35,
              borderRadius: 5,
              backgroundColor: 'gray',
              display: 'flex', 
              justifyContent: 'space-evenly',
              alignItems: 'stretch'
              }} 
              onClick={() => unfollow(idUser)} >
               <div>Unfollow</div> <IoIosRemoveCircleOutline color={'#F1F3F5'} size={25} />
                </Button> 
                :  <Button style={{width: 125,
                  height: 35,
                  borderRadius: 5,
                  backgroundColor: '#3FC184',
                  display: 'flex', 
                  justifyContent: 'space-evenly',
                  alignItems: 'stretch'
                  }}  
                  onClick={() => follow(idUser)} >
                    <div>Follow</div> <IoMdAddCircleOutline color={'#F1F3F5'} size={25} />
                    </Button>)
              : 
            <Button style={{width: 125,
              height: 35,
              borderRadius: 5,
              backgroundColor: '#3FC184',
              marginRight: 15,}} 
              onClick={() => setEdit(!edit)}>
                Edit Profile
            </Button> }
        </div>
      </div>
      <div style={{marginHorizontal: 30}}>
          <p style={{fontSize: 18}}>{description || 'no bio'}</p>
          { edit ? <textarea
            value={description}
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Input Description...'
          /> : null}          
          {edit ? <Button style={{backgroundColor: '#3FC184'}} onClick={() => { 
            patchProfile(idUser, userName, description, image);
            setEdit(false);
          }}>
            Update Profile
          </Button> : null}
      </div> 
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}} >
          <p onClick={() => setShow(0)} style={show === 0 ? styles.selected : styles.unSelected}>Selling</p>
          <p onClick={() => setShow(1)} style={show === 1 ? styles.selected : styles.unSelected}>Sold</p>
          <p onClick={() => setShow(2)} style={show === 2 ? styles.selected : styles.unSelected}>Favorites</p>
      </div>
      <div style={{marginBottom: 55}}>
        {show === 0 ? <DisplayListings listings={sellList} /> : null}
        {show === 1 ? <DisplayListings listings={soldList} /> : null}
        {show === 2 ? <DisplayListings listings={favList} /> : null}
      </div>
        </div>
    )
}

export default ProfilePage
