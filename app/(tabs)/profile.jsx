import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();
  const auth = getAuth();
  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };
    fetchUserEmail();
  });
  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userEmail");
      setUserEmail(null);
      Alert.alert("Logged Out", "You have been logged out successfully", [
        { text: "OK" },
      ]);
      router.push("/");
    } catch (error) {
      Alert.alert(
        "Logout error",
        "An error occurred while logging out. Please try again.",
        [{ text: "OK" }]
      );
    }
  };
  return (
    <View className="flex-1 justify-center items-center bg-[#1c1c1c]">
      <Text className="text-xl text-[#F59E0B] font-bold mb-4">
        User Profile
      </Text>
      {userEmail ? (
        <View>
          <Text className="text-white text-lg mb-6">Email: {userEmail} </Text>
          <TouchableOpacity
            className="p-2 my-2 bg-[#F59E0B] text-black rounded-lg mt-10"
            onPress={handleLogout}
          >
            <Text className="text-lg font-semibold text-center">Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            router.push("/");
          }}
          className="p-2 my-2 bg-[#F59E0B] border border-[#F59E0B] text-black rounded-lg mt-5"
        >
          <Text className="text-xl font-semibold text-center">Sign Up</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Profile;
