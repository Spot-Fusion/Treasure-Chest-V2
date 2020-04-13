import * as React from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
   
function CreateListingPage({title}) {
   const [idSeller, setIdSeller] = React.useState(window.$user.id);
   const [idCategory, setIdCategory] = React.useState(1);
   const [name, setName] = React.useState('');
   const [description, setDescription] = React.useState('')
   const [price, setPrice] = React.useState(0);
   const [zipcode, setZipcode] = React.useState(0);
   const [negotiable, setNegotialbe] = React.useState(0);
   const [image, setImage] = React.useState('');
   const [idListing, setIdListing] = React.useState(0);

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
    //   navigation.navigate('ShowListing', { idListing: id });
    })
    .catch(e => console.error(e))
   }

   const addPost = async (name, description, price, zipcode, negotiable) => {
    await axios.post(`http://${url}:8080/listing/`, {id_seller: idSeller, id_category: 1, name, description, price, zipcode, negotiable })
    .then(body => {
      setIdListing(body.data);
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
      alert(`${name} ${description} $${price} ${zipcode} ${negotiable}`);
      setName('');
      setDescription('');
      setPrice(0);
      setZipcode(0);
      setNegotialbe(0);
    }

    let location = useLocation();
    title(location.pathname);

    console.log(window.$user); 

    return (
        <div>
            <h2>Create Listing</h2>
            <img alt={"http://pngimg.com/uploads/treasure_chest/treasure_chest_PNG108.png"} 
          style={{ alignSelf: 'center', height: 200, width: 200 }}
          src={ image } />
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
        
        <input type="submit" value="Create Listing" />
      </form>
        </div>
    )
}

export default CreateListingPage;
