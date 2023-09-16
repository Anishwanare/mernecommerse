
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import CardImage from "../components/CardImage";
import { Carousel, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [foodItem, setFoodItem] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [search, setSearch] = useState("");
  const loadingArray = new Array(6).fill(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/foodData", {
        method: "POST",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      // console.log(data[0], data[1]); // have two items in displayData.js

      setFoodItem(data[1]);
      setFoodCategory(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e)=>{
    e.preventDefault()
  }

  return (
    <div>
      <div className="mb-4">
        <div className="carousel-container position-relative">
          <Carousel
            style={{ width: "100%", height: "50vmax", objectFit: "cover", }}
          >
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image img-fluid"
                style={{
                  filter: "brightness(50%)",
                  width: "100%",
                  height: "50vmax",
                }}
                src="https://source.unsplash.com/random/300x300/?cookie"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image img-fluid"
                style={{
                  filter: "brightness(50%)",
                  width: "100%",
                  height: "50vmax",
                }}
                src="https://source.unsplash.com/random/300x300/?fruit"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image img-fluid"
                style={{
                  filter: "brightness(50%)",
                  width: "100%",
                  height: "50vmax",
                }}
                src="https://source.unsplash.com/random/300x300/?cake"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
          <Carousel.Caption className="position-absolute top-50">
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find Your Favourite Food!!"
                className="me-2 form-control"
                aria-label="Search"
                style={{ fontSize: "2vmax" }}
              />
            </Form>
          </Carousel.Caption>
        </div>
      </div>
      <h2 className="text-center mb-4 bg-info py-3 fs-1">Main Course</h2>
      <div className="container-fluid">
        {foodCategory.length !== 0 ? (
          foodCategory.map((data) => (
            <div key={data._id} className="mb-5">
              <h3 className="text-center mb-3" style={{ fontSize: "2vmax" }}>
                {data.CategoryName}
              </h3>
              <hr />
              <div className="row justify-content-start">
                {foodItem.length !== 0
                  ? foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((food) => (
                        <div
                          key={food._id}
                          className="col-lg-3 col-md-6 col-sm-12 mb-3"
                        >
                          <CardImage foodItem={food} option={food.options[0]} />
                        </div>
                      ))
                  : loadingArray.map((_, ind) => (
                      <div
                        key={ind}
                        className="col-lg-4 col-md-6 col-sm-12 mb-3"
                      >
                        <CardImage foodItem={"loading.."} />
                      </div>
                    ))}
              </div>
            </div>
          ))
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};

export default Home;
