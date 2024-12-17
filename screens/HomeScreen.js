import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleGreet = () => {
    if (name.trim()) {
      setGreeting(`Hello, ${name}!`);
    } else {
      setGreeting('Hello, Guest!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome User</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Greet Me" onPress={handleGreet} />
      {greeting ? <Text style={styles.greeting}>{greeting}</Text> : null}
      {greeting && (
        <Button
          title="Go to Welcome Page"
          onPress={() => navigation.navigate('Welcome', { userName: name })}
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  greeting: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
