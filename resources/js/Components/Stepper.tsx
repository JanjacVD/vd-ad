import { SyntheticEvent, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export type StepperProps = {
    steps: {
        label: string;
        component: React.ReactNode;
        onNext?(): void;
    }[];
    disabledNext?: boolean;
};
const completedClassname =
    "w-full p-4 text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:border-green-800 dark:text-green-400";
const inProgressClassname =
    "w-full p-4 text-blue-700 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400";
const toBeDoneClassname =
    "w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400";

const Stepper = ({ steps, disabledNext = false }: StepperProps) => {
    const [currentStep, setCurrentStep] = useState(0);
    const getStepStyle = (step: number) => {
        if (step === currentStep) return inProgressClassname;
        else if (step < currentStep) return completedClassname;
        else return toBeDoneClassname;
    };
    const increaseStep = (e: SyntheticEvent, num: number) => {
        const onNext = steps[currentStep]?.onNext;
        e.preventDefault();
        if (onNext) {
            onNext();
        }
        setCurrentStep((prev) => prev + num);
    };
    return (
        <div className="grid grid-cols-4 gap-10">
            <ol className="space-y-4 w-full col-span-1">
                {steps.map((step, index) => (
                    <li>
                        <div className={getStepStyle(index)} role="alert">
                            <div className="flex items-center justify-between">
                                <span className="sr-only">{step.label}</span>
                                <h3 className="font-medium">
                                    {index + 1}. {step.label}
                                </h3>
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 16 12"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 5.917 5.724 10.5 15 1.5"
                                    />
                                </svg>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
            <div className="col-span-3 w-2/3">
                {steps?.[currentStep]?.component}
            </div>
            <div className="col-span-4 w-1/2 mx-auto grid grid-cols-2">
                {currentStep !== 0 && (
                    <SecondaryButton
                        onClick={(e) => increaseStep(e, -1)}
                        className="w-1/4 place-self-start"
                    >
                        Back
                    </SecondaryButton>
                )}
                {currentStep < steps.length - 1 && (
                    <PrimaryButton
                        className="w-1/4 place-self-end bg-green-400 col-start-2"
                        onClick={(e) => {
                            increaseStep(e, 1);
                        }}
                        disabled={disabledNext}
                    >
                        Next
                    </PrimaryButton>
                )}
                {currentStep === steps.length - 1 && (
                    <PrimaryButton
                        className="w-1/4 place-self-end bg-green-400 col-start-2"
                        type="submit"
                    >
                        Submit
                    </PrimaryButton>
                )}
            </div>
        </div>
    );
};
export default Stepper;
