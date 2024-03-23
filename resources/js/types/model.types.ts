export type RestaurantTag = {
    id: number;
    name: string;
    icon: string;
};

export type Location = {
    place_id: string;
    formatted_address: string;
    lat: number;
    lng: number;
};
