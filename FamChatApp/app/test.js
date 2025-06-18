import { Alert, Pressable, StyleSheet, Text, View } from "react-native"

const myFunction = () => {
    <View style={{ flex: 1 }}>
        <Pressable onPress={() => {
            Alert.alert("Alert", "Test Alert");
        }}>
            <Text>Click</Text>
        </Pressable>
    </View>
}

const style = StyleSheet.create({
    style1:{
        
    }
});

export default myFunction;