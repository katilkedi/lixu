import React, { useState, useEffect } from 'react';
import { Image, ScrollView, StatusBar, Text, View, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../constants/home-types';
import { QuickActionBar, SectionGrid } from './HomeComponents';
import { useHomeLogic, SectionItem, QuickAction } from './HomeLogic';
import { styles } from './HomeStyles';
import { mistakenLetters, generateStory } from '../Story/StoryLogic';
import { analyzeMistakenLetters } from '../../utils/ai-helper';
import { stories } from '../../constants/stories';
import { useCooldown } from '../../utils/cooldown';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const mascotUri = 'https://cdn.jsdelivr.net/gh/ux-illustrations/kits@main/dyslexia/maskot.png';

const Home = ({ navigation }: Props) => {
  const { username, sections, quickActions } = useHomeLogic();
  const [showMistakeAnalysis, setShowMistakeAnalysis] = useState(false);
  const [hasMistakes, setHasMistakes] = useState(false);
  const withCooldown = useCooldown(500);

  useEffect(() => {
    // Check if there are any mistakes to show analysis - keep checking
    const checkMistakes = () => {
      const mistakes = Object.keys(mistakenLetters).length > 0;
      setHasMistakes(mistakes);
    };
    
    checkMistakes();
    const interval = setInterval(checkMistakes, 1000); // Check every second
    
    return () => clearInterval(interval);
  }, []);

  const handleSectionPress = (item: SectionItem) => {
    if (item.target === 'Story' && item.storyKey) {
      navigation.navigate('Story', { storyKey: item.storyKey });
      return;
    }
    if (item.target === 'Game' && item.gameKey) {
      navigation.navigate('Game', { gameKey: item.gameKey });
      return;
    }
    if (item.target === 'Practice' && item.practiceMode === 'numbers') {
      navigation.navigate('Practice', { mode: 'numbers' });
      return;
    }
    navigation.navigate(item.target);
  };

  const handleQuickAction = (action: QuickAction) => {
    if (action.target === 'Story') {
      // Random story from 4 stories
      const storyKeys = ['Buse ve Yeni Okulu', 'Kendine İnan Buse', 'Kırgın Arkadaşlık', 'Renklerin Gücü'];
      const randomStory = storyKeys[Math.floor(Math.random() * storyKeys.length)];
      navigation.navigate('Story', { storyKey: randomStory });
      return;
    }
    if (action.target === 'Game') {
      // Random game from 4 games
      const gameKeys: Array<'word' | 'syllable' | 'letter' | 'sound'> = ['word', 'syllable', 'letter', 'sound'];
      const randomGame = gameKeys[Math.floor(Math.random() * gameKeys.length)];
      navigation.navigate('Game', { gameKey: randomGame });
      return;
    }
    if (action.target === 'Practice') {
      // Random practice from 2 practices
      const practiceModes: Array<'numbers' | undefined> = ['numbers', undefined];
      const randomPractice = practiceModes[Math.floor(Math.random() * practiceModes.length)];
      navigation.navigate('Practice', { mode: randomPractice });
      return;
    }
    navigation.navigate(action.target);
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#3A2B26" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerGreeting}>Merhaba,</Text>
            <Text style={styles.headerName}>Hoş Geldin</Text>
            <Text style={styles.headerTagline}>Bugün hangi macerayı seçmek istersin?</Text>
          </View>
          <Image source={{ uri: mascotUri }} style={styles.headerMascot} resizeMode="contain" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {sections.map(section => (
            <SectionGrid
              key={section.title}
              title={section.title}
              items={section.items}
              onPressItem={handleSectionPress}
            />
          ))}
          
          {hasMistakes && (
            <TouchableOpacity 
              style={styles.mistakeAnalysisCard} 
              onPress={withCooldown(() => setShowMistakeAnalysis(true))}
            >
              <Text style={styles.mistakeAnalysisTitle}>📊 Hata Analizi</Text>
              <Text style={styles.mistakeAnalysisText}>
                En çok karıştırılan harfler: {analyzeMistakenLetters(mistakenLetters).join(', ')}
              </Text>
              <Text style={styles.mistakeAnalysisAction}>Özel alıştırma oluştur →</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        <Modal visible={showMistakeAnalysis} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Harf Analizi</Text>
              <Text style={styles.modalText}>
                En çok karıştırılan harfler: {analyzeMistakenLetters(mistakenLetters).join(', ') || 'Henüz hata yok!'}
              </Text>
              <TouchableOpacity 
                style={styles.modalButton} 
                onPress={withCooldown(async () => {
                  const aiStory = await generateStory(mistakenLetters);
                  stories.push({ title: aiStory.title, words: aiStory.words });
                  setShowMistakeAnalysis(false);
                  navigation.navigate('Story', { storyKey: aiStory.title });
                })}
              >
                <Text style={styles.modalButtonText}>✨ Özel Alıştırma Oluştur</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonSecondary]} 
                onPress={withCooldown(() => setShowMistakeAnalysis(false))}
              >
                <Text style={styles.modalButtonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <QuickActionBar items={quickActions} onItemPress={handleQuickAction} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
