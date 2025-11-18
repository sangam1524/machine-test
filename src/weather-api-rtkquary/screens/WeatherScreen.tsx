import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useLazyGetWeatherByCityQuery } from '../api/weatherApi';
import { SafeAreaView } from 'react-native-safe-area-context';

const WeatherScreen: React.FC = () => {
  const [city, setCity] = useState('Indore');
  const [searchedCity, setSearchedCity] = useState<string | null>(null);
  const [trigger, { data, isFetching, isError }] = useLazyGetWeatherByCityQuery();

  const onSearch = () => {
    if (!city.trim()) return;
    setSearchedCity(city.trim());
    trigger(city.trim());
  };

  const current = data?.current_condition?.[0];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Weather Lookup</Text>
      <View style={styles.row}>
        <TextInput
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={onSearch}
          placeholderTextColor="#64748b"
          autoComplete='off'
        />
        <TouchableOpacity onPress={() => setCity('')} style={styles.clearButton}>
          <Text style={styles.buttonText}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSearch} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {isFetching ? <Text style={styles.info}>Loading...</Text> : null}
      {isError ? <Text style={[styles.info, styles.error]}>Error fetching weather</Text> : null}

      {!isFetching && current && (
        <View style={styles.card}>
          <Text style={styles.city}>{searchedCity ?? city.trim()}</Text>
          <Text style={styles.condition}>{current.weatherDesc?.[0]?.value || '—'}</Text>
          <Text style={styles.temp}>{current.temp_C}°C / {current.temp_F}°F</Text>
          <View style={styles.metricsRow}>
            <Text style={styles.metric}>Feels: {current.FeelsLikeC}°C</Text>
            <Text style={styles.metric}>Humidity: {current.humidity}%</Text>
          </View>
          <View style={styles.metricsRow}>
            <Text style={styles.metric}>UV: {current.uvIndex}</Text>
            <Text style={styles.metric}>Visibility: {current.visibility} km</Text>
          </View>
          <Text style={styles.metric}>Wind: {current.winddir16Point} {current.windspeedKmph} km/h</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0b1220',
    paddingTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#1a2235',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  clearButton: {
    backgroundColor: '#334155',
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  info: {
    color: '#cbd5e1',
    marginTop: 12,
    textAlign: 'center',
  },
  error: {
    color: '#fca5a5',
  },
  helper: {
    color: '#94a3b8',
    marginTop: 16,
    textAlign: 'center',
  },
  card: {
    marginTop: 16,
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  city: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  condition: {
    color: '#93c5fd',
    fontSize: 16,
    marginBottom: 8,
  },
  temp: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  metric: {
    color: '#cbd5e1',
  },
});

export default WeatherScreen;


