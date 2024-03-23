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
import { FormEventHandler, RefObject, useRef, useState } from "react";
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
        console.log(data);
    };

    const disabledNext = !data.name || !data.address || !data.tel_number;
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Become a partner" />
            <form onSubmit={submit}>
                <Stepper
                    disabledNext={disabledNext}
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
                            // onNext: handleLocationFetch,
                        },

                        {
                            component: <Map address={data.address} setData={setData}/>,
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
