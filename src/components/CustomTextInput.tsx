import { Text, TextInput } from 'react-native'

export default function CustomTextInput({
  label,
  placeholder,
  value,
  onChangeText,
}: {
  label: string
  placeholder: string
  value: string
  onChangeText: (text: string) => void
}) {
  return (
    <>
      <Text className="mb-2 text-gray-500 font-semibold">{label}</Text>
      <TextInput
        className="border border-gray-300 p-3 rounded-md"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </>
  )
}

// `${className} bg-white p-3 rounded`
