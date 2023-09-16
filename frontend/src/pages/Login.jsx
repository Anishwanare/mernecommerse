import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // show password
  const [showPassword, setShowPassword] = useState(false);

  const handleOnClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const dataRes = await fetchData.json();
      console.log(dataRes);
      toast(dataRes.message);

      if (dataRes.alert) {
        localStorage.setItem("userEmail",data.email)
        localStorage.setItem("authToken", dataRes.authToken);
        navigate("/");
      } else {
        // toast(dataRes.message);
      }
    } else {
      toast("Enter Required Field");
    }
  };

  return (
    <form className="fs-4" onSubmit={handleOnSubmit}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div
              className="card card-registration"
              style={{ backgroundColor: "#FAFAFA" }}
            >
              <div className="card-body p-md-5 text-black">
                <h3 className="mb-5 text-uppercase fs-2 text-center bg-danger py-2 text-light">
                  Login
                </h3>

                <div className="mb-4">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="formEmail">
                      Email <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      id="formEmail"
                      className="form-control fs-4 border border-black"
                      onChange={handleOnChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-outline ">
                    <label className="form-label" htmlFor="formPassword">
                      Password <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="position-relative d-flex align-items-center">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        id="formPassword"
                        className="form-control fs-4 border border-black"
                        onChange={handleOnChange}
                      />
                      <span
                        onClick={handleOnClickShowPassword}
                        className="position-absolute end-0 d-flex align-items-center justify-content-center px-2"
                        style={{
                          height: "100%",
                          fontSize: "1.5vmax",
                          top: 0,
                          right: 0,
                          cursor: "pointer",
                        }}
                      >
                        {showPassword ? <BiSolidHide /> : <BiSolidShow />}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary fs-3">
                    Login
                  </button>
                </div>

                <div className="fs-5 text-right mt-3">
                  <span>I'm a New User? </span>
                  <Link to="/signup">Sign Up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
