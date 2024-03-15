/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCities } from '../contexts/CitiesContext';

const formatDate = (date) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    // Check if the date is valid
    return 'Invalid Date';
  }

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsedDate);
};


function CityItem({city}) {
  const { handleDeleteCity, currentCity} = useCities();
   const { cityName, emoji, date, id, position } = city  ?? {};
   
  // handleDelete function 
   const handleDel = (e) => {
    // Call the onDelete callback with the city object
    e.preventDefault();
    handleDeleteCity(id);
  };

  return (
    <Link className={`${styles.cityItem} ${id === currentCity.id? styles["cityItem--active"] : "" }`} 
    to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
      <>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn} onClick={handleDel}>
        &times;
      </button></>
    </Link>
  );
}


export default CityItem
