import { Text, View, Image, TextInput, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import Button from '@/src/components/Button'
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/providers/AuthProvider'
import CustomTextInput from '@/src/components/CustomTextInput'

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null)
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')

  const { user } = useAuth()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    if (!user) {
      return
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      Alert.alert('Failed to fetch profile')
    }
    setUsername(data.username)
    setBio(data.bio)
  }

  const updateProfile = async () => {
    if (!user) {
      return
    }
    console.log('sds', username, bio)
    const { data, error } = await supabase.from('profiles').upsert({
      id: user.id,
      username,
      bio,
    })

    if (error) {
      Alert.alert('Failed to update profile')
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <View className="p-3 flex-1 w-full max-w-lg self-center">
      {/* Avatar image picker */}
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-52 aspect-square self-center rounded-full bg-slate-300"
        />
      ) : (
        <View className="w-52 aspect-square self-center rounded-full bg-slate-300" />
      )}
      <Text
        onPress={pickImage}
        className="text-blue-500 font-semibold m-5 self-center"
      >
        Change
      </Text>

      {/* Form */}
      <View className="gap-5">
        <View>
          <CustomTextInput
            label="Username"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View>
          <CustomTextInput
            label="Bio"
            placeholder="Bio"
            value={bio}
            onChangeText={setBio}
          />
        </View>
      </View>

      {/* Button */}
      <View className="gap-2 mt-auto">
        <View>
          <Button title="Update profile" onPress={updateProfile} />
        </View>
        <View>
          <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
        </View>
      </View>
    </View>
  )
}
