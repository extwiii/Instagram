# Stacks

- React Native / Expo
- Typescript
- Nativewind
- Cloudinary
- Supabase

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

21 - Follow BE - Supabase steps 1, 2, 3 and 4
22 - Set up Supabase, create a lib file, update .env file.
Go to project Setting -> API on Supabase dashboard to find below keys

```
EXPO_PUBLIC_SUPABASE_URL=<your-url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

23 - Create (auth) folder and its files under src, next to (tabs)
24 - Create AuthProvider to wrap our (auth)/\_layout and redirect user to (tabs) if authenticated
25 - Update all layout and index files to render auth first, let user sign in then redirect user to tabs.

--------------------- Eighth commit --------------------

26 - Follow BE - Supabase steps 5, 6, 7, 8 and 9
27 - Update (tabs)/new file to insert created posts to supabase posts table
28 - Update (tabs)/index to fecth posts from supabse and pull to fetch

--------------------- Ninth commit --------------------

## Assets - Cloudinary

1 - Go and create an account -> https://cloudinary.com/
2 - Follow documentation -> https://cloudinary.com/documentation/react_native_integration#get_started_with_react_native
3 - Go settings/Upload Presets and create one for unsigned uploads

```
name: Dafult
signing mode: unsigned
Asset folder: posts
```

## BE - Supabase (Authentication, Database and API Layers)

1 - Setting up Supabase -> https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native

2 - From documentation, Install below, skip @rneui/themed

```
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage
```

3 - Go to SQL Editor -> QuickStarts and select User Management starter and click RUN
It will create a profile table, its policies and a trigger to create an profile whenever user create an account

4 - Go Authentication -> Providers -> Email and disable Confirm email option and SAVE to let user to signup without confirming their emails

5 - Go Table Editor and click Create a new table for our posts, name it posts and add required fields and link to profile tables. Please see below SS

6 - By default noone allow to do anything with this table, so Need to add some policy to let people use it.
7 - Go to table editor -> posts and then click Add RLS Policy (Role level security) from top right and then click Creat policy from top right too.
8 - Then select Enable insert for authenticated users only from right section for posts table and then click Save policy
9 - Follow step 8 to create new policy from that table and select Enable read access for all users and then click Save policy

# MISC

- List of app using Expo -> https://evanbacon.dev/blog/expo-2024
- Bottom Sheet Component -> https://github.com/gorhom/react-native-bottom-sheet

# Credit

- Youtube 1/2 link -> https://www.youtube.com/watch?v=CRIMOPhiWG8
- Youtube 2/2 link -> https://www.youtube.com/watch?v=Ili2xq9FXVo
