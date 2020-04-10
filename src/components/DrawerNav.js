import React from 'react'
import { Link } from 'react-router-dom'

function DrawerNav() {
    return (
        <div>
        <nav>
          <ul>
          <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/messages">Messages</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        </div>
    )
}

export default DrawerNav
