/* eslint-disable react/prop-types */

import styles from './CityList.module.css'
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from "./Message";
import { useCities } from '../contexts/CitiesContext';


function CityList() {
// reveving the data from the context
  const { cities, isLoading, handleDelete } = useCities()
  

    if(isLoading) return <Spinner />;

    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map " />
    return (
        <ul className={styles.cityList}>
          {cities.map((city) => (
        <CityItem city={city}  key={city.id} onDelete={handleDelete}/>
       
      ))}
        </ul>
    )
}

export default CityList
