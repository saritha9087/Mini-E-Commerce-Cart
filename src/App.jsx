import React, { useState } from "react";
import hero from "./assets/hero.png";


export default function App() {
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 50000,
      image: hero
    },
    {
      id: 2,
      name: "Smartphone",
      price: 25000,
      image: hero
    },
    {
      id: 3,
      name: "Headphones",
      price: 3000,
      image: hero
    },
    {
      id: 4,
      name: "Smart Watch",
      price: 5000,
      image: hero
    }
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const itemExists = cart.find((item) => item.id === product.id);

    if (itemExists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:Arial,sans-serif;
        }

        body{
          background:#f4f6f9;
        }

        .container{
          max-width:1200px;
          margin:auto;
          padding:20px;
        }

        .title{
          text-align:center;
          margin-bottom:30px;
          color:#333;
        }

        .products{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
          gap:20px;
        }

        .card{
          background:white;
          border-radius:12px;
          padding:15px;
          box-shadow:0 4px 10px rgba(0,0,0,0.1);
          text-align:center;
        }

        .card img{
          width:100%;
          border-radius:10px;
        }

        .card h3{
          margin:10px 0;
        }

        .price{
          color:#28a745;
          font-size:18px;
          font-weight:bold;
        }

        .add-btn{
          background:#007bff;
          color:white;
          border:none;
          padding:10px 15px;
          margin-top:10px;
          border-radius:6px;
          cursor:pointer;
        }

        .add-btn:hover{
          background:#0056b3;
        }

        .cart{
          margin-top:40px;
          background:white;
          padding:20px;
          border-radius:12px;
          box-shadow:0 4px 10px rgba(0,0,0,0.1);
        }

        .cart-item{
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:15px 0;
          border-bottom:1px solid #ddd;
        }

        .qty{
          display:flex;
          align-items:center;
          gap:10px;
        }

        .qty button{
          width:35px;
          height:35px;
          border:none;
          border-radius:5px;
          background:#28a745;
          color:white;
          font-size:18px;
          cursor:pointer;
        }

        .remove{
          background:red;
          color:white;
          border:none;
          padding:8px 15px;
          border-radius:5px;
          cursor:pointer;
        }

        .total{
          margin-top:20px;
          text-align:right;
          color:#222;
        }

        .empty{
          text-align:center;
          color:gray;
          padding:20px;
        }
      `}</style>

      <div className="container">
        <h1 className="title">🛒 Mini E-Commerce Cart System</h1>

        <div className="products">
          {products.map((product) => (
            <div className="card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>

              <button
                className="add-btn"
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>

        <div className="cart">
          <h2>Shopping Cart</h2>

          {cart.length === 0 ? (
            <div className="empty">Cart is Empty</div>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>
                  </div>

                  <div className="qty">
                    <button onClick={() => decreaseQty(item.id)}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQty(item.id)}>
                      +
                    </button>
                  </div>

                  <button
                    className="remove"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <h2 className="total">
                Total Price: ₹{totalPrice}
              </h2>
            </>
          )}
        </div>
      </div>
    </>
  );
}