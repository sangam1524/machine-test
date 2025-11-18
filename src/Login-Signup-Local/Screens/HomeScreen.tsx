import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StoredUser } from '../Local/CheckInLocalStorage';

type HomeScreenProps = {
  user: StoredUser | null;
  onLogout: () => void;
};

const HomeScreen = ({ user, onLogout }: HomeScreenProps) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome{user?.name ? `, ${user.name}` : '!'}
        </Text>
        <Text style={styles.userText}>{user?.email ?? 'Logged in user'}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2A2828',
    marginBottom: 10,
  },
  userText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default HomeScreen;

