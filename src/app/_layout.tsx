import { Stack } from 'expo-router'
import { NativeWindStyleSheet } from 'nativewind'

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />
}

NativeWindStyleSheet.setOutput({
  default: 'native',
})
