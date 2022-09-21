import { FieldErrorsImpl, FieldValues, UseFormRegister } from "react-hook-form";

interface DistributionParameterPromptProps {
  questionKey: string;
  deKey: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrorsImpl<{ [x: string]: any }>;
}

const UniformPrompt = ({
  questionKey, deKey, register, errors
}: DistributionParameterPromptProps) => (
  <>
    with minimum{" "}
    <input
      type="number"
      className={`w-16 mt-1 px-2 py-1 border rounded ${
        errors[`${questionKey}/de/${deKey}/min`]
          ? "border-red-700"
          : "border-black"
      }`}
      {...register(`${questionKey}/de/${deKey}/min`, { required: true })}
    />{" "}
    and maximum{" "}
    <input
      type="number"
      className={`w-16 mt-1 px-2 py-1 mr-1 border rounded ${
        errors[`${questionKey}/de/${deKey}/max`]
          ? "border-red-700"
          : "border-black"
      }`}
      {...register(`${questionKey}/de/${deKey}/max`, { required: true })}
    />
    .
  </>
);

const NormalPrompt = ({
  questionKey, deKey, register, errors
}: DistributionParameterPromptProps) => (
  <>
    with mean{" "}
    <input
      type="number"
      className={`w-16 mt-1 px-2 py-1 border rounded ${
        errors[`${questionKey}/de/${deKey}/mean`]
          ? "border-red-700"
          : "border-black"
      }`}
      {...register(`${questionKey}/de/${deKey}/mean`, { required: true })}
    />{" "}
    and standard deviation{" "}
    <input
      type="number"
      min={0}
      className={`w-16 mt-1 px-2 py-1 mr-1 border rounded ${
        errors[`${questionKey}/de/${deKey}/std`]
          ? "border-red-700"
          : "border-black"
      }`}
      {...register(`${questionKey}/de/${deKey}/std`, { required: true, min: 0 })}
    />
    .
  </>
);

export { UniformPrompt, NormalPrompt };