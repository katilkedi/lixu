import { PermissionsAndroid, Platform } from 'react-native';

let microphoneGranted: boolean | null = null;

export const ensureMicrophonePermission = async (): Promise<boolean> => {
  if (microphoneGranted) {
    return true;
  }

  if (Platform.OS !== 'android') {
    microphoneGranted = true;
    return true;
  }

  const alreadyGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
  if (alreadyGranted) {
    microphoneGranted = true;
    return true;
  }

  const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
  microphoneGranted = status === PermissionsAndroid.RESULTS.GRANTED;
  return microphoneGranted;
};

export const resetMicrophonePermissionCache = () => {
  microphoneGranted = null;
};

