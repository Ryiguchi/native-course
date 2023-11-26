import { Stack, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getMessage } from '../../util/auth';
import { AuthContext } from '../../store/auth-context';

function WelcomeScreen() {
  const [message, setMessage] = useState<string | null>(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;

    async function fetchMessage() {
      const message = await getMessage(token);

      setMessage(message);
    }

    fetchMessage();
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>{message}</Text>
      <Text>You authenticated successfully!</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
