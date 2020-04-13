import React from 'react'
import FlatList from 'flatlist-react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import defaultImg from '../images/ThumbnailImage.png'
import { IoIosStarOutline } from "react-icons/io";

function DisplayListings(props) {
    const listings = props.listings;

    const renderListing = (listing, index) => {
        let secondListing = <br></br>
        let returnListing = <br></br>;

        if(index + 1 <= listings.length - 1){
            let secondIndex = listings[index + 1];
            secondListing = (
                <div>
                    <img style={{height: 175, width: 175}} src={secondIndex.image} alt={defaultImg}/>
                    <div style={{
                        position: 'absolute', 
                        opacity: .65,
                        bottom: 0, 
                        width: '85%',
                        height: '30%',
                        backgroundColor: '#223843', 
                        color: '#F1F3F5', }}>
                            <p style={{marginTop: 15, float: 'left', marginLeft: 15, fontWeight: 'bold'}}>
                                {`$${secondIndex.price}`}
                            </p>
                            <IoIosStarOutline color={'#F1F3F5'} size={20} style={{marginTop: 15, float: 'right', marginRight: 15, fontWeight: 'bold'}} />
                    </div>
                </div>
            );
        }

        if(index === 0 || index % 2 === 0){
            returnListing = (
                <Container>
                    <Row>
                        <Col>
                            <div>
                                <img style={{height: 175, width: 175}} src={listing.image} alt={defaultImg}/>
                                <div style={{
                                    position: 'absolute', 
                                    opacity: .65,
                                    bottom: 0, 
                                    width: '85%',
                                    height: '30%',
                                    backgroundColor: '#223843', 
                                    color: '#F1F3F5', }}>
                                    <p style={{marginTop: 15, float: 'left', marginLeft: 15, fontWeight: 'bold'}}>
                                        {`$${listing.price}`}
                                    </p>
                                    <IoIosStarOutline color={'#F1F3F5'} size={20} style={{marginTop: 15, float: 'right', marginRight: 15, fontWeight: 'bold'}} />
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

    return (
        <div>
            {listings.map((listing, index) => {
                return renderListing(listing, index);
            })}
        </div>
    )
}

export default DisplayListings;
