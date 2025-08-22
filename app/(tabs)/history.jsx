import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const History = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const db = getFirestore();

  const fetchBookings = async () => {
    if (userEmail) {
      try {
        const bookingCollection = collection(db, "bookings");
        const bookingQurey = query(
          bookingCollection,
          where("email", "==", userEmail)
        );
        const bookingSnapshot = await getDocs(bookingQurey);
        const bookingList = bookingSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingList);
        console.log("Bookings fetched:", bookings);
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to fetch bookings. Please try again later.",
          [{ text: "OK" }]
        );
        console.log("Error fetching bookings:", error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };
    fetchUserEmail();
  }, []);
  useEffect(() => {
    fetchBookings();
  }, [userEmail]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#1c1c1c]">
        <View className="flex-1 justify-center items-center">
          <Text className="text-white">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1c1c1c]">
      {userEmail ? (
        <FlatList
          onRefresh={fetchBookings}
          refreshing={loading}
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="p-4 border-b border-[#F59E0B]">
              <Text className="text-white">Date: {item.date}</Text>
              <Text className="text-white">Slot: {item.slot}</Text>
              <Text className="text-white">Guests: {item.guests}</Text>
              <Text className="text-white">Restaurant: {item?.restaurant}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white mb-4">
            Please Sign in to see your booking history
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/")}
            className="p-2 my-2 bg-[#F59E0B] border border-[#F59E0B] text-black rounded-lg mt-5"
          >
            <Text className="text-xl font-semibold text-center">Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default History;
