import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/DBlogo.png";
import Frame from "../assets/images/Frame.png";

export default function Index() {
  const router = useRouter();
  const handleGuest = async () => {
    await AsyncStorage.setItem("isGuest", "true");
    router.push("/home");
  };
  return (
    <SafeAreaView className="bg-[#1c1c1c]">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center pt-10">
          <Image source={logo} style={{ width: 250, height: 250 }} />
          <View className="w-3/4">
            <TouchableOpacity
              onPress={() => router.push("/signup")}
              className="p-2 my-2 bg-[#F59E0B] border border-[#F59E0B] text-black rounded-lg"
            >
              <Text className="text-xl font-semibold text-center">Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGuest}
              className="p-2 my-2 bg-[#1c1c1c] border border-[#F59E0B] rounded-lg"
            >
              <Text className="text-xl font-semibold text-center text-[#F59E0B]">
                Guest User
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <View className="flex-row items-center justify-center my-4">
              <View className="border-b-2 border-[#F59E0B] w-24" />
              <Text className="mx-2 text-base font-semibold text-white">
                or
              </Text>
              <View className="border-b-2 border-[#F59E0B] w-24" />
            </View>
            <TouchableOpacity
              className="flex flex-row items-center justify-center"
              onPress={() => {
                router.push("/signin");
              }}
            >
              <Text className="text-white text-semibold">Already a User? </Text>
              <Text className="text-base font-semibold underline text-[#F59E0B]">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1">
          <Image
            source={Frame}
            className="w-full h-full "
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
