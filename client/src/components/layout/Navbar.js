import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import Logo from '../../images/logo192.png'



class  Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
      <nav className="z-depth-0">
        <div className="nav-wrapper white">
          <ul id="nav-mobile" class="right hide-on-med-and-down">
         <li> <Link
            to="/"
            style={{
              fontFamily: "monospace"
            }}
            className="col s5 brand-logo center black-text"
          >
            <img src={Logo} alt="HD2A" style={{
              height: "30px",
              width: "40px",
              paddingRight: "10px",
              position: "absolute",
              top: "17px",
              right: "80px"
              
            }}/>
            HD2A
          </Link></li>

                   
          </ul>
        </div>
      </nav>
    </div>
           
    
    );
  }
}

export default Navbar;