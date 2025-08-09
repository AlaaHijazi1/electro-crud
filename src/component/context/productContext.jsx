import { createContext, useEffect, useState } from "react";

export const productsContext = createContext();

function ProductsProvider(props) {
  const [mode, setMode] = useState("");
  const [editedIdProduct, setEditedIdProduct] = useState();
  const [Id, setId] = useState(0);
  const [products, setProducts] = useState([]);
  const [orginalProducts, setOrginalProducts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [rating, setRating] = useState();

  useEffect(() => {
    // هلئهون اول ما يحمل الصفحة رح ياخد كلشي بالستوريج ويروح يخزنه بالمنتجات
    const productsFromStorage =
      JSON.parse(localStorage.getItem("products")) || [];
    const idFromStorage = +localStorage.getItem("Id") || 0;
    setId(idFromStorage);
    setProducts(productsFromStorage);
    setOrginalProducts(productsFromStorage);
  }, []);

  useEffect(() => {
    // هون اي تعديل بصير عالمنتجات مباشرة بتخزن باللوكال ستوريج
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    // هون اي تعديل بصير عالاي دي  مباشرة بتخزن باللوكال ستوريج
    localStorage.setItem("Id", Id);
  }, [Id]);
  return (
    <>
      <productsContext.Provider
        value={{
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
          setMode,
          editedIdProduct,
          setEditedIdProduct,
          orginalProducts,
          setOrginalProducts,
        }}
      >
        {props.children}
      </productsContext.Provider>
    </>
  );
}

export default ProductsProvider;
