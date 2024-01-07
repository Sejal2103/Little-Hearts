import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyOrders() {
    const [orderData, setOrderData] = useState([]);

    const orderPage = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/order/myorderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem("userEmail")
                })
            });
            let res = await response.json();

            if (res.myOrders && res.myOrders.order_data) {
                setOrderData(res.myOrders.order_data);
            } else {
                setOrderData([]);
            }
        } catch (error) {
            console.error("Error fetching order data:", error.message);
        }
    }

    useEffect(() => {
        orderPage();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                {Array.isArray(orderData) && orderData.map((item, index) => (
                    <div key={index}>
                        {item.map((arrayData, arrayIndex) => (
                            <div key={arrayIndex}>
                                {arrayData.Order_date &&
                                    <div className='row mt-3 mb-3'>
                                        <div className='col-12'>
                                            <h4>{arrayData.Order_date}</h4>
                                           
                                        </div>
                                    </div>
                                }
                                {!arrayData.Order_date &&
                                    <div className=''>
                                        <div className="d-flex flex-row card mt-3" style={{maxHeight: "360px" }}>
                                            <img src={arrayData.img} className="card-img-top" alt="..." style={{ width: "120px", height: "120px", objectFit: "fill" }} />
                                            <div className="card-body">
                                                <h5 className="card-title font-semibold text-xl">{arrayData.name}</h5>
                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                    <span className='mr-1'>{arrayData.qty}</span>
                                                    <span className='mr-1'>{arrayData.size}</span>
                                                
                                                    <div className='h-100 w-20 fs-5'>
                                                        ₹{arrayData.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}
