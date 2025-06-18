import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';

export default function Chat() {

    const item = useLocalSearchParams();
    // console.log(item.f_id);

    const [getChatArray, setChatArray] = useState([]);
    const [getChatText, setChatText] = useState("");
    // const [getMessageType, setMessageType] = useState(1);
    const [getButtonPressI, setButtonPressI] = useState(false);
    const [getButtonPressE, setButtonPressE] = useState(false);
    const [getButtonPressT, setButtonPressT] = useState(false);

    const fetchChats = async () => {
        let user_json = await AsyncStorage.getItem("user");
        let user = JSON.parse(user_json);

        let response = await fetch("http://192.168.230.139:8080/FamChat/LoadChat?id=" + user.id + "&f_id=" + item.f_id);

        if (response.ok) {
            let chat_array = await response.json();
            setChatArray(chat_array);
            // console.log(chat_array);
        }
    }

    useEffect(() => {
        fetchChats();

        const interval = setInterval(() => {
            fetchChats();
        }, 2000);

        return () => clearInterval(interval);
    }, [])

    return (
        < LinearGradient colors={["#0063FF", "pink"]} style={stylesheet.view1} >
            <StatusBar hidden={true} />

            <View style={stylesheet.view2}>
                <Pressable onPress={() => {
                    router.back();
                }}>
                    <FontAwesome name="chevron-left"
                        size={20}
                        color={"black"} />
                </Pressable>
                <View style={stylesheet.view3}>
                    {
                        item.f_avatar == "true"
                            ? <Image source={"http://192.168.230.139:8080/FamChat/AvatarImages/" + item.f_mobile + ".png?timestamp=" + new Date().getTime()}
                                contentFit='contain' style={stylesheet.img1} />
                            : <Text style={stylesheet.text2}>{item.f_avatar_letters}</Text>
                    }
                </View>

                <Text style={stylesheet.text1}>{item.f_name}</Text>
                <FontAwesome name="circle"
                    size={22}
                    color={item.f_user_status == 1 ? "green" : "red"} />
            </View>

            <FlashList data={getChatArray}
                renderItem={({ item }) => {

                    return (
                        // { item.type == 1 ? null : null }
                        < View style={item.side == "right" ? stylesheet.view5_1 : stylesheet.view5_2} >
                            <View style={stylesheet.view8}>
                                {item.type == 1 ?
                                    <View style={stylesheet.view1}>
                                        <Text style={stylesheet.text3}>{item.message}</Text>
                                    </View>
                                    :
                                    item.status == 2 ? <View style={stylesheet.view1}>
                                        <Text style={stylesheet.text3}>{""}</Text>
                                    </View> : null}
                                {
                                    item.status == 2 ?
                                        <Pressable style={stylesheet.btn2} opacity={0.5} onPress={async () => {

                                            // alert("delete");
                                            // console.log(item);
                                            let response = await fetch("http://192.168.230.139:8080/FamChat/DeleteMessage?id=" + item.id);

                                            if (response.ok) {
                                                let json = await response.json();

                                                if (json.success) {
                                                    console.log("message deleted");
                                                    fetchChats();
                                                }
                                            }

                                        }}>
                                            <FontAwesome name="remove"
                                                size={18}
                                                color={"black"} opacity={0.2} />
                                        </Pressable> : null
                                }
                            </View>

                            {item.type == 1 ? null :
                                <View style={[stylesheet.view9, item.side == "right" ? stylesheet.view9_1 : stylesheet.view9_2]}>
                                    <Image style={stylesheet.img2} source={item.type == 2 ? require("../assets/hello-comic-style.png")
                                        : "http://192.168.230.139:8080/FamChat/ChatImages/" + item.id + ".png?timestamp=" + new Date().getTime()} contentFit='contain' />
                                </View>
                            }

                            <View style={stylesheet.view6}>
                                <Text style={stylesheet.text4}>{item.datetime}</Text>
                                {item.side == "right" ?
                                    <FontAwesome name="check"
                                        size={14}
                                        color={"blue"} opacity={item.status == 2 ? 0.2 : 1} />
                                    : null
                                }
                            </View>
                        </View>
                    )

                }}
                estimatedItemSize={200}
            />

            <View style={stylesheet.view7}>
                <TextInput style={stylesheet.text_input1} value={getChatText} onChangeText={(text) => {
                    setChatText(text);
                }} />
                <Pressable style={getButtonPressI ? stylesheet.btn1_x : stylesheet.btn1} onPressIn={() => {
                    setButtonPressI(true)
                }} onPressOut={() => {
                    setButtonPressI(false)
                }} onPress={async () => {
                    let result = await ImagePicker.launchImageLibraryAsync({
                        // mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    });

                    if (!result.canceled) {

                        let user_json = await AsyncStorage.getItem("user");
                        let user = JSON.parse(user_json);

                        let formData = new FormData();
                        formData.append("id", user.id);
                        formData.append("f_id", item.f_id);
                        formData.append("msg", "Image");
                        formData.append("type", 3);
                        formData.append("image", {
                            name: "",
                            type: "image/png",
                            uri: result.assets[0].uri,
                        });

                        let response = await fetch("http://192.168.230.139:8080/FamChat/SendChat", {
                            method: "POST",
                            body: formData
                        });

                        if (response.ok) {
                            let json = await response.json();

                            if (json.success) {
                                console.log("message sent");
                                setChatText("");
                                fetchChats();
                            }
                        }
                    }
                }}>
                    <FontAwesome name="image"
                        size={20}
                        color={"black"} />
                </Pressable>

                <Pressable style={getButtonPressE ? stylesheet.btn1_x : stylesheet.btn1} onPressIn={() => {
                    setButtonPressE(true)
                }} onPressOut={() => {
                    setButtonPressE(false)
                }} onPress={async () => {
                    let user_json = await AsyncStorage.getItem("user");
                    let user = JSON.parse(user_json);

                    let formData = new FormData();
                    formData.append("id", user.id);
                    formData.append("f_id", item.f_id);
                    formData.append("msg", "Sticker");
                    formData.append("type", 2);

                    let response = await fetch("http://192.168.230.139:8080/FamChat/SendChat", {
                        method: "POST",
                        body: formData
                    });

                    if (response.ok) {
                        let json = await response.json();

                        if (json.success) {
                            console.log("message sent");
                            setChatText("");
                            fetchChats();
                        }
                    }
                }}>
                    <FontAwesome name="hand-peace-o"
                        size={20}
                        color={"black"} />
                </Pressable>

                <Pressable style={getButtonPressT ? stylesheet.btn1_x : stylesheet.btn1} onPressIn={() => {
                    setButtonPressT(true)
                }} onPressOut={() => {
                    setButtonPressT(false)
                }} onPress={async () => {
                    if (getChatText.length == 0) {
                        Alert.alert("Error", "Empty message can not be sent");
                    } else {
                        let user_json = await AsyncStorage.getItem("user");
                        let user = JSON.parse(user_json);

                        let formData = new FormData();
                        formData.append("id", user.id);
                        formData.append("f_id", item.f_id);
                        formData.append("msg", getChatText);
                        formData.append("type", 1);

                        let response = await fetch("http://192.168.230.139:8080/FamChat/SendChat", {
                            method: "POST",
                            body: formData
                        });

                        if (response.ok) {
                            let json = await response.json();

                            if (json.success) {
                                console.log("message sent");
                                setChatText("");
                                fetchChats();
                            }
                        }
                    }
                }}>
                    <FontAwesome name="play" marginLeft={6}
                        size={20}
                        color={"black"} />
                </Pressable>
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
        paddingHorizontal: 10,
        columnGap: 10,
        alignItems: "center",
        width: "100%",
        height: 66,
        backgroundColor: "#386BD1",
        flexDirection: "row"
    },

    view3: {
        width: 50,
        height: 50,
        borderRadius: 40,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center"
    },

    view4: {
        padding: 10,
        rowGap: 10,
    },

    view5_1: {
        marginTop: 10,
        marginRight: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "pink",
        justifyContent: "center",
        alignSelf: "flex-end"
    },

    view5_2: {
        marginTop: 10,
        marginLeft: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#0063FF",
        justifyContent: "center",
        alignSelf: "flex-start"
    },

    view6: {
        // alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: "center"
    },

    view7: {
        paddingHorizontal: 10,
        columnGap: 10,
        alignItems: "center",
        width: "100%",
        height: 55,
        // backgroundColor: "#386BD1",
        flexDirection: "row"
    },

    view8: {
        flexDirection: "row",
        alignItems: "flex-start"
    },

    view9: {
        width: 180,
        height: 140,
        borderRadius: 10,
        padding: 5,
        justifyContent: "center",
        alignItems: "center"
    },

    view9_1: {
        backgroundColor: "#F8B5C0",
    },

    view9_2: {
        backgroundColor: "#0E6BFF",
    },


    img1: {
        width: "100%",
        height: "100%",
        borderRadius: 30,
        // alignSelf: "center",
    },

    img2: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },

    text1: {
        fontSize: 22,
        fontWeight: "bold",
    },

    text2: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
        // alignSelf: "center"
    },

    text3: {
        fontSize: 18,
    },

    text4: {
        fontSize: 14,
        opacity: 0.5
    },

    text_input1: {
        fontSize: 20,
        paddingHorizontal: 15,
        height: 40,
        borderRadius: 20,
        // borderStyle: "solid",
        // borderWidth: 2,
        flex: 1,
        backgroundColor: "#386BD1",
    },
    btn1: {
        backgroundColor: "#386BD1",
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        // paddingLeft:6
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },

    btn1_x: {
        backgroundColor: "#386BD1",
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "pink"
    },

    btn2: {
        backgroundColor: "red",
        height: 20,
        width: 20,
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center",
        // paddingLeft:6
    },

});

