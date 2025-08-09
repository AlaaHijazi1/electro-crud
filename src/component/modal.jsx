import ProductForm from "./productForm";
import { useContext } from "react";
import { productsContext } from "./context/productContext";
import "./style/modal.css";
function Modal() {
  const { setName, setCategory, setPrice, setQuantity, setRating, mode } =
    useContext(productsContext);
  const clearForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
    setRating("");
  };
  return (
    <div
      className="modal fade "
      id="staticBackdrop"
      data-bs-backdrop="false"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title fw-bold" id="staticBackdropLabel">
              Add New Product
            </p>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={clearForm}
            ></button>
          </div>
          <div className="modal-body">
            <ProductForm />
          </div>
          <div className="modal-footer m-auto border-0">
            <button
              type="submit"
              form="productForm"
              className="btn btn__add  text-white"
            >
              {mode}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={clearForm}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
