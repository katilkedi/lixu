import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../constants/home-types";
import { styles } from "./StatisticStyles";
import { getStatistics, getTopScores } from "../../utils/storage";

type Props = NativeStackScreenProps<RootStackParamList, "Statistics">;

const StatisticsScreen: React.FC<Props> = ({ navigation }) => {
  const [stats, setStats] = useState({
    readingStreak: 0,
    storiesCompleted: 0,
    totalGameScore: 0,
    totalPracticeTime: 0,
    totalGameTime: 0,
    totalStoryTime: 0,
  });
  const [topScores, setTopScores] = useState({
    practiceSyllable: 0,
    practiceNumbers: 0,
    gameSyllable: 0,
    gameWord: 0,
    gameSound: 0,
    gameLetter: 0,
    story: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const statistics = await getStatistics();
      const scores = await getTopScores();
      setStats(statistics);
      setTopScores(scores);
    };
    loadData();
  }, []);

  const totalTime = stats.totalPracticeTime + stats.totalGameTime + stats.totalStoryTime;
  const totalMinutes = Math.floor(totalTime / 60);
  const totalSeconds = totalTime % 60;
  const timeDisplay = totalMinutes > 0 ? `${totalMinutes} dk` : `${totalSeconds} sn`;

  const progress = [
    { label: "Okuma Zinciri", value: `${stats.readingStreak} gün`, detail: "Son aralıksız gün sayısı" },
    { label: "Hikaye Tamamlama", value: `${stats.storiesCompleted}`, detail: "Tamamlanan hikayeler" },
    { label: "Toplam Puan", value: `${stats.totalGameScore}`, detail: "Tüm oyunlardan toplam" },
  ];

  const activity = [
    { title: "Hikaye", value: `${Math.floor(stats.totalStoryTime / 60)} dk`, desc: "Harf vurguları ile okuma" },
    { title: "Oyun", value: `${Math.floor(stats.totalGameTime / 60)} dk`, desc: "Hece yakalama + kelime bulmaca" },
    { title: "Pratik", value: `${Math.floor(stats.totalPracticeTime / 60)} dk`, desc: "Kelime tekrarları ve sayı oyunu" },
  ];
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#3A2B26" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backLabel}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>İstatistiklerim</Text>
          <Text style={styles.headerSubtitle}>İlerlemeyi düzenli takip et</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.highlightCard}>
          <Text style={styles.highlightKpi}>{timeDisplay}</Text>
          <Text style={styles.highlightLabel}>Toplam çalışma süresi</Text>
          <Text style={styles.highlightHint}>Hedef: 15 dk/gün</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressValue, { width: `${Math.min(100, (totalTime / 900) * 100)}%` }]} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>En Yüksek Skorlar</Text>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{topScores.gameSyllable + topScores.gameWord + topScores.gameSound + topScores.gameLetter}</Text>
            <Text style={styles.statLabel}>Oyun Toplamı</Text>
            <Text style={styles.statDetail}>Tüm oyunlardan en yüksekler</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{topScores.practiceNumbers}</Text>
            <Text style={styles.statLabel}>Sayı Oyunu</Text>
            <Text style={styles.statDetail}>En yüksek doğru cevap</Text>
          </View>
        </View>

        <View style={styles.section}>
          {progress.map(item => (
            <View key={item.label} style={styles.statCard}>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statDetail}>{item.detail}</Text>
            </View>
          ))}
        </View>

        <View style={styles.activityCard}>
          <Text style={styles.sectionTitle}>Haftalık aktivite</Text>
          {activity.map(entry => (
            <View key={entry.title} style={styles.activityRow}>
              <View>
                <Text style={styles.activityTitle}>{entry.title}</Text>
                <Text style={styles.activityDesc}>{entry.desc}</Text>
              </View>
              <Text style={styles.activityValue}>{entry.value}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.ctaLabel}>Yeni bir görev seç</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatisticsScreen;

