import AsyncStorage from '@react-native-async-storage/async-storage';

export type TopScores = {
  practiceSyllable: number;
  practiceNumbers: number;
  gameSyllable: number;
  gameWord: number;
  gameSound: number;
  gameLetter: number;
  story: number;
};

export type Statistics = {
  readingStreak: number;
  storiesCompleted: number;
  totalGameScore: number;
  totalPracticeTime: number;
  totalGameTime: number;
  totalStoryTime: number;
  lastActivityDate: string;
};

const TOP_SCORES_KEY = '@dyslexia_top_scores';
const STATISTICS_KEY = '@dyslexia_statistics';

export const getTopScores = async (): Promise<TopScores> => {
  try {
    const data = await AsyncStorage.getItem(TOP_SCORES_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading top scores:', error);
  }
  return {
    practiceSyllable: 0,
    practiceNumbers: 0,
    gameSyllable: 0,
    gameWord: 0,
    gameSound: 0,
    gameLetter: 0,
    story: 0,
  };
};

export const saveTopScore = async (key: keyof TopScores, score: number): Promise<boolean> => {
  try {
    const current = await getTopScores();
    if (score > current[key]) {
      const updated = { ...current, [key]: score };
      await AsyncStorage.setItem(TOP_SCORES_KEY, JSON.stringify(updated));
      return true; // New record
    }
    return false; // Not a new record
  } catch (error) {
    console.error('Error saving top score:', error);
    return false;
  }
};

export const getStatistics = async (): Promise<Statistics> => {
  try {
    const data = await AsyncStorage.getItem(STATISTICS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading statistics:', error);
  }
  const today = new Date().toISOString().split('T')[0];
  return {
    readingStreak: 0,
    storiesCompleted: 0,
    totalGameScore: 0,
    totalPracticeTime: 0,
    totalGameTime: 0,
    totalStoryTime: 0,
    lastActivityDate: today,
  };
};

export const updateStatistics = async (updates: Partial<Statistics>): Promise<void> => {
  try {
    const current = await getStatistics();
    const today = new Date().toISOString().split('T')[0];
    const lastDate = current.lastActivityDate;
    
    let readingStreak = current.readingStreak;
    if (lastDate !== today) {
      const lastDateObj = new Date(lastDate);
      const todayObj = new Date(today);
      const diffDays = Math.floor((todayObj.getTime() - lastDateObj.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        readingStreak += 1;
      } else if (diffDays > 1) {
        readingStreak = 1;
      }
    }
    
    const updated = {
      ...current,
      ...updates,
      readingStreak,
      lastActivityDate: today,
    };
    await AsyncStorage.setItem(STATISTICS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error updating statistics:', error);
  }
};

