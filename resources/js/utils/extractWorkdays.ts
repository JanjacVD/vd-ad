import { Worktime, WorktimeSchedule } from "@/types/form.types";

export const extractDaysWithoutNull = (
    worktime: WorktimeSchedule
): number[] => {
    return Object.entries(worktime)
        .filter(([_, wt]) => wt !== null)
        .map(([day, _]) => parseInt(day));
};

export const areAllValuesSame =(worktime: WorktimeSchedule): boolean => {
    const values = Object.values(worktime).filter(wt => wt !== null) as Worktime[];
    const uniqueValues = Array.from(new Set(values.map(wt => JSON.stringify(wt))));
    return uniqueValues.length === 1;
}