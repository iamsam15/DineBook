import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/DBlogo.png";
import homeBanner from "../../assets/images/homeBanner.png";
import { db } from "../../config/firebaseConfig";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();
  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="bg-[#1a2222] max-h-64 max-w-xs flex justify-center rounded-lg p-4 mx-4 shadow-md"
      onPress={() => router.push(`/restaurant/${item.name}`)}
    >
      <Image
        resizeMode="cover"
        source={{ uri: item.image }}
        className="h-28 mt-2 mb-1 rounded-lg"
      />
      <Text className="text-white text-lg font-bold mb-2">{item.name}</Text>
      <Text className="text-white text-base mb-2">{item.address}</Text>
      <Text className="text-white text-base mb-2">
        {item.opening} - {item.closing}
      </Text>
    </TouchableOpacity>
  );
  const getRestaurants = async () => {
    const q = query(collection(db, "restaurants"));
    const res = await getDocs(q);
    res.forEach((item) => {
      setRestaurants((prev) => [...prev, item.data()]);
    });
  };
  const temp = async () => {
    const value = await AsyncStorage.getItem("isGuest");
    const email = await AsyncStorage.getItem("userEmail");
    console.log(value, email);
  };
  useEffect(() => {
    getRestaurants();
    temp();
  }, []);
  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#1c1c1c" },
        Platform.OS === "android" && { paddingBottom: 75 },
      ]}
    >
      <View className="px-6 flex-row justify-between items-center">
        <View>
          <Text className="text-xl text-gray-400">Welcome to</Text>
          <Text className="text-4xl font-extrabold text-white tracking-wider">
            DineBook
          </Text>
        </View>
        <Image source={logo} className="w-24 h-24" resizeMode="cover" />
      </View>
      <ScrollView stickyHeaderIndices={[0]}>
        <ImageBackground
          source={homeBanner}
          resizeMode="cover"
          className="mt-4 w-full h-44 items-center justify-center bg-[#1c1c1c]"
        >
          <BlurView
            intensity={100}
            tint="dark"
            className="w-full h-full shadow-lg flex-row flex-1 justify-center items-center"
          >
            <Text className="text-center text-3xl font-bold text-white">
              Book your tables
            </Text>
          </BlurView>
        </ImageBackground>
        <View className="p-4 bg-[#1c1c1c] flex-row items-center">
          <Text className="text-3xl text-white mr-2 font-semibold">
            Special Discounts %
          </Text>
        </View>
        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        ) : (
          <ActivityIndicator animating={true} color={"#F59E0B"} />
        )}
        <View className="p-4 bg-[#1c1c1c] flex-row items-center">
          <Text className="text-3xl text-[#F59E0B] mr-2 font-semibold">
            Our Restaurants
          </Text>
        </View>
        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        ) : (
          <ActivityIndicator animating={true} color={"#F59E0B"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
