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
    <fieldset className="m-2 pb-2 border-b border-indigo-300 dark:border-neutral-600 last:border-0 outline-offset-4 outline-indigo-500 dark:outline-white focus-within:outline-2 focus-within:rounded-lg focus-within:border-transparent">
      <legend className="text-sm text-indigo-700 dark:text-neutral-300 px-2 mb-1">
        {legend}
      </legend>
      {options.map((option) => (
        <label
          className={`block px-2 py-1 my-1 rounded-lg cursor-pointer transition-colors duration-300 
              hover:bg-indigo-300 dark:hover:bg-neutral-700 ${option.checked ? "bg-[url(../public/images/icon-checkmark-copy.svg)]  dark:bg-[url(../public/images/icon-checkmark.svg)] bg-no-repeat bg-[center_right_.5rem] bg-indigo-300 dark:bg-neutral-700" : ""}`}
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
