import { useFont } from './FontContext';
import { TextStyle } from 'react-native';

/**
 * Hook to get font style based on current settings
 * Usage: const fontStyle = useFontStyle();
 * Then apply: style={[yourStyle, fontStyle]}
 */
export const useFontStyle = (): TextStyle => {
  const { fontFamily, fontSize } = useFont();
  
  return {
    fontFamily: fontFamily === 'System' ? undefined : fontFamily,
    // fontSize multiplier can be applied to base font sizes in components
  };
};

/**
 * Get font style object (for use outside of components)
 */
export const getFontStyle = async (): Promise<TextStyle> => {
  const { getSettings } = await import('./settings');
  const settings = await getSettings();
  
  return {
    fontFamily: settings.fontFamily === 'System' ? undefined : settings.fontFamily,
  };
};

