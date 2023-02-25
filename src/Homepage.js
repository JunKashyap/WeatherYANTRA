import React, { useEffect, useState } from 'react';
import { desh } from './country';
import './Homepage.css'
import { useStateValue } from './StateProvider';
import FavList from './FavList';
import HomeTables from './HomeTables';
function Homepage() {

    const [{ curr_Location, marked_fav }, dispatch] = useStateValue();
    const { latitude, longitude } = curr_Location[0];
    const [weather, setWeather] = useState(null);
    const [name, setname] = useState(null);
    const [temp, setTemp] = useState(null);
    const [country, setCountry] = useState("");
    const [locationInfo, setlocation] = useState();
    const [inputText, setInputText] = useState("");
    const [searchFound, setSearchFound] = useState(true)

    const fetchData = async () => {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=8045a96438fd1e40cbd6ce2478c69622`)
        let data = await response.json();
        return data
    }
    const response = async () => {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8045a96438fd1e40cbd6ce2478c69622`)
        let data = await response.json();
        return data;
    }

    useEffect(() => {
        async function fetchData() {
            const data = await response();
                setlocation(data);
                setWeather(data.weather);
                setname(data.name);
                setTemp(data.main);
                for (let i = 0; i < desh.length; i++) {
                    if (desh[i].abbreviation === data.sys.country) {
                        setCountry(desh[i].country);
                        break;
                    }
                }
                setSearchFound(true)
        }
        fetchData();
    }, [curr_Location])


    function searchLocation(e) {
        e.preventDefault();
        async function response() {
            const data = await fetchData();
            console.log(data);
            if (data.id) {
                setSearchFound(true)
                setlocation(data);
                setWeather(data.weather);
                setname(data.name);
                setTemp(data.main);
                for (let i = 0; i < desh.length; i++) {
                    if (desh[i].abbreviation === data.sys.country) {
                        setCountry(desh[i].country);
                        break;
                    }
                }
            }else{
                setSearchFound(false)
            }
        }
        response();
    }

    function addtoFav() {
        dispatch({
            type: "FAV_LOCATION",
            values: locationInfo
        })
    }
    
    return (
        <>
            {weather !== null &&
                <>
                    <div className='setBG'>
                        <div className={(weather[0].main)}>
                            <div id='navbar'>
                                <h3 className='markFav' onClick={() => addtoFav()}>+</h3>
                                <h3>{name}, {country}</h3>

                                <div className="dropdown">
                                    <p className="dropbtn">=</p>
                                    <div className="dropdown-content">
                                        <form className='navbar__inputField' onSubmit={(e) => searchLocation(e)}>
                                            <input placeholder='cities, country, state' value={inputText} onChange={(e) => setInputText(e.target.value)} />
                                            <button>search</button>
                                        </form>
                                        {searchFound === false && <p style={{color: "red"}}>Search Not Found!!!</p> }
                                        <br></br>
                                        <hr></hr>
                                        {marked_fav.length === 0? <p>Press on "+" to Add Locations</p> : <p>Marked Locations</p>}
                                        <div className='favLocationList'>
                                            {marked_fav.map((places) => {
                                                return <FavList key={places.id} place={places} />
                                            })}
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='show_Temp'>
                                <h1>{Math.round(temp.temp - 273.15)}</h1>
                                <h2>°c</h2>
                            </div>
                            <div className='show_Sky'>
                                <h3>{weather[0].description}</h3>
                                <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} />
                            </div>
                            <HomeTables curr__location={locationInfo} />
                        </div>
                    </div>
                </>
            }

        </>
    )
}

export default Homepage
