import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { Formik } from "formik";
import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import guestFromSchema from "../../utils/guestFromSchema";
const db = getFirestore();
const FindSlots = ({
  date,
  selectedNumber,
  slots,
  selectedSlot,
  setSelectedSlot,
  restaurant,
}) => {
  const [slotVisbile, setSlotVisible] = useState(false);
  const [modalVisible, setModalVisbile] = useState(false);
  const [formVisble, setFormVisble] = useState(false);

  // const guestStatus = await AsyncStorage.getItem("isGuest");
  const handlePress = () => {
    setSlotVisible(!slotVisbile);
  };
  const handleSlotPress = (slot) => {
    let prevSlot = selectedSlot;
    if (prevSlot === slot) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };
  const handleBooking = async () => {
    const userEmail = await AsyncStorage.getItem("userEmail");
    const guest = await AsyncStorage.getItem("isGuest");
    if (userEmail) {
      try {
        await addDoc(collection(db, "bookings"), {
          email: userEmail,
          slot: selectedSlot,
          date: date.toISOString(),
          guests: selectedNumber,
          restaurant: restaurant,
        });
        alert("Booking Successfull");
      } catch (error) {
        console.log(error);
      }
    } else if (guest === "true") {
      setFormVisble(true);
      setModalVisbile(true);
    }
  };
  const handleFormSubmit = async (values) => {
    try {
      await addDoc(collection(db, "bookings"), {
        name: values.fullName,
        phoneNumber: values.phoneNumber,
        slot: selectedSlot,
        date: date.toISOString(),
        guests: selectedNumber,
        restaurant: restaurant,
      });
      setModalVisbile(false);
      alert("Booking Successfull");
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseModal = () => {
    setFormVisble(false);
    setModalVisbile(false);
  };
  return (
    <View className="flex-1">
      <View className={`flex ${selectedSlot != null && "flex-row"}`}>
        <View className={`${selectedSlot != null && "flex-1"}`}>
          <TouchableOpacity onPress={handlePress}>
            <Text className="text-center text-lg font-semibold bg-[#F59E0B] p-2 my-3 mx-2 rounded-lg">
              Find Slots
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1">
          {selectedSlot != null && (
            <TouchableOpacity onPress={handleBooking}>
              <Text className="text-center text-white text-lg font-semibold bg-[#F59E0B] p-2 my-3 mx-2 rounded-lg">
                Book Slot
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View>
        {slotVisbile && (
          <View className="flex-wrap flex-row mx-2 bg-[#464646] rounded-lg">
            {slots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSlotPress(slot)}
                className={`m-2 p-4 rounded-lg items-center justify-center border border-[#F59E0B] ${selectedSlot && selectedSlot !== slot ? " bg-[#464646] opacity-50 " : "bg-[#F59E0B]"}`}
                disabled={
                  selectedSlot === slot || selectedSlot === null ? false : true
                }
              >
                <Text className="text-white font-bold">{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        style={{
          flex: 1,
          justifyContent: "flex-end",
          margin: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View className="flex-1 bg-[#00000080] justify-end">
          <View className="bg-[#474747] mx-4 rounded-t-lg p-4 pb-6">
            {formVisble && (
              <Formik
                initialValues={{ fullName: "", phonenumber: "" }}
                validationSchema={guestFromSchema}
                onSubmit={handleFormSubmit}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View className="w-full">
                    <View>
                      <Ionicons
                        name="close-sharp"
                        size={30}
                        color={"#F59E0B"}
                        onPress={handleCloseModal}
                      />
                    </View>
                    <Text className="text-[#F59E0B] mb-2">Name</Text>
                    <TextInput
                      className="h-10 border border-[#F59E0B] text-white rounded px-2"
                      onChangeText={handleChange("fullName")}
                      value={values.fullName}
                      onBlur={handleBlur("fullName")}
                    />
                    {touched.fullName && errors.fullName && (
                      <Text className="text-red-500 text-xs mb-2">
                        {errors.fullName}
                      </Text>
                    )}
                    <Text className="text-[#F59E0B] mt-4 mb-2">
                      Phone Number
                    </Text>
                    <TextInput
                      className="h-10 border border-[#F59E0B] text-white rounded px-2"
                      onChangeText={handleChange("phoneNumber")}
                      value={values.phoneNumber}
                      onBlur={handleBlur("phoneNumber")}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <Text className="text-red-500 text-xs mb-2">
                        {errors.phoneNumber}
                      </Text>
                    )}
                    <TouchableOpacity
                      onPress={handleSubmit}
                      className="p-2 my-2 bg-[#F59E0B] border border-[#F59E0B] text-black rounded-lg mt-5"
                    >
                      <Text className="text-xl font-semibold text-center">
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FindSlots;
