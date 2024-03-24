import { Location } from "./model.types";

export type CreateRestaurantForm = {
    tags: number[];
    name: string;
    address: string;
    tel_number: string;
    location:Location;
    worktime:WorktimeSchedule
};

export type Worktime = {
    from_time: string;
    to_time: string;
} | null;

export type WorktimeSchedule = {
    0: Worktime;
    1: Worktime;
    2: Worktime;
    3: Worktime;
    4: Worktime;
    5: Worktime;
    6: Worktime;
};