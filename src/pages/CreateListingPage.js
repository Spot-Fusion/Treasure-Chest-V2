import * as React from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import ImagePicker from '../components/ImagePicker';
import { BrowserRouter as Router, Redirect, Link } from "react-router-dom";
   
function CreateListingPage({title}) {
   const [idSeller, setIdSeller] = React.useState(window.$user.id);
   const [idCategory, setIdCategory] = React.useState(1);
   const [name, setName] = React.useState('');
   const [description, setDescription] = React.useState('')
   const [price, setPrice] = React.useState(0);
   const [zipcode, setZipcode] = React.useState(0);
   const [negotiable, setNegotialbe] = React.useState(0);
   const [image, setImage] = React.useState('https://res.cloudinary.com/tbgarza2/image/upload/v1586804677/icons8-treasure-chest-100_rwb2vs.png');
   const [listing, setListing] = React.useState({});
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

   const addImage = async (id, image) => {
    await axios.post(`http://${url}:8080/listing/${id}`, { image })
    .then(body => {
      console.log(body.data);   
      getListing(id)  
    //   navigation.navigate('ShowListing', { idListing: id });
    })
    .catch(e => console.error(e))
   }

   const addPost = async (name, description, price, zipcode, negotiable) => {
    await axios.post(`http://${url}:8080/listing/`, {id_seller: idSeller, id_category: 1, name, description, price, zipcode, negotiable })
    .then(body => {
      addImage(body.data, image)
    })
    .catch(e => console.error(e));
  }

  const getListing = async (id) => {
    await axios.get(`http://${url}:8080/listing/${id}`)
      .then(post => setListing(post.data))
      .catch(e => console.error(e));
  }

  const chooseImage = (img) => {
    setImage('' + img);
    console.log(`This is chosen: ${img}`);
  };

  const handleSubmit = (evt) => {
      evt.preventDefault();
      alert(`${name} ${description} $${price} ${zipcode} ${negotiable} ${image}`);
      setName('');
      setDescription('');
      setPrice(0);
      setZipcode(0);
      setNegotialbe(0);
      setImage('https://res.cloudinary.com/tbgarza2/image/upload/v1586804677/icons8-treasure-chest-100_rwb2vs.png');
      setRedirect(true)
      // <Redirect to={{pathname: '/showlisting', state: { idListing }}} />
    }

    let location = useLocation();
    title('Create Listing');

    return (
        <div style={{margin: 10}}>
        {/* <Router>
         {redirect ? <Redirect to={{pathname: '/showlisting', state: { idListing },}} /> : null} 
         </Router> */}
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
            <img alt="https://res.cloudinary.com/tbgarza2/image/upload/v1586804677/icons8-treasure-chest-100_rwb2vs.png" 
          style={{ alignSelf: 'center', height: 200, width: 200 }}
          src={ image } />
          <div style={{float: 'center'}}><ImagePicker chooseImage={chooseImage} style={{float: 'center'}}/></div>
          </div>
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
           <label style={styles.label}>Name: {name}</label>
          <input   
            type="text"
            value={name}
            style={styles.input}
            required onChange={(e) => setName(e.target.value)}
            placeholder='Input Name...' />
          <label style={styles.label}>Description: {description}</label>
          <textarea
            value={description} 
            style={styles.input}
            required onChange={(e) => setDescription(e.target.value)} 
            placeholder='Input Description...' />
             <label style={styles.label}>Price: ${price}</label>
          <input
            type="number"
            value={price}
            style={styles.input}
            required onChange={(e) => setPrice(e.target.value)}
            placeholder='Input Price...' />
             <label style={styles.label}>Zipcode: {zipcode}</label>
          <input
            type="number"
            value={zipcode}
            style={styles.input}
            required onChange={(e) => setZipcode(e.target.value)}
            placeholder='Input Zipcode...' />
             <label style={styles.label}>Negotiable: </label>
          <input
            type="checkbox"
            value={negotiable > 0 ? true : false} 
            checked={negotiable > 0 ? true : false}
            style={styles.input}
            required onChange={(e) => setNegotialbe(negotiable > 0 ? 0 : 1)} />
        {/* <Link to={{pathname: '/showlisting', state: { listing: 48 },}} > */}
        <input type="submit" value="Create" style={{backgroundColor: '#3FC184', color: '#F1F3F5', fontSize: 20}}/>
        {/* </Link> */}
      </form>
        </div>
    )
}

export default CreateListingPage;
