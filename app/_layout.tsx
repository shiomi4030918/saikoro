import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="card" options={{ headerShown: false }} />
      <Stack.Screen name="dice" options={{ headerShown: false }} />
      <Stack.Screen name="random" options={{ headerShown: false }} />
    </Stack>
  );
}
