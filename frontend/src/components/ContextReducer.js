import React, { createContext, useContext, useEffect, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();
// we are making global variable so we can access anywhere in our application
// for this code refer video 11 of endtoend youtuber

// here state means i have to perform Add,update this includes in state
// if i want to perform action then "i will use dispatch"
const reducer = (state, action) => {
  //this should be written while we have to add,update or delete
  switch (action.type) {
    
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          img: action.img,
          qty: action.qty,
          size: action.size,
          price: action.price,
        },
      ];
      // always while to remove item from cart we have to declare a varible , and then have to intialize out state
    //   in ADD we can declare directly but in remove we have to do this!!  "IMPORTANT"
      case "REMOVE":
      const newArr = [...state]  
      newArr.splice(action.index,1)
      return newArr

      case "UPDATE":
        const arr = [...state]
        arr.find((food,index)=>{
            if(food.id === action.id){
                arr[index] = {...food , qty:parseInt(action.qty) + food.qty, price:action.price + food.price}
            }
            return arr;
        })
        return arr

        case  "DROP":
          let emptyArr = []
          return emptyArr 

    default:
      console.log("Error in reducer");
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []); //here [] means our initial state of cart will be empty , and then we have to append data..
  return (
    <>
      <CartDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
          {children}
        </CartStateContext.Provider>
      </CartDispatchContext.Provider>
    </>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
