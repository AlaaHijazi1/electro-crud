import "./style/ProductsPanel.css";
import Button from "./button";
import ProductCard from "./productCard";
import Modal from "./modal";
import { productsContext } from "./context/productContext";
import { useContext } from "react";
import Swal from "sweetalert2";

function ProductsPanel() {
  // No need to fetch products from localStorage here because in the provider,
  // any update modifies the state directly,
  // so the products remain consistent and display normally here.
  const {
    products,
    setProducts,
    setId,
    setMode,
    orginalProducts,
    setOrginalProducts,
  } = useContext(productsContext);

  const serchProducts = (value) => {
    console.log(orginalProducts);
    if (!value) {
      setProducts(orginalProducts);
      return;
    }
    const filterdProducts = orginalProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase())
    );
    setProducts(filterdProducts);
  };
  const deleteAllProduct = () => {
    if (products.length > 0) {
      Swal.fire({
        text: "Are you sure you want to delete all products?",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#808080",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setProducts([]);
          setOrginalProducts([]);
          setId(0);
        }
      });
    } else {
      Swal.fire({
        title: "No products to delete",
        confirmButtonText: "OK",
        confirmButtonColor: "#0f172a",
      });
    }
  };
  return (
    <div className="container mt-1 ">
      <div className="row product-panel p-4">
        <div className="actions p-4 col-12">
          <div className="search col-4">
            <form role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  serchProducts(e.target.value);
                }}
              />
            </form>
          </div>
          <div className="buttons col-3 d-flex gap-2">
            <Button
              class="btn__add"
              icon={<i className="bi bi-plus"></i>}
              title="Add Product"
              data_bs_target="#staticBackdrop"
              data_bs_toggle="modal"
              changeMode={() => setMode("Add Product")}
            />
            <Button
              class="btn__clear"
              icon={<i className="bi bi-trash3"></i>}
              title="Clear All"
              deleteProducts={deleteAllProduct}
            />
          </div>
        </div>
        <div className="productCards d-flex justify-content-center gap-3 flex-wrap mb-4">
          {products.length > 0 ? (
            products.map((item) => (
              <ProductCard
                key={item.Id} // The key is not passed as a prop; it is used internally by React only
                id={item.Id} // The 'id' prop is used for delete and edit operations
                name={item.name}
                price={item.price}
                category={item.category}
                quantity={item.quantity}
                rating={item.rating}
              />
            ))
          ) : (
            // a message that appears when there are no products
            <p className="text-center w-100">No products available.</p>
          )}
        </div>
        <hr />
      </div>
      <Modal />
    </div>
  );
}

export default ProductsPanel;
