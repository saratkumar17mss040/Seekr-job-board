// import React from "react";
// import CreatableSelect from "react-select/creatable";

// interface MultiSelectProps {
//   label: string;
//   options: { label: string; value: string }[];
//   selected: string[];
//   onChange: (selected: string[]) => void;
// }

// const MultiSelect: React.FC<MultiSelectProps> = ({
//   label,
//   options,
//   selected,
//   onChange,
// }) => {
//     const handleChange = (selectedOptions: any) => {
//     onChange(
//       selectedOptions ? selectedOptions.map((opt: any) => opt.value) : []
//     );
//   };

//   return (
//     <div className="mb-4">
//       <label className="block font-medium mb-1">{label}</label>
//       <CreatableSelect
//         isMulti
//         options={options}
//         value={options.filter((opt) => selected.includes(opt.value))}
//         onChange={handleChange}
//         className="text-black"
//       />
//     </div>
//   );
// };

// export default MultiSelect;
