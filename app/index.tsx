import { Text, View, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 60, fontWeight: "bold" }}>サイコロ最高</Text>
      <Image
        source={require("../assets/images/icon.png")}
        style={{ width: 300, height: 300 }}
      />
      <TouchableOpacity
        onPress={() => {
          console.log("サイコロを振る");
          router.push("/card");
        }}
        style={{
          backgroundColor: "#000",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            paddingHorizontal: 40,
            paddingVertical: 10,
          }}
        >
          トランプを引く
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("サイコロを振る");
          router.push("/dice");
        }}
        style={{
          backgroundColor: "#000",
          padding: 10,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            paddingHorizontal: 40,
            paddingVertical: 10,
          }}
        >
          サイコロを振る
        </Text>
      </TouchableOpacity>
    </View>
  );
}
