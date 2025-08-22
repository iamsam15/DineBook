import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePickerComponent from "../../components/restaurant/DatePickerComponent";
import FindSlots from "../../components/restaurant/FindSlots";
import GuestPickerComponent from "../../components/restaurant/GuestPickerComponent";
import { db } from "../../config/firebaseConfig";

export default function Restaurant() {
  const { restaurant } = useLocalSearchParams();
  const [restaurantData, setRestaurantData] = useState({});
  const [carouselData, setCarouselData] = useState({});
  const [slotsData, setSlotsData] = useState({});
  const [curIndex, setCurIndex] = useState(0);
  const [date, setDate] = useState(new Date());
  const [selectedNumber, setSelectedNumber] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const flatListRef = useRef(null);
  const windowWidth = Dimensions.get("window").width;

  const handleNextImage = () => {
    const carouselLength = carouselData[0]?.images.length - 1;
    if (curIndex < carouselLength) {
      const nextIndex = curIndex + 1;
      setCurIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      setCurIndex(0);
      flatListRef.current.scrollToIndex({ index: 0, animated: true });
    }
  };
  const handlePrevImage = () => {
    const carouselLength = carouselData[0]?.images.length - 1;
    if (curIndex > 0) {
      const prevIndex = curIndex - 1;
      setCurIndex(prevIndex);
      flatListRef.current.scrollToIndex({ index: prevIndex, animated: true });
    } else {
      setCurIndex(carouselLength);
      flatListRef.current.scrollToIndex({
        index: carouselLength,
        animated: true,
      });
    }
  };
  const carouselItem = ({ item }) => {
    return (
      <View
        style={{ width: windowWidth - 2 }}
        className="h-64 relative rounded-[25px]"
      >
        <View
          style={{
            position: "absolute",
            top: "40%",
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            right: "6%",
          }}
        >
          <Ionicons
            onPress={handleNextImage}
            name="arrow-forward"
            size={24}
            color="white"
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: "40%",
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            left: "2%",
          }}
        >
          <Ionicons
            onPress={handlePrevImage}
            name="arrow-back"
            size={24}
            color="white"
          />
        </View>
        <View
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            left: "50%",
            transform: [{ translateX: "-50%" }],
            zIndex: 10,
            bottom: 15,
          }}
        >
          {carouselData[0]?.images?.map((_, i) => (
            <View
              key={i}
              className={`bg-white h-2 w-2 ${i === curIndex && "h-3 w-3 rounded-full bg-white"} mx-1 rounded-full`}
            />
          ))}
        </View>
        <View>
          <Image
            source={{ uri: item }}
            style={{
              opacity: 0.5,
              backgroundColor: "black",
              marginRight: 20,
              marginLeft: 5,
              borderRadius: 25,
            }}
            className="h-64"
          />
        </View>
      </View>
    );
  };

  const getRestaurantData = async () => {
    try {
      const restaurantQueery = query(
        collection(db, "restaurants"),
        where("name", "==", restaurant)
      );
      const restaurantSnapshot = await getDocs(restaurantQueery);
      if (restaurantSnapshot.empty) {
        console.log("no matching restaurant found");
        return;
      }
      for (const doc of restaurantSnapshot.docs) {
        const restaurantData = doc.data();
        setRestaurantData(restaurantData);
        const carouselQuery = query(
          collection(db, "carousel"),
          where("res_id", "==", doc.ref)
        );
        const carouselSnapshot = await getDocs(carouselQuery);
        if (carouselSnapshot.empty) {
          console.log("no matching carousel data found");
          return;
        }
        const carouselImages = [];
        carouselSnapshot.forEach((carouselDoc) => {
          carouselImages.push(carouselDoc.data());
        });
        setCarouselData(carouselImages);

        const slotQuery = query(
          collection(db, "slot"),
          where("ref_id", "==", doc.ref)
        );
        const slotSnapshot = await getDocs(slotQuery);
        if (slotSnapshot.empty) {
          console.log("no matching slot data found");
          return;
        }
        const slot = [];
        slotSnapshot.forEach((slotDoc) => {
          slot.push(slotDoc.data());
        });
        setSlotsData(slot[0]?.slot);
      }
    } catch (error) {
      console.log("error fetching data ", error);
    }
  };
  const handleLocation = async () => {
    const url = "https://maps.app.goo.gl/iiwS7kGa7vpW5XUU9";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  };

  useEffect(() => {
    getRestaurantData();
  }, []);

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#1c1c1c" },
        Platform.OS === "android" && { paddingBottom: 75 },
      ]}
    >
      <ScrollView className="h-full">
        <View className="flex-1 m-2 p-2">
          <Text className="text-xl text-[#F59E0B] mr-2 font-semibold">
            {restaurant}
          </Text>
          <View className="border-b border-[#F59E0B]" />
        </View>
        <View className="h-64 max-w-[98%] mx-2 rounded-[25px]">
          <FlatList
            ref={flatListRef}
            data={carouselData[0]?.images}
            renderItem={carouselItem}
            horizontal
            scrollEnabled={false}
            style={{ borderRadius: 25 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View className="flex-1 flex-row mt-2 p-2 px-2.5">
          <Ionicons
            onPress={handleLocation}
            name="location-sharp"
            size={24}
            color="#F59E0B"
          />
          <Text className="max-w-[75%] text-white">
            {restaurantData?.address} |{"  "}
            <Text
              onPress={handleLocation}
              className="underline flex items-center mt-1 text-[#F59E0B] italic font-semibold"
            >
              Get Direction
            </Text>
          </Text>
        </View>
        <View className="flex-1 flex-row mt-2 px-3">
          <Ionicons
            onPress={handleLocation}
            name="time"
            size={20}
            color="#F59E0B"
          />
          <Text className="max-w-[75%] text-white">
            {restaurantData?.opening} - {restaurantData?.closing}
          </Text>
        </View>
        <View className="flex-1 border m-2 p-2 border-[#F59E0B] rounded-lg">
          <View className="flex-1 flex-row m-2 p-2 rounded-lg justify-end items-center">
            <View className="flex-1 flex-row">
              <Ionicons name="calendar" size={20} color={"#F59E0B"} />
              <Text className="text-white mx-2">Select Booking date</Text>
            </View>
            <DatePickerComponent date={date} setDate={setDate} />
          </View>
          <View className="flex-1 flex-row border border-[#464646] bg-[#464646] rounded-lg m-2 p-2 justify-end items-center">
            <View className="flex-1 flex-row">
              <Ionicons name="people" size={20} color={"#F59E0B"} />
              <Text className="text-white mx-2">Select number of guests</Text>
            </View>
            <GuestPickerComponent
              selectedNumber={selectedNumber}
              setSelectedNumber={setSelectedNumber}
            />
          </View>
        </View>
        <View className="flex-1">
          <FindSlots
            date={date}
            selectedNumber={selectedNumber}
            slots={slotsData}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            restaurant={restaurant}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
