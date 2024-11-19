import React, { createContext, useContext, useReducer } from 'react';

// Create contexts
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, {id:action.id,name:action.name,size:action.size,qty:action.qty,price:action.price,img:action.img}];
            case 'REMOVE':
               let newArr =[...state]
               newArr.splice(action.index,1)
               return newArr;
               case 'UPDATE':
                return state.map(item => 
                    item.id === action.id ? { ...item, qty: parseInt(item.qty) + parseInt(action.qty), price: action.price } : item
                );
                case 'DROP':
                let empArray =[]
                return empArray;
                
                
                case "CLEARCART":
                    return [];

        // Add cases for your reducer here
        default:
            return state;
    }
};

// CartProvider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

// Custom hooks for using the contexts
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
