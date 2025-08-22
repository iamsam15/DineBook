import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
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
const Signup = () => {
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();
  const handleSignup = async (values) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        email: values.email,
        createdAt: new Date(),
      });
      await AsyncStorage.setItem("userEmail", values.email);
      await AsyncStorage.setItem("isguest", "false");
      router.push("/home");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("SignUp Failed", "Email already in use", [{ text: "OK" }]);
      } else {
        Alert.alert(
          "SignUp Error",
          "An unexpected error occured Please try again",
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
            Let&apos;s get you started!
          </Text>

          <View className="w-5/6">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={authSchema}
              onSubmit={handleSignup}
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
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <View>
              <TouchableOpacity
                className="flex flex-row items-center justify-center"
                onPress={() => {
                  router.push("/signin");
                }}
              >
                <Text className="text-white text-semibold">
                  Already a User?{" "}
                </Text>
                <Text className="text-base font-semibold underline text-[#F59E0B]">
                  Sign in
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

export default Signup;
