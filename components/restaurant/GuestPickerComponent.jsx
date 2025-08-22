import { Text, TouchableOpacity, View } from "react-native";

const GuestPickerComponent = ({ selectedNumber, setSelectedNumber }) => {
  const decrement = () => {
    if (selectedNumber > 1) {
      setSelectedNumber(selectedNumber - 1);
    }
  };
  const increment = () => {
    if (selectedNumber < 12) {
      setSelectedNumber(selectedNumber + 1);
    }
  };
  return (
    <View className="flex flex-row items-center rounded-lg text-white text-base">
      <TouchableOpacity onPress={decrement} className="rounded">
        <Text className="text-white text-lg border border-[#F59E0B] rounded-l-lg px-3">
          -
        </Text>
      </TouchableOpacity>
      <Text className="px-3 text-white border border-[#464646] bg-[#464646] text-lg">
        {selectedNumber}
      </Text>
      <TouchableOpacity onPress={increment} className="rounded">
        <Text className="text-white text-lg border border-[#F59E0B] rounded-r-lg px-3">
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GuestPickerComponent;
