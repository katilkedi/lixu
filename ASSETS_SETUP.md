# Asset Dosyaları Kurulum Rehberi

Bu proje için font ve ses dosyalarını eklemeniz gerekiyor. Bu dosyalar uygulamanın düzgün çalışması için gereklidir.

## 📁 Dosya Yapısı

```
Lixu/
├── android/
│   └── app/
│       └── src/
│           └── main/
│               ├── assets/
│               │   └── fonts/          ← Font dosyaları buraya
│               │       ├── OpenDyslexic-Regular.ttf
│               │       ├── Lexend-Regular.ttf
│               │       └── AtkinsonHyperlegible-Regular.ttf
│               └── res/
│                   └── raw/            ← MP3 dosyaları buraya
│                       ├── success.mp3
│                       ├── record.mp3
│                       ├── completion.mp3
│                       └── correct.mp3
└── ios/
    └── Lixu/                          ← iOS için Xcode'a ekleyin
        ├── success.mp3
        ├── record.mp3
        ├── completion.mp3
        ├── correct.mp3
        ├── OpenDyslexic-Regular.ttf
        ├── Lexend-Regular.ttf
        └── AtkinsonHyperlegible-Regular.ttf
```

## 🎵 Ses Dosyaları (MP3)

### Android için:
1. `android/app/src/main/res/raw/` klasörüne aşağıdaki dosyaları ekleyin:
   - `success.mp3`
   - `record.mp3`
   - `completion.mp3`
   - `correct.mp3`

### iOS için:
1. Xcode'da projeyi açın
2. MP3 dosyalarını projeye ekleyin (detaylar için `ios/README_ASSETS.md` dosyasına bakın)

### Ses Dosyalarını Nereden Bulabilirsiniz:
- **Freesound.org**: https://freesound.org
- **Zapsplat**: https://www.zapsplat.com
- **Mixkit**: https://mixkit.co/free-sound-effects/
- **Pixabay**: https://pixabay.com/sound-effects/

**Önerilen arama terimleri:**
- success.mp3: "success sound", "achievement", "ding"
- record.mp3: "record start", "beep", "notification"
- completion.mp3: "completion", "finish", "level complete"
- correct.mp3: "correct answer", "right", "positive feedback"

## 🔤 Font Dosyaları

### Android için:
1. `android/app/src/main/assets/fonts/` klasörüne aşağıdaki font dosyalarını ekleyin:
   - `OpenDyslexic-Regular.ttf` (veya `.otf`)
   - `Lexend-Regular.ttf` (veya `.otf`)
   - `AtkinsonHyperlegible-Regular.ttf` (veya `.otf`)

### iOS için:
1. Xcode'da projeyi açın
2. Font dosyalarını projeye ekleyin (detaylar için `ios/README_ASSETS.md` dosyasına bakın)

### Font Dosyalarını Nereden İndirebilirsiniz:

#### 1. OpenDyslexic
- **Resmi Site**: https://opendyslexic.org/
- **GitHub**: https://github.com/antijingoist/opendyslexic
- Disleksi dostu font

#### 2. Lexend
- **Google Fonts**: https://fonts.google.com/specimen/Lexend
- Doğrudan Google Fonts'tan indirebilirsiniz
- "Regular" ağırlığını seçin

#### 3. Atkinson Hyperlegible
- **Resmi Site**: https://brailleinstitute.org/freefont
- **GitHub**: https://github.com/googlefonts/atkinson-hyperlegible
- Okunabilirlik için optimize edilmiş font

## ✅ Kurulum Sonrası

Dosyaları ekledikten sonra:

1. **Android için:**
   ```bash
   cd android
   ./gradlew clean
   ```

2. **iOS için:**
   - Xcode'da: Product > Clean Build Folder

3. Projeyi yeniden derleyin

## 📝 Notlar

- Dosya isimleri büyük/küçük harf duyarlıdır
- TTF veya OTF formatı kabul edilir (fontlar için)
- MP3 dosyaları kısa olmalıdır (0.5-2 saniye arası önerilir)
- Dosyaları ekledikten sonra projeyi temizleyip yeniden derlemeyi unutmayın

## 🆘 Sorun Giderme

Eğer fontlar veya sesler çalışmıyorsa:
1. Dosya isimlerinin doğru olduğundan emin olun
2. Dosyaların doğru klasörlerde olduğunu kontrol edin
3. Projeyi temizleyip yeniden derleyin
4. Uygulamayı tamamen kapatıp yeniden açın

