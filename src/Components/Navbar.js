import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from "../Modal";
import Cart from "../Screens/Cart";
import { useCart } from "./ContextReducer";
function Navbar() {
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
let data=useCart()
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid text-light">
          <Link className="navbar-brand fs-1 text-light" to="/">
            Foodie
          </Link>
          <button
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="navbar-toggler bg-white"
            data-bs-target="#navbarNav"
            data-bs-toggle="collapse"
            type="button"
          >
            <span className="navbar-toggler-icon text-light" />
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link aria-current="page" className="nav-link active text-light" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link aria-current="page" className="nav-link text-light" to="/myorder">
                    My Orders
                  </Link>
                </li>
              )}
            </ul>
            {localStorage.getItem("authToken") ? (
              <div className="d-flex gap-3">
                <Link className="btn bg-light text-success" to="#" onClick={() => setCartView(true)}>
                  Cart {" "}{data.length>0 ? <Badge bg="danger">{data.length}</Badge> : null}

                  {/* <Badge pill bg="danger">{data.length}</Badge>} */}
                </Link>
                {cartView && (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                )}
                <button className="btn bg-light text-success" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            ) : (
              <div className="d-flex gap-3">
                <Link className="btn bg-light text-success" to="/login">
                  Login
                </Link>
                <Link className="btn bg-light text-success" to="/signup">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
