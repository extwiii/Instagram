# Stacks

- React Native / Expo
- Typescript
- Nativewind
- Cloudinary
- Supabase

# Documentation

## UI - React Native / Expo

1 - Use create expo command and select blank ts template (SS)

<img width="593" alt="Screenshot 2024-09-13 at 22 44 43" src="https://github.com/user-attachments/assets/167c800e-37c6-4949-a796-8e33e0e4a85d">

2 - Installing expo router. Follow manual installation steps here -> https://docs.expo.dev/router/installation/#manual-installation
After installation, we will see Welcome to Expo (SS)

<img width="1493" alt="Screenshot 2024-09-13 at 22 48 21" src="https://github.com/user-attachments/assets/4af56680-4679-4fc5-9790-8c2089724f8a">


3 - Add .prettierrc file with below settings

```
{
  "semi": false,
  "singleQuote": true
}
```

4 - Add src/app folder and create very first files and link them together with Link from expo-router

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

29 - Go to Cloudinary dashboard and click Media Library, upload an avatar for user who has no avatar image yet, copy public id from that avatar and use that as a fallback

--------------------- Tenth commit --------------------

30 - Update profile page to render username when selected and let user to update username.Also bio section added in the code as well as in the profiles table in Supabase.

--------------------- Eleventh commit --------------------

31 - Update profile page to render avatar when user has one and let user to update avatar.

--------------------- Twelfth commit --------------------

32 - Update app.json to reflect light/dark mode changes. Check how to use dark mode in nativewind to implement it.

```
  "userInterfaceStyle": "automatic",
```

33 - Video feature uses https://docs.expo.dev/versions/latest/sdk/av/, go and follow installation steps. Usage: https://docs.expo.dev/versions/latest/sdk/video-av/#usage

Troubleshooting: Cloudinary already use expo-av and that creates a bug for us, make sure not install it if you use cloudinary packages, otherwise it will crush your app.
Make sure to use "tailwindcss": "3.3.2", without ^ character if see some nativewind related errors.

34 - Update (tabs)/new screen to accept video type, use expo-av package to render selected video on the screen.

35 - Update Cloudinary upload function to accept video type

36 - To understand type of posts on feed screen, add new column called media_type to posts table and set its type to Text and also set default value to image

37 - Update PostListItem component to render video type correctly

--------------------- Thirteenth commit --------------------

38 - refactoring PostListItem component

--------------------- Fourteenth commit --------------------

39 - Follow BE - Supabase steps 10, 11 and 12
40 - Update PostListItem to let user like, dislike posts. Fetch likes for post and update like icon if like exist within a post

--------------------- Fifteenth commit --------------------

41 - Add likes count, username and caption to end of the post
42 - Use fetchPosts call to fetch likes of posts

--------------------- Sixteenth commit --------------------

43 - Show count of likes and implement double tab for likes

--------------------- Seventeenth commit --------------------

44 - Follow Push Notification steps 2 and 3
45 - Create PushNotificationProvider
46 - Follow BE - Supabase step 13
47 - Add util function to complete notification feature

--------------------- Eighteenth commit --------------------

48 - Follow BE - Supabase step 13
49 - Update plugins of `babel.config.js` for reanimated

```
plugins: ['nativewind/babel', 'react-native-reanimated/plugin'],
```

50 - Use `https://gorhom.dev/react-native-bottom-sheet/usage` for bottom sheets component, see examples, Use Modal version to hide tabbars.

51 - Make sure to wrap our layouts with these Providers

```
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
```

52 - Update (tabs)/index file to show bottomsheets with comments, and let user to send comments as well as likes comments

--------------------- Nineteenth commit --------------------

53 - Update app.json for Splash screen and app icon

--------------------- Twentieth commit --------------------

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

5 - Go Table Editor and click Create a new table for our posts, name it posts and add required fields and link to profile tables. Please see below

6 - By default noone allow to do anything with this table, so Need to add some policy to let people use it.

7 - Go to table editor -> posts ( or any table we want to edit ) and then click Add RLS Policy (Role level security) from top right and then click Creat policy from top right too.

8 - Then select Enable insert for authenticated users only from right section for posts table and then click Save policy.

9 - Follow step 8 to create new policy from that table and select Enable read access for all users and then click Save policy.

10 - Go Table Editor and click Create a new table for our likes, name it likes and add required fields and link to profiles and posts tables. Please see below.

<img width="591" alt="Screenshot 2024-09-17 at 09 27 22" src="https://github.com/user-attachments/assets/f2c60e86-d410-4425-a4f9-544926b23bb6">

<img width="600" alt="Screenshot 2024-09-17 at 09 27 07" src="https://github.com/user-attachments/assets/25d70094-1be5-4611-8c13-1b84f3686eab">

11 - Follow steps 7, 8 and 9 for policy of likes.

12 - Also add delete policy for likes, to let people to remove their likes.

13 - Update profiles table to store token, so create a new column called `push_token`.

14 - Follow steps 10 and 11 for comments.

## Push Notification

1 - Main documentation -> https://docs.expo.dev/versions/latest/sdk/notifications/

2 - Follow this to setup push notification -> https://docs.expo.dev/push-notifications/push-notifications-setup

3 - Follow this https://docs.expo.dev/build/setup/ and install eas globally

```
npm install -g eas-cli
```

4 - Then run `eas init` to generate projectId and update `app.json`.

5 - To test follow these steps -> https://docs.expo.dev/push-notifications/push-notifications-setup/#test-using-the-push-notifications-tool.
This is only work on a real device, not on simulator.

Once scan QR code and run app on your phone, allow notification and check your console to see ExponentPushToken, Example -> `ExponentPushToken[sn7J-4PLPE0URqLIjcavT_]`
After fill token, title and body, click send notification to see the notification on your phone.

<img width="405" alt="Screenshot 2024-09-23 at 14 49 40" src="https://github.com/user-attachments/assets/1458e20b-d503-4bad-86f4-506d1e819b89">

6 - Before going production, you have to follow Step 3 -> https://docs.expo.dev/push-notifications/push-notifications-setup/#get-credentials-for-development-builds

# MISC

- List of app using Expo -> https://evanbacon.dev/blog/expo-2024
- Bottom Sheet Component -> https://github.com/gorhom/react-native-bottom-sheet

# Credit

- Youtube 1/2 link -> https://www.youtube.com/watch?v=CRIMOPhiWG8
- Youtube 2/2 link -> https://www.youtube.com/watch?v=Ili2xq9FXVo
