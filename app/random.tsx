import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Header from "./header";
export default function RandomScreen() {
  const [min, setMin] = useState<string>("0");
  const [max, setMax] = useState<string>("100");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const roll = () => {
    const nMin = Number(min);
    const nMax = Number(max);
    if (!isValidRange(nMin, nMax)) {
      setError("範囲が不正です（最小値は最大値以下で整数に丸められます）");
      setResult(null);
      return;
    }
    setError("");
    setResult(getRandomIntInclusive(nMin, nMax));
  };

  const getRandomIntInclusive = (min: number, max: number): number => {
    const floorMin = Math.floor(min);
    const floorMax = Math.floor(max);
    const lower = Math.min(floorMin, floorMax);
    const upper = Math.max(floorMin, floorMax);
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  };

  const isValidRange = (min: number, max: number): boolean => {
    return (
      Number.isFinite(min) &&
      Number.isFinite(max) &&
      Math.floor(min) <= Math.floor(max)
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <Header />
          <View style={{ width: "100%", padding: 20, gap: 12 }}>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ marginBottom: 6, fontSize: 16 }}>最小値</Text>
                <TextInput
                  value={min}
                  onChangeText={setMin}
                  keyboardType="numeric"
                  placeholder="0"
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    padding: 12,
                    fontSize: 18,
                    minWidth: 70,
                  }}
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={{ marginBottom: 6, fontSize: 16 }}>最大値</Text>
                <TextInput
                  value={max}
                  onChangeText={setMax}
                  keyboardType="numeric"
                  placeholder="100"
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    padding: 12,
                    fontSize: 18,
                    minWidth: 70,
                  }}
                />
              </View>
            </View>

            {error ? (
              <Text style={{ color: "#d00", marginTop: 4 }}>{error}</Text>
            ) : null}
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <Text style={{ fontSize: 16, color: "#666" }}>結果</Text>
            <Text style={{ fontSize: 100, fontWeight: "bold", margin: 20 }}>
              {result === null ? "—" : String(result)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={roll}
            style={{
              backgroundColor: "#000",
              padding: 14,
              borderRadius: 10,
              marginTop: 8,
              minWidth: 300,
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
              生成する
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
