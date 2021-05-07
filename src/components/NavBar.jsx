import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-shadow">
                <ul className="navbar-nav">
                    <li className="nav-item nav-link"><NavLink to="/flowers">Flowers List</NavLink></li>
                    <li className="nav-item nav-link"><NavLink to="/add">Add a Sighting</NavLink></li>
                    <li className="nav-item nav-link"><NavLink to="/edit">Edit a Flower</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default NavBar;