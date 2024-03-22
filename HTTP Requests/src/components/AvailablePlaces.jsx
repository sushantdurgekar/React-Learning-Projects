import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import {fetchAvailablePlaces} from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPlace = async () => {
      setFetching(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedplaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedplaces);
          setFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could  not fetch places, please try again later",
        });
        setFetching(false);
      }
    };
    fetchPlace();
  }, []);

  if (error) {
    return <Error title={"An Error occurred!"} message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={fetching}
      loadingText={"Fetching place data..."}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
