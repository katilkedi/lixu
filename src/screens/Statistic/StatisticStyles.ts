import { StyleSheet } from "react-native";

const COLORS = {
  background: "#3A2B26",
  panel: "#FFEFD2",
  accent: "#FF7A28",
  highlight: "#FFC400",
  textLight: "#FFEFD2",
  textDark: "#3A2B26",
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 18,
    backgroundColor: "#4F3D39",
    alignItems: "center",
    justifyContent: "center",
  },
  backLabel: {
    color: COLORS.panel,
    fontSize: 22,
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
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 20,
  },
  highlightCard: {
    backgroundColor: COLORS.panel,
    borderRadius: 28,
    padding: 20,
    gap: 8,
  },
  highlightKpi: {
    fontSize: 42,
    fontFamily: "Lexend-Bold",
    color: COLORS.textDark,
  },
  highlightLabel: {
    fontSize: 18,
    fontFamily: "Lexend-SemiBold",
    color: COLORS.textDark,
  },
  highlightHint: {
    fontSize: 14,
    color: "#6B4F4A",
    fontFamily: "OpenDyslexic-Regular",
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#F8DCC4",
    marginTop: 6,
  },
  progressValue: {
    width: "80%",
    height: "100%",
    backgroundColor: COLORS.accent,
    borderRadius: 5,
  },
  section: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flexBasis: "48%",
    backgroundColor: COLORS.panel,
    borderRadius: 22,
    padding: 16,
    gap: 4,
  },
  statValue: {
    fontSize: 24,
    fontFamily: "Lexend-Bold",
    color: COLORS.textDark,
  },
  statLabel: {
    fontSize: 15,
    fontFamily: "Lexend-SemiBold",
    color: COLORS.textDark,
  },
  statDetail: {
    fontSize: 13,
    color: "#6B4F4A",
    fontFamily: "OpenDyslexic-Regular",
  },
  activityCard: {
    backgroundColor: COLORS.panel,
    borderRadius: 28,
    padding: 20,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Lexend-SemiBold",
    color: COLORS.textDark,
  },
  activityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3C99A",
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: "Lexend-SemiBold",
    color: COLORS.textDark,
  },
  activityDesc: {
    fontSize: 13,
    fontFamily: "OpenDyslexic-Regular",
    color: "#6B4F4A",
  },
  activityValue: {
    fontSize: 18,
    fontFamily: "Lexend-Bold",
    color: COLORS.textDark,
  },
  cta: {
    backgroundColor: COLORS.accent,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
  },
  ctaLabel: {
    color: COLORS.textDark,
    fontSize: 18,
    fontFamily: "Lexend-SemiBold",
  },
});

