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
      step="0.1"
      className={`input inline w-100 mb-5`}
      value={data.min === undefined ? "" : data.min}
      onChange={(e) => onUpdate({ min: parseFloat(e.target.value === "" ? "0" : e.target.value) })}
    />{" "}
    and maximum{" "}
    <input
      type="number"
      step="0.1"
      className={`input inline w-100 mb-5 mr-5`}
      value={data.max === undefined ? "" : data.max}
      onChange={(e) => onUpdate({ max: parseFloat(e.target.value === "" ? "0" : e.target.value) })}
    />
    rounded to{" "}
    <input
      type="number"
      step="1"
      className={`input inline w-100 mb-5 mr-5`}
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
      step="0.1"
      className={`input inline w-100 mb-5`}
      value={data.mean === undefined ? "" : data.mean}
      onChange={(e) => onUpdate({ mean: parseFloat(e.target.value === "" ? "0" : e.target.value) })}
    />{" "}
    and standard deviation{" "}
    <input
      type="number"
      step="0.1"
      min={0}
      className={`input inline w-100 mb-5 mr-5`}
      value={data.std === undefined ? "" : data.std}
      onChange={(e) => onUpdate({ std: parseFloat(e.target.value === "" ? "0" : e.target.value) })}
    />
    rounded to{" "}
    <input
      type="number"
      step="1"
      className={`input inline w-100 mb-5 mr-5`}
      value={data.round === undefined ? "" : data.round}
      onChange={(e) => onUpdate({ round: parseFloat(e.target.value === "" ? "0" : e.target.value) })}
    />
    decimal places.
  </>
);

export { UniformPrompt, NormalPrompt };