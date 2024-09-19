import { Redirect, Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useAuth } from '@/src/providers/AuthProvider'
import NotificationProvider from '@/src/providers/NotificationProvider'

export default function TabsLayout() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Redirect href="/(auth)" />
  }

  return (
    <NotificationProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'For you',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" size={26} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="new"
          options={{
            title: 'Create post',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="plus-square-o" size={26} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={26} color={color} />
            ),
          }}
        />
      </Tabs>
    </NotificationProvider>
  )
}
