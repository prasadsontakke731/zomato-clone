import React, { useEffect, useState } from 'react';
import Login from './user/Login';
import SignUp from './user/SignUp';
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

function Header(props) {
  let [userLogin, setUserLogin] = useState(null);
  let { bgColor } = props;
  let onSuccess = (response) => {
    let token = response.credential;
    localStorage.setItem('oauth_token', token);
    Swal.fire({
      icon: 'success',
      title: 'Login Successfully...',
    }).then(() => {
      window.location.reload();
    });
  };
  let onError = () => {
    alert('wrong');
  };
  let logout = () => {
    Swal.fire({
      title: 'Are you sure to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('oauth_token');
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    let token = localStorage.getItem('oauth_token');
    if (token) {
      var decoded = jwt_decode(token);
      setUserLogin(decoded);
      //   console.log(decoded);
    } else {
      setUserLogin(null);
    }
  }, []);
  return (
    <>
      <GoogleOAuthProvider clientId='375843537071-bu8ros1ohs6nf9lg31rnu2ac5pngaigr.apps.googleusercontent.com'>
        <Login success={onSuccess} error={onError} />
        <SignUp />
        <header className={'col-12 py-3' + bgColor}>
          <div className='container d-lg-flex justify-content-between '>
            <p className='m-0 brand'>e!</p>
            <div>
              {userLogin === null ? (
                <div>
                  <button
                    className='btn text-white me-3'
                    data-bs-toggle='modal'
                    data-bs-target='#login'
                  >
                    Login
                  </button>
                  <button
                    className='btn text-white border border-white'
                    data-bs-toggle='modal'
                    data-bs-target='#sign-up'
                  >
                    Create an account
                  </button>
                </div>
              ) : (
                <div>
                  <span className=' text-white me-3'>
                    Welocome, {userLogin.name}
                  </span>
                  <button className='btn btn-outline-warning' onClick={logout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
      </GoogleOAuthProvider>
      ;
    </>
  );
}

export default Header;
