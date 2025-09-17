import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingTop: "30%",
      }}
    >
      <Text style={{ fontSize: 60, fontWeight: "bold" }}>サイコロ最高</Text>
      <Image
        source={require("../assets/images/icon.png")}
        style={{ width: 300, height: 300 }}
      />
      <ScrollView
        style={{
          paddingTop: 40,
          paddingHorizontal: 30,
          borderWidth: 5,
          borderColor: "#000",
          borderRadius: 50,
          marginBottom: 50,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push("/card");
          }}
          style={{
            backgroundColor: "#000",
            padding: 10,
            borderRadius: 10,
            width: 250,
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
            width: 250,
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
        <TouchableOpacity
          onPress={() => {
            router.push("/random");
          }}
          style={{
            backgroundColor: "#000",
            padding: 10,
            borderRadius: 10,
            marginTop: 20,
            width: 250,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            乱数ジェネレーター
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/roulette");
          }}
          style={{
            backgroundColor: "#000",
            padding: 10,
            borderRadius: 10,
            marginTop: 20,
            width: 250,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            ルーレット
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
