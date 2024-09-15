# Documentation

## UI - React Native / Expo

1 - Use create expo command and select blank ts template (SS)
2 - Installing expo router. Follow manual installation steps here -> https://docs.expo.dev/router/installation/#manual-installation
After installation, we will see Welcome to Expo (SS)
3 - Add .prettierrc file with below settings

```
{
  "semi": false,
  "singleQuote": true
}
```

4 - Add src/app folder and create very first files and link them together with Link from expo-router (SS)
5 - Create the Root Layout
Finding right expo icon, visit https://icons.expo.fyi

--------------------- First commit --------------------

6 - Installing NativeWind -> https://www.nativewind.dev/quick-starts/expo
Add typescript support -> https://www.nativewind.dev/getting-started/typescript

--------------------- Second commit --------------------

7 - Creating some mock data for our posts. Create a file under assests
data/posts.json with below object, generate more than one.

```
[
  {
    "id": "1",
    "image": "samples/landscapes/beach-boat",
    "image_url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg",
    "caption": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?",
    "user": {
      "id": "u1",
      "avatar_url": "samples/people/boy-snow-hoodie",
      "image_url": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg",
      "username": "vadimnotjustdev"
    }
  },
]
```

Then import posts.json inside app/(tabs)/index.tsx

8 - To make it more readable and remove all ../.. syntax, update tsconfig.json file something like below;

```
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

9 - Create PostListItem component under components folder
10 - Use FlatList to render PostListItem component and rencer mock data

--------------------- Third commit --------------------

11 - Make sure to add below code to root layout to make sure nativewind is working on web version of Expo. Please read -> https://github.com/nativewind/nativewind/issues/470

```
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});
```

12 - Update app/(tab)/new file
13 - Installing image picker -> https://docs.expo.dev/versions/latest/sdk/imagepicker/

--------------------- Forth commit --------------------

14 - Update app/(tab)/profile

--------------------- Fifth commit --------------------

15 - Follow Assets - Cloudinary steps 1 and 2
16 - Create .env file with below data and update .gitignore with .env file

```
EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=<your-cloud-name>
```

17 - Initiate your Cloudinary account in lib/cloudinary.ts file

```
import { Cloudinary } from '@cloudinary/url-gen'

export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
})
```

18 - Update PostListItem to use cloudinary service

--------------------- Sixth commit --------------------

19 - Create upload image function, then Assets - Cloudinary step 3
upload_preset should match with preset created at Cloudinary

```
const options = {
  upload_preset: 'Default',
  unsigned: true,
};
```

20 - Test upload file function and see public_id in the console

--------------------- Seventh commit --------------------

## Assets - Cloudinary

1 - Go and create an account -> https://cloudinary.com/
2 - Follow documentation -> https://cloudinary.com/documentation/react_native_integration#get_started_with_react_native
3 - Go settings/Upload Presets and create one for unsigned uploads

```
name: Dafult
signing mode: unsigned
Asset folder: posts
```

# MISC

- List of app using Expo -> https://evanbacon.dev/blog/expo-2024
