import React, { useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

function Card(props) {
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let pricerate=Object.entries(options)
  const [qty, setQty] = useState(1);
  const [Size, setSize] = useState(priceOptions[0] || ""); // Set default size to the first option if available
  let data = useCart();
  let price = parseInt(options[Size]);
  let finalPrice = qty * price;
  
  const handleAddToCart = async () => {
    let food = null;
    for (const item of data) {
      if (item.id === props.FoodItem._id && item.size === Size) {
        food = item;
        break;
      }
    }

    if (food) {
      await dispatch({ type: "UPDATE", id: props.FoodItem._id, price: price, qty: qty, size: Size,img:props.FoodItem.img });
    } else {
      await dispatch({ type: "ADD", id: props.FoodItem._id, name: props.FoodItem.name, price: price, qty: qty, size: Size,img:props.FoodItem.img });
    }

    //console.log(data);
  };
  const handleCheckout = async () => {
    let userEmail = localStorage.getItem('userEmail');
    let response = await fetch("http://localhost:5000/api/orderData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            order_data: [{
              id:props.FoodItem._id,
              name:props.FoodItem.name,
              price:price,
              qty:qty,
              size:Size,
              img:props.FoodItem.img,
              
            }],
            email: userEmail,
            order_date: new Date().toDateString()
        })
    });

    console.log(response.status);
    if (response.status === 200) {
        //dispatch({ type: "CLEARCART" });
    } else {
        console.error("Failed to complete the order");
        alert("An error occurred during checkout. Please try again.");
    }
};

  return (
    <div>
      <div
        className="card m-2"
        style={{
          width: '20rem',
          height: '30rem'
        }}
      >
        <img
          alt="..."
          className="card-img-top"
          style={{
            height: '14rem'
          }}
          src={props.FoodItem.img}
        />
        <div className="card-body">
          <p className="card-text">
            Name: {props.FoodItem.name}
          </p>
          <p className="card-text">
          { 
              pricerate.map(([key,value]) => <option key={key} value={value}>{key}:{value}</option>)
            }
          </p>
          <select
            className="bg-success"
            onChange={(e) => setQty(e.target.value)}
          >
            {
              Array.from(Array(6), (x, i) => <option key={i} value={i + 1}>{i + 1}</option>)
            }
          </select>
          <select
            className="bg-success"
            onChange={(e) => setSize(e.target.value)}
          >
            {
              priceOptions.map((price) => <option key={price} value={price}>{price}</option>)
            }
          </select>
          <p>Total Price: {finalPrice} /-</p>
          <hr />
          <button onClick={handleAddToCart} className="btn btn-success text-light ms-1">Add to Cart</button>
          <button onClick={handleCheckout} className="btn btn-danger text-light ms-1">Order</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
