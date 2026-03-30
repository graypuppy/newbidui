export const handleCheckTypeToggle = (
  type: string,
  selectedCheckTypes: string[],
  setSelectedCheckTypes: (types: string[]) => void
) => {
  if (selectedCheckTypes?.includes(type)) {
    setSelectedCheckTypes(selectedCheckTypes.filter(t => t !== type));
  } else {
    setSelectedCheckTypes([...(selectedCheckTypes || []), type]);
  }
};
