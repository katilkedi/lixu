import React, { useState } from 'react';
import { Alert, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../constants/home-types';
import { styles } from './OnboardingStyles';
import { ensureMicrophonePermission } from '../../utils/microphonePermission';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const mascotUri = 'https://cdn.jsdelivr.net/gh/ux-illustrations/kits@main/dyslexia/maskot.png';

const Onboarding = ({ navigation }: Props) => {
  const [requesting, setRequesting] = useState(false);

  const handleStart = async () => {
    if (requesting) {
      return;
    }
    setRequesting(true);
    const granted = await ensureMicrophonePermission();
    setRequesting(false);
    if (!granted) {
      Alert.alert('Mikrofon izni gerekli', 'Sesli oyunları ve hikayeleri kullanabilmek için lütfen ayarlardan mikrofon izni ver.');
    }
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFC400" />
      <View style={styles.container}>
        <View style={styles.illustration}>
          <View style={styles.sun} />
          <View style={[styles.balloon, styles.balloonLeft]} />
          <View style={[styles.balloon, styles.balloonRight]} />
          <Image source={{ uri: mascotUri }} style={styles.mascot} resizeMode="contain" />
          <View style={styles.mountains} />
          <View style={[styles.cloud, styles.cloudLeft]} />
          <View style={[styles.cloud, styles.cloudRight]} />
        </View>
        <View style={styles.panel}>
          <Text style={styles.title}>Hoş Geldin</Text>
          <Text style={styles.body}>
            Seviyene uygun hikayeler, oyunlar ve pratiklerle renkli bir öğrenme yolculuğuna hazır mısın?
          </Text>
          <TouchableOpacity
            style={[styles.cta, requesting && { opacity: 0.6 }]}
            onPress={handleStart}
            accessibilityRole="button"
            accessibilityLabel="Başlayalım"
            disabled={requesting}
          >
            <Text style={styles.ctaLabel}>{requesting ? 'İzin isteniyor...' : 'Başlayalım'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

