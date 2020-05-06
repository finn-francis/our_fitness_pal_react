import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import '../assets/stylesheets/NavBar.css'

import {clearCurrentUser} from '../actions/AuthActions'


const NavBar = (props) => {
  const {auth} = props

  const noUser = () => {
    return (
      <>
        <Link id="sign-up-link" to="/sign_up">Sign-Up</Link>
        <Link id="sign-in-link" to="/sign_in">Sign-In</Link>
      </>
    )
  }

  const userSignedIn = () => {
    return (
      <>
        <h6>{auth.email}</h6>
        <button className="btn btn-sm btn-outline-secondary" id="sign-out-button" onClick={clearCurrentUser}>
          Sign Out
        </button>
      </>
    )
  }

  const navBarItems = () => {
    const navBarItems = {
      home: {text: "Home", route: "/"},
      exercises: {text: "Exercises", route: "/exercises"},
    }


    return (
      <>
        <ul id="navbar-list" className="navbar-nav mr-auto mt-2 mt-lg-0">
          {
            Object.keys(navBarItems).map((key, i) => (
              <li key={i} className={"nav-item"}>
                <NavLink className={"nav-link-item pl-3"} exact to={navBarItems[key].route}>{navBarItems[key].text}</NavLink>
              </li>
            ))
          }
        </ul>
      </>
    )
  }

  return (
    <div className="pos-f-t">
      <nav className="navbar navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {auth ? userSignedIn() : noUser()}
      </nav>
      <div className="collapse" id="navbarNavDropdown">
        <div className="bg-light pt-2">
          {navBarItems()}
        </div>
      </div>
    </div>
  )
}

export default NavBar;
