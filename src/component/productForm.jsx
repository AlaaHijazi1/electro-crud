import { useContext } from "react";
import { productsContext } from "./context/productContext";
import "./style/productForm.css";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";

function ProductForm() {
  const {
    products,
    setProducts,
    name,
    setName,
    category,
    setCategory,
    price,
    setPrice,
    quantity,
    setQuantity,
    rating,
    setRating,
    Id,
    setId,
    mode,
    editedIdProduct,
    setOrginalProducts,
  } = useContext(productsContext);
  const addProduct = (e) => {
    e.preventDefault();
    if (mode === "Add Product") {
      const product = {
        Id,
        name,
        category,
        price,
        quantity,
        rating,
      };
      // setProducts(product) :  Here is wrong to do this because it replaces the products:
      // The correct way is:
      // Get all the old products and add the new one to them.
      // So, when you change the products here, the useEffect inside the provider
      // will detect the change and immediately run,
      // storing the updated products accordingly.
      setProducts([...products, product]);
      setOrginalProducts([...products, product]);
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        iconHtml:
          '<i class="bi bi-check-circle-fill" style="color: black; font-size: 20px;"></i>',
        customClass: {
          popup: "colored-toast", // We use it to modify the font
        },
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        title: "Product Add successfully",
      });
      setId(Id + 1);
    } else if (mode === "Edit Product") {
      const productAfterUpdet = products.map((product) => {
        if (product.Id === editedIdProduct) {
          // You must return a new object with the rest of the product's properties plus the updates
          return {
            ...product,
            // The new values
            name,
            category,
            price,
            quantity,
            rating,
          };
        }
        return product;
      });
      setProducts(productAfterUpdet);
      setOrginalProducts(productAfterUpdet);
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
        title: "Product updated successfully",
      });
    }
    // Here, after finishing the add or edit, close the modal
    const modalEl = document.getElementById("staticBackdrop");
    const modal = Modal.getInstance(modalEl);
    modal.hide();
    setName("");
    setCategory("");
    setPrice("");
    setQuantity("");
    setRating("");
  };

  return (
    <form id="productForm" onSubmit={addProduct}>
      <div className="name mb-2">
        <label htmlFor="name">Product Name *</label>
        <input
          className="w-100 p-1 mt-1"
          type="text"
          id="name"
          value={name}
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="category mb-2">
        <label htmlFor="category">Category *</label>
        <select
          className="w-100 p-1"
          name="category"
          id="category"
          value={category}
          required
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="" disabled hidden>
            Select Category
          </option>
          <option value="Phones">Phones</option>
          <option value="Laptops">Laptops</option>
          <option value="Cameras">Cameras</option>
          <option value="Accessories">Accessories</option>
          <option value="Speakers">Speakers</option>
        </select>
      </div>
      <div className="price mb-2">
        <label htmlFor="price">Price</label>
        <input
          className="w-100 p-1"
          type="number"
          id="price"
          value={price}
          min={1}
          required
          onChange={(e) => {
            // The value returned from e.target.value is a string
            // that's why we need to convert it to a number
            setPrice(+e.target.value);
          }}
        />
      </div>
      <div className="quantity mb-2">
        <label htmlFor="quantity">Quantity</label>
        <input
          className="w-100 p-1"
          type="number"
          id="quantity"
          value={quantity}
          min={1}
          required
          onChange={(e) => {
            setQuantity(+e.target.value);
          }}
        />
      </div>
      <div className="rating mb-2">
        <label htmlFor="rating">Rating</label>
        <input
          className="w-100 p-1"
          type="number"
          min={1}
          max={5}
          id="rating"
          value={rating}
          required
          onChange={(e) => {
            setRating(+e.target.value);
          }}
        />
      </div>
    </form>
  );
}

export default ProductForm;
