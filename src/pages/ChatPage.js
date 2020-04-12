import React from 'react'
import {useLocation} from 'react-router-dom'

function ChatPage({title}) {

    let location = useLocation();
    title(location.pathname);
    return (
        <div>
            
        </div>
    )
}

export default ChatPage
