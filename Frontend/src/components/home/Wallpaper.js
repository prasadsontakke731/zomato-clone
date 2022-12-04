import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

function Wallpaper(props) {
 

  let [locList, setLocList] = useState([]);
  let navigate = useNavigate();
  let locationRef = useRef();
  let [selectLoc, setSelectLoc] = useState(null);
  let [restuarantList, setRestuarantList] = useState([]);
  let [restDisable, setRestDisabled] = useState(true);
  let getLocationList = async (event) => {
    let city = event.target.value;
    setSelectLoc(null);
    setRestDisabled(true);
    if (city === '' || city.length < 2) {
      setLocList([]);
      return false;
    }
    let URL = 'http://localhost:3300/api/get-location-by-city?city=' + city;
    try {
      let response = await axios.get(URL);
      let { location } = response.data;
      setLocList([...location]);
      console.log(location);
    } catch (error) {
      alert(error);
      console.log('error');
    }
  };
  let selectLocation = (location) => {
    location = JSON.parse(location);
    console.log(location);
    locationRef.current.value = `${location.name}, ${location.city}`;
    setSelectLoc({ ...location });
    setRestDisabled(false);
    setLocList([]);
  };
  let getRestuarantDetails = async (event) => {
    let restuarant = event.target.value;
    if (restuarant === '' || restuarant.length < 2) {
      setRestuarantList([]);
      return false;
    }
    let URL = `http://localhost:3300/api/get-restuarant-by-location-id?lid=${selectLoc.location_id}&rest=${restuarant}`;
    try {
      let response = await axios.get(URL);
      console.log(response);
      let { result } = response.data;
      setRestuarantList([...result]);
      // console.log(response);
      console.log(result);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  let goToRestuarant = (id) => {
    console.log(id);
    navigate('/restuarant/' + id);
  };
  return (
    <section className="row main-section align-content-start" >
    <Header bgColor="" />
      <section className='col-12 d-flex flex-column align-items-center justify-content-center'>
        <p className='brand-name fw-bold my-lg-2 mb-0'>e!</p>
        <p className='h1 text-white my-3 text-center'>
          Find the best restaurants, cafés, and bars
        </p>
        <div className='search w-50 d-flex mt-3'>
          <div className='d-flex flex-column position-relative'>
            <input
              type='text'
              className='form-control mb-3 mb-lg-0 w-50 me-lg-3 py-2 px-3 w-100'
              placeholder='Please type a location'
              onChange={getLocationList}
              ref={locationRef}
            />
            <ul
              className='list-group position-absolute w-100'
              style={{ top: '100%' }}
            >
              {locList.map((location) => {
                return (
                  <li
                    className='list-group-item'
                    key={location._id}
                    onClick={() =>
                      selectLocation(`${JSON.stringify(location)}`)
                    }
                  >
                    {location.name}, {location.city}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='d-flex flex-column position-relative w-100'>
            <div className='w-100 input-group'>
              <span className='input-group-text bg-white'>
                <i className='fa fa-search text-primary'></i>
              </span>
              <input
                type='text'
                className='form-control py-2 px-3 '
                placeholder='Search for restuarants'
                onChange={getRestuarantDetails}
                disabled={restDisable}
              />
            </div>
            <ul
              className='list-group position-absolute w-100'
              style={{ top: '100%' }}
            >
              {restuarantList.map((restuarant) => {
                return (
                  <li
                    className='list-group-item'
                    key={restuarant._id}
                    onClick={() => goToRestuarant(restuarant._id)}
                  >
                    <div className='rest-search-auto-complete d-flex '>
                      <img src={`/images/assets/breakfast.png`} alt='' />
                      <div className='d-flex flex-column ms-3'>
                        <p className='mb-0 fw-bold'>{restuarant.name}</p>
                        <span className='small text-muted'>
                          {restuarant.locality}, {restuarant.city}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Wallpaper;
