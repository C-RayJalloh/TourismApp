/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import styles from './CountryList.module.css';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from "./Message";
import { useCities } from '../contexts/CitiesContext';

function CountryList() {
 
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
 
  if(!cities.length) return (
    <Message message="Add your own city by clicking a city on the map" />
  );



// Use reduce to create an array of unique countries from cities
const countries = cities.reduce((arr, city) => {
    if (arr.map(el=>el.country).includes(city.country)) 
    return [...arr, {country: city.country, emoji: city.emoji}]
    else return [ ...arr, city]
  }, []);


  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country}  />
      ))}
    </ul>
  );
}

export default CountryList;

