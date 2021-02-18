import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { decodedAuthToken } from '../services/authService';

function ProtectedRoute({
  access,
  path,
  component: Component,
  render,
  ...rest
}) {
  const user = decodedAuthToken();

  return (
    <Route
      {...rest}
      render={(props) => {
        access.includes(user.roleId);
        if (!access.includes(user.roleId)) return <Redirect to='/' />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoute;
