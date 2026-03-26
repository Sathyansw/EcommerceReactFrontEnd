import { useEffect, useState } from "react";
import API from "../api/axios";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    API.get("api/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));

  }, []);

  return (

    <div className="container mt-5">

      <h2 className="mb-4 text-center">📦 My Orders</h2>

      {orders.length === 0 ? (

        <div className="alert alert-info text-center">
          No orders found
        </div>

      ) : (

        orders.map(order => (

          <div
            key={order.id}
            className="card shadow-sm mb-4"
          >

            <div className="card-body">

              <div className="row align-items-center">

                {/* Order ID */}
                <div className="col-md-4">
                  <h6 className="text-muted">Order ID</h6>
                  <p className="fw-bold">
                    {order.id}
                  </p>
                </div>

                {/* Total Amount */}
                <div className="col-md-3">
                  <h6 className="text-muted">
                    Total Amount
                  </h6>

                  <p className="text-success fw-bold">
                    ₹{order.totalAmount}
                  </p>
                </div>

                {/* Status */}
                <div className="col-md-3">

                  <h6 className="text-muted">
                    Status
                  </h6>

                  <span className="badge bg-success">
                    Completed
                  </span>

                </div>

                {/* View Button */}
                <div className="col-md-2 text-end">

                  <button
                    className="btn btn-outline-primary btn-sm"
                  >
                    View Details
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))

      )}

    </div>

  );

}

export default Orders;