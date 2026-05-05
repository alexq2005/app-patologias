jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-encrypted-storage', () => {
  const store = new Map();
  return {
    __esModule: true,
    default: {
      setItem: jest.fn((k, v) => { store.set(k, v); return Promise.resolve(); }),
      getItem: jest.fn(k => Promise.resolve(store.get(k) ?? null)),
      removeItem: jest.fn(k => { store.delete(k); return Promise.resolve(); }),
      clear: jest.fn(() => { store.clear(); return Promise.resolve(); }),
    },
  };
});

jest.mock('@op-engineering/op-sqlite', () => ({
  open: jest.fn(() => ({
    // Return a non-zero count so initDatabase() skips the populate branch in tests.
    // Specific tests that need real data should override this with executeSync.mockReturnValueOnce.
    executeSync: jest.fn((sql) => {
      if (typeof sql === 'string' && sql.includes('COUNT(*)')) {
        return { rows: [{ count: 1 }] };
      }
      return { rows: [] };
    }),
    execute: jest.fn(() => Promise.resolve({ rows: [] })),
    close: jest.fn(),
  })),
}));

jest.mock('@shopify/flash-list', () => {
  const { FlatList } = require('react-native');
  return { FlashList: FlatList };
});

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
  const { Text } = require('react-native');
  return (props) => <Text>{props.name}</Text>;
});

jest.mock('react-native-linear-gradient', () => {
  const { View } = require('react-native');
  return (props) => <View {...props} />;
});

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }) => children,
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
  useRoute: () => ({ params: {} }),
  useFocusEffect: jest.fn(),
  useIsFocused: () => true,
  createNavigatorFactory: jest.fn(),
  useNavigationState: jest.fn(),
  DefaultTheme: { colors: { background: '#fff', card: '#fff', text: '#000', border: '#ccc', primary: '#6200ee', notification: '#f00' } },
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

