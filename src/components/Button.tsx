import { Pressable, Text } from 'react-native'

type ButtonProps = {
  title: string
  onPress?: () => void
  disabled?: boolean
}

export default function Button({ title, onPress, disabled }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-blue-500 w-full p-3 items-center rounded-md"
      disabled={disabled}
    >
      <Text className="text-white font-semibold">{title}</Text>
    </Pressable>
  )
}
