import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import Header from "./header";

export default function Dice() {
  const [selectedDiceCount, setSelectedDiceCount] = useState<number>(1);
  const [diceResults, setDiceResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  const diceImages = [
    require("../assets/images/dice/1.png"),
    require("../assets/images/dice/2.png"),
    require("../assets/images/dice/3.png"),
    require("../assets/images/dice/4.png"),
    require("../assets/images/dice/5.png"),
    require("../assets/images/dice/6.png"),
  ];

  const rollDice = () => {
    setIsRolling(true);

    // アニメーション効果のため少し遅延
    setTimeout(() => {
      const results = [];
      for (let i = 0; i < selectedDiceCount; i++) {
        results.push(Math.floor(Math.random() * 6));
      }
      setDiceResults(results);
      setIsRolling(false);
    }, 500);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />

      {/* サイコロの個数選択 */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
          サイコロの個数を選択
        </Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          {[1, 2, 3].map((count) => (
            <TouchableOpacity
              key={count}
              onPress={() => {
                setSelectedDiceCount(count);
                setDiceResults([]); // 個数変更時に結果をリセット
              }}
              style={{
                backgroundColor: selectedDiceCount === count ? "#000" : "#fff",
                paddingHorizontal: 20,
                paddingVertical: 20,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: "#000",
              }}
            >
              <Text
                style={{
                  color: selectedDiceCount === count ? "#fff" : "#000",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {count}個
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* サイコロの結果表示 */}
      {diceResults.length > 0 && !isRolling ? (
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", gap: 20, marginBottom: 20 }}>
            {diceResults.map((result, index) => (
              <Image
                key={index}
                source={diceImages[result]}
                style={{
                  width: 80,
                  height: 80,
                  borderWidth: 4,
                  borderRadius: 10,
                  borderColor: "#000",
                  marginVertical: 30,
                }}
              />
            ))}
          </View>
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", gap: 20, marginBottom: 20 }}>
            {Array.from({ length: selectedDiceCount }, (_, index) => (
              <Image
                key={index}
                source={require("../assets/images/icon.png")}
                style={{
                  width: 80,
                  height: 80,
                  borderWidth: 4,
                  borderRadius: 10,
                  borderColor: "#000",
                  marginVertical: 30,
                }}
              />
            ))}
          </View>
        </View>
      )}
      {/* サイコロを振るボタン */}
      <TouchableOpacity
        onPress={rollDice}
        disabled={isRolling}
        style={{
          backgroundColor: isRolling ? "#999" : "#000",
          paddingHorizontal: 40,
          paddingVertical: 15,
          borderRadius: 25,
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {isRolling ? "振っています..." : "サイコロを振る"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
