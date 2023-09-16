import React from "react";
import { Carousel, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Images = [
  {
    img: "https://source.unsplash.com/random/300x300/?cookie",
  },
  {
    img: "https://source.unsplash.com/random/300x300/?fruit",
  },
  {
    img: "https://source.unsplash.com/random/300x300/?cake",
  },
];

const Slider = () => {
  return (
    <div className="carousel-container position-relative">
      <Carousel
        style={{ width: "100%", height: "50vmax", objectFit: " contain" }}
      >
        {Images.map((item, index) => {
          return (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 carousel-image img-fluid"
                style={{
                  filter: "brightness(50%)",
                  width: "100%",
                  height: "50vmax",
                }}
                src={item.img}
                alt="First slide"
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div className="carousel-caption">
        <h2 className="text-black mb-4">Discover Delicious Dishes</h2>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Find Your Favorite Food!!"
            className="me-2 form-control"
            aria-label="Search"
          />
          <Button variant="success" className="text-light">
            Search
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Slider;
