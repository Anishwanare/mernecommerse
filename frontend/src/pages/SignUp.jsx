import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  console.log(data);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = data;

    if (name && email && password) {
      const fetchData = await fetch(`http://localhost:8080/api/signup`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const dataRes = await fetchData.json();
      console.log(dataRes);
      toast(dataRes.message);
      if (dataRes.alert) {
        navigate("/login");
      } else {
        // nothing
      }
    }
    else{
      toast("Fill required field's")
    }
  };

  return (
    <form className="fs-4" onSubmit={handleSubmit}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div
              className="card card-registration"
              style={{ backgroundColor: "#FAFAFA" }}
            >
              <div className="card-body p-md-5 text-black">
                <h3 className="mb-5 text-uppercase fs-2 text-center bg-danger py-2 text-light">
                  Sign-Up
                </h3>

                <div className="mb-4">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="formName">
                      Name
                    </label>
                    <input
                      type="text"
                      id="formName"
                      className="form-control fs-4"
                      name="name"
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="formEmail">
                      Email
                    </label>
                    <input
                      type="email"
                      id="formEmail"
                      className="form-control fs-4"
                      name="email"
                      onChange={handleOnChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="formPassword">
                      Password
                    </label>
                    <input
                      type="password"
                      id="formPassword"
                      className="form-control fs-4"
                      name="password"
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="formLocation">
                      Location
                    </label>
                    <input
                      type="text"
                      id="formLocation"
                      className="form-control fs-4"
                      name="location"
                      onChange={handleOnChange}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-light me-2 fs-3">
                    Reset
                  </button>
                  <button type="submit" className="btn btn-warning fs-3">
                    Submit
                  </button>
                </div>

                <div className="fs-5 text-right mt-3">
                  <span>Already a User? </span>
                  <Link to="/login">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
