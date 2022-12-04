import React from 'react';

function SignUp(props) {
  return (
    <>
      {/* <!-- Button trigger modal --> */}

      {/* <!-- Modal --> */}
      <div
        className='modal fade'
        id='sign-up'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='sign-up-title'>
                SignUp
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <div className='row justify-content-center'>
                <div className='col-10 d-flex flex-column py-3'>
                  <button className='w-100 mb-3 p-2 border border-2 d-flex justify-content-center align-items-center'>
                    <i
                      className='fa fa-envelope-o fa-2x me-2 text-danger '
                      area-hidden='true'
                    ></i>
                    continue with gmail
                  </button>
                  <button className='w-100 p-2 btn border border-2 d-flex justify-content-center align-items-center'>
                    <i
                      className='fa fa-facebook-square fa-2x me-2 text-primary'
                      area-hidden='true'
                    ></i>
                    continue with facebook
                  </button>
                </div>
              </div>
              <hr />
              <p className='text-center'>
                Don't have an Acount
                <a href='# ' className='text-danger'>
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
