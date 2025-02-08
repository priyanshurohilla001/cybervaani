# CyberVaani - AI-Powered Scam Detection System

Welcome to **CyberVaani**, an AI-powered scam detection system designed to process real-time speech and text data to identify fraudulent activities and alert users. This project was developed as part of the **Innerve 9 Hackathon** under the **Josh (Online) Sponsor Track** by **Team CyberVeer** from **IIIT Kota**.

---

## 🚀 Project Overview

CyberVaani is a comprehensive solution to combat the rising number of scams in India. It leverages AI to detect fraudulent activities in real-time by analyzing speech and text data. The system is built with a **React Native Expo + TypeScript** frontend and a **Node.js + Express.js + Python** backend, integrated with **Google Speech-to-Text** and a **custom-trained Hugging Face model** for scam detection.

---

## 🔧 Features

1. **Real-Time Scam Detection**: Processes live audio streams to detect potential scams.
2. **Scam Probability & Actions**: Returns the probability of a scam and suggests actions to prevent it.
3. **Educational Module**: Provides users with information on common scams and preventive measures.
4. **Scalable Backend**: Built with Docker and Hugging Face for seamless deployment and scalability.

---

## 🛠️ Tech Stack

### Frontend

- **React Native Expo** (TypeScript)
- **Socket.io Client** for real-time communication with the backend.

### Backend

- **Node.js** + **Express.js** for API handling.
- **Python** for model inference and data processing.
- **Google Speech-to-Text API** for real-time transcription.
- **Hugging Face Model** for scam classification.
- **Docker** for containerization.

---

## 🚀 Getting Started

Follow these steps to set up CyberVaani on your local machine.

### Prerequisites

1. **Node.js** (v16 or higher)
2. **Python** (v3.8 or higher)
3. **Expo CLI** (for React Native)
4. **Docker** (for backend deployment)
5. **Google Cloud Account** (for Speech-to-Text API)
6. **Hugging Face Account** (for model deployment)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/cybervaani.git
cd cybervaani
```

### 2. Set Up the Backend

#### a. Install Dependencies

Navigate to the backend directory and install the required dependencies:

```bash
cd backend
npm install
```

#### b. Run the Backend

Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:5000`.

---

### 3. Set Up the Frontend

#### a. Install Dependencies

Navigate to the frontend directory and install the required dependencies:

```bash
cd ../frontend
npm install
```

#### b. Configure Socket.io Client

Update the Socket.io server URL in `frontend/src/config.ts` to point to your backend:

```typescript
export const SOCKET_URL = "http://localhost:5000";
```

#### c. Run the Frontend

Start the Expo development server:

```bash
expo start
```

Scan the QR code with the Expo Go app on your mobile device or run it on an emulator.

---

## 🎯 How It Works

1. **Real-Time Audio Processing**: The frontend captures live audio and streams it to the backend via WebSocket.
2. **Speech-to-Text Conversion**: The backend uses Google Speech-to-Text to transcribe the audio into text.
3. **Scam Detection**: The transcribed text is passed to the Hugging Face model, which predicts the probability of a scam.
4. **User Alert & Actions**: The frontend displays the scam probability and suggests preventive actions.
5. **Educational Module**: Users can access educational content on common scams and preventive measures.

---

## 📂 Project Structure

```
cybervaani/
├── backend/                  # Backend code
│   ├── config.py             # Configuration for Hugging Face and Google API
│   ├── app.js                # Express.js server
│   └── ...
├── frontend/                 # Frontend code
│   ├── src/                  # React Native components
│   │   ├── config.ts         # Configuration for Socket.io
│   │   ├── App.tsx           # Main application component
│   │   └── ...
│   └── ...
└── README.md                 # Project documentation
```

---

## 📝 Future Enhancements

1. **Improve Model Accuracy**: Continuously retrain the model with real-time data.
2. **Multi-Language Support**: Extend scam detection to multiple languages.
3. **User Feedback Integration**: Allow users to report false positives/negatives to improve the model.
4. **Push Notifications**: Implement real-time alerts for detected scams.

---

## 🙏 Acknowledgments

- **Innerve 9 Hackathon** for providing the platform.
- **Josh (Online)** for sponsoring the track.
- **Google Cloud** and **Hugging Face** for their APIs and tools.

---

Thank you for using **CyberVaani**! Together, let's make the digital world a safer place. 🚀
