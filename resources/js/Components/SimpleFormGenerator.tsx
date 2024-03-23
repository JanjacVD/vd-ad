import InputError from "./InputError";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";

export type FormGeneratorProps = {
    fields: {
        type: HTMLInputElement["type"];
        name: string;
        autoComplete?: HTMLInputElement["autocomplete"];
        onChange?: HTMLInputElement["onchange"];
        label: string;
        required: HTMLInputElement["required"];
    }[];
    data: { [key: string]: unknown };
    errors: { [key: string]: string };
    setData(key: string, value: string): void;
};
const SimpleFormGenerator = ({
    fields,
    data,
    setData,
    errors,
}: FormGeneratorProps) => {
    return (
        <>
            {fields.map((field) => (
                <div key={field.name} className="mt-4 w-full">
                    <InputLabel
                        htmlFor={field.name}
                        className="capitalize"
                        value={field.label}
                    />

                    <TextInput
                        className="mt-1 block w-full"
                        isFocused={true}
                        //@ts-ignore
                        onChange={(e) => setData(field.name, e.target.value)}
                        id={field.name}
                        {...field}
                        value={data[field.name] as string}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>
            ))}
        </>
    );
};

export default SimpleFormGenerator;
