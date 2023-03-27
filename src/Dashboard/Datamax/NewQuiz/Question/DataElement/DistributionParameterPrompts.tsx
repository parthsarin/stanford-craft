import { DataElementTemplate } from "../../../DatamaxTypes";

interface DistributionParameterPromptProps {
  onUpdate: (params: any) => void;
  data: DataElementTemplate
}

const UniformPrompt = ({ data, onUpdate }: DistributionParameterPromptProps) => (
  <>
    with minimum{" "}
    <input
      type="number"
      className={`w-20 mt-1 px-2 py-1 border rounded`}
      value={data.min === undefined ? "" : data.min}
      onChange={(e) => onUpdate({ min: parseFloat(e.target.value === "" ? "0" : e.target.value) })}
    />{" "}
    and maximum{" "}
    <input
      type="number"
      className={`w-20 mt-1 px-2 py-1 mr-1 border rounded `}
      value={data.max === undefined ? "" : data.max}
      onChange={(e) => onUpdate({ max: parseFloat(e.target.value === "" ? "0" : e.target.value) })}
    />
    rounded to{" "}
    <input
      type="number"
      className={`w-20 mt-1 px-2 py-1 mr-1 border rounded `}
      value={data.round === undefined ? "" : data.round}
      onChange={(e) => onUpdate({ round: parseFloat(e.target.value === "" ? "0" : e.target.value) })}
    />
    decimal places.
  </>
);

const NormalPrompt = ({ data, onUpdate }: DistributionParameterPromptProps) => (
  <>
    with mean{" "}
    <input
      type="number"
      className={`w-20 mt-1 px-2 py-1 border rounded`}
      value={data.mean === undefined ? "" : data.mean}
      onChange={(e) => onUpdate({ mean: parseFloat(e.target.value === "" ? "0" : e.target.value) })}
    />{" "}
    and standard deviation{" "}
    <input
      type="number"
      min={0}
      className={`w-20 mt-1 px-2 py-1 mr-1 border rounded`}
      value={data.std === undefined ? "" : data.std}
      onChange={(e) => onUpdate({ std: parseFloat(e.target.value === "" ? "0" : e.target.value) })}
    />
    rounded to{" "}
    <input
      type="number"
      className={`w-20 mt-1 px-2 py-1 mr-1 border rounded `}
      value={data.round === undefined ? "" : data.round}
      onChange={(e) => onUpdate({ round: parseFloat(e.target.value === "" ? "0" : e.target.value) })}
    />
    decimal places.
  </>
);

export { UniformPrompt, NormalPrompt };