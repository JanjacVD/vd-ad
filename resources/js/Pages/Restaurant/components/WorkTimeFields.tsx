import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import ToggleGroup from "@/Components/ToggleGroup";
import { WorktimeSchedule } from "@/types/form.types";
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

const WorkTimeFields = ({value, setValue}: {value:WorktimeSchedule, setValue:(val:WorktimeSchedule)=>void}) => {
    const [workdays, setWorkdays] = useState<number[]>([]);
    const [isSame, setIsSame] = useState(true);
    const [worktime, setWorktime] = useState<WorktimeSchedule>();
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
                    //@ts-ignore
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
            {!isSame &&
                workdays.sort((a,b) => a-b).map((day) => (
                    <div className="mt-4 w-full" key={day}>
                        <InputLabel
                            htmlFor={"worktimeSame" + day}
                            className="capitalize"
                            value={
                                "Worktime for " +
                                dayNames.find((dayObj) => dayObj.id === day)
                                    ?.name
                            }
                        />
                        <div className="flex flex-row items-center">
                            <TextInput
                                className="mt-1 block w-full"
                                isFocused={true}
                                type="time"
                                //@ts-ignore
                                onChange={(e) =>
                                    setValue({
                                        ...value,
                                        [day]: {
                                            from_time: e.target.value,
                                            to_time:
                                                value[day as keyof typeof value]
                                                    ?.to_time ?? "",
                                        },
                                    })
                                }
                            />
                            <span className="w-8 text-center"> - </span>
                            <TextInput
                                className="mt-1 block w-full"
                                isFocused={true}
                                type="time"
                                //@ts-ignore
                                onChange={(e) =>
                                    setValue({
                                        ...value,
                                        [day]: {
                                            to_time: e.target.value,
                                            from_time:
                                                value[day as keyof typeof value]
                                                    ?.to_time ?? "",
                                        },
                                    })
                                }
                            />
                        </div>
                    </div>
                ))}
        </>
    );
};
export default WorkTimeFields;
