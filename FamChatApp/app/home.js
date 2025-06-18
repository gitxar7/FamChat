import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from "@shopify/flash-list";
import { router } from 'expo-router';

export default function Home() {

    const [getChatArray, setChatArray] = useState([]);
    const [getUser, setUser] = useState("");

    useEffect(() => {
        async function fetchData() {
            let user_json = await AsyncStorage.getItem("user");

            if (user_json == null) {
                router.replace("/");
            } else {

                let user = JSON.parse(user_json);
                let response = await fetch("http://192.168.230.139:8080/FamChat/LoadHomeData?id=" + user.id);

                if (response.ok) {
                    let json = await response.json();
                    let chat_array = json.chat_array;
                    setChatArray(chat_array);
                    setUser(json.user);
                }

            }
        }

        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    const imagePath = require("../assets/icon-text.png");


    return (
        < LinearGradient colors={["#0063FF", "pink"]} style={stylesheet.view1} >
            <StatusBar hidden={true} />

            <View style={stylesheet.view8}>
                <View style={stylesheet.view9}>
                    <Image style={stylesheet.img1} source={imagePath} contentFit='contain' />
                </View>
                <Pressable style={stylesheet.view3} onPress={() => {
                    router.push({
                        pathname: "profile",
                        params: getUser
                    });
                }}>
                    {
                        getUser.avatar
                            ? <Image source={"http://192.168.230.139:8080/FamChat/AvatarImages/" + getUser.mobile + ".png?timestamp=" + new Date().getTime()}
                                contentFit='contain' style={stylesheet.img2} />
                            : <Text style={stylesheet.text5}>{getUser.avatar_letters}</Text>
                    }
                </Pressable>
            </View>

            <FlashList data={getChatArray}
                renderItem={({ item }) => {

                    return (
                        <Pressable onPress={() => {
                            router.push({
                                pathname: "chat",
                                params: item
                            });
                        }}>
                            <View style={stylesheet.view5}>
                                <View style={[stylesheet.view6, item.f_user_status == 1 ? stylesheet.view6_on : stylesheet.view6_off]}>
                                    {
                                        item.f_avatar
                                            ? <Image source={"http://192.168.230.139:8080/FamChat/AvatarImages/" + item.f_mobile + ".png?timestamp=" + new Date().getTime()}
                                                contentFit='contain' style={stylesheet.img2} />
                                            : <Text style={stylesheet.text4}>{item.f_avatar_letters}</Text>
                                    }
                                </View>
                                <View style={stylesheet.view4}>
                                    <Text style={stylesheet.text1}>{item.f_name}</Text>
                                    <Text style={stylesheet.text2} numberOfLines={1}>
                                        {item.new_msg ?
                                            <Text style={{ color: "white", fontWeight: "bold" }}>New Message : </Text>
                                            : null}
                                        {item.f_message}
                                    </Text>
                                    <View style={stylesheet.view7}>
                                        <Text style={stylesheet.text3}>{item.f_date}</Text>
                                        {item.f_chat_status == 3 ? null :
                                            <FontAwesome name="check"
                                                size={15}
                                                color={"blue"}
                                                opacity={item.f_chat_status == 2 ? 0.2 : 1} />
                                        }

                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    )

                }}
                estimatedItemSize={200}
            />
        </LinearGradient >
    );
}

const stylesheet = StyleSheet.create({
    view1: {
        flex: 1,
        // justifyContent: "center",
        // paddingVertical: 10,
        paddingHorizontal: 10,
        rowGap: 10,
    },

    view2: {
        // flex: 1,
        columnGap: 12,
        flexDirection: "row",
        paddingHorizontal: 10,
        backgroundColor: "#3885D1",
        alignItems: "center",
        marginTop: 50,
        borderRadius: 15,
        height: 100,
    },

    view3: {
        width: 45,
        height: 45,
        borderRadius: 40,
        backgroundColor: "black",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#02008F",
        alignItems: "center",
        justifyContent: "center"
        // backgroundColor: "red"
    },

    view4: {
        flex: 1
    },

    view5: {
        // flex: 1,
        columnGap: 12,
        flexDirection: "row",
        paddingHorizontal: 10,
        // backgroundColor: "#386BD1",
        alignItems: "center",
        marginBottom: 10,
        borderRadius: 15,
        height: 80,
    },

    view6: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "black",
        borderStyle: "solid",
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center"
    },

    view6_off: {
        borderColor: "red",
    },

    view6_on: {
        borderColor: "green",
    },

    view7: {
        alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: "center"
    },

    view8: {
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderBottomColor: "#02008F",
        // backgroundColor: "yellow",
        // flex:1,
        // justifyContent:"center"
        alignItems: "center",
        paddingVertical: 5,
        flexDirection: "row",
    },

    view9: {
        flex: 1
    },

    text1: {
        fontSize: 22,
        fontWeight: "bold"
    },

    text2: {
        fontSize: 18,
        // fontWeight:"black"
        // overflow:"hidden",
        // height:18
    },

    text3: {
        fontSize: 15,
        // fontWeight:"bold"
        opacity: 0.5,
        alignSelf: "flex-end"
    },

    text4: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
        // alignSelf: "center"
    },

    text5: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
        // alignSelf: "center"
    },

    img1: {
        width: 200,
        height: 50,
        // borderRadius: 10,
        alignSelf: "flex-start",
        // backgroundColor:"red"
    },

    img2: {
        width: "100%",
        height: "100%",
        borderRadius: 30,
        // alignSelf: "center",
    },
});