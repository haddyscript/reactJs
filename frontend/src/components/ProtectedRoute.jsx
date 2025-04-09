import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const { token } = useSelector((state) => state.auth);

  if(!token) {
    alert("Please login to access this page, thank you!");
  }
  return token ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
