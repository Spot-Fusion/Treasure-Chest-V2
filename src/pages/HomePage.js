import React, { useState, useEffect } from 'react'
import axios from 'axios'

function HomePage() {
    const [listings, setListings] = React.useState([])

    const getAllListings = async () => {
        await axios.get(`http://localhost:8080/listing/`)
        .then(post => {
            console.log(post.data);
            setListings(post.data);
        })
        .catch(e => console.error(e));
    }

    useEffect(() => {
        getAllListings();
    }, []);
    
    return (
        <div>
            D HOME
        </div>
    )
}

export default HomePage;
