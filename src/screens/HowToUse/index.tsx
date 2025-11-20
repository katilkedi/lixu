import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../constants/home-types";
import { styles } from "./HowToUseStyles";

type Props = NativeStackScreenProps<RootStackParamList, "HowToUse">;

const steps = [
  { title: "Başlangıç", description: "Uygulamayı aç ve ana ekrandan istediğin aktiviteyi seç. Hikayeler, oyunlar ve pratikler arasından seçim yapabilirsin." },
  { title: "Alanını seç", description: "Hikayeler, oyunlar ve pratiklerden seviyene göre seçim yap. Her aktivite farklı becerilerini geliştirmene yardımcı olur." },
  { title: "İlerlemeni izle", description: "İstatistikler ekranından günlük zincirini, skorlarını ve çalışma süreni takip et. Her gün biraz daha ilerle!" },
];

const quickTips = [
  { icon: "📖", title: "Hikayeler", text: "Sesli okuma yaparak kelimeleri takip et. Renkli harf vurguları okumayı kolaylaştırır." },
  { icon: "🎮", title: "Oyunlar", text: "Dört farklı mini oyunla ses, harf ve kelime becerilerini pekiştir. Her oyun farklı bir yeteneğini geliştirir." },
  { icon: "🎯", title: "Pratikler", text: "Anlamlı kelimeleri sesle tekrar et veya sayı sorularını çözerek matematik becerilerini geliştir." },
  { icon: "✨", title: "Öneri", text: "Kısa ama düzenli çalışma seansları yap. Yorulduğunda mola ver ve tekrar devam et." },
];

const HowToUse: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#3A2B26" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backLabel}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Nasıl Kullanılır?</Text>
          <Text style={styles.headerSubtitle}>Adım adım öğrenme rehberi</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Başlangıç Adımları</Text>
          {steps.map((item) => (
            <View key={item.title} style={styles.stepCard}>
              <Text style={styles.stepTitle}>{item.title}</Text>
              <Text style={styles.stepText}>{item.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kısayollar</Text>
          <View style={styles.tipGrid}>
            {quickTips.map((tip) => (
              <View key={tip.title} style={styles.tipCard}>
                <Text style={styles.tipIcon}>{tip.icon}</Text>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipText}>{tip.text}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.ctaLabel}>Anladım, hazırım!</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HowToUse;

