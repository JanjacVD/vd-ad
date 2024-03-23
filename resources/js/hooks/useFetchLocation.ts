import { Loader } from "@googlemaps/js-api-loader";
import { useState } from "react";
const useFetchLocation = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const fetchLocation = async (
        address: string,
        ref: React.RefObject<HTMLDivElement>,
        setData: (key: string, value: unknown) => void
    ) => {
        const apiKey = import.meta.env.VITE_MAPS_API_KEY;
        const loader = new Loader({ apiKey, region: "HR", version: "weekly" });

        const google = await loader.load();
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode({ address, region: "HR" }, (results, status) => {
            if (status === "OK") {
                const mapOptions = {
                    center: results[0].geometry.location,
                    zoom: 17,
                };
                const map = new google.maps.Map(
                    ref.current as Element,
                    mapOptions
                );
                new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                    title: results[0].formatted_address,
                });
                setData("location", {
                    place_id: results[0].place_id,
                    formatted_address: results[0].formatted_address,
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                });
                setIsLoading(false);
            } else {
                setError("Address not found, please try again.");
            }
        });
    };
    return {
        isLoading, error, fetchLocation
    }
};
export default useFetchLocation
