import ProductOverview from "./component/productOverview";
import ProductsPanel from "./component/productsPanel";
import ProductsProvider from "./component/context/productContext";
function App() {
  return (
    <>
      <ProductsProvider>
        <ProductOverview />
        <ProductsPanel />
      </ProductsProvider>
    </>
  );
}

export default App;
