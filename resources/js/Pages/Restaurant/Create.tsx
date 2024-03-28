import Map from "@/Components/Map";
import SimpleFormGenerator, {
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
    useEffect,
    useState,
} from "react";
import { basicInfoFields } from "./data/formFieldGenerator";
import WorkTimeFields from "./components/WorkTimeFields";
import { initCreateData } from "./data/initData";

export default function Create({
    auth,
    tags,
}: PageProps<{ tags: RestaurantTag[] }>) {
    const { data, setData, post, processing, errors } =
        useForm<CreateRestaurantForm>(initCreateData);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('restaurant.store'))
    };
    const disabledNext = !data.name || !data.address || !data.tel_number;
    const [invalidLocation, setInvalidLocation] = useState(false);
    useEffect(() => {
        setInvalidLocation(false);
    }, [data.address]);
    return (
        <AuthenticatedLayout user={auth.user} loading={processing}>
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