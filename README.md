# UnivercityMobile

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Native_Paper-6200EE?style=for-the-badge&logo=react&logoColor=white" />
</p>

> 🇹🇷 Türkçe açıklama aşağıda yer almaktadır. | 🇬🇧 English description follows below.

---

## 🇹🇷 Türkçe

### Proje Hakkında

**UnivercityMobile**, üniversite bilgilerini kolayca keşfetmek ve kullanıcılar arasında mesajlaşmak için geliştirilmiş bir React Native mobil uygulamasıdır. Uygulama, Expo framework'ü kullanılarak iOS ve Android platformlarında çalışacak şekilde tasarlanmıştır.

### Özellikler

- 🔐 **Kullanıcı Kimlik Doğrulama** — E-posta ve şifre ile giriş yapma ve kayıt olma
- 🏛️ **Üniversite Listesi** — Tüm üniversiteleri öğrenci sayılarıyla birlikte görüntüleme
- 🔍 **Üniversite Detayları** — Adres, telefon, web sitesi, kontenjan ve logo bilgileri
- 🏫 **Fakülteler** — Seçilen üniversiteye ait fakülteleri listeleme
- 📚 **Bölümler** — Fakülteye bağlı bölümleri ve dekan bilgilerini görüntüleme
- 📖 **Dersler** — Bölüme ait dersleri listeleme
- 📝 **Ders Detayı** — Ders kodu, öğretim üyesi, ders programı ve ders kitabı bilgisi
- 💬 **Mesajlaşma** — Kullanıcılar arası anlık mesajlaşma sistemi

### Navigasyon Yapısı

```
Giriş / Kayıt
└── Dashboard (Alt Sekme Çubuğu)
    ├── Üniversiteler
    │   └── Fakülteler
    │       └── Bölümler
    │           └── Dersler
    │               └── Ders Detayı
    └── Mesajlar
        └── Konuşma Ekranı
```

### Teknolojiler

| Teknoloji | Sürüm |
|---|---|
| React Native | 0.76.7 |
| Expo | ~52.0.33 |
| Expo Router | ~4.0.17 |
| TypeScript | ^5.3.3 |
| Axios | ^1.7.9 |
| React Native Paper | ^5.14.0 |

### Kurulum ve Çalıştırma

**Gereksinimler:** Node.js, npm veya yarn, Expo Go uygulaması (mobil cihaz için)

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm start

# iOS için
npm run ios

# Android için
npm run android
```

> **Not:** Uygulamanın çalışabilmesi için `http://localhost:80/api` adresinde bir backend API sunucusunun çalışıyor olması gerekmektedir.

### API Endpoint'leri

| Endpoint | Açıklama |
|---|---|
| `POST /login` | Kullanıcı girişi |
| `POST /register` | Yeni kullanıcı kaydı |
| `GET /universities` | Tüm üniversitelerin listesi |
| `GET /universities/:id` | Üniversite detayları |
| `GET /universities/:id/faculties` | Üniversiteye ait fakülteler |
| `GET /departments/uni/:id` | Üniversiteye ait bölümler |
| `GET /messages/:user_id` | Kullanıcının mesaj listesi |
| `POST /messages/details` | İki kullanıcı arasındaki mesajlar |
| `POST /messages/send` | Mesaj gönderme |

### Proje Yapısı

```
UnivercityMobile/
├── src/
│   ├── api/
│   │   └── rest.ts              # API istek sınıfı (Axios)
│   ├── app/
│   │   ├── _layout.tsx          # Kök navigasyon yapısı
│   │   ├── index.tsx            # Giriş yönlendirme sayfası
│   │   ├── auth/
│   │   │   ├── login.tsx        # Giriş ekranı
│   │   │   └── register.tsx     # Kayıt ekranı
│   │   └── dashboard/
│   │       ├── _layout.tsx      # Alt sekme çubuğu
│   │       ├── index.tsx        # Üniversite listesi
│   │       ├── information/     # Bilgi sayfaları (fakülte, bölüm, ders)
│   │       └── message/         # Mesajlaşma sayfaları
│   ├── components/
│   │   ├── Button.tsx           # Ortak buton bileşeni
│   │   ├── Input.tsx            # Ortak giriş bileşeni
│   │   └── TouchableOpacity.tsx # Temalı dokunma bileşeni
│   └── types/
│       └── apiTypes.ts          # TypeScript tip tanımlamaları
├── assets/                      # Görseller, ikonlar, fontlar
├── app.json                     # Expo uygulama yapılandırması
└── package.json
```

---

## 🇬🇧 English

### About the Project

**UnivercityMobile** is a React Native mobile application designed to help users easily discover university information and communicate with each other via messaging. Built with the Expo framework, it runs on both iOS and Android platforms.

### Features

- 🔐 **User Authentication** — Login and registration with email and password
- 🏛️ **University Listing** — Browse all universities with student count information
- 🔍 **University Details** — View address, phone, website, quota, and logo
- 🏫 **Faculties** — List all faculties within a selected university
- 📚 **Departments** — View departments and their deans within a faculty
- 📖 **Courses** — List available courses for a selected department
- 📝 **Course Details** — Course code, lecturer, schedule, and textbook information
- 💬 **Messaging** — Real-time messaging system between users

### Navigation Structure

```
Login / Register
└── Dashboard (Bottom Tab Bar)
    ├── Universities
    │   └── Faculties
    │       └── Departments
    │           └── Courses
    │               └── Course Detail
    └── Messages
        └── Conversation Screen
```

### Tech Stack

| Technology | Version |
|---|---|
| React Native | 0.76.7 |
| Expo | ~52.0.33 |
| Expo Router | ~4.0.17 |
| TypeScript | ^5.3.3 |
| Axios | ^1.7.9 |
| React Native Paper | ^5.14.0 |

### Getting Started

**Prerequisites:** Node.js, npm or yarn, Expo Go app (for physical device testing)

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

> **Note:** The app requires a backend API server running at `http://localhost:80/api`.

### API Endpoints

| Endpoint | Description |
|---|---|
| `POST /login` | User login |
| `POST /register` | New user registration |
| `GET /universities` | List all universities |
| `GET /universities/:id` | University details |
| `GET /universities/:id/faculties` | Faculties of a university |
| `GET /departments/uni/:id` | Departments of a university |
| `GET /messages/:user_id` | User's message list |
| `POST /messages/details` | Messages between two users |
| `POST /messages/send` | Send a message |

### Project Structure

```
UnivercityMobile/
├── src/
│   ├── api/
│   │   └── rest.ts              # API request class (Axios)
│   ├── app/
│   │   ├── _layout.tsx          # Root navigation layout
│   │   ├── index.tsx            # Entry redirect page
│   │   ├── auth/
│   │   │   ├── login.tsx        # Login screen
│   │   │   └── register.tsx     # Registration screen
│   │   └── dashboard/
│   │       ├── _layout.tsx      # Bottom tab bar layout
│   │       ├── index.tsx        # University list screen
│   │       ├── information/     # Info screens (faculty, department, course)
│   │       └── message/         # Messaging screens
│   ├── components/
│   │   ├── Button.tsx           # Shared button component
│   │   ├── Input.tsx            # Shared input component
│   │   └── TouchableOpacity.tsx # Themed touchable component
│   └── types/
│       └── apiTypes.ts          # TypeScript type definitions
├── assets/                      # Images, icons, fonts
├── app.json                     # Expo app configuration
└── package.json
```

### License

This project is private. All rights reserved.
