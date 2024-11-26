import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function DestinationEdit({ route, navigation }) {
  const { destinationData } = route.params;
  console.log(route.params);

  const [name, setName] = useState(destinationData.name);
  const [description, setDescription] = useState(destinationData.description);
  const [difficulty, setDifficulty] = useState(destinationData.difficulty);

  const handleSave = () => {
    fetch(`http://172.20.10.3:8000/destinations/${destinationData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        difficulty,
      }),
    })
      .then((response) => {
        if (response.ok) {
          navigation.goBack();
        }
      }
      )
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.editLabel}>Edit Destination</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Description"
      />

      <View style={styles.difficultyContainer}>
        <Text>Difficulty:</Text>
        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={difficulty === 'easy'}
            onValueChange={() => setDifficulty('easy')}
          />
          <Text>Easy</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={difficulty === 'medium'}
            onValueChange={() => setDifficulty('medium')}
          />
          <Text>Medium</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={difficulty === 'hard'}
            onValueChange={() => setDifficulty('hard')}
          />
          <Text>Hard</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#61b5ff',
  },

  editLabel: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  },

  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 15
  },
  difficultyContainer: {
    width: '80%',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 15
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: 'white',
    width: 100,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center'
  }
});