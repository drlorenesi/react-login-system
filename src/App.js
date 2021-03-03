import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { useIdleTimer } from 'react-idle-timer';
import {
  decodedAuthToken,
  getAuthToken,
  removeAuthToken,
} from './services/authService';
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
import LogoutModal from './common/LogoutModal';

toast.configure();
Modal.setAppElement('#root');

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOnIdle = () => {
    if (!getAuthToken()) return null;
    setModalIsOpen(true);
    // console.log('last active', getLastActiveTime());
    // removeAuthToken();
    // window.location = '/login';
  };

  const handleLogout = () => {
    console.log('Signed out.');
    setModalIsOpen(false);
  };

  const handleStayConnected = () => {
    console.log('Connection kept alive.');
    setModalIsOpen(false);
  };

  const { getLastActiveTime } = useIdleTimer({
    timeout: 5000,
    onIdle: handleOnIdle,
  });

  useEffect(() => {
    if (decodedAuthToken()) {
      setUser(decodedAuthToken());
    }
  }, []);

  if (decodedAuthToken()) {
    return (
      <React.Fragment>
        <LogoutModal
          isOpen={modalIsOpen}
          logout={handleLogout}
          stayConnected={handleStayConnected}
        />
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
