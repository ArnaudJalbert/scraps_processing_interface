import { useState } from "react";
import SelectList from "react-native-dropdown-select-list/components/SelectList";

const DropdownComponent = (options) => {
  const [selected, setSelected] = useState("");
  const textileClassData = [
    { key: "1", value: "Natural" },
    { key: "2", value: "Synthetic" },
  ];
  console.log(options)
  return (
    <SelectList
      data={options.data}
      setSelected={setSelected}
      placeholder={options.placeholder}
    />
  );
};

export default DropdownComponent;
