import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';

export default function WelcomeScreen() {
  const [videoUri, setVideoUri] = useState(null);

  // Function to pick a video from the gallery
  const pickVideo = async () => {
    // Request permissions to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    // Launch the image picker to pick a video
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,  // Correct media type for video
      allowsEditing: false,
      quality: 1,  // Highest quality
    });

    if (!result.canceled) {
      // If the user selects a video, store the URI
      setVideoUri(result.assets[0].uri);  // result.assets[0] contains the selected video
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeTitle}>Welcome to the Video Picker!</Text>

      <Button title="Pick a Video" onPress={pickVideo} />

      {/* Display video if URI is available */}
      {videoUri && (
        <Video
          source={{ uri: videoUri }}  // Use the URI for the selected video
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  video: {
    width: 320,
    height: 240,
    marginTop: 20,
  },
});
