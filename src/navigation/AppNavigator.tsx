import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator, type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import type { RootStackParamList, TabParamList } from '../types';
import type { ThemeColors } from '../utils/colors';
import { useTheme } from '../context/ThemeContext';
import { useTabBar, TabBarProvider } from '../context/TabBarContext';
import { neuElevated } from '../utils/neumorphism';
import { useResponsiveScale, type ResponsiveScale } from '../utils/responsive';

const TAB_ICONS = {
  home: { active: 'home', inactive: 'home-outline' },
  systems: { active: 'human-male-board', inactive: 'human-male-board-poll' },
  search: { active: 'magnify', inactive: 'magnify' },
  scales: { active: 'chart-timeline-variant-shimmer', inactive: 'chart-timeline-variant' },
  tools: { active: 'wrench', inactive: 'wrench-outline' },
};

// Tab Screens
import { HomeScreen } from '../screens/HomeScreen';
import { SystemsScreen } from '../screens/SystemsScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ScalesScreen } from '../screens/ScalesScreen';
import { ToolsScreen } from '../screens/ToolsScreen';
// Stack Screens
import { SystemPathologiesScreen } from '../screens/SystemPathologiesScreen';
import { PathologyDetailScreen } from '../screens/PathologyDetailScreen';
import { ScaleDetailScreen } from '../screens/ScaleDetailScreen';
import { LabValuesScreen } from '../screens/LabValuesScreen';
import { EmergencyProtocolsScreen } from '../screens/EmergencyProtocolsScreen';
import { ProtocolDetailScreen } from '../screens/ProtocolDetailScreen';
import { NandaScreen } from '../screens/NandaScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { QuizSessionScreen } from '../screens/QuizSessionScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { AllFavoritesScreen } from '../screens/AllFavoritesScreen';
import { AllNotesScreen } from '../screens/AllNotesScreen';
import { PremiumScreen } from '../screens/PremiumScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { PrivacyPolicyScreen } from '../screens/PrivacyPolicyScreen';
import { TermsScreen } from '../screens/TermsScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { useOnboarding } from '../hooks/useOnboarding';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabIcon({ iconActive, iconInactive, label, focused, colors, rs }: {
  iconActive: string; iconInactive: string; label: string; focused: boolean; colors: ThemeColors; rs: ResponsiveScale;
}) {
  const scaleAnim = useRef(new Animated.Value(focused ? 1 : 0.9)).current;
  const bgAnim = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: focused ? 1 : 0.9,
        useNativeDriver: true,
        speed: 18,
        bounciness: focused ? 8 : 0,
      }),
      Animated.timing(bgAnim, {
        toValue: focused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [focused, scaleAnim, bgAnim]);

  const bgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', colors.primary + '15'],
  });

  return (
    <Animated.View style={{ alignItems: 'center', justifyContent: 'center', transform: [{ scale: scaleAnim }] }}>
      <Animated.View style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColor,
        borderRadius: 14,
        paddingHorizontal: rs.space(12),
        paddingVertical: rs.space(4),
      }}>
        <MaterialCommunityIcons
          name={focused ? iconActive : iconInactive}
          size={focused ? rs.font(26) : rs.font(23)}
          color={focused ? colors.primary : colors.tabBarInactive}
        />
      </Animated.View>
      <Text style={{
        fontSize: rs.font(11),
        fontWeight: focused ? '700' : '600',
        color: focused ? colors.primary : colors.tabBarInactive,
        marginTop: 2,
      }} numberOfLines={1}>{label}</Text>
    </Animated.View>
  );
}

function AnimatedTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const rs = useResponsiveScale();
  const { translateY } = useTabBar();

  const TAB_LABELS = ['Inicio', 'Sistemas', 'Buscar', 'Escalas', 'Herramientas'];
  const TAB_ICON_MAP = [TAB_ICONS.home, TAB_ICONS.systems, TAB_ICONS.search, TAB_ICONS.scales, TAB_ICONS.tools];

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: rs.space(12),
        paddingBottom: Math.max(insets.bottom, rs.space(8)),
        transform: [{ translateY }],
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          ...neuElevated(colors),
          borderTopWidth: 0,
          height: rs.space(68),
          alignItems: 'center',
        }}
      >
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const icons = TAB_ICON_MAP[index];
          const label = TAB_LABELS[index];

          return (
            <TouchableOpacity
              key={route.key}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' }}
              activeOpacity={0.7}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
              onLongPress={() => {
                navigation.emit({ type: 'tabLongPress', target: route.key });
              }}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={descriptors[route.key].options.tabBarAccessibilityLabel}
            >
              <TabIcon
                iconActive={icons.active}
                iconInactive={icons.inactive}
                label={label}
                focused={focused}
                colors={colors}
                rs={rs}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} options={{ tabBarAccessibilityLabel: 'Inicio' }} />
      <Tab.Screen name="Sistemas" component={SystemsScreen} options={{ tabBarAccessibilityLabel: 'Sistemas corporales' }} />
      <Tab.Screen name="Busqueda" component={SearchScreen} options={{ tabBarLabel: 'Búsqueda', tabBarAccessibilityLabel: 'Buscar patologías' }} />
      <Tab.Screen name="Escalas" component={ScalesScreen} options={{ tabBarAccessibilityLabel: 'Escalas clínicas' }} />
      <Tab.Screen name="Herramientas" component={ToolsScreen} options={{ tabBarAccessibilityLabel: 'Herramientas' }} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { colors } = useTheme();
  const { isComplete, isLoading, completeOnboarding } = useOnboarding();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.neuBackground }} />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
          animation: 'slide_from_right',
          animationDuration: 250,
          headerBackground: () => (
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1 }}
            />
          ),
        }}
        initialRouteName={isComplete ? 'MainTabs' : 'Onboarding'}
      >
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false, animation: 'fade' }}
        >
          {(props) => (
            <OnboardingScreen {...props} onComplete={completeOnboarding} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SystemPathologies"
          component={SystemPathologiesScreen}
          options={{ title: 'Patologías' }}
        />
        <Stack.Screen
          name="PathologyDetail"
          component={PathologyDetailScreen}
          options={{ title: 'Detalle' }}
        />
        <Stack.Screen
          name="ScaleDetail"
          component={ScaleDetailScreen}
          options={{ title: 'Escala' }}
        />
        <Stack.Screen
          name="LabValues"
          component={LabValuesScreen}
          options={{ title: 'Valores de Laboratorio' }}
        />
        <Stack.Screen
          name="EmergencyProtocols"
          component={EmergencyProtocolsScreen}
          options={{ title: 'Protocolos de Emergencia' }}
        />
        <Stack.Screen
          name="ProtocolDetail"
          component={ProtocolDetailScreen}
          options={{ title: 'Protocolo' }}
        />
        <Stack.Screen
          name="NandaScreen"
          component={NandaScreen}
          options={{ title: 'NANDA-NIC-NOC' }}
        />
        <Stack.Screen
          name="QuizScreen"
          component={QuizScreen}
          options={{ title: 'Test de Patologías' }}
        />
        <Stack.Screen
          name="QuizSession"
          component={QuizSessionScreen}
          options={{ title: 'Test', headerBackVisible: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'Mi Progreso' }}
        />
        <Stack.Screen
          name="AllFavorites"
          component={AllFavoritesScreen}
          options={{ title: 'Mis Favoritos' }}
        />
        <Stack.Screen
          name="AllNotes"
          component={AllNotesScreen}
          options={{ title: 'Mis Notas' }}
        />
        <Stack.Screen
          name="PremiumScreen"
          component={PremiumScreen}
          options={{ title: 'Premium' }}
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{ title: 'Acerca de' }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ title: 'Configuración' }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{ title: 'Política de Privacidad' }}
        />
        <Stack.Screen
          name="Terms"
          component={TermsScreen}
          options={{ title: 'Términos de Uso' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
