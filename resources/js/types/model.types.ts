import { WorktimeSchedule } from "./form.types";

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

export type Restaurant = {
    // created_at: string;
    // geolocation_address_id: 2;
    id: number;
    name: string;
    tel_number: string;
    is_accepting_orders: boolean;
    is_banned: boolean;
    is_confirmed: boolean;
    is_working: boolean;
    worktime: WorktimeSchedule;
    tags: RestaurantTag[];
    geolocation: Geolocation;
    // pivot: { user_id: 1; restaurant_id: 2 };
    // updated_at: string;
};

export type Geolocation = {
    id: number;
    formatted_address: string;
    lat: number;
    lng: number;
    name: string;
    place_id: string;
};
