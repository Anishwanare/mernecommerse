import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";


const Cart = () => {
  const data = useCart();
  const disptach = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <h1 className="w-full text-center my-4">
          Cart is empty !! <Link to={"/"}>Go to shopping</Link>
        </h1>
      </div>
    );
  }

  const handleCheckOut = async()=>{
    let userEmail = localStorage.getItem("userEmail")
    const fetchOrder = await fetch("http://localhost:8080/api/orderData", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body:JSON.stringify({
        order_data : data,
        email:userEmail,
        order_date :new Date().toDateString()
      })
    });

     let OrderRes = await fetchOrder.json();
     toast(OrderRes.message);

    if(fetchOrder.status === 200){
        disptach({type:"DROP"})
       
    }
  }

  let finalPrice = data.reduce((total, item) => total + (item.price + item.price * 0.18), 0); // include GST ...
  finalPrice = Math.round(finalPrice)

  return (
    <div className=" mx-5">
      <h2 className="text-center mb-4">Cart</h2>
      <div className="table-responsive table-responsive-sm table-responsive-md bg-transparent rounded" >
        <table className="table ">
          <thead className=" fs-3" style={{ backgroundColor: "none" }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col" className="text-danger">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="fs-3">
            {data.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.size}</td>
                <td>₹ {item.price} /-</td>
                <td>
                    {/* this condition is deletion of cart items */}
                  <MdDeleteForever onClick={async()=>{toast("Item Removed") ;await disptach({type:"REMOVE",index:index})}} style={{ cursor: "pointer" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex flex-column gap-5">
          <div>
            <h1 className="fs-1">Payable Amount : ₹ {finalPrice} /-</h1>
            <p>
              <span>Final amount ₹ {finalPrice} /- Include 18% GST. </span>
            </p>
          </div>
          <div>
            <button type="button" class="btn btn-info fs-3 text-light" onClick={handleCheckOut}>
              CheckOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
