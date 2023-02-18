import React, { useEffect, useState } from 'react'
import { desh } from './country';
import { useStateValue } from './StateProvider';
import './FavList.css'

function FavList({place}) {
    const[,dispatch] = useStateValue();
    let country = "";
    for(let i = 0; i<desh.length; i++){
        if(desh[i].abbreviation === place.sys.country){
            country = desh[i].country;
            break;
        }
    }

    function selectLocation(){
        console.log(place.name);
        let longitude = place.coord.lon
        let latitude = place.coord.lat
        dispatch({
          type: "ADD_CURR_LOCATION",
          values: { longitude, latitude },
        });
    }

    function removeFromFav(){
        console.log(place.id);
        dispatch({
            type: "REMOVE_FROM_FAV",
            values : place.id
        })
    }

    return (
      <>
        <div className="favList">
          <h5 onClick={() => selectLocation()}>
            {country}, {place.name}, {Math.round(place.main.temp - 273.15)}°c,{" "}
            {place.weather[0].description}
          </h5>
          <p onClick={()=>removeFromFav()}>␡</p>
        </div>
      </>
    );
}

export default FavList