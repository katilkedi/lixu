export type GameMode = 'syllable' | 'word' | 'sound' | 'letter';
export type PracticeMode = 'numbers';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  HowToUse: undefined;
  Statistics: undefined;
  Settings: undefined;
  Practice: { mode?: PracticeMode } | undefined;
  Story: { storyKey?: string } | undefined;
  Game: { gameKey?: GameMode } | undefined;
};
