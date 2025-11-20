import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../constants/home-types";
import { styles } from "./StatisticStyles";
import { getTopScores } from "../../utils/storage";

type Props = NativeStackScreenProps<RootStackParamList, "Statistics">;

const StatisticsScreen: React.FC<Props> = ({ navigation }) => {
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
      const scores = await getTopScores();
      setTopScores(scores);
    };
    loadData();
  }, []);
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>En Yüksek Skorlar</Text>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{topScores.gameSyllable + topScores.gameWord + topScores.gameSound + topScores.gameLetter}</Text>
            <Text style={styles.statLabel}>Oyun Toplamı</Text>
            <Text style={styles.statDetail}>Tüm oyunlardan en yüksekler</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{topScores.gameSyllable}</Text>
            <Text style={styles.statLabel}>Hece Oyunu</Text>
            <Text style={styles.statDetail}>En yüksek skor</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{topScores.gameWord}</Text>
            <Text style={styles.statLabel}>Kelime Bulmaca</Text>
            <Text style={styles.statDetail}>En yüksek skor</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{topScores.gameSound}</Text>
            <Text style={styles.statLabel}>Ses Avı</Text>
            <Text style={styles.statDetail}>En yüksek skor</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{topScores.gameLetter}</Text>
            <Text style={styles.statLabel}>Harf Çifti</Text>
            <Text style={styles.statDetail}>En yüksek skor</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{topScores.practiceNumbers}</Text>
            <Text style={styles.statLabel}>Sayı Oyunu</Text>
            <Text style={styles.statDetail}>En yüksek doğru cevap</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{topScores.practiceSyllable}</Text>
            <Text style={styles.statLabel}>Pratik</Text>
            <Text style={styles.statDetail}>En yüksek skor</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{topScores.story}</Text>
            <Text style={styles.statLabel}>Hikaye</Text>
            <Text style={styles.statDetail}>Tamamlanan kelime sayısı</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.ctaLabel}>Yeni bir görev seç</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatisticsScreen;

