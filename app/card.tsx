import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import Header from "./header";

// すべてのカード画像を事前にインポート
const cardImages = [
  require("../assets/images/card/1.png"),
  require("../assets/images/card/2.png"),
  require("../assets/images/card/3.png"),
  require("../assets/images/card/4.png"),
  require("../assets/images/card/5.png"),
  require("../assets/images/card/6.png"),
  require("../assets/images/card/7.png"),
  require("../assets/images/card/8.png"),
  require("../assets/images/card/9.png"),
  require("../assets/images/card/10.png"),
  require("../assets/images/card/11.png"),
  require("../assets/images/card/12.png"),
  require("../assets/images/card/13.png"),
  require("../assets/images/card/14.png"),
  require("../assets/images/card/15.png"),
  require("../assets/images/card/16.png"),
  require("../assets/images/card/17.png"),
  require("../assets/images/card/18.png"),
  require("../assets/images/card/19.png"),
  require("../assets/images/card/20.png"),
  require("../assets/images/card/21.png"),
  require("../assets/images/card/22.png"),
  require("../assets/images/card/23.png"),
  require("../assets/images/card/24.png"),
  require("../assets/images/card/25.png"),
  require("../assets/images/card/26.png"),
  require("../assets/images/card/27.png"),
  require("../assets/images/card/28.png"),
  require("../assets/images/card/29.png"),
  require("../assets/images/card/30.png"),
  require("../assets/images/card/31.png"),
  require("../assets/images/card/32.png"),
  require("../assets/images/card/33.png"),
  require("../assets/images/card/34.png"),
  require("../assets/images/card/35.png"),
  require("../assets/images/card/36.png"),
  require("../assets/images/card/37.png"),
  require("../assets/images/card/38.png"),
  require("../assets/images/card/39.png"),
  require("../assets/images/card/40.png"),
  require("../assets/images/card/41.png"),
  require("../assets/images/card/42.png"),
  require("../assets/images/card/43.png"),
  require("../assets/images/card/44.png"),
  require("../assets/images/card/45.png"),
  require("../assets/images/card/46.png"),
  require("../assets/images/card/47.png"),
  require("../assets/images/card/48.png"),
  require("../assets/images/card/49.png"),
  require("../assets/images/card/50.png"),
  require("../assets/images/card/51.png"),
  require("../assets/images/card/52.png"),
  require("../assets/images/card/53.png"),
  require("../assets/images/card/54.png"),
];

export default function Card() {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  const [usedCards, setUsedCards] = useState<number[]>([]);

  const getRandomCard = () => {
    // まだ選ばれていないカードのインデックスを取得
    const availableCards = cardImages
      .map((_, index) => index)
      .filter((index) => !usedCards.includes(index));

    // すべてのカードが選ばれた場合はリセット
    if (availableCards.length === 0) {
      setUsedCards([]);
      setSelectedCardIndex(null);
      return;
    }

    // 利用可能なカードからランダムに選択
    const randomIndex =
      availableCards[Math.floor(Math.random() * availableCards.length)];
    setSelectedCardIndex(randomIndex);
    setUsedCards((prev) => [...prev, randomIndex]);
  };

  const resetCards = () => {
    setSelectedCardIndex(null);
    setUsedCards([]);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Header />
      <TouchableOpacity
        onPress={getRandomCard}
        style={{
          backgroundColor: "#000",
          padding: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedCardIndex !== null ? (
          <Image
            source={cardImages[selectedCardIndex]}
            style={{ width: 300, height: 400 }}
          />
        ) : (
          <Image
            source={require("../assets/images/icon.png")}
            style={{ width: 300, height: 400 }}
          />
        )}
      </TouchableOpacity>
      <Text style={{ marginTop: 10, fontSize: 14, color: "#666" }}>
        残りカード: {cardImages.length - usedCards.length}枚
      </Text>
      {usedCards.length > 0 && (
        <TouchableOpacity
          onPress={resetCards}
          style={{
            backgroundColor: "#000",
            padding: 10,
            borderRadius: 10,
            marginTop: 20,
            position: "absolute",
            bottom: 100,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 26,
              fontWeight: "bold",
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}
          >
            リセット
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
