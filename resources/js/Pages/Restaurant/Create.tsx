import Map from "@/Components/Map";
import SimpleFormGenerator, {
    FormGeneratorProps,
} from "@/Components/SimpleFormGenerator";
import Stepper from "@/Components/Stepper";
import ToggleGroup from "@/Components/ToggleGroup";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { CreateRestaurantForm, WorktimeSchedule } from "@/types/form.types";
import { RestaurantTag } from "@/types/model.types";
import { Head, useForm } from "@inertiajs/react";
import {
    FormEventHandler,
    RefObject,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { basicInfoFields } from "./data/formFieldGenerator";
import WorkTimeFields from "./components/WorkTimeFields";
import { initCreateData } from "./data/initData";

export default function Create({
    auth,
    tags,
}: PageProps<{ tags: RestaurantTag[] }>) {
    const { data, setData, post, processing, errors, reset } =
        useForm<CreateRestaurantForm>(initCreateData);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(data));
        console.log(data);
    };
    const disabledNext = !data.name || !data.address || !data.tel_number;

    const [invalidLocation, setInvalidLocation] = useState(false);
    useEffect(() => {
        setInvalidLocation(false);
    }, [data.address]);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Become a partner" />
            <form onSubmit={submit}>
                <Stepper
                    disabledNext={disabledNext || invalidLocation}
                    steps={[
                        {
                            component: (
                                <SimpleFormGenerator
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    fields={basicInfoFields}
                                />
                            ),
                            label: "Basic info",
                        },

                        {
                            component: (
                                <Map
                                    address={data.address}
                                    setData={setData}
                                    onError={setInvalidLocation}
                                />
                            ),
                            label: "Confirm location",
                        },
                        {
                            component: (
                                <WorkTimeFields
                                    value={data.worktime}
                                    setValue={(val: WorktimeSchedule) =>
                                        setData("worktime", val)
                                    }
                                    invalid={disabledNext}
                                />
                            ),
                            label: "Work time",
                        },
                        {
                            component: (
                                <ToggleGroup
                                    setValues={(val: number[]) =>
                                        setData("tags", val)
                                    }
                                    values={data.tags}
                                    options={tags}
                                    label="Select categories that apply to your restaurant:"
                                />
                            ),
                            label: "Detailed info",
                        },
                    ]}
                />
            </form>
        </AuthenticatedLayout>
    );
}

const example = {
    name: "Valentino Janjac",
    address: "Kamila Pamukovica 96",
    tel_number: "123123",
    location: {
        place_id: "ChIJI2RUQfvXNBMRvQ80nv4Fyd0",
        formatted_address: "Ul. Kamila Pamukovića 96, 22211, Vodice, Croatia",
        lat: 43.7596131,
        lng: 15.7751433,
    },
    tags: [14, 10, 6],
    worktime: {
        "0": { to_time: "23:28", from_time: "20:24" },
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
    },
};
