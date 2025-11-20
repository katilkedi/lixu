import { getSettings } from "./settings";

// Sound effects using audio files
// User needs to add these sound files:
// - success.mp3
// - record.mp3  
// - completion.mp3
// - correct.mp3
// 
// For Android: Place in android/app/src/main/res/raw/
// For iOS: Add to Xcode project

let Sound: any = null;

// Try to import react-native-sound, but handle gracefully if not available
try {
  Sound = require('react-native-sound').default;
  if (Sound) {
    Sound.setCategory('Playback');
  }
} catch (error) {
  console.log('react-native-sound not available, sound effects will be disabled');
}

let successSound: any = null;
let recordSound: any = null;
let completionSound: any = null;
let correctSound: any = null;

// Initialize sounds
if (Sound) {
  try {
    successSound = new Sound('success.mp3', Sound.MAIN_BUNDLE, (error: any) => {
      if (error) console.log('Failed to load success sound', error);
    });
    
    recordSound = new Sound('record.mp3', Sound.MAIN_BUNDLE, (error: any) => {
      if (error) console.log('Failed to load record sound', error);
    });
    
    completionSound = new Sound('completion.mp3', Sound.MAIN_BUNDLE, (error: any) => {
      if (error) console.log('Failed to load completion sound', error);
    });
    
    correctSound = new Sound('correct.mp3', Sound.MAIN_BUNDLE, (error: any) => {
      if (error) console.log('Failed to load correct sound', error);
    });
  } catch (error) {
    console.log('Sound initialization error:', error);
  }
}

const playSoundFile = async (sound: any) => {
  if (!Sound || !sound) return;
  
  const settings = await getSettings();
  if (settings.soundEffectsEnabled) {
    sound.play((success: boolean) => {
      if (!success) {
        console.log('Sound playback failed');
      }
    });
  }
};

export const playSuccessSound = () => {
  playSoundFile(successSound);
};

export const playRecordSound = () => {
  playSoundFile(recordSound);
};

export const playCompletionSound = () => {
  playSoundFile(completionSound);
};

export const playCorrectAnswerSound = () => {
  playSoundFile(correctSound);
};

