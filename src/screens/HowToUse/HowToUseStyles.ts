import { StyleSheet } from "react-native";

const COLORS = {
  background: "#3A2B26",
  panel: "#FFEFD2",
  yellow: "#FFC400",
  accent: "#FF7A28",
  textDark: "#3A2B26",
  textLight: "#FFEFD2",
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 18,
    backgroundColor: "#4F3D39",
    justifyContent: "center",
    alignItems: "center",
  },
  backLabel: {
    fontSize: 22,
    color: COLORS.panel,
  },
  headerTitle: {
    color: COLORS.panel,
    fontSize: 26,
    fontFamily: "Lexend-SemiBold",
  },
  headerSubtitle: {
    color: COLORS.textLight,
    fontSize: 16,
    fontFamily: "OpenDyslexic-Regular",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 24,
  },
  section: {
    backgroundColor: COLORS.panel,
    borderRadius: 28,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Lexend-SemiBold",
    color: COLORS.textDark,
    marginBottom: 12,
  },
  stepCard: {
    backgroundColor: "#FFF6E3",
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
  },
  stepTitle: {
    fontSize: 17,
    fontFamily: "Lexend-SemiBold",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  stepText: {
    fontSize: 15,
    color: COLORS.textDark,
    fontFamily: "OpenDyslexic-Regular",
  },
  tipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  tipCard: {
    flexBasis: "47%",
    backgroundColor: "#FFF6E3",
    borderRadius: 20,
    padding: 14,
    gap: 4,
  },
  tipIcon: {
    fontSize: 22,
  },
  tipTitle: {
    fontSize: 16,
    fontFamily: "Lexend-SemiBold",
    color: COLORS.textDark,
  },
  tipText: {
    fontSize: 14,
    color: COLORS.textDark,
    fontFamily: "OpenDyslexic-Regular",
  },
  ctaButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: -10,
  },
  ctaLabel: {
    color: COLORS.textDark,
    fontSize: 18,
    fontFamily: "Lexend-SemiBold",
  },
});

