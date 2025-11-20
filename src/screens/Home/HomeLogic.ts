import { useMemo, useState } from 'react';
import { RootStackParamList } from '../../constants/home-types';

export type SectionItem = {
  key: string;
  label: string;
  helper?: string;
  emoji: string;
  target: keyof RootStackParamList;
  storyKey?: string;
  gameKey?: RootStackParamList['Game'] extends { gameKey?: infer G } | undefined ? G : undefined;
  practiceMode?: RootStackParamList['Practice'] extends { mode?: infer M } | undefined ? M : undefined;
};

export type HomeSection = {
  title: string;
  items: SectionItem[];
};

export type QuickAction = {
  key: string;
  label: string;
  emoji: string;
  target: keyof RootStackParamList;
  gameKey?: RootStackParamList['Game'] extends { gameKey?: infer G } | undefined ? G : undefined;
  practiceMode?: RootStackParamList['Practice'] extends { mode?: infer M } | undefined ? M : undefined;
};

export const useHomeLogic = () => {
  const [username] = useState('');

  const sections = useMemo<HomeSection[]>(() => [
    {
      title: 'Hikayeler',
      items: [
        { key: 'story1', label: 'Buse ve Yeni Okulu', helper: 'Başlangıç', emoji: '📗', target: 'Story', storyKey: 'Buse ve Yeni Okulu' },
        { key: 'story2', label: 'Kendine İnan Buse', helper: 'Orta seviye', emoji: '📙', target: 'Story', storyKey: 'Kendine İnan Buse' },
        { key: 'story3', label: 'Kırgın Arkadaşlık', helper: 'Empati', emoji: '📘', target: 'Story', storyKey: 'Kırgın Arkadaşlık' },
        { key: 'story4', label: 'Renklerin Gücü', helper: 'Hayal gücü', emoji: '📗', target: 'Story', storyKey: 'Renklerin Gücü' },
      ],
    },
    {
      title: 'Oyunlar',
      items: [
        { key: 'game1', label: 'Kelime Bulma', helper: 'Hız + dikkat', emoji: '🎯', target: 'Game', gameKey: 'word' },
        { key: 'game2', label: 'Hece Yakalama', helper: 'Sesler', emoji: '🎮', target: 'Game', gameKey: 'syllable' },
        { key: 'game3', label: 'Harf Çifti', helper: 'Harf dizisi', emoji: '🧩', target: 'Game', gameKey: 'letter' },
        { key: 'game4', label: 'Kelime Avı', helper: 'Tarama', emoji: '🕵️', target: 'Game', gameKey: 'sound' },
      ],
    },
    {
      title: 'Pratikler',
      items: [
        { key: 'practice1', label: 'Hece Okuma', helper: 'Sesli tekrar', emoji: '🔊', target: 'Practice' },
        { key: 'practice2', label: 'Sayılar', helper: 'Dizilim', emoji: '🔢', target: 'Practice', practiceMode: 'numbers' },
      ],
    },
  ], []);

  const quickActions = useMemo<QuickAction[]>(() => [
    { key: 'guide', label: 'Nasıl Kullanılır', emoji: '❔', target: 'HowToUse' },
    { key: 'story', label: 'Hızlı Hikaye', emoji: '📖', target: 'Story' },
    { key: 'game', label: 'Hızlı Oyun', emoji: '🎮', target: 'Game' },
    { key: 'practice', label: 'Hızlı Pratik', emoji: '⚡', target: 'Practice' },
    { key: 'settings', label: 'Ayarlar', emoji: '⚙️', target: 'Settings' },
   ], []);

  return {
    username,
    sections,
    quickActions,
  };
};
