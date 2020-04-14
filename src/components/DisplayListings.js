import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import defaultImg from '../images/ThumbnailImage.png'
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import { Link } from 'react-router-dom'
import axios from 'axios'

function DisplayListings(props) {
    const listings = props.listings;
    const [favorited, setFavorited] = React.useState({});
    const idUser = window.$user.id;

    const checkFavoriteListing = async (listings) => {
        const favObj = Object.assign({}, favorited)
        listings.forEach((listing) => {
            axios.get(`http://localhost:8080/favorite/${idUser}/${listing.id}`)
                .then(res => {
                    let key = listing.id.toString();
                    favObj[key] = res.data
                    const obj = Object.assign({}, favObj)
                    console.log(JSON.stringify(obj))
                    setFavorited(obj);
                })
                .catch(e => console.log(e));
            })
    }

    const favoriteListing = async (id) => {
        if(favorited[id]){
            await axios.delete(`http://localhost:8080/favorite/${idUser}/${id}`)
            .then(() => {
                checkFavoriteListing(listings);
            })
            .catch(e => console.log(e));
        }else{
            await axios.post(`http://localhost:8080/favorite/${idUser}/${id}`)
            .then(() => {
                checkFavoriteListing(listings);
            })
            .catch(e => console.log(e));
        }
    }

    const renderListing = (listing, index) => {
        let secondListing = <br></br>
        let returnListing = <br></br>;

        if(index + 1 <= listings.length - 1){
            let secondIndex = listings[index + 1];
            let favoriteBtn2 = <IoIosStarOutline onClick={() => {favoriteListing(secondIndex.id)}} color={'#F1F3F5'} size={30} style={{marginTop: 7, float: 'right', marginRight: 15, fontWeight: 'bold'}} />
            if(favorited[secondIndex.id]){
                favoriteBtn2 = <IoIosStar onClick={() => {favoriteListing(secondIndex.id)}} color={'#F1F3F5'} size={30} style={{marginTop: 7, float: 'right', marginRight: 15, fontWeight: 'bold'}} />
            }
            secondListing = (
                <div>
                    <Link to={{
                        pathname: '/showlisting',
                        state: {
                            listing: secondIndex,
                        },
                    }}>
                        <img style={{height: 175, width: 175}} src={secondIndex.image} alt={defaultImg}/>
                    </Link>
                    <div style={{
                        position: 'absolute', 
                        opacity: .8,
                        bottom: 0, 
                        width: '85%',
                        height: '25%',
                        backgroundColor: '#223843', 
                        color: '#F1F3F5', }}>
                            <p style={{marginTop: 8, float: 'left', marginLeft: 15, fontWeight: 'bold', fontSize: 18}}>
                                {`$${secondIndex.price}`}
                            </p>
                            {favoriteBtn2}
                    </div>
                </div>
            );
        }
        let favoriteBtn1 = <IoIosStarOutline onClick={() => {favoriteListing(listing.id)}} color={'#F1F3F5'} size={30} style={{marginTop: 7, float: 'right', marginRight: 15, fontWeight: 'bold'}} />
        if(favorited[listing.id]){
            favoriteBtn1 = <IoIosStar onClick={() => {favoriteListing(listing.id)}} color={'#F1F3F5'} size={30} style={{marginTop: 7, float: 'right', marginRight: 15, fontWeight: 'bold'}} />
        }
        if(index === 0 || index % 2 === 0){
            returnListing = (
                <Container>
                    <Row>
                        <Col>
                            <div>
                                <Link to={{
                                    pathname: '/showlisting',
                                    state: {
                                        listing: listing,
                                    },
                                }}>
                                    <img style={{height: 175, width: 175}} src={listing.image} alt={defaultImg}/>
                                </Link>
                                <div style={{
                                    position: 'absolute', 
                                    opacity: .8,
                                    bottom: 0, 
                                    width: '85%',
                                    height: '25%',
                                    backgroundColor: '#223843', 
                                    color: '#F1F3F5', }}>
                                    <p style={{marginTop: 8, float: 'left', marginLeft: 15, fontWeight: 'bold', fontSize: 18}}>
                                        {`$${listing.price}`}
                                    </p>
                                    {favoriteBtn1}
                                </div>
                            </div>
                        </Col>
                        <Col>
                            {secondListing}
                        </Col>
                    </Row>
                </Container>
            );
        }
        return returnListing;
    }

    React.useEffect(() =>{
        checkFavoriteListing(listings);
    }, [listings])

    return (
        <div>
            {listings.map((listing, index) => {
                return renderListing(listing, index);
            })}
        </div>
    )
}

export default DisplayListings;
