import React from 'react';
import HomePage from './components/home/HomePage';

import SearchPage from './components/search/SearchPage';
import Restuarant from './components/restuarant/Restuarant';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <>
     <main className='container-fluid'>
      
<Routes>
<Route path='/' element={<HomePage/>}/>
<Route path='/quick-search' element={<SearchPage/>}/>
<Route path='/restuarant/:id' element={<Restuarant/>}/>
</Routes>

     
     
      
      </main>
    </>
  );
}

export default App;
