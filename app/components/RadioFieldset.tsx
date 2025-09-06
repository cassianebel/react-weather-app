export default function RadioFieldset({ legend, changeHandler, options }) {
  return (
    <fieldset className="m-2 pb-2 border-b border-neutral-600 last:border-0">
      <legend className="text-sm text-neutral-300 px-2 mb-1">{legend}</legend>
      {options.map((option) => (
        <label
          className="block p-2 rounded-lg cursor-pointer"
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
