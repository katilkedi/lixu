# iOS için Asset Dosyaları

iOS projesi için font ve ses dosyalarını Xcode projesine eklemeniz gerekiyor.

## Ses Dosyaları (MP3)

Aşağıdaki MP3 dosyalarını Xcode projesine ekleyin:

1. **success.mp3** - Başarılı işlemler için ses efekti
2. **record.mp3** - Kayıt başladığında çalan ses
3. **completion.mp3** - Tamamlama/görev bitirme sesi
4. **correct.mp3** - Doğru cevap ses efekti

### Ses Dosyalarını Ekleme:
1. Xcode'da projeyi açın
2. Sol panelde `Lixu` klasörüne sağ tıklayın
3. "Add Files to Lixu..." seçeneğini seçin
4. MP3 dosyalarını seçin
5. "Copy items if needed" seçeneğini işaretleyin
6. "Add" butonuna tıklayın

### Ses Dosyalarını Nereden Bulabilirsiniz:
- **Freesound.org** - https://freesound.org
- **Zapsplat** - https://www.zapsplat.com
- **Mixkit** - https://mixkit.co/free-sound-effects/
- **Pixabay** - https://pixabay.com/sound-effects/

## Font Dosyaları

Aşağıdaki font dosyalarını Xcode projesine ekleyin:

1. **OpenDyslexic-Regular.ttf** veya **OpenDyslexic-Regular.otf**
2. **Lexend-Regular.ttf** veya **Lexend-Regular.otf**
3. **AtkinsonHyperlegible-Regular.ttf** veya **AtkinsonHyperlegible-Regular.otf**

### Font Dosyalarını Ekleme:
1. Xcode'da projeyi açın
2. Sol panelde `Lixu` klasörüne sağ tıklayın
3. "Add Files to Lixu..." seçeneğini seçin
4. Font dosyalarını seçin
5. "Copy items if needed" seçeneğini işaretleyin
6. "Add" butonuna tıklayın

### Font Dosyalarını Nereden İndirebilirsiniz:

#### OpenDyslexic
- **Resmi Site**: https://opendyslexic.org/
- **GitHub**: https://github.com/antijingoist/opendyslexic

#### Lexend
- **Google Fonts**: https://fonts.google.com/specimen/Lexend

#### Atkinson Hyperlegible
- **Resmi Site**: https://brailleinstitute.org/freefont
- **GitHub**: https://github.com/googlefonts/atkinson-hyperlegible

### Info.plist'e Font Ekleme:
Font dosyalarını ekledikten sonra `Info.plist` dosyasına fontları kaydetmeniz gerekebilir:

1. `Info.plist` dosyasını açın
2. "Fonts provided by application" (UIAppFonts) anahtarını ekleyin
3. Her font dosyası için bir item ekleyin:
   - OpenDyslexic-Regular.ttf
   - Lexend-Regular.ttf
   - AtkinsonHyperlegible-Regular.ttf

## Not:
Dosyaları ekledikten sonra projeyi temizleyip yeniden derleyin (Product > Clean Build Folder).

