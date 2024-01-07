import React from 'react';
import { useCart, useDispatchCart } from '../components/CreateContext';
import { MdDelete } from "react-icons/md";

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div className='m-auto text-center text-md'>
                Cart is empty!
            </div>
        )
    }

    const handleCheckout = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:5000/api/order/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        })
        const json= await response.json();
        if (json.success){
            dispatch({type:"DROP"})
        }
    }

    let totalAmount = data.reduce((total, foodItem) => total + foodItem.price, 0);

    return (
        <div>
            <div className='container m-auto mt-2'>
                <table className='table table-hover'>
                    <tr className='mb-3'>
                        <th>#</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Option</th>
                        <th>Amount</th>
                        <th></th>
                    </tr>



                    <tbody>
                        {
                            data.map((foodItem, index) => (
                                <tr>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{foodItem.name}</td>
                                    <td>{foodItem.qty}</td>
                                    <td>{foodItem.size}</td>
                                    <td>{foodItem.price}</td>
                                    <td><button onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>{<MdDelete />}</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div><h1 className='text-lg'>Total Amount: {totalAmount}/-</h1></div>
                <div>
                    <button className='login mt-5 ' onClick={handleCheckout} > Check Out </button>
                </div>
            </div>

        </div>
    )
}
