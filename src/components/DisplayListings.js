import React from 'react'
import FlatList from 'flatlist-react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import defaultImg from '../images/ThumbnailImage.png'

function DisplayListings(props) {
    const listings = props.listings;
    console.log(props.listings);

    const renderListing = (listing, index) => {
        let secondListing = <br></br>
        let returnListing = <br></br>;

        if(index + 1 <= listings.length - 1){
            let secondIndex = listings[index + 1];
            secondListing = (
                <div>
                    <img style={{height: 175, width: 175}} src={secondIndex.image} alt={defaultImg}/>
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
