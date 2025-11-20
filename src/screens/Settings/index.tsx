import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../constants/home-types";
import { styles } from "./SettingsStyles";
import { getSettings, updateSetting, type Settings } from "../../utils/settings";
import { useFont } from "../../utils/FontContext";
import { safeSpeak, safeSetDefaultRate, safeSetDefaultPitch } from "../../utils/tts-init";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { refreshSettings } = useFont();
  const [settings, setSettings] = useState<Settings>({
    ttsRate: 0.3,
    ttsPitch: 1.1,
    soundEffectsEnabled: true,
    fontFamily: 'OpenDyslexic-Regular',
    fontSize: 1.0,
  });

  useEffect(() => {
    const loadSettings = async () => {
      const loaded = await getSettings();
      setSettings(loaded);
      // Apply TTS settings
      await safeSetDefaultRate(loaded.ttsRate);
      await safeSetDefaultPitch(loaded.ttsPitch);
    };
    loadSettings();
  }, []);

  const handleRateChange = async (rate: number) => {
    const newSettings = { ...settings, ttsRate: rate };
    setSettings(newSettings);
    await updateSetting("ttsRate", rate);
    await safeSetDefaultRate(rate);
    // Test sound
    await safeSpeak("Merhaba hız bu şekilde ayarlandı.", { rate });
  };

  const handlePitchChange = async (pitch: number) => {
    const newSettings = { ...settings, ttsPitch: pitch };
    setSettings(newSettings);
    await updateSetting("ttsPitch", pitch);
    await safeSetDefaultPitch(pitch);
    // Test sound
    await safeSpeak("Merhaba ton bu şekilde ayarlandı.", { pitch });
  };

  const handleSoundEffectsToggle = async (value: boolean) => {
    const newSettings = { ...settings, soundEffectsEnabled: value };
    setSettings(newSettings);
    await updateSetting("soundEffectsEnabled", value);
  };

  const handleFontChange = async (font: Settings['fontFamily']) => {
    const newSettings = { ...settings, fontFamily: font };
    setSettings(newSettings);
    await updateSetting("fontFamily", font);
    // Refresh font context
    const { refreshSettings } = require('../../utils/FontContext');
    // We'll use a different approach - reload settings in context
  };

  const handleFontSizeChange = async (size: number) => {
    const newSettings = { ...settings, fontSize: size };
    setSettings(newSettings);
    await updateSetting("fontSize", size);
    // Refresh font context
  };

  const fontSizeOptions = [
    { label: "Küçük", value: 0.8 },
    { label: "Normal", value: 1.0 },
    { label: "Büyük", value: 1.2 },
    { label: "Çok Büyük", value: 1.5 },
  ];

  const fontOptions = [
    { label: "OpenDyslexic", value: 'OpenDyslexic-Regular' as const },
    { label: "Lexend", value: 'Lexend-Regular' as const },
    { label: "Atkinson Hyperlegible", value: 'AtkinsonHyperlegible-Regular' as const },
    { label: "Sistem", value: 'System' as const },
  ];

  const rateOptions = [
    { label: "Çok Yavaş", value: 0.2 },
    { label: "Yavaş", value: 0.3 },
    { label: "Normal", value: 0.4 },
    { label: "Hızlı", value: 0.5 },
    { label: "Çok Hızlı", value: 0.6 },
  ];

  const pitchOptions = [
    { label: "Düşük", value: 0.9 },
    { label: "Normal", value: 1.1 },
    { label: "Yüksek", value: 1.3 },
  ];

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#3A2B26" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backLabel}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Ayarlar</Text>
            <Text style={styles.headerSubtitle}>Uygulama tercihlerini düzenle</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sesli Okuma (TTS)</Text>
            
            <View style={styles.settingCard}>
              <Text style={styles.settingLabel}>Okuma Hızı</Text>
              <View style={styles.optionsRow}>
                {rateOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionButton,
                      settings.ttsRate === option.value && styles.optionButtonActive,
                    ]}
                    onPress={() => handleRateChange(option.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        settings.ttsRate === option.value && styles.optionTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.settingCard}>
              <Text style={styles.settingLabel}>Ses Tonu</Text>
              <View style={styles.optionsRow}>
                {pitchOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionButton,
                      settings.ttsPitch === option.value && styles.optionButtonActive,
                    ]}
                    onPress={() => handlePitchChange(option.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        settings.ttsPitch === option.value && styles.optionTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.settingCard}>
              <Text style={styles.settingLabel}>Yazı Büyüklüğü</Text>
              <View style={styles.optionsRow}>
                {fontSizeOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionButton,
                      settings.fontSize === option.value && styles.optionButtonActive,
                    ]}
                    onPress={() => handleFontSizeChange(option.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        settings.fontSize === option.value && styles.optionTextActive,
                        { fontSize: 16 * option.value }
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Diğer</Text>
            <View style={styles.settingCard}>
              <View style={styles.switchRow}>
                <Text style={styles.settingLabel}>Ses Efektleri</Text>
                <Switch
                  value={settings.soundEffectsEnabled}
                  onValueChange={handleSoundEffectsToggle}
                  trackColor={{ false: "#767577", true: "#34C759" }}
                  thumbColor={settings.soundEffectsEnabled ? "#fff" : "#f4f3f4"}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.ctaLabel}>Ana Sayfaya Dön</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

