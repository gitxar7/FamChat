import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";

export default function Profile() {

    const user = useLocalSearchParams();
    // console.log(user.name);
    const [getImage, setImage] = useState(null);
    const [getImageStatus, setImageStatus] = useState(false);
    const [getButtonPress, setButtonPress] = useState(false);
    const [getButtonProcess, setButtonProcess] = useState(false);


    useEffect(() => {
        async function fetchData() {
            if (user.name == undefined) {
                router.replace("home");
            }
        }

        setTimeout(() => {
            fetchData();
        }, 600);
    }, [])

    return (
        < LinearGradient colors={["#0063FF", "pink"]} style={stylesheet.view1} >
            <StatusBar hidden={true} />

            <View style={stylesheet.view5}>
                <View style={stylesheet.view8}>
                    <Pressable onPress={() => {
                        router.push("test");
                    }}>
                        <FontAwesome name="chevron-left"
                            size={20}
                            color={"black"} />
                    </Pressable>

                    <Text style={stylesheet.text1}>Profile</Text>
                </View>

                <Pressable style={stylesheet.btn2} onPress={async () => {
                    let user_json = await AsyncStorage.getItem("user");
                    let user = JSON.parse(user_json);

                    let response = await fetch("http://192.168.230.139:8080/FamChat/SetOffline?id=" + user.id);

                    if (response.ok) {
                        // console.log(response);
                        let json = await response.json();
                        if (json.success) {
                            await AsyncStorage.removeItem("user");
                            router.replace("/");
                        }
                    }

                }}>
                    <FontAwesome name="sign-out"
                        size={20}
                        color={"white"} />
                </Pressable>
            </View>

            <Pressable style={stylesheet.view3} onPress={async () => {
                let result = await ImagePicker.launchImageLibraryAsync({
                    // mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    // aspect: [1, 1]

                });

                if (!result.canceled) {
                    setImage(result.assets[0].uri);
                    setImageStatus(true);
                }
            }}>

                {getImageStatus ?
                    <Image source={getImage}
                        contentFit='cover' style={stylesheet.img1} />
                    :
                    user.avatar == "true"
                        ? <Image source={"http://192.168.230.139:8080/FamChat/AvatarImages/" + user.mobile + ".png?timestamp=" + new Date().getTime()}
                            contentFit='contain' style={stylesheet.img1} />
                        : <Text style={stylesheet.text4}>{user.avatar_letters}</Text>
                }

                {/* {
                    user.avatar == "true"
                        ? <Image source={"http://192.168.230.139:8080/FamChat/AvatarImages/" + user.mobile + ".png"}
                            contentFit='contain' style={stylesheet.img1} />
                        : <Text style={stylesheet.text4}>{user.avatar_letters}</Text>
                } */}
            </Pressable>

            {/* < LinearGradient colors={[ "#3885D1","#0063FF"]} style={stylesheet.btn1_bg}> */}
            <Pressable disabled={getButtonProcess} style={
                getButtonPress ? stylesheet.btn1_x : stylesheet.btn1} onPressIn={() => {
                    setButtonPress(true)
                }} onPressOut={() => {
                    setButtonPress(false)
                }} onPress={async () => {
                    if (getImage != null) {

                        setButtonProcess(true);

                        let user_json = await AsyncStorage.getItem("user");
                        let user = JSON.parse(user_json);

                        let formData = new FormData();
                        formData.append("id", user.id);

                        formData.append("avatarImage", {
                            name: "",
                            type: "image/png",
                            uri: getImage,
                        });

                        let response = await fetch("http://192.168.230.139:8080/FamChat/UpdateProfile", {
                            method: "POST",
                            body: formData
                        });

                        if (response.ok) {
                            setButtonProcess(false);
                            let json = await response.json();
                            if (json.success) {
                                setImageStatus(false);
                                router.replace("profile");
                            } else {
                                Alert.alert("Error", json.message);
                            }
                        }

                    }

                }}>
                <Text style={stylesheet.text2}>Save Profile</Text>
                <FontAwesome name="save"
                    size={20}
                    color={"black"} />
            </Pressable>
            {/* </LinearGradient> */}

            <View style={stylesheet.view6}>

                <View style={stylesheet.view2}>
                    <View style={stylesheet.view7}>
                        <FontAwesome name="user"
                            size={40}
                            color={"black"} />
                    </View>
                    <View style={stylesheet.view4}>
                        <Text style={stylesheet.text3}>Name:</Text>
                        <Text style={stylesheet.text1}>{user.name}</Text>
                    </View>
                </View>

                <View style={stylesheet.view2}>
                    <View style={stylesheet.view7}>
                        <FontAwesome name="phone"
                            size={40}
                            color={"black"} />
                    </View >
                    <View style={stylesheet.view4}>
                        <Text style={stylesheet.text3}>Mobile:</Text>
                        <Text style={stylesheet.text1}>{user.mobile}</Text>
                    </View>
                </View>

                <View style={stylesheet.view2}>
                    <View style={stylesheet.view7}>
                        <FontAwesome name="clock-o"
                            size={50}
                            color={"black"} />
                    </View>
                    <View style={stylesheet.view4}>
                        <Text style={stylesheet.text3}>Registered Date & Time:</Text>
                        <Text style={stylesheet.text1}>{user.date}</Text>
                    </View>
                </View>

            </View>
        </LinearGradient >
    );
}

const stylesheet = StyleSheet.create({
    view1: {
        flex: 1,
        // justifyContent: "center",
        // paddingVertical: 10,
        // paddingHorizontal: 10,
        rowGap: 10,
    },

    view2: {
        // flex: 1,
        columnGap: 12,
        flexDirection: "row",
        paddingHorizontal: 10,
        backgroundColor: "#3885D1",
        alignItems: "center",
        // marginTop: 50,
        borderRadius: 15,
        height: 80,
    },

    view3: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: "black",
        borderStyle: "solid",
        borderWidth: 4,
        borderColor: "#386BD1",
        alignSelf: "center",
        marginTop: 120,
        marginBottom: 40,
        alignItems: "center",
        justifyContent: "center"
        // backgroundColor: "red"
    },

    view4: {
        flex: 1
    },

    view5: {
        paddingHorizontal: 10,
        columnGap: 10,
        alignItems: "center",
        width: "100%",
        height: 66,
        backgroundColor: "#386BD1",
        flexDirection: "row"
    },

    view6: {
        paddingHorizontal: 10,
        rowGap: 10
    },

    view7: {
        width: 55,
        height: 55,
        borderRadius: 100,
        backgroundColor: "pink",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
        // backgroundColor: "red"
    },

    view8: {
        flex: 1,
        flexDirection: "row",
        columnGap: 10,
        alignItems: "center",
    },

    text1: {
        fontSize: 22,
        fontWeight: "bold"
    },

    text2: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold"
        // overflow:"hidden",
        // height:18
    },

    text3: {
        fontSize: 15,
        // fontWeight:"bold"
        opacity: 0.5,
        // alignSelf: "flex-end"
    },

    text4: {
        fontSize: 45,
        fontWeight: "bold",
        color: "white",
        // alignSelf: "center"
    },

    btn1: {
        backgroundColor: "#386BD1",
        height: 40,
        borderRadius: 10,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        columnGap: 10,
        // borderStyle: "solid",
        // borderWidth: 4,
        // borderColor: "#0063FF",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },

    btn1_x: {
        backgroundColor: "#386BD1",
        height: 40,
        borderRadius: 10,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        columnGap: 10,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "pink"
    },

    btn1_bg: {
        // backgroundColor: "blue",
        height: 40,
        marginHorizontal: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        flexDirection: 'row',
        columnGap: 10,
        // opacity:0.6
    },

    btn2: {
        backgroundColor: "red",
        height: 30,
        width: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        columnGap: 10,
    },


    img1: {
        width: "100%",
        height: "100%",
        borderRadius: 100,
        // alignSelf: "center",
    },
});