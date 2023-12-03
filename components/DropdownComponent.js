import SelectList from "react-native-dropdown-select-list/components/SelectList";

const DropdownComponent = (options) => {
  return (
    <SelectList
      data={options.data}
      setSelected={options.setSelected}
      placeholder={options.placeholder}
    />
  );
};

export default DropdownComponent;
