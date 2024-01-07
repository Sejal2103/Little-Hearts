import React, { createContext, useReducer, useContext } from 'react';

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, img: action.img, size: action.size, qty: action.qty }]

        case "REMOVE":
            let newArray = [...state];
            newArray.splice(action.index, 1);
            return newArray

        case "UPDATE":
            return state.map((food) => {
                if (food.id === action.id) {
                    return { ...food, qty: food.qty + action.qty, price: food.price + action.price };
                } else {
                    return food;
                }
            });
        
            case "DROP":
                let empty =[];
                return empty;
        default:
            console.log("error in dispatch")
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <cartDispatchContext.Provider value={dispatch}>
            <cartStateContext.Provider value={state}>
                {children}
            </cartStateContext.Provider>
        </cartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);