export default function RadioFieldset({
  legend,
  changeHandler,
  options,
}: {
  legend: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: {
    value: string;
    name: string;
    checked: boolean;
    label: string;
  }[];
}) {
  return (
    <fieldset className="m-2 pb-2 border-b border-neutral-600 last:border-0 outline-white outline-offset-4">
      <legend className="text-sm text-neutral-300 px-2 mb-1">{legend}</legend>
      {options.map((option) => (
        <label
          className="block px-2 py-1 my-1 rounded-lg cursor-pointer hover:bg-neutral-700"
          key={option.value}
        >
          <input
            type="radio"
            name={option.name}
            value={option.value}
            checked={option.checked}
            onChange={changeHandler}
            className="sr-only"
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
}
