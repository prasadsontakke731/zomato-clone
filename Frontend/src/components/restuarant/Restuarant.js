import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Restuarant() {
  let userNameRef = useRef()
  let emailRef = useRef()
  let addressRef = useRef()
  let params = useParams();
  let init = {
    aggregate_rating: 0,
    city: '',
    city_id: 1,
    contact_number: 0,
    cuisine: [],
    cuisine_id: [],
    image: '',
    locality: '',
    location_id: 0,
    mealtype_id: 0,
    min_price: 0,
    name: '',
    rating_text: '',
    thumb: [],
    _id: '',
  };
  let [rDetails, setRDetails] = useState({ ...init });
  let [isContact, setIsContact] = useState(false);
  let [subTotal, setSubTotal] = useState(0);
  let [menuItems, setMenuItems] = useState([]);
  let onChangeHandler = (()=>{

  })
  let loadScript = async () => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://checkout.razorpay.com/v1/checkout.js";
    scriptElement.onload = () => {
      return true;
    };
    scriptElement.onerror = () => {
      return false;
    };
    document.body.appendChild(scriptElement);
  };

  let makePayment = async () => {
    let isLoaded = await loadScript();
    if (isLoaded === false) {
      alert("Unable load payment sdk");
      return false;
    }

    let URL = "http://localhost:3300/api/payment";

    let sendData = {
      amount: subTotal,
      email: emailRef.current.value,
    };

    let { data } = await axios.post(URL, sendData);
    let { order } = data;

    var options = {
      key: "rzp_test_PdFkG8otGS752F",
      amount: order.amount,
      currency: "INR",
      name: "Zomato Clone Payment",
      description: "This is a food payment",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/2d/Zomato_Logo.jpg",
      order_id: order.id,
      handler: async function (response) {
        let URL = "https://localhost:3300/api/callback";
        let sendData = {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
        };

        let { data } = await axios.post(URL, sendData);
        if (data.status === true) {
          alert(
            "Congratulations, your order is placed, payment received successfully."
          );
          window.location.assign("/"); //send home page
        } else {
          alert("payment files, try again.");
        }
      },
      prefill: {
        name: "prasad sontakke",
        email: "prasadsontakke731@gmail.com",
        contact: "9552483803"
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();

    // console.log("hello");
  };
  let getRestuarantDetails = async () => {
    let URL = 'http://localhost:3300/api/get-restuarant-by-id/' + params.id;
    try {
      let response = await axios.get(URL);
      let data = response.data;
      if (data.status === true) {
        setRDetails({ ...data.result });
      } else {
        setRDetails({ ...init });
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  let getMenuList = async () => {
    let URL = 'http://localhost:3300/api/get-menu-item?rid=' + params.id;
    try {
      let response = await axios.get(URL);
      let data = response.data;
      if (data.status === true) {
        // console.log(data);
        // setMenuItems([...data.menu_items]);
        setMenuItems([...data.menuItems]);
      } else {
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  let incMenuItems = (index) => {
    let _menuItems = [...menuItems];
    _menuItems[index].qty += 1;
    setMenuItems(_menuItems);
  };
  let decMenuItems = (index) => {
    let _menuItems = [...menuItems];
    _menuItems[index].qty -= 1;
    setMenuItems(_menuItems);
  };
  useEffect(() => {
    getRestuarantDetails();
  }, []);
  useEffect(() => {
    let subTotal = menuItems.reduce((pValue, cValue) => {
      return pValue + cValue.price * cValue.qty;
    }, 0);
    setSubTotal(subTotal);
  }, [menuItems]);
  //   console.log(menuItems);
  return (
    <>
  


<div className="modal fade" id="slideshow" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg" style={{height:"75vh"}}>
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body h-75">
      <Carousel showThumbs={false} infiniteLoop={true}>{
        rDetails.thumb.map((value ,index)=>{
          return <div key={index} className="w-100">
          <img
            src={'/images/' + value}
            alt=''
            className=''
          />
              {/* <p className="legend">Legend 1</p> */}
          </div>
        })
        }
                
              
            </Carousel>
      </div>
      
    </div>
  </div>
</div>
      <div
        className='modal fade'
        id='exampleModalToggle'
        aria-hidden='true'
        aria-labelledby='exampleModalToggleLabel'
        tabIndex='-1'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalToggleLabel'>
                {rDetails.name}
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              {menuItems.map((item, index) => {
                return (
                  <div className='row p-2' key={index}>
                    <div className='col-8 '>
                      <p className='mb-1 h5'>{item.name}</p>
                      <p className='mb-1 '>{item.price}</p>
                      <p className='small text-muted'>{item.description}</p>
                    </div>
                    <div className='col-4 d-flex justify-content-end'>
                      <div className='menu-food-item'>
                        <img src={`/images/${item.image}`} alt='' />
                        {item.qty === 0 ? (
                          <button
                            className='add btn btn-primary btn-sm'
                            onClick={() => incMenuItems(index)}
                          >
                            Add
                          </button>
                        ) : (
                          <div className='order-item-count section '>
                            <span
                              className='hand'
                              onClick={() => decMenuItems(index)}
                            >
                              -
                            </span>
                            <span>{item.qty}</span>
                            <span
                              className='hand'
                              onClick={() => incMenuItems(index)}
                            >
                              +
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <hr className='p-0 m2-2' />
                  </div>
                );
              })}
              {/* <div className='row p-2'>
                <div className='col-8 '>
                  <p className='mb-1 h5'>Gobi Manchurian</p>
                  <p className='mb-1 '>'89</p>
                  <p className='small text-muted'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                    distinctio!
                  </p>
                </div>
                <div className='col-4 d-flex justify-content-end'>
                  <div className='menu-food-item'>
                    <div className='order-item-count section '>
                      <span>+</span>
                      <span>2</span>
                      <span>-</span>
                    </div>
                  </div>
                </div>
              </div> */}

              {subTotal === 0 ? null : (
                <div className=' d-flex justify-content-between'>
                  <h3>Subtotal {subTotal}</h3>
                  <button
                    className='btn btn-danger '
                    data-bs-target='#exampleModalToggle2'
                    data-bs-toggle='modal'
                  >
                    Pay Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className='modal fade'
        id='exampleModalToggle2'
        aria-hidden='true'
        aria-labelledby='exampleModalToggleLabel2'
        tabIndex='-1'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalToggleLabel2'>
                {rDetails.name}
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <div className='mb-3'>
                <label
                  htmlFor='exampleFormControlInput1'
                  className='form-label'
                >
                  Enter Full Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='name@example.com'
                  value="Prasad Sontakke"
                  ref={userNameRef}
                  onChange={onChangeHandler}
                />
              </div>
              <div className='mb-3'>
                <label
                  htmlFor='exampleFormControlInput1'
                  className='form-label'
                >
                  Email
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='exampleFormControlInput1'
                  placeholder='name@example.com'
                  value="prasad@gmail.com"
                  ref={emailRef}
                  onChange={onChangeHandler}
                />
              </div>
              <div className='mb-3'>
                <label
                  htmlFor='exampleFormControlTextarea1'
                  className='form-label'
                >
                  Address
                </label>
                <textarea
                  className='form-control'
                  id='exampleFormControlTextarea1'
                  rows='3'
                  value="solapur"
                  ref={addressRef}
                  onChange={onChangeHandler}
                >
                  
                </textarea>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                className='btn btn-danger'
                data-bs-target='#exampleModalToggle'
                data-bs-toggle='modal'
              >
                Back
              </button>
              <button
                className='btn btn-success'
                onClick={makePayment
                }
              >
                PROCEED
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='row bg-danger justify-content-center'>
        <Header bgColor="bg-danger"/>
      </div>
      {/* <!-- section --> */}
      <div className='row justify-content-center'>
        <div className='col-10 '>
          <div className='row'>
            <div className='col-12 mt-5'>
              <div className='restaurant-main-image position-relative'>
                <img
                  src={'/images/' + rDetails.image}
                  alt=''
                  className=''
                />
                <button className='btn btn-outline-light position-absolute btn-gallery'data-bs-toggle="modal" data-bs-target="#slideshow">
                  Click To Get Image Gallery
                </button>
              </div>
            </div>
            <div className='col-12'>
              <h3>{rDetails.name}</h3>
              <div className=' d-flex justify-content-between'>
                <ul className='list-unstyled d-flex gap-3 '>
                  <li
                    className={
                      isContact === false
                        ? 'border-bottom border-3 border-danger cursor-pointer'
                        : 'hand'
                    }
                    onClick={() => {
                      setIsContact(false);
                    }}
                  >
                    Overview
                  </li>
                  <li
                    className={
                      isContact === true
                        ? 'border-bottom border-3 border-danger cursor-pointer'
                        : 'hand'
                    }
                    onClick={() => {
                      setIsContact(true);
                    }}
                  >
                    Contact
                  </li>
                </ul>
                <a
                  className='btn btn-danger align-self-start'
                  data-bs-toggle='modal'
                  href='#exampleModalToggle'
                  role='button'
                  onClick={getMenuList}
                >
                  Place Online Order
                </a>
              </div>
              <hr className='mt-0' />
              {isContact === false ? (
                <div className='over-view'>
                  <p className='h5 mb-4'>About this place</p>

                  <p className='mb-0 fw-bold'>cuisine</p>
                  <p>
                    {rDetails.cuisine
                      .reduce((pV, cV) => pV + ', ' + cV.name, '')
                      .substring(1)}
                  </p>
                  <p className='mb-0 fw-bold'>Average Cost</p>
                  <p>{rDetails.min_price} for two people (approx.)</p>
                </div>
              ) : (
                <div className='over-view'>
                  <p className='mb-0 fw-bold'>Phone Number</p>
                  <p>+91 {rDetails.contact_number}</p>
                  <p className='mb-0 fw-bold'>Addres</p>
                  <p>
                    {rDetails.locality},{rDetails.city}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Restuarant;
