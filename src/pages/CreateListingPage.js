import React from 'react'
import {useLocation} from 'react-router-dom'

function CreateListingPage({title}) {
    
    let location = useLocation();
    title(location.pathname);
    return (
        <div>
            <h2>Create Listing</h2>
        </div>
    )
}

export default CreateListingPage;
