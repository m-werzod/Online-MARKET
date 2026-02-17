import type { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import type { CategoryType } from "../@types";

interface SelectType {
  list: Array<CategoryType>;
  extraClass?: string;
  setValue?: Dispatch<SetStateAction<string | number>>;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

const Select: FC<SelectType> = ({ extraClass, list, setValue, setLoading }) => {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    if (setValue) {
      setValue(e.target.value);
    }

    if (setLoading) {
      setLoading(true);
    }
  }

  return (
    <select
      onChange={handleChange}
      className={`${extraClass} w-full rounded-2xl bg-slate-950/40 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 ring-1 ring-white/10 outline-none transition focus:ring-2 focus:ring-indigo-400/60`}
    >
      {list.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
