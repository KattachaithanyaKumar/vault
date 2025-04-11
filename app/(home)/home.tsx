import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const cardItems: { id: number; icon: 'globe' | 'cloud' | 'cpu' | 'credit-card'; name: string }[] = [
  { id: 1, icon: 'globe', name: 'Browser' },
  { id: 2, icon: 'cloud', name: 'Cloud' },
  { id: 3, icon: 'cpu', name: 'Application' },
  { id: 4, icon: 'credit-card', name: 'Payment' },
];

const Home = () => {
  const router = useRouter();

  const handleClear = async () => {
    await AsyncStorage.removeItem('app_pin');
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cardItems}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{marginTop: 20}}>
            <Text style={styles.heading}>Manage your privacy</Text>
            <Text style={styles.subheading}>My Data</Text>
          </View>
        }
        ListFooterComponent={
          <View>
            <Text style={styles.loremText}>
              Recently Added
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Feather name={item.icon} size={32} color={'#fff'} />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#19191C',
    flex: 1,
    paddingHorizontal: 20,
    // paddingTop: 20,
  },
  listContent: {
    paddingBottom: 50,
  },
  heading: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#2a2a2d',
    padding: 30,
    margin: 5,
    borderRadius: 12,
    justifyContent: 'center',
    gap: 10,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
  },
  loremText: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 20,
    lineHeight: 20,
    marginBottom: 40
  },
  clearBtn: {
    marginTop: 30,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearText: {
    color: '#fff',
    fontSize: 16,
  },
});
