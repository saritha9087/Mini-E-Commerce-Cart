import { useState } from "react";
import "./App.css";

function App() {
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 50000,
      image: "https://via.placeholder.com/200"
    },
    {
      id: 2,
      name: "Smartphone",
      price: 25000,
      image: "https://via.placeholder.com/200"
    },
    {
      id: 3,
      name: "Headphones",
      price: 3000,
      image: "https://via.placeholder.com/200"
    },
    {
      id: 4,
      name: "Smart Watch",
      price: 5000,
      image: "https://via.placeholder.com/200"
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
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
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
  );
}

export default App;