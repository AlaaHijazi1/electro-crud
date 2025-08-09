import "./style/ProductOverview.css";
import StateCards from "./stateCards";
import { useContext } from "react";
import { productsContext } from "./context/productContext";
function ProductOverview() {
  const { products } = useContext(productsContext);

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="titles text-center p-3">
            <h1 className="p-4 fw-bold">
              <i className="bi bi-box-seam fs-3 text-white"></i>ElectroManager
            </h1>
            <p className="text-secondary">Manage your inventory with ease</p>
          </div>
          <div className="row cards gap-3 p-3">
            <StateCards
              icon={<i className="bi bi-cart fs-4"></i>}
              title="Total Products"
              value={products.length}
            />
            <StateCards
              icon={<i className="bi bi-graph-up fs-4"></i>}
              title="Categories"
              value="5"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductOverview;
