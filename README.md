# 📘 Scriven Frontend – Developer Documentation

Scriven is a productivity and team collaboration app designed to enhance communication, coordination, and learning in professional environments. This documentation covers the **frontend** implementation, built with **Expo Router (React Native)**. It integrates seamlessly with a Spring Boot backend and includes an in-app AI assistant named **Maya** (Mobile Assistant for Your Achievements).

---

## 🚀 Overview

**Key Features:**

* Instant messaging (group and direct)
* Video calls with recording support
* AI-powered assistant (Maya)
* YouTube-based learning integration
* Google Drive document integration
* Attendance tracking

---

## 🧰 Tech Stack

| Layer        | Technology Used                                   |
| ------------ | ------------------------------------------------- |
| Frontend     | React Native with **Expo Router**                 |
| Styling      | Custom styles (⛔️ No Tailwind CSS used)           |
| AI Assistant | **Maya** (Mobile Assistant for Your Achievements) |
| Backend      | **Spring Boot**                                   |
| Integrations | Google Drive, YouTube, Stream Chat, Firebase      |

---

## 🏗️ Project Structure

```
Scriven-frontend/
├── app/                    # Screens and Routes (Expo Router)
│   ├── index.tsx          # Root screen
│   ├── [team]/            # Dynamic team views
├── assets/                # Images, fonts, etc.
├── components/            # Shared UI components
├── constants/             # App-wide constants
├── context/               # React Contexts (auth, team, etc.)
├── services/              # API & backend interaction
├── utils/                 # Helpers, formatters
├── .expo/                 # Expo configuration
├── app.config.js          # Expo config
└── package.json           # Dependencies and scripts
```

---

## 🧪 Getting Started

### Prerequisites

* Node.js ≥ 16.x
* Expo CLI: `npm install -g expo-cli`
* Android Studio / Xcode (for emulators)
* Git

### Installation

```bash
git clone https://github.com/Odin360/Scriven-frontend
cd Scriven-frontend
npm install
```

### Running the App

```bash
npx expo start
```

Then press:

* `i` to launch iOS simulator (Mac only)
* `a` to launch Android emulator
* Scan QR with Expo Go for real device testing

---

## 🧠 Maya – The AI Assistant

Maya (Mobile Assistant for Your Achievements) is integrated into the frontend as a contextual productivity assistant. Maya supports:

* Natural language queries
* Voice interactions
* Context-aware suggestions (e.g. starting meetings, opening files)

---

## 🔗 Backend Integration

The frontend is built to communicate with a **Spring Boot** backend that handles:

* Authentication and user management
* Team creation and messaging
* AI processing
* Attendance and learning logs

---

## 📂 Environment Variables

Set your environment variables in a `.env` file (not committed):

```env
API_URL=https://your-api-url.com
FIREBASE_API_KEY=...
GOOGLE_CLIENT_ID=...
```

---


## 🛠️ Scripts

```bash
npm start         # Start Expo dev server
npm run android   # Launch Android emulator
npm run ios       # Launch iOS simulator
npm run lint      # Run linter
```

---

## 📄 License

[MIT](https://github.com/Odin360/Scriven-frontend/blob/main/LICENSE)

