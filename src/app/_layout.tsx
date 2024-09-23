import { Stack } from 'expo-router'
import { NativeWindStyleSheet } from 'nativewind'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AuthProvider from '../providers/AuthProvider'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  )
}

NativeWindStyleSheet.setOutput({
  default: 'native',
})
