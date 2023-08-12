/* -------------------------------- Сonponent ------------------------------- */
import Header from "./components/Header";

/* ---------------------------------- Page ---------------------------------- */
import Home from "./pages/Home";
import Login from "./pages/Login";
import EditProduct from "./pages/EditProduct";
import CreateProduct from "./pages/CreateProduct";
import ViewAllProduct from "./pages/ViewAllProduct";
import NotFound from "./pages/NotFound";

/* --------------------------------- Router --------------------------------- */
import { Route, Routes } from "react-router-dom";

/* ---------------------------- Router Protector ---------------------------- */
import PrivateRoutes from "./router/PrivateRoutes";

/* --------------------------------- Context -------------------------------- */
import { Validation } from "./utils/Auth";

const App = () => {
  return (
    <Validation>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/all-product" element={<ViewAllProduct />} />
          <Route path="/edit-product/:productId" element={<EditProduct />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Validation>
  );
};

export default App;
