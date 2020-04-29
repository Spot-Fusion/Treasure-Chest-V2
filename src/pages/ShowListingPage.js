import React from 'react'
import {useLocation} from 'react-router-dom'
import defaultImg from '../images/ThumbnailImage.png'
import Button from 'react-bootstrap/Button';
import {
    StaticGoogleMap,
    Marker,
} from 'react-static-google-map';
import { googlKey } from '../config.js'
import axios from 'axios'
import { MdMessage } from 'react-icons/md'
import { Link } from 'react-router-dom'

function ShowListingPage({title}) {
    let location = useLocation();
    title('Listing');
    const { listing } = location.state;
    const [favorited, setFavorited] = React.useState(true);
    const [favBtnColor, setBtnColor] = React.useState('success');
    const [favBtnText, setBtnText] = React.useState('Favorite');
    const [recipient, setRecipient] = React.useState({});
    const idListing = listing.id;
    const idUser = window.$user.id;

    const checkFavoriteListing = async (id) => {
    await axios.get(`http://localhost:8080/favorite/${idUser}/${id}`)
        .then(res => {
            setFavorited(res.data);
            if(res.data){
                setBtnColor('secondary');
                setBtnText('Unfavorite');
            }else{
                setBtnColor('success');
                setBtnText('Favorite');
            }
        })
        .catch(e => console.log(e));
    }

    const favoriteListing = async (id) => {
        if(favorited){
            await axios.delete(`http://localhost:8080/favorite/${idUser}/${id}`)
            .then(res => {
                setBtnColor('success');
                setBtnText('Favorite');
                checkFavoriteListing(idListing);
            })
            .catch(e => console.log(e));
        }else{
            await axios.post(`http://localhost:8080/favorite/${idUser}/${id}`)
            .then(res => {
                setBtnColor('secondary');
                setBtnText('Unfavorite');
                checkFavoriteListing(idListing);
            })
            .catch(e => console.log(e));
        }
    }

    const getRecipient = async (id) => {
        await axios.get(`http://localhost:8080/user/id/${id}`)
            .then(post => {
            console.log(post.data);
            setRecipient(post.data);
            })
            .catch(e => console.error(e));
    }

    React.useEffect(() =>{
        checkFavoriteListing(idListing);
        getRecipient(listing.id_seller);
    }, [])

    return (
        <div>
            <img style={{height: 175, width: 175, marginTop: 15}} src={listing.image} alt={defaultImg}/>
            <div style={{marginTop: 25}}>
                <p style={{float:'left', marginLeft: 15, fontSize: 24}}>{listing.name}</p>
                <p style={{float:'right', fontSize: 24, marginRight: 15}}>{`$${listing.price}`}</p>
            </div>
            <div style={{marginTop: 90}}>
                <Button onClick={() => {favoriteListing(idListing)}} 
                style={listing.id_seller !== window.$user.id ? {float: 'left', marginLeft: 75, width: 120} : {float: 'center', marginLeft: 0, width: 120}} 
                variant={favBtnColor}>{`${favBtnText} ☆`}</Button>
                { listing.id_seller !== window.$user.id ? <Link to={{
                        pathname: '/chat',
                        state: {
                            id_recipient: recipient.id,
                            recipient_icon: recipient.icon,
                            recipient_name: recipient.name
                        },
                    }}>
                        <Button style={{float: 'right', marginRight: 75, width: 120}} variant={'success'}>Message <MdMessage color={'white'} size={20}/></Button>
                    </Link> : null}
            </div>
            <p style={{float: 'left', marginTop: 25, marginLeft: 25, fontSize: 18}}>{listing.description}</p>
            <div style={{marginTop: 25, marginBottom: 25}}>
                <StaticGoogleMap size="350x350" className="img-fluid" apiKey={googlKey}>
                    <Marker location={listing.zipcode} color="red" />
                </StaticGoogleMap>
            </div>
        </div>
    )
}

export default ShowListingPage
