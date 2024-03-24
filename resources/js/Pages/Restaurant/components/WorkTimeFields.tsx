import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import ToggleGroup from "@/Components/ToggleGroup";
import { Worktime, WorktimeSchedule } from "@/types/form.types";
import {
    areAllValuesSame,
    extractDaysWithoutNull,
} from "@/utils/extractWorkdays";
import { useEffect, useState } from "react";

const dayNames = [
    { id: 0, name: "Sunday" },
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
];

const WorkTimeFields = ({
    value,
    setValue,
    invalid = false,
}: {
    value: WorktimeSchedule;
    setValue: (val: WorktimeSchedule) => void;
    invalid: boolean;
}) => {
    const [workdays, setWorkdays] = useState<number[]>(
        extractDaysWithoutNull(value)
    );
    const [isSame, setIsSame] = useState(areAllValuesSame(value));
    const [generalWorktime, setGeneralWorktime] = useState<Worktime>(null);
    const handleWorktimeChange = (
        day: number,
        val: string,
        key: "from_time" | "to_time"
    ) => {
        let workdayToChange: Worktime = value[day as keyof typeof value];
        if (workdayToChange === null) {
            workdayToChange = {
                from_time: "",
                to_time: "",
            };
        }
        workdayToChange[key] = val;
        let newWorktime = value;
        workdays.forEach((workday) => {
            newWorktime[workday as keyof WorktimeSchedule] =
                value[workday as keyof typeof value];
        });
        newWorktime[day as keyof WorktimeSchedule] = workdayToChange;
        setValue(newWorktime);
    };
    const handleGeneralWorktimeChange = () => {
        if(!isSame) return;
        let newWorktime = value;
        workdays.forEach((workday) => {
            newWorktime[workday as keyof WorktimeSchedule] = generalWorktime;
        });
    };
    useEffect(() => {
        handleGeneralWorktimeChange();
    }, [generalWorktime]);
    const renderWorktimeField = (day: number | null) => {
        return (
            <div className="mt-4 w-full" key={day}>
                <InputLabel
                    htmlFor={"worktimeSame" + day}
                    className="capitalize"
                    value={
                        "Worktime for " +
                        (!isSame
                            ? dayNames.find((dayObj) => dayObj.id === day)?.name
                            : "all days")
                    }
                />
                <div className="flex flex-row items-center" key={day}>
                    <TextInput
                        className="mt-1 block w-full"
                        isFocused={true}
                        type="time"
                        value={
                            (!day
                                ? generalWorktime?.from_time
                                : value[day as keyof WorktimeSchedule]
                                      ?.from_time) ?? ""
                        }
                        onChange={(e) =>
                            day
                                ? handleWorktimeChange(
                                      day,
                                      e.target.value,
                                      "from_time"
                                  )
                                : setGeneralWorktime((prev) => ({
                                      from_time: e.target.value,
                                      to_time: prev?.to_time ?? "",
                                  }))
                        }
                    />
                    <span className="w-8 text-center"> - </span>
                    <TextInput
                        className="mt-1 block w-full"
                        isFocused={true}
                        type="time"
                        value={
                            (!day
                                ? generalWorktime?.to_time
                                : value[day as keyof WorktimeSchedule]
                                      ?.to_time) ?? ""
                        }
                        onChange={(e) =>
                            day
                                ? handleWorktimeChange(
                                      day,
                                      e.target.value,
                                      "to_time"
                                  )
                                : setGeneralWorktime((prev) => ({
                                      to_time: e.target.value,
                                      from_time: prev?.from_time ?? "",
                                  }))
                        }
                    />
                </div>
            </div>
        );
    };
    return (
        <>
            <div className="mt-4 w-full flex flex-row items-center">
                <InputLabel
                    htmlFor={"worktimeSame"}
                    className="capitalize"
                    value={"Worktime same for all days: "}
                />
                <TextInput
                    isFocused={true}
                    className="ml-2"
                    type="checkbox"
                    checked={isSame}
                    onChange={(e) => setIsSame((prev) => !prev)}
                />
            </div>
            <ToggleGroup
                label="Work days"
                options={dayNames}
                setValues={setWorkdays}
                values={workdays}
            />
            {!isSame
                ? workdays
                      .sort((a, b) => a - b)
                      .map((day) => renderWorktimeField(day))
                : renderWorktimeField(null)}
        </>
    );
};
export default WorkTimeFields;
