import React from 'react';
import { useCart, useDispatchCart } from '../Components/ContextReducer';

function Cart() {
    const data = useCart();
    const dispatch = useDispatchCart();
    let totalPrice = data.reduce((total, food) => total + food.price * food.qty, 0); 

    const handleCheckout = async () => {
        let userEmail = localStorage.getItem('userEmail');
        let response = await fetch("http://localhost:5000/api/orderData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });

        console.log(response.status);
        if (response.status === 200) {
            dispatch({ type: "CLEARCART" });
        } else {
            console.error("Failed to complete the order");
            alert("An error occurred during checkout. Please try again.");
        }
    };

    return (
        <>
            {data.length === 0 ? (
                <div className='container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ zIndex: '1000', color: 'red' }}>Cart is empty</h1>
                </div>
            ) : (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Option</th>
                                <th scope="col">Price</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((food, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td>{food.price * food.qty}</td>
                                    <td>
                                        <button onClick={() => dispatch({ type: "REMOVE", index })} className="btn btn-danger">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <h1>Total Price: {totalPrice}</h1>
                    </div>
                    <div>
                        <button onClick={handleCheckout} className="btn btn-danger">Check Out</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Cart;
