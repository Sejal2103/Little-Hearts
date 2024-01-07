import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../screens/Cart';
import logo from '../images/logo.png';
import { useCart } from '../components/CreateContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal';

export default function Navbar() {
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 620);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate('/');
  }
  const [cartView, setCartView] = useState(false);
  const items = useCart();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 620);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className="hero">

      <div className="nav d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link to="/"><img className='logo' src={logo} alt="Logo" /></Link>

          <nav className="ml-3">
            <ul className="d-flex">
              {(localStorage.getItem("accessToken")) ? (
                <li className="hover:font-semibold link">
                  <Link to="/home">PRODUCTS</Link>
                </li>
              ) : (
                ""
              )}

              {(localStorage.getItem("accessToken")) ? (
                <li className="hover:font-semibold ml-8 link ">
                  <Link to="/myorders">MY ORDERS</Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </nav>
        </div>

        <div className="d-flex align-items-center">
          {(localStorage.getItem("accessToken")) ? (
            <>
              {isSmallScreen ? (
                <>
                  <li className="position-relative hover:font-semibold hover:cursor-pointer ml-2 mt-1" onClick={() => setCartView(true)}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {items.length > 0 && (
                      <span className="badge rounded-pill bg-danger ml-1">
                        {items.length}
                      </span>
                    )}
                  </li>
                  <li className="hover:font-semibold hover:cursor-pointer ml-2 mr-5" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </li>
                </>
              ) : (
                <>
                  <li className="position-relative hover:font-semibold hover:cursor-pointer ml-10 mt-1" onClick={() => setCartView(true)}>
                    CART
                    {items.length > 0 && (
                      <span className="badge rounded-pill bg-danger ml-1">
                        {items.length}
                      </span>
                    )}
                  </li>
                  <li className="login hover:font-semibold hover:cursor-pointer ml-10 mr-5" onClick={handleLogout}>
                    Logout
                  </li>
                </>
              )}
              {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
            </>
          ) : (
            <>
              <li className="hover:font-semibold ml-10 link">
                <Link to="/signup">SIGN UP</Link>
              </li>
              <li className="login hover:font-semibold ml-10 mr-5">
                <Link to="/login">Login</Link>
              </li>
            </>

          )}
        </div>
      </div>
    </div>
  );
}
