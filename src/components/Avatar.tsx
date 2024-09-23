import { AdvancedImage } from 'cloudinary-react-native'
import { thumbnail } from '@cloudinary/url-gen/actions/resize'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn'

import { cld } from '@/src/lib/cloudinary'

import { View } from 'react-native'

export default function Avatar({
  url,
  size = 48,
}: {
  url?: string
  size?: number
}) {
  const avatar = cld.image(url || 'avatar_fwm2gr')
  avatar.resize(
    thumbnail().width(size).height(size).gravity(focusOn(FocusOn.face()))
  )
  const width = size > 40 ? 'w-12' : 'w-8'

  return (
    <View className="px-1">
      <AdvancedImage
        cldImg={avatar}
        className={`${width} aspect-square rounded-full`}
      />
    </View>
  )
}
