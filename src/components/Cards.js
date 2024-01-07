import React, { useState, useEffect, useRef } from 'react'
import { useCart, useDispatchCart } from './CreateContext';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
export default function Cards(props) {
    const navigate = useNavigate();
    const options = props.options;
    const optionsPrice = Object.keys(options)
    const [size, setSize] = useState("")
    const [qty, setQty] = useState(1)
    const priceRef = useRef();

    let dispatch = useDispatchCart();
    let data = useCart();
    const validQty = parseInt(qty) || 0;
    let finalPrice = validQty * parseInt(options[size])

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    const handleCart = async () => {
         { if (!localStorage.getItem("accessToken")) navigate("/signup"); }
        let existingFood = data.find(item => item.id === props.foodItem._id);

        if (existingFood) {
            if (existingFood.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: validQty });
                return;
            } else {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, size: size, img: props.foodItem.img, qty: validQty });
                return;
            }
        }

        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, size: size, img: props.foodItem.img, qty: validQty })

    }

    return (
        <div>
            <div className="card" style={{ height: '100%' }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                <div className="p-3 card-body">
                    <p className="font-semibold text-lg">{props.foodItem.name}</p>
                    {/* <p className="text-sm">{props.desc}</p> */}
                    <p className="text-lg">Rs.{finalPrice}/-</p>
                    <div className='d-flex flex-row mt-2' >
                        <div className='flex flex-row bg-light mr-2' style={{ height: "40px" }}>
                            <button onClick={() => setQty(qty - 1)} className='px-3 hover:bg-black hover:text-white'>
                                <div>
                                    <HiMinusSm />
                                </div>
                            </button>
                            <p className='py-2 text-center'>
                                {qty}
                            </p>
                            <button onClick={() => setQty(qty + 1)} className='px-3 hover:bg-black hover:text-white'>
                                <div>
                                    <HiPlusSm />
                                </div>
                            </button>
                        </div>
                        <select className='bg-light py-2 px-3 ' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {
                                optionsPrice.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })
                            }
                        </select>
                    </div>
                    <button className="mt-2 addcart" onClick={handleCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
