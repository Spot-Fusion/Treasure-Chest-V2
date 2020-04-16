import * as React from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import axios from 'axios'
import ImagePicker from '../components/ImagePicker';
import { BrowserRouter as Router, Redirect, Link } from "react-router-dom";
import defaultImg from '../images/ThumbnailImage.png'

function CreateListingPage({title}) {
  let history = useHistory();
  // console.log(history.push);
  const [idSeller, setIdSeller] = React.useState(window.$user.id);
  const [idCategory, setIdCategory] = React.useState(1);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('')
  const [price, setPrice] = React.useState(0);
  const [zipcode, setZipcode] = React.useState(0);
  const [negotiable, setNegotialbe] = React.useState(0);
  const [image, setImage] = React.useState(defaultImg);
  const [listing, setListing] = React.useState({id: 42,
      seller: "Billy Golden-Calf",
      category: "Shoes",
      created_at: "2020-03-30T01:29:30.456Z",
      name: "Nike Air Zoom Pegasus",
      description: "Color: Black↵Size 8",
      price: 85,
      zipcode: 70810,
      negotiable: 1,
      archived: 0,
      image: "http://res.cloudinary.com/tbgarza2/image/upload/v1585513715/tppsrl7tj9qwtggqroqs.jpg"});
  const [redirect, setRedirect] = React.useState(false);

  const styles = {
    input: {
      height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, backgroundColor: '#D3D3D3'
    },
    label: {
      textAlign: 'left', 
    }
  }

  let url = 'localhost';

  const getListing = async (id) => {
    await axios.get(`http://${url}:8080/listing/${id}`)
      .then(post => {
        console.log(post);
        let list  = post.data;
        setListing(post.data);
        history.push('/showlisting', {listing: list}) // <<< here is the nav to the show listing page
      })
      .catch(e => console.error(e));
  }

  const addImage = async (id, image) => {
    await axios.post(`http://${url}:8080/listing/${id}`, { image })
    .then(body => {
      console.log('addImage', id, body.data);   
      getListing(id)  
    //   navigation.navigate('ShowListing', { idListing: id });
    })
    .catch(e => console.error(e))
  }

  const addPost = async (name, description, price, zipcode, negotiable) => {
    await axios.post('http://localhost:8080/message/twilio', { body: `Come check it out I'm selling ${name}!`, to: "+15042257631579"})
    await axios.post(`http://${url}:8080/listing/`, {id_seller: idSeller, id_category: 1, name, description, price, zipcode, negotiable })
    .then(body => {
      console.log('addPost', body.data)
      addImage(body.data, image)
    })
    .catch(e => console.error(e));
  } 

  const chooseImage = (img) => {
    setImage('' + img);
    console.log(`This is chosen: ${img}`);
  };

  const handleSubmit = (evt) => {
      evt.preventDefault();
      // alert(`${name} ${description} $${price} ${zipcode} ${negotiable} ${image}`);
      addPost(name, description, price, zipcode, negotiable)
      setName('');
      setDescription('');
      setPrice(0);
      setZipcode(0);
      setNegotialbe(0);
      setImage(defaultImg);
      setRedirect(true) 
    }

    let location = useLocation();
    title('Create Listing');

    return (
        <div style={{margin: 10, marginTop: 55}}>
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
            <img alt={defaultImg} 
          style={{ alignSelf: 'center', height: 200, width: 200, marginBottom: 20 }}
          src={ image } />
          <div style={{float: 'center'}}><ImagePicker chooseImage={chooseImage} /></div>
          </div>
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
          <label style={styles.label}>Name: </label>
          <input   
            type="text"
            value={name}
            style={styles.input}
            required onChange={(e) => setName(e.target.value)}
            placeholder='Input Name...' />
          <label style={styles.label}>Description: </label>
          <textarea
            value={description} 
            style={styles.input}
            required onChange={(e) => setDescription(e.target.value)} 
            placeholder='Input Description...' />
            <label style={styles.label}>Price: </label>
          <input
            type="number"
            value={price}
            style={styles.input}
            required onChange={(e) => setPrice(e.target.value)}
            placeholder='Input Price...' />
            <label style={styles.label}>Zipcode: </label>
          <input
            type="number"
            value={zipcode}
            style={styles.input}
            required onChange={(e) => setZipcode(e.target.value)}
            placeholder='Input Zipcode...' />
        <input type="submit" value="Create" style={{backgroundColor: '#3FC184', color: '#F1F3F5', fontSize: 20, marginTop: 25}}/>
      </form>
        </div>
    )
}

export default CreateListingPage;
