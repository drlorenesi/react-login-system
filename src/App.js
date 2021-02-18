import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { decodedAuthToken } from './services/authService';
import ProtectedRoute from './common/ProtectedRoute';
import Navigation from './components/Navigation';
import Movies from './components/Movies';
import MovieForm from './components/MovieForm';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Home from './components/Home';
import Account from './components/Account';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    if (decodedAuthToken()) {
      setUser(decodedAuthToken());
    }
  }, []);

  if (decodedAuthToken()) {
    return (
      <React.Fragment>
        <div className='page-container'>
          <div className='content-wrap'>
            <Navigation user={user} />
            <main role='main' className='container-fluid mt-2'>
              <Switch>
                <Route path='/products/:id' component={ProductDetails} />
                <Route path='/products' component={Products} />
                <ProtectedRoute
                  path='/movies/:id'
                  component={MovieForm}
                  access={[1]}
                />
                <ProtectedRoute
                  path='/movies/new'
                  component={MovieForm}
                  access={[1]}
                />
                <ProtectedRoute
                  path='/movies'
                  component={Movies}
                  access={[1]}
                />
                <Route
                  path='/account'
                  render={(props) => <Account {...props} user={user} />}
                />
                <Route path='/account' component={Account} />
                <Route path='/not-found' component={NotFound} />
                <Route exact path='/' component={Home} />
                <Redirect to='/not-found' />
              </Switch>
            </main>
          </div>
          <Footer />
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <Switch>
        <Route path='/login' component={LoginForm} />
        <Route path='/register' component={RegisterForm} />
        <Redirect to='/login' />
      </Switch>
    );
  }
}
