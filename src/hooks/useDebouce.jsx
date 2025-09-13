import React from "react";

export const useDebouce = (searchTerm,fetchLocation, delay) => {
    const [currentLocation, setCurrentLocation] = React.useState(null);
    React.useEffect(() => {
        const handler = setTimeout(async() => {
            const location = await fetchLocation(searchTerm);
            setCurrentLocation(location.results);
        }, delay);

        return () => clearTimeout(handler); 
        
    }, [searchTerm,fetchLocation, delay])
    return currentLocation;
}