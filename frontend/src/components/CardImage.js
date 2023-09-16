import React, { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import { useDispatchCart, useCart } from "./ContextReducer";
import { toast } from "react-hot-toast";

const CardImage = ({ foodItem, option }) => {
  let data = useCart()
  let dispatch = useDispatchCart();
  
  const priceOptions = Object.keys(option);
  // options in db is object now we want its key part in our frontend , so we have to do this Object.keys() -> its an inbuld js function
  
  // To know what's the default value Selected on card, and that we want to add on cart ? that's what we do
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  
  // using useRef is necessory if we want to display price WRT size
  const priceRef = useRef()
  let finalPrice = qty * parseInt(option[size])
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])

  const handleAddCart = async () => {
    toast("Added to Cart")
    // for update in cart
    let food = [] //here const food will not work as we are upadating food by below condition so we have to use let , bcz i stuck while using const :)
    for(const item of data){
      if(item.id === foodItem._id){
        food  = item;
        break;
      }
    }

    if(food !==0){
      if(food.size === size){
        await dispatch({type:"UPDATE",id:foodItem._id,price:finalPrice,qty:qty})
      }
      else{
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: foodItem.img,
        });
        return
      }
      return
    }

// for adding in cart
    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img:foodItem.img
    });
    // console.log(data);
  };

  return (
    <Card className="my-2" style={{ width: "25rem", margin: "0 10px" }}>
      {foodItem.name ? (
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Card.Img
            variant="top"
            src={foodItem.img}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "15vmax", // Adjust the height as needed
            }}
          />
        </div>
      ) : (
        <Card.Text>Loading</Card.Text>
      )}
      <Card.Body>
        {foodItem.name ? (
          <>
            <Card.Title style={{ fontSize: "1.5vmax" }}>
              {foodItem.name}
            </Card.Title>{" "}
            <span
              className="d-inline"
              style={{ color: "blue", fontWeight: "bold" }}
            >
              {foodItem.category}
            </span>
            {/* <Card.Text style={{ fontSize: "0.7vmax" }}>{desc}</Card.Text> */}
            <Card.Text className="d-flex justify-content-around my-2">
              <Card.Text>
                <select
                  style={{
                    fontSize: "1vmax",
                    cursor: "pointer",
                    padding: "0 10px",
                    borderRadius: "5px",
                    backgroundColor: "#ADD8E6",
                    fontWeight: "bold",
                  }}
                  onChange={(e) => setQty(e.target.value)}
                >
                  {Array.from(Array(6), (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </Card.Text>
              <Card.Text>
                <select
                  style={{
                    fontSize: "1vmax",
                    cursor: "pointer",
                    padding: "0 10px",
                    borderRadius: "5px",
                    backgroundColor: "#ADD8E6",
                    fontWeight: "bold",
                  }}
                  ref={priceRef}  //ref is inbuld , we cannot take any other than "ref"
                  onChange={(e) => setSize(e.target.value)}
                >
                  {priceOptions.map((item, ind) => {
                    return (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </Card.Text>
              <Card.Text
                style={{
                  fontSize: "1vmax",
                  fontWeight:"bold",
                  cursor: "pointer",
                  padding: "0 10px",
                }}
              >
                ₹{finalPrice} /-
              </Card.Text>
            </Card.Text>
          </>
        ) : (
          "loading..."
        )}
        <hr />
        <Card.Text>
          <button
            className="btn btn-danger justify-center ms-2"
            onClick={handleAddCart}
          >
            {" "}
            Add to Cart
          </button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardImage;
