import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function Index() {

    const [getPasswordVisibility, setPasswordVisibility] = useState(true);
    const [getPasswordVisibilityIcon, setPasswordVisibilityIcon] = useState("eye");

    const [getButtonProcess, setButtonProcess] = useState(true);
    const [getButtonPress, setButtonPress] = useState(false);

    const [getMobile, setMobile] = useState("");
    const [getPassword, setPassword] = useState("");
    const [getName, setName] = useState("");

    const [loaded, error] = useFonts({
        "avatar-text": require("../assets/fonts/Rowdies-Regular.ttf"),
        "marvel": require("../assets/fonts/BebasNeue-Regular.ttf"),
        "title": require("../assets/fonts/CormorantGaramond-Bold.ttf"),
    });

    useEffect(() => {
        async function checkUser() {
            try {
                let userJson = await AsyncStorage.getItem("user");

                if (userJson != null) {
                    router.replace("home");
                }
            } catch (error) {
                console.log(error);
            }
        }

        checkUser();
    }, []);

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
                    <Text style={stylesheet.text1}>Log in</Text>
                    <Text style={stylesheet.text2}>Hello! Welcome to FamChat, Let's Start a Conversation...</Text>

                    <LinearGradient colors={["black", "black"]} style={stylesheet.img2}>
                        {getName == "" ? <FontAwesome alignSelf={"center"} name="user-circle-o"
                            size={110} opacity={0.1}
                            color="white" />
                            : <Text style={stylesheet.text6}>{getName}</Text>
                        }
                    </LinearGradient>

                    <Text style={stylesheet.text4}>Mobile:</Text>
                    <TextInput style={stylesheet.input1} inputMode="tel" onChangeText={(text) => {
                        setMobile(text);

                    }} onEndEditing={async () => {
                        if (getMobile.length == 10) {
                            let response = await fetch("http://192.168.230.139:8080/FamChat/GetName?mobile=" + getMobile);

                            if (response.ok) {
                                let json = await response.json();
                                setName(json.name);
                            }
                        }
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

                        let response = await fetch("http://192.168.230.139:8080/FamChat/SignIn", {
                            method: "POST",
                            body: JSON.stringify({
                                mobile: getMobile,
                                password: getPassword
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });

                        if (response.ok) {
                            setButtonProcess(true);
                            let json = await response.json();
                            if (json.success) {
                                try {
                                    await AsyncStorage.setItem("user", JSON.stringify(json.user));
                                    router.replace("home");
                                } catch (error) {
                                    console.log(error);
                                }


                            } else {
                                Alert.alert("Error", json.message);
                            }
                        }
                    }}>
                        {getButtonProcess ? <FontAwesome name="paper-plane"
                            size={18}
                            color="pink" /> : null}
                        <Text style={stylesheet.text3}>{getButtonProcess ? "Sign In" : "Signing In..."}</Text>
                    </Pressable>

                    <Pressable style={stylesheet.btn2} onPress={() => {
                        router.replace("signup");
                    }}>
                        <Text style={stylesheet.text5}>New to FamChat? Create Account</Text>
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

    text6: {
        fontSize: 36,
        fontWeight: "bold",
        color: "white",
        // fontFamily:"title"
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
        alignItems: "center",
        justifyContent: "center",
        // borderWidth: 3,
        // borderStyle: "solid",
        // borderColor: "blue"
    },
});

