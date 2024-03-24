import useFetchLocation from "@/hooks/useFetchLocation";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Spinner from "./Spinner";

// const Map = forwardRef<HTMLDivElement>((props, ref) => {
//     return <div ref={ref} className="min-h-96 w-full text-white flex items-center justify-center">
//         Location not found, please try again.
//     </div>;
// });

const Map = ({
    address,
    setData,
    onError
}: {
    address: string;
    setData: (key: string, value: unknown) => void;
    onError:Dispatch<SetStateAction<boolean>>
}) => {
    const { fetchLocation, error, isLoading } = useFetchLocation();
    const mapRef = useRef<HTMLDivElement>(null);
    const handleLocationFetch = async () => {
        fetchLocation(address, mapRef, setData);
    };
    useEffect(() => {
        handleLocationFetch();
    }, [address]);
    useEffect(() => {
        onError(!!error)
    },[error])
    return (
        <>
            {isLoading && <Spinner />}
            <div
                ref={mapRef}
                className="min-h-96 w-full text-white flex items-center justify-center"
            >
                {error}
            </div>
        </>
    );
};

export default Map;
