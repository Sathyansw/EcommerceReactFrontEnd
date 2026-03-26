import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const userId = "0ad4c5e0-aff3-4572-aded-7b9e24df6a33";

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      // Step 1: Get cart items
      const cartResponse = await axios.get(
        `https://localhost:7000/api/cart/${userId}`
      );

      const cartItems = cartResponse.data.items;

      // Step 2: Get product details from Catalog service
      const enrichedCartItems = await Promise.all(
        cartItems.map(async (item) => {
          const productResponse = await axios.get(
            `https://localhost:7000/api/products/${item.productId}`
          );

          return {
            ...item,
            productName: productResponse.data.name,
            imageUrl: productResponse.data.imageUrl
          };
        })
      );

      // Step 3: Update state
      setCartItems(enrichedCartItems);

    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛒 Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-warning">
          Your cart is empty
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              className="card shadow-sm mb-3"
              key={item.productId}
            >
              <div className="row g-0 align-items-center">

                {/* Product Image */}
                <div className="col-md-2 text-center">
                  <img
                    src={`https://localhost:7240/${item.imageUrl}`}
                    className="img-fluid rounded p-2"
                    alt="product"
                  />
                </div>

                {/* Product Details */}
                <div className="col-md-6">
                  <div className="card-body">
                    <h5>{item.productName}</h5>

                    <p>
                      Qty: <strong>{item.quantity}</strong>
                    </p>

                    <p className="text-success">
                      Price: ₹{item.price}
                    </p>
                  </div>
                </div>

                {/* Remove Button */}
                <div className="col-md-4 text-end pe-4">
                  <button className="btn btn-danger">
                    Remove
                  </button>
                </div>

              </div>
            </div>
          ))}

          {/* Total Section */}
          <div className="text-end mt-3">
            <h4>Total: ₹{totalAmount}</h4>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;