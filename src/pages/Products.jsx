import { useEffect, useState } from "react";
import API from "../api/axios";

function Products() {
  const [products, setProducts] = useState([]);

  // Replace later with logged-in userId from AuthContext
  const userId = "0ad4c5e0-aff3-4572-aded-7b9e24df6a33";

  useEffect(() => {
    API.get("/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const addToCart = async (productId,price) => {
    try {

      await API.post("/api/cart/add", {
        userId: userId,
        productId: productId,
        quantity: 1,
        price:price
      });

      alert("Product added to cart successfully");

    } catch (error) {

      console.error(error);
      alert("Failed to add product to cart");

    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Products</h2>

      <div className="row">

        {products.map(p => (

          <div key={p.id} className="col-md-4 mb-4">

            <div className="card shadow-sm h-100">

              <div className="card-body">

                <h5 className="card-title">{p.name}</h5>
              <img
                src={`https://localhost:7240${p.imageUrl}`}
                alt={p.name}
                className="card-img-top product-image"
              />

                <p className="card-text">
                  <strong>Price:</strong> ₹{p.price}
                </p>

                <p className="card-text">
                  <strong>Description:</strong> {p.description}
                </p>

                <p className="card-text">
                  <strong>Stock:</strong> {p.stockQuantity}
                </p>

                <p className="card-text">
                  <strong>Category:</strong> {p.categoryName}
                </p>

                <button
                  className="btn btn-primary w-100"
                  onClick={() => addToCart(p.id,p.price)}
                >
                  Add to Cart
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Products;