import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Header() {
  return (
    <View
      style={{
        backgroundColor: "#000",
        width: "100%",
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 60,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        style={{
          padding: 10,
          borderRadius: 10,
          width: 100,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          戻る
        </Text>
      </TouchableOpacity>
    </View>
  );
}
