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

12 - Update app/(tab)/profile

# MISC

- List of app using Expo -> https://evanbacon.dev/blog/expo-2024
