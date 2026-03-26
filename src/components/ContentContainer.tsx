// ============================================================
// ContentContainer — constrains content width on tablets
// On phones: passthrough (no overhead)
// ============================================================

import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useResponsiveScale } from '../utils/responsive';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function ContentContainer({ children, style }: Props) {
  const { isTablet } = useResponsiveScale();

  if (!isTablet) {
    return <>{children}</>;
  }

  return (
    <View style={[{ maxWidth: 680, alignSelf: 'center', width: '100%' }, style]}>
      {children}
    </View>
  );
}
