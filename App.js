import { ScrollView, StyleSheet, Text, View } from 'react-native';

import CategoryList from './components/CategoryList';

export default function App() {
  return (
    <View>
      <CategoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
});
