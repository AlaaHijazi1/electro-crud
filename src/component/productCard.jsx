import "./style/productCard.css";
import { productsContext } from "./context/productContext";
import { useContext } from "react";
import Modal from "./modal";
import Swal from "sweetalert2";

function ProductCard(props) {
  const {
    products,
    setProducts,
    setName,
    setCategory,
    setPrice,
    setQuantity,
    setRating,
    setMode,
    setEditedIdProduct,
    setOrginalProducts,
  } = useContext(productsContext);
  const editProduct = (id) => {
    setEditedIdProduct(id);
    const product = products.find((product) => product.Id === id);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setQuantity(product.quantity);
    setRating(product.rating);
  };

  const deleteProduct = (id) => {
    Swal.fire({
      text: "Are you sure you want to delete this product?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#808080",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          iconHtml:
            '<i class="bi bi-check-circle-fill" style="color: black; font-size: 20px;"></i>',
          customClass: {
            popup: "colored-toast",
          },
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          title: "Product Deleted successfully",
        });
        const productsAfterDeleted = products.filter(
          (product) => product.Id !== id
        );
        setProducts(productsAfterDeleted);
        setOrginalProducts(productsAfterDeleted);
      }
    });
  };

  const showStars = (rating) => {
    /*
This means creating an array with a length equal to the rating,
but all its elements are undefined.
*/
    // Array.from({ length: rating })

    // Then we use map((_, index))
    // The underscore represents the value, which we don't care about because it's undefined.
    // We just want to iterate using the index.

    return Array.from({ length: rating }).map((_, index) => (
      <i key={index} className="bi bi-star-fill text-warning"></i>
    ));
  };

  return (
    <div className="card col-12 col-lg-4 p-3" style={{ width: "330px" }}>
      <div className="category d-flex justify-content-between align-items-center">
        <small>{props.category}</small>
        <div className="Actions">
          <i
            className="bi bi-pencil-square"
            data-bs-target="#staticBackdrop"
            data-bs-toggle="modal"
            onClick={() => {
              setMode("Edit Product");
              editProduct(props.id);
            }}
          ></i>
          <i
            className="bi bi-trash"
            onClick={() => {
              deleteProduct(props.id);
            }}
          ></i>
        </div>
      </div>
      <div className="name fw-bold fs-5">
        <p>{props.name}</p>
      </div>
      <div className="price d-flex justify-content-between align-items-center">
        <small className="text-secondary">Price:</small>
        <p className="fs-5 fw-bold">{`$${props.price}`}</p>
      </div>
      <div className="quantity d-flex justify-content-between align-items-center">
        <small className="text-secondary">Quantity:</small>
        <p>{props.quantity}</p>
      </div>
      <div className="rating d-flex justify-content-between align-items-center">
        <small className="text-secondary">Rating:</small>
        <p>{showStars(props.rating)}</p>
      </div>
      <hr />
      <div className="total-Value d-flex justify-content-between align-items-center">
        <small className="text-secondary">Total Value:</small>
        <p className="fw-bold">{`$${props.price * props.quantity}`}</p>
      </div>
      <Modal />
    </div>
  );
}

export default ProductCard;
