import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";

export default function PrivateRoute({ children }) {
  const { token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
