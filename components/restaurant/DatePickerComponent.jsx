import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

const DatePickerComponent = ({ date, setDate }) => {
  const [show, setShow] = useState(false);

  const handlePress = () => {
    setShow(!show);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <View className="flex flex-row justify-center">
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className="bg-[#464646] px-6 py-3 rounded-lg shadow-md border border-gray-600"
      >
        <Text className="text-white text-base font-medium text-center tracking-wide">
          {date.toLocaleDateString("en-GB")} {/* dd/mm/yyyy format */}
        </Text>
      </TouchableOpacity>

      {Platform.OS === "android" && show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          minimumDate={new Date()}
          maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          accentColor="#F59E0B"
          textColor="#F59E0B"
          onChange={onChange}
        />
      )}

      {Platform.OS === "ios" && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          minimumDate={new Date()}
          maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          accentColor="#F59E0B"
          textColor="#F59E0B"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePickerComponent;
