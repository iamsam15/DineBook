import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Formik } from "formik";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/DBlogo.png";
import Frame from "../../assets/images/Frame.png";
import authSchema from "../../utils/authSchema";
const Signin = () => {
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();
  const handleSignin = async (values) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredentials.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        console.log("User data: ", userDoc.data());
        await AsyncStorage.setItem("userEmail", values.email);
        await AsyncStorage.setItem("isguest", "false");
        router.push("/home");
      } else {
        console.log("No such document");
      }
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-credential") {
        Alert.alert("Sign In Failed", "Incorrect email/password", [
          { text: "OK" },
        ]);
      } else {
        Alert.alert(
          "Sign In Failed",
          "An unexpected error occurred. Please try again.",
          [{ text: "OK" }]
        );
      }
    }
  };
  return (
    <SafeAreaView className="bg-[#1c1c1c]">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className=" flex justify-center items-center pt-10">
          <TouchableOpacity onPress={() => router.push("/")}>
            <Image source={logo} style={{ width: 200, height: 200 }} />
          </TouchableOpacity>
          <Text className="text-lg text-center text-white font-bold mb-5">
            Welcome!
          </Text>

          <View className="w-5/6">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={authSchema}
              onSubmit={handleSignin}
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
                  <Text className="text-[#F59E0B] mb-2">Email</Text>
                  <TextInput
                    className="h-10 border border-[#F59E0B] text-white rounded px-2"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    value={values.email}
                    onBlur={handleBlur("email")}
                  />
                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.email}
                    </Text>
                  )}
                  <Text className="text-[#F59E0B] mt-4 mb-2">Password</Text>
                  <TextInput
                    className="h-10 border border-[#F59E0B] text-white rounded px-2"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    value={values.password}
                    onBlur={handleBlur("password")}
                  />
                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.password}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="p-2 my-2 bg-[#F59E0B] border border-[#F59E0B] text-black rounded-lg mt-5"
                  >
                    <Text className="text-xl font-semibold text-center">
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <View>
              <TouchableOpacity
                className="flex flex-row items-center justify-center"
                onPress={() => {
                  router.push("/signup");
                }}
              >
                <Text className="text-white text-semibold">New User? </Text>
                <Text className="text-base font-semibold underline text-[#F59E0B]">
                  Sign up!
                </Text>
              </TouchableOpacity>
            </View>
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
};

export default Signin;
