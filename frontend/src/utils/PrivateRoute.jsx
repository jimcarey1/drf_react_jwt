import {Route, Navigate} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({component: Component, ...rest}) => {
  const {user} = useContext(AuthContext);
  return user ? <Component {...rest} /> : <Navigate to='/login' />;
}

export default PrivateRoute;