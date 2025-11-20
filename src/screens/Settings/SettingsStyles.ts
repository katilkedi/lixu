import { StyleSheet } from "react-native";

const COLORS = {
  background: "#FFC400",
  panel: "#FFEFD2",
  deepBrown: "#3A2B26",
  midBrown: "#4F3D39",
  accent: "#FF7A28",
  cream: "#FFF6E3",
  success: "#34C759",
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.deepBrown,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.deepBrown,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 24,
    paddingVertical: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: COLORS.midBrown,
    alignItems: "center",
    justifyContent: "center",
  },
  backLabel: {
    color: COLORS.panel,
    fontSize: 24,
    fontWeight: "bold",
  },
  headerTitle: {
    color: COLORS.panel,
    fontSize: 28,
    fontFamily: "Lexend-SemiBold",
  },
  headerSubtitle: {
    color: COLORS.cream,
    fontSize: 16,
    marginTop: 4,
    fontFamily: "OpenDyslexic-Regular",
  },
  content: {
    padding: 20,
    gap: 20,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 22,
    color: COLORS.deepBrown,
    fontFamily: "Lexend-SemiBold",
    marginBottom: 8,
  },
  settingCard: {
    backgroundColor: COLORS.panel,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  settingLabel: {
    fontSize: 18,
    color: COLORS.deepBrown,
    fontFamily: "Lexend-SemiBold",
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: COLORS.cream,
    borderWidth: 2,
    borderColor: "transparent",
  },
  optionButtonActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.deepBrown,
  },
  optionText: {
    fontSize: 14,
    color: COLORS.deepBrown,
    fontFamily: "OpenDyslexic-Regular",
  },
  optionTextActive: {
    color: "#FFFFFF",
    fontFamily: "Lexend-SemiBold",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cta: {
    marginTop: 20,
    backgroundColor: COLORS.deepBrown,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
  },
  ctaLabel: {
    color: COLORS.panel,
    fontSize: 18,
    fontFamily: "Lexend-SemiBold",
  },
});

