import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from './../helper/googleAuth';

export default function PrivateRoute (props){
  const {exact, path, component} = props;
  const isValid = auth.getCookie('userId');

  return <Route exact={exact} path={path} component={ isValid ? component : () => <Redirect to="/login" />} />
}
