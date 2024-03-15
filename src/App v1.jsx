import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import PageNotFound from "./pages/PageNotFound";

const BASE_URL = "http://localhost:8000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      } catch (error) {
        console.error("Unable to fetch the data", error);
        // You might want to handle the error more gracefully, e.g., show an error message to the user
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  // Callback function to handle city deletion
  const handleDeleteCity = (deletedCity) => {
    // Filter out the deleted city from the list
    const updatedCities = cities.filter((city) => city !== deletedCity);
    setCities(updatedCities);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* the root path */}
          <Route path="/" element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            {/** the default nested route if none of the following doesn't match */}
            <Route index element={<Navigate replace to="cities" />} />
            {/* /app/nested routes */}
            <Route
              path="cities"
              element={
                <CityList
                  cities={cities}
                  isLoading={isLoading}
                  onDelete={handleDeleteCity}
                />
              }
            />
            <Route path="cities/:id" element={<City />} />
            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
