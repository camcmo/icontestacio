// Projeto base em React Native (Expo)
// Estrutura pensada para Android

// 1) Criar projeto:
// npx create-expo-app rotinas-contabeis
// cd rotinas-contabeis
// npm install @react-navigation/native @react-navigation/native-stack react-native-safe-area-context react-native-screens

// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ApuracaoScreen from './src/screens/ApuracaoScreen';
import RequisicoesScreen from './src/screens/RequisicoesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Apuracao" component={ApuracaoScreen} />
        <Stack.Screen name="Requisicoes" component={RequisicoesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// src/screens/LoginScreen.js
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TextInput placeholder="USUÁRIO" style={styles.input} />
      <TextInput placeholder="SENHA" secureTextEntry style={styles.input} />

      <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.replace('Dashboard')}>
        <Text style={styles.btnText}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSecondary}>
        <Text style={styles.btnText}>RESETAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9F7D4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    backgroundColor: '#FFF',
    width: '80%',
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
    textAlign: 'center'
  },
  btnPrimary: {
    backgroundColor: '#1E7F2D',
    width: '60%',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10
  },
  btnSecondary: {
    backgroundColor: '#0B3D12',
    width: '60%',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10
  },
  btnText: { color: '#FFF', fontWeight: 'bold' }
});

// src/screens/DashboardScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function LinhaEtapas({ titulo }) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{titulo}</Text>
      <View style={styles.timeline}>
        {['envio documentação','recebimento','início apuração','apuração','envio das guias'].map((e,i)=>(
          <View key={i} style={styles.step} />
        ))}
      </View>
    </View>
  );
}

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinhaEtapas titulo="APURAÇÃO IMPOSTOS MUNICIPAIS" />
      <LinhaEtapas titulo="APURAÇÃO IMPOSTOS ESTADUAIS" />
      <LinhaEtapas titulo="APURAÇÃO IMPOSTOS FEDERAIS" />

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Apuracao')}>
        <Text style={styles.btnText}>VER APURAÇÃO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  section: { marginBottom: 30 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  timeline: { flexDirection: 'row', justifyContent: 'space-between' },
  step: { width: 25, height: 25, borderRadius: 20, backgroundColor: '#1E7F2D' },
  btn: {
    backgroundColor: '#1E7F2D',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center'
  },
  btnText: { color: '#FFF', fontWeight: 'bold' }
});

// src/screens/ApuracaoScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ApuracaoScreen({ navigation }) {
  const etapas = [
    'importação XMLs',
    'conferência relatório',
    'correção de erros',
    'cálculo do imposto'
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>APURAÇÃO</Text>

      {etapas.map((e, i) => (
        <View key={i} style={styles.item}>
          <View style={styles.circle} />
          <Text>{e}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Requisicoes')}>
        <Text style={styles.btnText}>MINHAS REQUISIÇÕES</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  circle: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#000', marginRight: 15 },
  btn: { backgroundColor: '#1E7F2D', padding: 15, borderRadius: 30, marginTop: 40 },
  btnText: { color: '#FFF', fontWeight: 'bold' }
});

// src/screens/RequisicoesScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RequisicoesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MINHAS REQUISIÇÕES</Text>
      <Text style={styles.subtitle}>Nenhuma requisição no momento</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { marginTop: 10, color: '#666' }
});