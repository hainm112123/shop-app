import { createContext, useState } from "react";

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [cart, updateCart] = useState([]);

  const addToCart = (product) => {
    const index = cart.findIndex((item) => JSON.stringify(item.product) === JSON.stringify(product));
    let newCart = JSON.parse(JSON.stringify(cart));
    if (index === -1) {
      newCart.push({product, quantity: 1});
    }
    else {
      newCart[index].quantity ++;
    }
    updateCart(newCart);
    // console.log(product);
  }

  const removeFromCart = (product) => {
    const index = cart.findIndex((item) => JSON.stringify(item.product) === JSON.stringify(product));
    let newCart = JSON.parse(JSON.stringify(cart));
    if (index === -1) return;
    newCart[index].quantity --;
    if (newCart[index].quantity === 0) newCart.splice(index, 1);
    updateCart(newCart);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}