import React from 'react'
import {useLocation} from 'react-router-dom'

function ShowListingPage({title}) {
    let location = useLocation();
    title(location.pathname);
    console.log(location.state);
    return (
        <div>
            
        </div>
    )
}

export default ShowListingPage
