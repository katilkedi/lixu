import Tts from 'react-native-tts';

let ttsReady = false;
let ttsInitializing = false;

// Initialize TTS and wait for it to be ready
export const initTTS = async (): Promise<void> => {
  if (ttsReady) {
    return;
  }

  if (ttsInitializing) {
    // Wait for ongoing initialization
    return new Promise((resolve) => {
      const checkReady = () => {
        if (ttsReady) {
          resolve();
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
    });
  }

  ttsInitializing = true;

  try {
    // Check if TTS is already initialized
    const status = await Tts.getInitStatus();
    if (status === 'success') {
      ttsReady = true;
      ttsInitializing = false;
      return;
    }
  } catch (error) {
    console.log('TTS init check error:', error);
  }

  // Wait for TTS to be ready
  return new Promise((resolve) => {
    const checkReady = () => {
      Tts.getInitStatus()
        .then((status) => {
          if (status === 'success') {
            ttsReady = true;
            ttsInitializing = false;
            resolve();
          } else {
            setTimeout(checkReady, 100);
          }
        })
        .catch(() => {
          setTimeout(checkReady, 100);
        });
    };
    checkReady();
  });
};

// Safe TTS speak function
export const safeSpeak = async (text: string, options?: any): Promise<void> => {
  if (!ttsReady) {
    await initTTS();
  }
  
  try {
    await Tts.speak(text, options);
  } catch (error) {
    console.log('TTS speak error:', error);
  }
};

// Safe TTS setDefaultRate
export const safeSetDefaultRate = async (rate: number): Promise<void> => {
  if (!ttsReady) {
    await initTTS();
  }
  
  try {
    await Tts.setDefaultRate(rate);
  } catch (error) {
    console.log('TTS setDefaultRate error:', error);
  }
};

// Safe TTS setDefaultPitch
export const safeSetDefaultPitch = async (pitch: number): Promise<void> => {
  if (!ttsReady) {
    await initTTS();
  }
  
  try {
    await Tts.setDefaultPitch(pitch);
  } catch (error) {
    console.log('TTS setDefaultPitch error:', error);
  }
};

