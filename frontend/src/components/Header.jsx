import React  from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../App";
import { BsFillCartFill } from "react-icons/bs";
import { useCart } from "./ContextReducer";

const Header = () => {
  const data = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div className="container">
          <Link to={"/"} className="navbar-brand fs-1 font-weight-bold">
            {logo}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav fs-3 mx-5 me-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/about"}>
                  About
                </Link>
              </li>

              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link className="nav-link" to={"/my-orders"}>
                    My Orders
                  </Link>
                </li>
              ) : null}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="nav-link" to={"/login"}>
                  <button
                    type="button"
                    className="bg-danger fs-3 text-light border-0 mx-1"
                  >
                    Login
                  </button>
                </Link>
                <Link className="nav-link" to={"/signup"}>
                  <button
                    type="button"
                    className="bg-danger fs-3 text-light border-0 mx-1"
                  >
                    Sign-Up
                  </button>
                </Link>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-between">
                <Link to={"/cart"}>
                  <div
                    className="text-dark rounded-3 mx-5  px-3"
                    style={{
                      fontSize: "1.7vmax",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <BsFillCartFill />
                    <div style={{ position: "absolute", top: "0", right: "0" }}>
                      {data.length !== 0 ? (
                        <p
                          style={{
                            padding: " 5px 5px",
                            backgroundColor: "black",
                            color: "white",
                            fontSize: "1.2vmax",
                            height: "1.3vmax",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "20px",
                          }}
                        >
                          {data.length}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Link>
                <div
                  className="btn btn-danger fs-3 text-light rounded-3 mx-1 px-3"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
