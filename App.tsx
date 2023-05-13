import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((time) => time + 10);
    }, 10);
  };

  const stop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time - minutes * 60000) / 1000);
    const milliseconds = Math.floor((time - minutes * 60000 - seconds * 1000) / 10);
    return `${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(milliseconds)}`;
  };

  const padNumber = (number) => {
    return number.toString().padStart(2, '0');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        {isRunning ? (
          <View style={styles.button}>
            <Text style={styles.buttonText} onPress={stop}>Stop</Text>
          </View>
        ) : (
          <View style={styles.button}>
            <Text style={styles.buttonText} onPress={start}>Start</Text>
          </View>
        )}
        <View style={styles.button}>
          <Text style={styles.buttonText} onPress={reset}>Reset</Text>
        </View>
      </View>
    </View>
  );
}
