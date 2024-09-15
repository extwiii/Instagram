import { Redirect, Stack } from 'expo-router'
import { NativeWindStyleSheet } from 'nativewind'
import AuthProvider from '../providers/AuthProvider'

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  )
}

NativeWindStyleSheet.setOutput({
  default: 'native',
})
