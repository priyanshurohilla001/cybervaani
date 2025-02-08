import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import io from "socket.io-client";
import Constants from "expo-constants";
import AvatarAlert from "@/components/AvatarAlert";
import AsyncStorage from "@react-native-async-storage/async-storage";

const colors = {
  background: "#121212",
  surface: "#1E1E1E",
  primary: "#BB86FC",
  text: "#FFFFFF",
  textSecondary: "#B0B0B0",
  error: "#CF6679",
};

export default function LiveAudioStream() {
  const socketRef = useRef(null);
  const isRecordingRef = useRef(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [socketLoading, setSocketLoading] = useState(true);
  const [recordingStatus, setRecordingStatus] = useState("");
  const [connectionError, setConnectionError] = useState(null);
  const recordingRef = useRef(null);
  const [showAvatarAlert, setShowAvatarAlert] = useState(true);
  const [scamData, setScamData] = useState(null);
  const [calllog, setCalllog] = useState({
    startTime: null,
    endTime: null,
    dropdownContent: null,
    phoneNumber: "",
    id: "",
  });

  useEffect(() => {
    const serverUrl = "http://10.42.0.119:3000";
    socketRef.current = io(serverUrl, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });

    const handleConnect = () => {
      console.log("Connected to server");
      setSocketConnected(true);
      setSocketLoading(false);
      setConnectionError(null);
    };

    const handleDisconnect = () => {
      console.log("Disconnected");
      setSocketConnected(false);
      if (isRecordingRef.current) {
        Alert.alert(
          "Connection Lost",
          "The call has been disconnected due to network issues."
        );
        stopCall();
      }
    };

    const handleConnectError = (error) => {
      console.error("Connection error:", error);
      setSocketLoading(false);
      setConnectionError("Connection failed. Please check your network.");
    };

    const handleScamDetected = (backendScamData) => {
      setScamData(backendScamData);
      setCalllog((prev) => ({ ...prev, dropdownContent: backendScamData }));
      setShowAvatarAlert(true);
    };

    socketRef.current.on("connect", handleConnect);
    socketRef.current.on("disconnect", handleDisconnect);
    socketRef.current.on("connect_error", handleConnectError);
    socketRef.current.on("scamdetected", handleScamDetected);

    return () => {
      socketRef.current?.off("connect", handleConnect);
      socketRef.current?.off("disconnect", handleDisconnect);
      socketRef.current?.off("connect_error", handleConnectError);
      socketRef.current?.disconnect();
    };
  }, []);

  const recordingOptions = {
    android: {
      extension: ".wav",
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    ios: {
      extension: ".wav",
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  const recordChunk = async () => {
    if (!isRecordingRef.current) return;

    try {
      console.log("Starting new recording chunk");
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(recordingOptions);
      await newRecording.startAsync();
      recordingRef.current = newRecording;

      setTimeout(async () => {
        try {
          if (recordingRef.current) {
            await recordingRef.current.stopAndUnloadAsync();
            const uri = recordingRef.current.getURI();

            if (uri) {
              const base64Chunk = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
              });

              if (socketRef.current?.connected) {
                socketRef.current.emit("audio-chunk", { audio: base64Chunk });
              }
            }
          }
        } catch (error) {
          handleRecordingError(error);
        } finally {
          if (isRecordingRef.current) {
            recordChunk(); // Start next chunk
          }
        }
      }, 5000);
    } catch (error) {
      handleRecordingError(error);
    }
  };

  const handleRecordingError = (error) => {
    console.error("Recording error:", error);
    Alert.alert(
      "Recording Failed",
      "Unable to process audio. Please try again."
    );
    stopCall();
  };

  const startCall = async () => {
    if (!socketConnected) {
      Alert.alert("Connection Required", "Please connect to the server first.");
      return;
    }

    const startTime = new Date();
    setCalllog((prev) => ({ ...prev, startTime }));

    try {
      setRecordingStatus("Initializing...");
      isRecordingRef.current = true;
      socketRef.current.emit("start-call");
      await recordChunk();
    } catch (error) {
      handleRecordingError(error);
    }
  };

  const stopCall = async () => {
    isRecordingRef.current = false;
    setRecordingStatus("Finalizing...");
  
    const endTime = new Date();
    const phoneNumber = Math.floor(Math.random() * 90_00_000) + 1_000_000;
    const id = Math.floor(Math.random() * 90_000) + 10_000;
  
    // Create a new call log object with updated data
    const newCallLog = {
      ...calllog,
      endTime,
      phoneNumber: phoneNumber.toString(),
      id: id.toString(),
    };
  
    // Update state with the new call log (if needed)
    setCalllog(newCallLog);
  
    try {
      // Retrieve existing logs from AsyncStorage
      const existingLogsString = await AsyncStorage.getItem("callLogs");
      let existingLogs: any[] = [];
  
      if (existingLogsString) {
        const parsed = JSON.parse(existingLogsString);
        // Ensure we always have an array
        existingLogs = Array.isArray(parsed) ? parsed : [parsed];
      }
  
      // Append the new call log to the existing logs
      const updatedLogs = [...existingLogs, newCallLog];
  
      // Save the updated logs back to AsyncStorage
      await AsyncStorage.setItem("callLogs", JSON.stringify(updatedLogs));
      console.log("Call log saved:", newCallLog);
    } catch (error) {
      console.error("Failed to save call log:", error);
    }
  
    // Stop and unload the recording if it exists.
    if (recordingRef.current) {
      recordingRef.current.stopAndUnloadAsync().catch(console.error);
      recordingRef.current = null;
    }
  
    // Notify the server that the call has stopped.
    if (socketRef.current?.connected) {
      socketRef.current.emit("stop-call");
    }
  
    setTimeout(() => {
      setRecordingStatus("");
    }, 3000);
  };
  
  const reconnectSocket = () => {
    setSocketLoading(true);
    setConnectionError(null);
    socketRef.current?.connect();
  };

  const handleDismiss = () => {
    setShowAvatarAlert(false); // Hide the avatar and alert
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Live Audio Stream</Text>
      {showAvatarAlert && (
        <AvatarAlert
          onDismiss={handleDismiss}
          duringCallMessage={scamData?.messages?.duringCall ?? "Welcome"}
        />
      )}

      {socketLoading && (
        <View style={styles.statusContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.statusText}>Connecting to server...</Text>
        </View>
      )}

      {connectionError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{connectionError}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={reconnectSocket}
          >
            <Text style={styles.buttonText}>Retry Connection</Text>
          </TouchableOpacity>
        </View>
      )}

      {recordingStatus ? (
        <View style={styles.statusContainer}>
          <View style={styles.recordingDot} />
          <Text style={styles.recordingText}>{recordingStatus}</Text>
        </View>
      ) : (
        <Text style={styles.idleText}>Ready to start recording</Text>
      )}

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.button,
            (!socketConnected || recordingStatus) && styles.disabledButton,
          ]}
          onPress={startCall}
          disabled={!socketConnected || !!recordingStatus}
        >
          <Text style={styles.buttonText}>Start Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.stopButton,
            !recordingStatus && styles.disabledButton,
          ]}
          onPress={stopCall}
          disabled={!recordingStatus}
        >
          <Text style={styles.buttonText}>Stop Call</Text>
        </TouchableOpacity>
      </View>

      {!socketConnected && !socketLoading && (
        <Text style={styles.warningText}>Server connection lost</Text>
      )}
    </View>
  );
}

// Keep the same styles as previous version
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 32,
  },
  statusContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  statusText: {
    color: colors.textSecondary,
    marginTop: 12,
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    marginBottom: 12,
  },
  buttonGroup: {
    width: "100%",
    marginTop: 24,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  stopButton: {
    backgroundColor: colors.secondary,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
  retryButton: {
    backgroundColor: colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginTop: 12,
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.error,
    marginBottom: 8,
  },
  recordingText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: "500",
  },
  idleText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginVertical: 20,
  },
  warningText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 24,
  },
});