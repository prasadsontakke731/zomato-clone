import React, { useEffect, useState } from 'react';
import QuickSearchItem from './QuickSearchItem';
import axios from 'axios';

function QuickSearch() {
  let [meal_type, setMeal_type] = useState([]);
  let getQuickSearchData = async () => {
    let URL = 'http://localhost:3300/api/get-meal-type';
    try {
      let response = await axios.get(URL);
      let { status, mealType } = response.data;
      if (status) {
        setMeal_type([...mealType]);
      } else {
        alert('mealType not found ');
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  useEffect(() => {
    getQuickSearchData();
  }, []);
  return (
    <>
      <section className='row justify-content-center'>
        <section className='col-10 mt-3'>
          <h3 className='fw-bold text-navy'>Quick Searches</h3>
          <p className='text-secondary'>Discover restuarants by type of meal</p>
        </section>
        <section className='col-10'>
          {/* <button onClick={getQuickSearchData}>click</button> */}
          <section className='row py-2'>
            <section className='col-12 px-0 d-flex justify-content-between flex-wrap'>
              {meal_type.map((meal) => {
                return <QuickSearchItem meal={meal} key={meal._id} />;
              })}
            </section>
          </section>
        </section>
      </section>
    </>
  );
}

export default QuickSearch;
