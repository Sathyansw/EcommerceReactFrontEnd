import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {

  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const userId = "0ad4c5e0-aff3-4572-aded-7b9e24df6a33";

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {

    try {

      const response = await axios.get(
        `https://localhost:7000/api/cart/${userId}`
      );

      setCartItems(response.data.items);

    } catch (error) {

      console.error("Error loading cart:", error);

    }
  };


  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  const handlePlaceOrder = async () => {

    try {

      const token = localStorage.getItem("token");

      const orderData = {

        userId,
        address,
        phoneNumber,

        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        })),

        totalAmount
      };


      const orderResponse = await axios.post(
        "https://localhost:7000/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      const orderId = orderResponse.data.orderId;

      console.log("OrderId received:", orderId);


      await axios.post(
        "https://localhost:7000/api/payments",
        {
          orderId,
          amount: totalAmount,
          paymentMethod: "Gpay"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      // await axios.delete(
      //   `https://localhost:7000/api/cart/${userId}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   }
      // );


      alert("Order placed successfully!");

      navigate("/orders");

    } catch (error) {

      console.error("Order failed:", error.response?.data);
      console.error("Full error:", error);

      alert("Order failed. Try again.");

    }
  };


  return (

    <div className="container mt-5">

      <h2 className="mb-4">🧾 Checkout</h2>

      <div className="row">

        <div className="col-md-6">

          <div className="card p-4 shadow-sm">

            <h5>Shipping Details</h5>

            <input
              type="text"
              placeholder="Enter Address"
              className="form-control mb-3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              type="text"
              placeholder="Enter Phone Number"
              className="form-control"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

          </div>

        </div>


        <div className="col-md-6">

          <div className="card p-4 shadow-sm">

            <h5>Order Summary</h5>

            {cartItems.map(item => (

              <div
                key={item.productId}
                className="d-flex justify-content-between"
              >

                <span>
                  {item.productId} × {item.quantity}
                </span>

                <span>
                  ₹{item.price * item.quantity}
                </span>

              </div>

            ))}

            <hr />

            <h4>Total: ₹{totalAmount}</h4>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Checkout;