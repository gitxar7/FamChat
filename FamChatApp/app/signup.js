import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [getImage, setImage] = useState(null);
  const [getPasswordVisibility, setPasswordVisibility] = useState(true);
  const [getPasswordVisibilityIcon, setPasswordVisibilityIcon] = useState("eye");

  const [getButtonProcess, setButtonProcess] = useState(true);
  const [getButtonPress, setButtonPress] = useState(false);


  const [getMobile, setMobile] = useState("");
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getPassword, setPassword] = useState("");

  const [loaded, error] = useFonts({
    "avatar-text": require("../assets/fonts/Rowdies-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const imagePath = require("../assets/icon-text.png");

  return (
    <LinearGradient colors={["#0063FF", "pink"]} style={stylesheet.view1}>
      <StatusBar hidden={true} />
      <ScrollView>
        <View style={stylesheet.view2}>
          <Image style={stylesheet.img1} source={imagePath} contentFit='contain' />
          <Text style={stylesheet.text1}>Create Account</Text>
          <Text style={stylesheet.text2}>Hello! Welcome to FamChat, Let's Start a Conversation...</Text>

          <LinearGradient colors={["black", "black"]} style={stylesheet.img2}>
            <Pressable onPress={
              async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                  // mediaTypes: ImagePicker.MediaTypeOptions.Images,
                });

                if (!result.canceled) {
                  setImage(result.assets[0].uri);
                }
              }
            }>
              {getImage == null ? <FontAwesome alignSelf={"center"} name="user-circle-o"
                size={110} opacity={0.1}
                color="white" />
                : <Image style={stylesheet.img2} source={getImage} contentFit='cover' />
              }

            </Pressable>
          </LinearGradient>

          <Text style={stylesheet.text4}>Mobile:</Text>
          <TextInput style={stylesheet.input1} inputMode="tel" onChangeText={(text) => {
            setMobile(text);
          }} />

          <Text style={stylesheet.text4}>First Name:</Text>
          <TextInput style={stylesheet.input1} inputMode="text" onChangeText={(text) => {
            setFirstName(text);
          }} />

          <Text style={stylesheet.text4}>Last Name:</Text>
          <TextInput style={stylesheet.input1} inputMode="text" onChangeText={(text) => {
            setLastName(text);
          }} />

          <Text style={stylesheet.text4}>Password:</Text>
          <View style={stylesheet.inputView}>
            <TextInput style={stylesheet.input2} secureTextEntry={getPasswordVisibility} inputMode="text" onChangeText={(text) => {
              setPassword(text);
            }} /><Pressable onPress={() => {
              if (getPasswordVisibility) {
                setPasswordVisibility(false);
                setPasswordVisibilityIcon("eye-slash");
              } else {
                setPasswordVisibility(true);
                setPasswordVisibilityIcon("eye");
              }

            }}>
              <FontAwesome name={getPasswordVisibilityIcon}
                size={20}
                color="black" />
            </Pressable>
          </View>

          <Pressable disabled={!getButtonProcess} style={getButtonPress ? stylesheet.btn1 : stylesheet.btn1_x} onPressIn={() => {
            setButtonPress(true)
          }} onPressOut={() => {
            setButtonPress(false)
          }} onPress={async () => {

            setButtonProcess(false);

            let formData = new FormData();
            formData.append("mobile", getMobile);
            formData.append("fname", getFirstName);
            formData.append("lname", getLastName);
            formData.append("password", getPassword);
            if (getImage != null) {
              formData.append("avatarImage", {
                name: "",
                type: "image/png",
                uri: getImage,
              });
            }


            let response = await fetch("http://192.168.230.139:8080/FamChat/SignUp", {
              method: "POST",
              body: formData
            });

            if (response.ok) {
              setButtonProcess(true);
              let json = await response.json();
              if (json.success) {
                router.replace("/");
              } else {
                Alert.alert("Error", json.message);
              }
            }
          }}>
            {getButtonProcess ? <FontAwesome name="paper-plane"
              size={18}
              color="pink" /> : null}
            <Text style={stylesheet.text3}>{getButtonProcess ? "Sign Up" : "Registering User..."}</Text>
          </Pressable>

          <Pressable style={stylesheet.btn2} onPress={() => {
            router.replace("/");
          }}>
            <Text style={stylesheet.text5}>Already Registered? Go to Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );

}

const stylesheet = StyleSheet.create({
  view1: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 40

  },

  view2: {
    flex: 1,
    rowGap: 12,
    paddingHorizontal: 25,
    // backgroundColor: "#00C6FB"
  },

  inputView: {
    width: "100%",
    height: 40,
    borderStyle: "solid",
    borderWidth: 1,
    fontSize: 18,
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 10
  },

  bg1: {
    position: "absolute",
    width: "200%",
    height: "100%"
  },

  text1: {
    fontSize: 32,
    // fontWeight: "bold",
    // color: "blue",
    fontFamily:"avatar-text"
  },


  text2: {
    marginTop: -20,
    fontSize: 20,
  },
  text3: {
    fontSize: 18,
    fontWeight: "bold",
    color: "pink",
  },
  text4: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text5: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
    textDecorationStyle: 'solid',
    textDecorationColor: "blue",
    textDecorationLine: "underline",
    opacity: 0.5
  },

  input1: {
    width: "100%",
    height: 40,
    borderStyle: "solid",
    borderWidth: 1,
    fontSize: 18,
    paddingHorizontal: 10,
    borderRadius: 10
  },

  input2: {
    flex: 1,
    height: 40,
    fontSize: 18,
  },
  btn1: {
    backgroundColor: "#02008F",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    flexDirection: 'row',
    columnGap: 10,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "pink"
  },

  btn2: {
    justifyContent: "center",
    alignItems: "center",
    color: "#02008F"
  },

  btn1_x: {
    backgroundColor: "#02008F",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    flexDirection: 'row',
    columnGap: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  img1: {
    width: "100%",
    height: 100,
    // borderRadius: 10,
    alignSelf: "center",
    marginTop: 20
  },
  img2: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: "center",
    // alignItems:"center",
    justifyContent: "center"
  },
});

