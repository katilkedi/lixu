import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFC400',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFC400',
    justifyContent: 'space-between',
  },
  illustration: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 32,
  },
  mascot: {
    width: '65%',
    aspectRatio: 1,
    zIndex: 2,
  },
  sun: {
    position: 'absolute',
    top: 16,
    left: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF7A28',
  },
  balloon: {
    position: 'absolute',
    width: 64,
    height: 90,
    borderRadius: 32,
    backgroundColor: '#FFE0D6',
    borderWidth: 4,
    borderColor: '#FF7A28',
    opacity: 0.8,
  },
  balloonLeft: {
    top: 100,
    left: 40,
  },
  balloonRight: {
    top: 120,
    right: 40,
  },
  mountains: {
    position: 'absolute',
    bottom: 140,
    width: '100%',
    height: 160,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    backgroundColor: '#F5A089',
  },
  cloud: {
    position: 'absolute',
    width: 120,
    height: 60,
    backgroundColor: '#FFEFD2',
    borderRadius: 30,
    opacity: 0.9,
  },
  cloudLeft: {
    bottom: 200,
    left: 20,
  },
  cloudRight: {
    bottom: 210,
    right: 20,
  },
  panel: {
    backgroundColor: '#3A2B26',
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 48,
    gap: 16,
  },
  title: {
    fontSize: 34,
    color: '#FFC400',
    fontFamily: 'Lexend-SemiBold',
  },
  body: {
    fontSize: 18,
    color: '#FFEFD2',
    fontFamily: 'OpenDyslexic-Regular',
    lineHeight: 26,
  },
  cta: {
    marginTop: 8,
    backgroundColor: '#FF7A28',
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: 'center',
  },
  ctaLabel: {
    color: '#3A2B26',
    fontSize: 20,
    fontFamily: 'Lexend-Medium',
  },
});

