/* ---------------------------------- React --------------------------------- */
import { useContext } from "react";

/* --------------------------------- Router --------------------------------- */
import { Navigate, Outlet } from "react-router-dom";

/* --------------------------------- Context -------------------------------- */
import { Auth } from "../utils/Auth";

const PrivateRoutes = () => {
  /* --------------------------------- Context -------------------------------- */
  const { token } = useContext(Auth);

  return token ? <Outlet /> : <Navigate to={"/login"} />;
};
export default PrivateRoutes;
