import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSettings, Settings } from './settings';

interface FontContextType {
  fontFamily: Settings['fontFamily'];
  fontSize: number;
  refreshSettings: () => Promise<void>;
}

const FontContext = createContext<FontContextType>({
  fontFamily: 'OpenDyslexic-Regular',
  fontSize: 1.0,
  refreshSettings: async () => {},
});

export const useFont = () => useContext(FontContext);

interface FontProviderProps {
  children: ReactNode;
}

export const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
  const [fontFamily, setFontFamily] = useState<Settings['fontFamily']>('OpenDyslexic-Regular');
  const [fontSize, setFontSize] = useState<number>(1.0);

  const loadSettings = async () => {
    try {
      const settings = await getSettings();
      setFontFamily(settings.fontFamily);
      setFontSize(settings.fontSize);
    } catch (error) {
      console.error('Error loading font settings:', error);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const refreshSettings = async () => {
    await loadSettings();
  };

  return (
    <FontContext.Provider value={{ fontFamily, fontSize, refreshSettings }}>
      {children}
    </FontContext.Provider>
  );
};

