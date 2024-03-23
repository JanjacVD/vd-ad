import { useState } from "react";

type ToggleOption = {
    name: string;
    id: number;
};

const ToggleGroup = ({
    options,
    label,
    values,
    setValues,
}: {
    options: ToggleOption[];
    label: string;
    values: number[];
    setValues: (val: number[]) => void;
}) => {
    const handleChange = (option: number) => {
        let newValues = values;
        if (values.includes(option))
            newValues = values.filter((val) => val !== option);
        else newValues = [...values, option];
        setValues(newValues);
    };
    return (
        <div className="p-4">
            <p className="text-white pb-4">{label}</p>
            <div className="grid grid-cols-4 gap-4">
                {options.map((option) => (
                    <Toggle
                        key={option.id}
                        checked={values.includes(option.id)}
                        option={option}
                        onChange={handleChange}
                    />
                ))}
            </div>
        </div>
    );
};
const checkedStyle = "hover:bg-green-300 bg-green-500";
const uncheckedStyle = "hover:bg-gray-300 bg-white";
const Toggle = ({
    option,
    checked,
    onChange,
}: {
    option: ToggleOption;
    checked: boolean;
    onChange: (val: number) => void;
}) => {
    return (
        <div
            onClick={() => onChange(option.id)}
            className={
                "px-5 py-2 border-l-black rounded-md mx-2 transition-all cursor-pointer " +
                (checked ? checkedStyle : uncheckedStyle)
            }
        >
            {option.name}
        </div>
    );
};

export default ToggleGroup;
