import React from "react";
import SearchResultItem from "./SearchResultItem";

function SearchResult(props) {
  let {searchList} = props
  console.log(searchList);
  return (
    <>
      <div className="col-12 col-lg-8 col-md-7">
        {
          searchList.map((item,index)=>{
        return <SearchResultItem key={index} item={item}/>
        
      })
}
        <div className="col-12 pagination d-flex justify-content-center">
          <ul className="pages">
            <li>&lt;</li>
            <li className="active">1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>&gt;</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
