import { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import Header from "./header";

type RouletteItem = {
  id: string;
  label: string;
  weight: string; // keep as string for TextInput binding; parse on use
};

export default function RouletteScreen() {
  const [items, setItems] = useState<RouletteItem[]>([
    { id: "1", label: "A", weight: "1" },
    { id: "2", label: "B", weight: "1" },
  ]);
  const [result, setResult] = useState<string>("—");
  const [error, setError] = useState<string>("");
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalWeight = useMemo(() => {
    return items.reduce((sum, it) => {
      const w = Number(it.weight);
      return Number.isFinite(w) && w > 0 ? sum + w : sum;
    }, 0);
  }, [items]);

  const addItem = () => {
    const nextId = String(Date.now());
    setItems((prev) => [...prev, { id: nextId, label: "", weight: "1" }]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const updateItem = (id: string, field: "label" | "weight", value: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  };

  const spin = () => {
    if (isSpinning) return;
    // validation
    if (items.length === 0) {
      setError("項目を追加してください");
      return;
    }
    const parsed = items
      .map((it) => ({
        label: it.label.trim() || "(空)",
        weight: Number(it.weight),
      }))
      .filter((it) => Number.isFinite(it.weight) && it.weight > 0);
    const sum = parsed.reduce((s, it) => s + it.weight, 0);
    if (sum <= 0) {
      setError("有効な重み（正の数）を設定してください");
      return;
    }
    setError("");

    // 11回目で確定するため、先に最終結果を決める（重みに基づく）
    const r = Math.random() * sum; // [0, sum)
    let acc = 0;
    let finalLabel = parsed[parsed.length - 1].label;
    for (const it of parsed) {
      acc += it.weight;
      if (r < acc) {
        finalLabel = it.label;
        break;
      }
    }

    // スピン演出：10回は一時表示、11回目に確定
    setIsSpinning(true);

    // 重みに基づく一時選択関数（視覚的な公平感を維持）
    const weightedPick = () => {
      const rr = Math.random() * sum;
      let a = 0;
      for (const it of parsed) {
        a += it.weight;
        if (rr < a) return it.label;
      }
      return parsed[parsed.length - 1].label;
    };

    let tick = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // 1サイクル: 空表示 -> 候補表示（回数カウント）
    // 空表示時間と候補表示までの遅延を分割
    const cycleIntervalMs = 160;
    const blankDurationMs = 80;
    intervalRef.current = setInterval(() => {
      // まず空表示
      setResult("");
      // 少し待ってから候補を表示し、そこでカウント
      if (subTimeoutRef.current) clearTimeout(subTimeoutRef.current);
      subTimeoutRef.current = setTimeout(() => {
        setResult(weightedPick());
        tick += 1;
        if (tick >= 10 && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          // 最終表示に行く前にサブタイマー不要
          if (subTimeoutRef.current) {
            clearTimeout(subTimeoutRef.current);
            subTimeoutRef.current = null;
          }
          // 少し間を置いて最終結果で停止
          timeoutRef.current = setTimeout(() => {
            setResult(finalLabel);
            setIsSpinning(false);
          }, 200);
        }
      }, blankDurationMs);
    }, cycleIntervalMs);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (subTimeoutRef.current) clearTimeout(subTimeoutRef.current);
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: "40%" }}>
          <Header />
          <ScrollView
            contentContainerStyle={{ padding: 20 }}
            keyboardShouldPersistTaps="handled"
          >
            {items.map((item, idx) => (
              <View
                key={item.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: 22, textAlign: "right" }}>
                  {idx + 1}.
                </Text>
                <TextInput
                  value={item.label}
                  onChangeText={(t) => updateItem(item.id, "label", t)}
                  placeholder="項目名"
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    padding: 10,
                    fontSize: 16,
                  }}
                />
                <Text style={{ marginHorizontal: 4 }}>重み</Text>
                <TextInput
                  value={item.weight}
                  onChangeText={(t) =>
                    updateItem(item.id, "weight", t.replace(/[^0-9.]/g, ""))
                  }
                  keyboardType="numeric"
                  placeholder="1"
                  style={{
                    width: 70,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    padding: 10,
                    fontSize: 16,
                    textAlign: "right",
                  }}
                />
                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  style={{
                    backgroundColor: "#eee",
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>削除</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              onPress={addItem}
              style={{
                backgroundColor: "#000",
                padding: 12,
                borderRadius: 10,
                alignSelf: "flex-start",
                marginTop: 4,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                ＋ 項目を追加
              </Text>
            </TouchableOpacity>

            {error ? (
              <Text style={{ color: "#d00", marginTop: 10 }}>{error}</Text>
            ) : null}

            <View style={{ alignItems: "center", marginVertical: 24 }}>
              <Text style={{ fontSize: 16, color: "#666" }}>結果</Text>
              <Text style={{ fontSize: 64, fontWeight: "bold", marginTop: 6 }}>
                {result}
              </Text>
            </View>

            <TouchableOpacity
              onPress={spin}
              disabled={isSpinning}
              style={{
                backgroundColor: "#000",
                padding: 14,
                borderRadius: 10,
                alignSelf: "center",
                minWidth: 260,
                opacity: isSpinning ? 0.6 : 1,
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
                抽選する
              </Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
            <Text
              style={{
                textAlign: "center",
                color: "#666",
                marginTop: 10,
                marginBottom: "50%",
              }}
            >
              合計重み: {totalWeight}
            </Text>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
