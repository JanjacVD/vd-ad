import { FormGeneratorProps } from "@/Components/SimpleFormGenerator";

export const basicInfoFields: FormGeneratorProps["fields"] = [
    { name: "name", type: "text", label: "Restaurant name", required: true },
    {
        name: "tel_number",
        autoComplete: "tel",
        type: "text",
        label: "Tel. Number",
        required: true,
    },
    {
        name: "address",
        autoComplete: "address-level1",
        type: "text",
        label: "Address",
        required: true,
    },
];