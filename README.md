# DineBook 🍽️

DineBook is a **restaurant slot booking app** built with **React Native (Expo)**. It allows users to explore multiple restaurants, view available time slots, and book reservations seamlessly. The app uses **Firebase Firestore** for real-time database management and **Firebase Authentication** for secure login and signup.

---

## ✨ Features

* 📍 **Browse Restaurants** – View a list of restaurants fetched from Firestore.
* 🕒 **Slot Booking** – Choose from available time slots for each restaurant.
* 🔐 **Secure Authentication** – User login & signup powered by Firebase Authentication.
* 🔄 **Real-Time Updates** – Bookings and slot availability update instantly with Firestore.
* 📱 **Cross-Platform** – Built using Expo, works on both Android and iOS.

---

## 🛠️ Tech Stack

* **Frontend:** React Native (Expo) + JavaScript
* **Backend/Database:** Firebase Firestore
* **Authentication:** Firebase Authentication
* **State Management:** React hooks & context
* **Deployment:** Expo Go

---

## 🚀 Getting Started

### Prerequisites

* Node.js & npm/yarn installed
* Expo CLI installed globally (`npm install -g expo-cli`)
* Firebase project setup with Firestore & Authentication enabled

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/iamsam15/DineBook.git
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Setup Firebase:

   * Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   * Enable **Firestore Database** and **Authentication (Email/Password)**
   * Copy your Firebase config into a `firebase.js` file:

     ```javascript
     import { initializeApp } from "firebase/app";
     import { getFirestore } from "firebase/firestore";
     import { getAuth } from "firebase/auth";

     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT_ID.appspot.com",
       messagingSenderId: "SENDER_ID",
       appId: "APP_ID",
     };

     const app = initializeApp(firebaseConfig);
     export const db = getFirestore(app);
     export const auth = getAuth(app);
     ```

4. Run the app:

   ```bash
   npm start
   ```

5. Scan the QR code with **Expo Go** app on your device.

---

## 📌 Future Improvements

* ✅ Payment integration for reservations
* ✅ Push notifications for booking reminders
* ✅ Admin panel for restaurants to manage slots
* ✅ UI/UX enhancements

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a PR or issue.

---
