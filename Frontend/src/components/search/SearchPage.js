import React from 'react';

import { useEffect, useState } from 'react';
import SearchFilter from './SearchFilter';

import SearchResult from './SearchResult';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Header from '../Header';
// import { getValue } from '@testing-library/user-event/dist/utils';

function SearchPage() {
  let [filter, setFilter] = useState({});
  let [searchParams] = useSearchParams();
  // let [mealtype,setmealtype] = useState(null)
  let [searchList, setSearchList] = useState([]);
  let [LocationList, setLocationList] = useState([]);
  let getFilterDetails = async (_filter) => {
    let URL = 'http://localhost:3300/api/filter';
    //filter
    _filter = { ..._filter };
    if (searchParams.get('meal_type'))
      _filter['mealtype'] = searchParams.get('meal_type');
    // console.log(filter);
    try {
      let response = await axios.post(URL, _filter);
      let data = response.data;
      setSearchList([...data.result]);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  let getLocationList = async () => {
    let URL = 'http://localhost:3300/api/get-location';

    try {
      let response = await axios.get(URL);
      let data = response.data;
      setLocationList([...data.location]);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  let filterData = (event, option) => {
    let { value } = event.target;
    // console.log(value);
    let _filter = {};
    switch (option) {
      case 'location':
        _filter['location'] = value;
        break;

      case 'sort':
        _filter['sort'] = value;
        break;
      case 'cuisine':
        let cuisine = [1];
        _filter['cuisine'] = cuisine;
        break;

      case 'cost':
        let cost = value.split('-');
        _filter['lcost'] = cost[0];
        _filter['hcost'] = cost[1];
        break;

      default:
    }
    setFilter({ ...filter, ..._filter });
    // getFilterDetails(filter);
    // console.log(filter);
  };
  useEffect(() => {
    // setmealtype()
    // getFilterDetails(filter);
    getLocationList();
  }, []);
  useEffect(() => {
    getFilterDetails(filter);
  }, [filter]);

  return (
    <>
      <div className='row bg-danger justify-content-center'>
        <Header bgColor='bg-danger' />
      </div>
      {/* <!-- section --> */}
      <div className='row'>
        <div className='col-12 px-5 pt-4'>
          <p className='h3'>Breakfast Places In Mumbai</p>
        </div>
        {/* <!-- food item --> */}
        <div className='col-12 d-flex flex-wrap px-lg-5 px-md-5 pt-4'>
          <SearchFilter LocationList={LocationList} filterData={filterData} />
          {/* <!-- search result --> */}
          <SearchResult searchList={searchList} />
        </div>
      </div>
    </>
  );
}
export default SearchPage;
