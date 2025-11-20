import { getSettings } from "./settings";
import { Platform } from "react-native";

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

// Helper function to get sound source based on platform
const getSoundSource = (filename: string) => {
  if (Platform.OS === 'android') {
    // Android: remove extension, files are in res/raw/
    return filename.replace('.mp3', '');
  } else {
    // iOS: use MAIN_BUNDLE
    return Sound.MAIN_BUNDLE;
  }
};

// Initialize sounds with proper error handling
const initializeSound = (filename: string, soundName: string): any => {
  if (!Sound) return null;
  
  try {
    const androidSource = Platform.OS === 'android' ? filename.replace('.mp3', '') : Sound.MAIN_BUNDLE;
    const androidFilename = Platform.OS === 'android' ? filename.replace('.mp3', '') : filename;
    
    const sound = new Sound(androidFilename, androidSource, (error: any) => {
      if (error) {
        console.log(`Failed to load ${soundName} sound:`, error);
      } else {
        console.log(`${soundName} sound loaded successfully`);
        // Set volume to max and enable playback
        try {
          sound.setVolume(1.0);
        } catch (e) {
          // Ignore volume setting errors
        }
      }
    });
    
    return sound;
  } catch (error) {
    console.log(`Error initializing ${soundName} sound:`, error);
    return null;
  }
};

if (Sound) {
  // Enable playback mode - mix with other audio
  try {
    Sound.setCategory('Playback', true);
  } catch (error) {
    // Fallback for older versions
    try {
      Sound.setCategory('Playback');
    } catch (e) {
      // Ignore
    }
  }
  
  successSound = initializeSound('success.mp3', 'success');
  recordSound = initializeSound('record.mp3', 'record');
  completionSound = initializeSound('completion.mp3', 'completion');
  correctSound = initializeSound('correct.mp3', 'correct');
}

const playSoundFile = async (sound: any) => {
  if (!Sound || !sound) {
    return;
  }
  
  const settings = await getSettings();
  if (!settings.soundEffectsEnabled) {
    return;
  }
  
  // Play sound - try multiple approaches
  try {
    // Method 1: Try to play directly
    const playDirectly = () => {
      try {
        sound.setVolume(1.0);
        sound.play((success: boolean) => {
          if (!success) {
            // Retry after short delay
            setTimeout(() => {
              try {
                sound.play();
              } catch (e) {
                // Silent fail
              }
            }, 150);
          }
        });
      } catch (e) {
        // Try alternative method
        setTimeout(playWithCheck, 200);
      }
    };
    
    // Method 2: Check if loaded first
    const playWithCheck = () => {
      try {
        const isLoaded = sound.isLoaded ? sound.isLoaded() : true;
        if (isLoaded) {
          sound.setVolume(1.0);
          sound.play();
        } else {
          // Wait and retry
          setTimeout(playDirectly, 200);
        }
      } catch (e) {
        // Try direct play anyway
        playDirectly();
      }
    };
    
    // Start with direct play
    playDirectly();
  } catch (error) {
    // Silent fail
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

