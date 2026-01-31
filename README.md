🧠📱 Easy Peasy Dyslexia
AI-Supported Interactive Reading App for Children with Dyslexia (6–12)

TÜBİTAK Araştırma Projesi | Açık Kaynak Mobil Uygulama

Easy Peasy Dyslexia, 6–12 yaş arası disleksili (veya disleksi şüphesi bulunan) çocukların okuma becerilerini geliştirmek amacıyla geliştirilmiş, yapay zekâ destekli, sesli etkileşimli ve erişilebilir bir mobil okuma uygulamasıdır.

Bu proje, disleksili bireyler için ücretsiz, erişilebilir ve bireyselleştirilmiş bir öğrenme deneyimi sunmayı hedefler.

🎯 Projenin Amacı

Disleksili öğrencilerin harf karıştırma ve okuma hatalarını azaltmak

Okuma hızını, akıcılığı ve okuma motivasyonunu artırmak

Öğretmen veya veli müdahalesi olmadan anlık geri bildirim sağlayabilen bir sistem sunmak

Yapay zekâ destekli kişiselleştirilmiş alıştırmalar üretmek

Eğitimde fırsat eşitliğini desteklemek

🧩 Temel Özellikler
🔊 Sesli Etkileşimli Okuma

Cihaz içi STT (Speech-to-Text) ile öğrencinin okuması analiz edilir

Levenshtein Mesafe Algoritması ile hedef metin karşılaştırılır

Harf, hece ve kelime bazlı hata analizi yapılır

🤖 Yapay Zekâ Destekli Kişiselleştirme

Öğrencinin hata örüntüleri analiz edilir

En sık karıştırılan harf ve hecelere özel kişiselleştirilmiş alıştırmalar oluşturulur

Gemini-2.0-Flash modeli pedagojik yorumlayıcı olarak kullanılır

🎮 Oyunlaştırılmış Öğrenme

Hece Oyunu

Harf Çifti Eşleştirme

Ses Avı

Kelime Bulmaca

📖 Hikâye Okuma Modu

Gölgeli okuma (shadow reading)

Renklendirilmiş harfler

Doğru okuma → ilerleme, yanlış okuma → tekrar

📊 İlerleme & İstatistik

Puan ve seviye sistemi

Öğrenciye özel gelişim grafikleri

Yerel veri saklama (KVKK uyumlu)

🛠️ Kullanılan Teknolojiler

React Native

TypeScript

React Navigation

react-native-voicekit (Offline STT)

react-native-tts

AsyncStorage

Gemini-2.0-Flash (isteğe bağlı AI analiz)

Levenshtein Distance Algorithm

🧠 Uygulama Mimarisi (Özet)

Ses kaydı alınır

STT ile metne dönüştürülür

Güven skoru filtresi uygulanır

Levenshtein algoritması ile hata analizi yapılır

İsteğe bağlı olarak AI katmanına gönderilir

Kişiselleştirilmiş alıştırmalar oluşturulur

🔐 Gizlilik & Etik

Hiçbir kişisel veri saklanmaz

Tüm analizler anonim yapılır

KVKK ve etik kurallara tam uyumludur

Veriler yalnızca cihaz üzerinde tutulur

📱 Platform Desteği
Platform	Durum
Android	✅ Destekleniyor (API 24+)
iOS	🚧 Planlanıyor

Minimum Android sürümü: 7.0

Uygulama boyutu: ~56 MB

Temel özellikler offline çalışır

🚀 Kurulum
git clone https://github.com/kullanici-adi/easy-peasy-dyslexia.git
cd easy-peasy-dyslexia
npm install
npx expo start

📄 TÜBİTAK Bağlamı

Bu proje, TÜBİTAK’ın Yapay Zekâ, Eğitim ve E-Öğrenme öncelikli Ar-Ge alanlarıyla doğrudan uyumludur ve saha testleri Manisa / Yunusemre ilçesinde gerçekleştirilmiştir.

🤝 Katkı Sağlamak

Pull request’ler, issue’lar ve öneriler sonuna kadar açık.
Pedagoji, özel eğitim, mobil geliştirme veya yapay zekâ tarafında katkı sunmak isteyen herkes davetlidir.

📜 Lisans

Bu proje açık kaynak olarak paylaşılmaktadır.
Lisans: MIT
