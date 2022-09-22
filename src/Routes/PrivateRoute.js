import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import authSelectors from '../redux/operation/authSelectors';

const PrivateRoute = ({ component }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return isLoggedIn ? component : <Navigate to="/" />;
};
export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
};
