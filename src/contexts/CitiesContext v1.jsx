/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext} from "react"

const CitiesContext = createContext();


const BASE_URL = "http://localhost:8000";
function CitiesProvider ({ children}) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [ currentCity, setCurrentCity ] = useState({})
  
    useEffect(function () {
      // Fetch the data when the component mounts
      const fetchCities = async () => {
        try {
          setIsLoading(true);
          const res = await fetch(`${BASE_URL}/cities`);
          console.log(res);
          if (!res.ok) throw new Error("Could not get cities");
          const data = await res.json();
          console.log(data);
          setCities(data);
          setCurrentCity(data);
        } catch (error) {
          console.error("Unable to fetch the data", error);
          // You might want to handle the error more gracefully, e.g., show an error message to the user
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchCities();
    }, []);


  //   // Callback function to handle city deletion
  // const handleDeleteCity = (deletedCity) => {
  //   // Filter out the deleted city from the list
  //   const updatedCities = cities.filter((city) => city !== deletedCity);
  //   setCities(updatedCities);
  // };
  
 async function getCity(id) {
    try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        console.log(res);
        if (!res.ok) throw new Error("Could not get cities");
        const data = await res.json();
        // react query for new added city
        setCities(data);
      } catch (error) {
        console.error("Unable to fetch the data", error);
        // You might want to handle the error more gracefully, e.g., show an error message to the user
      } finally {
        setIsLoading(false);
      }
    }
 
  
    async function createCity(newCity) {
      try {
          setIsLoading(true);
          const res = await fetch(`${BASE_URL}/cities`,{
            // standard way of creating a POST REQ to an API
          method: "POST",
          body: JSON.stringify(newCity),
          header: {
            "Content-Type": "application/json"
          },
        });
         
         
          const data = await res.json();
          // react query for new added city
        setCities((cities) => [...cities, data]);
        } catch (error) {
          alert("Unable to fetch the data");
          // You might want to handle the error more gracefully, e.g., show an error message to the user
        } finally {
          setIsLoading(false);
        }
      }

      
    async function handleDeleteCity(id) {
      try {
          setIsLoading(true);
         await fetch(`${BASE_URL}/cities/${id}`,{
            // standard way of creating a POST REQ to an API
          method: "DELETE",
        });
         
        setCities((cities) =>  cities.filter((city)=> city.id !== id));
        } catch (error) {
          alert("There was an error when deleting city.");
          // You might want to handle the error more gracefully, e.g., show an error message to the user
        } finally {
          setIsLoading(false);
        }
      }
   


  return (
    <CitiesContext.Provider  value={{
        cities,
        isLoading,
        handleDeleteCity,
        currentCity,
        getCity,
        createCity,
    }}>
        {children}
    </CitiesContext.Provider>
  )

}

// build a costum hook to access the context
function useCities () {
    const context = useContext(CitiesContext);
     return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities }