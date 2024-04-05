# EasySaleRegister
## Description
EasySaleRegister is a web application designed to help you register the products you want to sell. The app allows you to enter product details such as title, product URL, price, sales price, description, and images. Data is stored in Firebase, and images are uploaded using the [ImgBB](https://imgbb.com/) API

This app is in a beta phase and is primarily designed for personal use. Currently, it is not possible to share product links with potential customers. The functionality focuses on internal product management, which allows you to manage products in sales, including the purchase and sale price.

# Used technology
- React
- Material-UI
- Firebase
- Axios
- ImgBB API

# Demo App
You can access the EasySaleRegister demo [here](https://easy-sale-register.netlify.app) .

# Features
- Product registration with title, product URL, price, sales price, description and images.
- Storing data in Firebase for later consultation and editing.
- Uploading images using the ImgBB API.
- Ability to download images and edit registered products.

# Setup
1. Clone the repository to your local machine:
```
git clone https://github.com/joselacruz/easySaleRegister.git
cd easySaleRegister

```
2. Install dependencies using npm
```
npm install

```
# Configuración de Firebase
## To configure Firebase in your app, follow these steps:
1. create a [Firebase project](https://firebase.google.com/docs/web/setup#create-project)
2. Then Enable a [Create a Cloud Firestore database]https://firebase.google.com/docs/firestore/quickstart#create
3. Then Enable Email Link sign-in for your Firebase project
   To sign in users by email link, you must first enable the Email provider and Email link sign-in method for your Firebase project:

4. In the [Firebase console](https://console.firebase.google.com/), open the Auth section.
5. On the Sign in method tab, enable the Email/Password provider and Click Save.

4. Create a .env file in the root directory of the project and set your Firebase configuration:

- VITE_FIREBASE_API_KEY=your-api-key
- VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
- VITE_FIREBASE_PROJECT_ID=your-project-id
- VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
- VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
- VITE_FIREBASE_APP_ID=your-app-id
- VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id # optional

# Obtaining the ImgBB API Key
1. Register on [ImgBB](https://imgbb.com/)  and create an account.
2. Once you're signed in, navigate to your account dashboard.
3. Find the API section and generate a new API Key.
4. Copy the generated API Key and store it safely.
5. add an .env file in the root directory of your project and set the environment variable with the ImgBB API Key:
   
# Usage
1. Start the development server:
```sh
npm run dev
```
Access the application from your browser at http://localhost:5173.

# Contributing
Feel free to contribute to this project by opening pull requests or issues on the repository.

# Credits
This project was created by Jose Lacruz.

#License
This project is licensed under the MIT License - see the LICENSE file for details.
