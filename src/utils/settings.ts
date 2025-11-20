import AsyncStorage from '@react-native-async-storage/async-storage';

export type Settings = {
  ttsRate: number;
  ttsPitch: number;
  soundEffectsEnabled: boolean;
  fontFamily: 'OpenDyslexic-Regular' | 'Lexend-Regular' | 'AtkinsonHyperlegible-Regular' | 'System';
  fontSize: number; // Base font size multiplier (0.8 to 1.5)
};

const SETTINGS_KEY = '@dyslexia_settings';

const defaultSettings: Settings = {
  ttsRate: 0.3,
  ttsPitch: 1.1,
  soundEffectsEnabled: true,
  fontFamily: 'OpenDyslexic-Regular',
  fontSize: 1.0, // Normal size
};

export const getSettings = async (): Promise<Settings> => {
  try {
    const data = await AsyncStorage.getItem(SETTINGS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
  return defaultSettings;
};

export const saveSettings = async (settings: Settings): Promise<void> => {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const updateSetting = async <K extends keyof Settings>(
  key: K,
  value: Settings[K]
): Promise<void> => {
  const current = await getSettings();
  await saveSettings({ ...current, [key]: value });
};

