# 🧾 Well POS - Web Tabanlı Satış ve Stok Yönetim Sistemi

Well POS, küçük ve orta ölçekli işletmelerin ürün satışı, stok takibi, fatura/fiş oluşturma ve yazdırma gibi işlemlerini kolayca gerçekleştirmesine olanak sağlayan modern bir satış noktası (POS) uygulamasıdır.

## 🚀 Canlı Demo

🔗 [https://pos-project-4781.onrender.com](https://pos-project-4781.onrender.com)  
🧑‍💼 Test Kullanıcısı:

- E-posta: **şaban@test.com**
- Şifre: **12345**

---

## 📷 Ekran Görüntüleri

> _Ürün listeleme, fatura yazdırma, sepet yönetimi gibi ekran görüntüleri buraya eklenebilir._

---

## 🔧 Teknolojiler

### 🌐 Frontend

- React.js
- Ant Design
- React Router
- Redux Toolkit

### 🖥️ Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- Bcrypt

### 🛠️ Diğer

- Render (Deployment)
- dotenv
- CORS
- Helmet

---

## 📦 Özellikler

✅ Kullanıcı girişi / üyelik sistemi  
✅ Ürün ekleme, silme, güncelleme  
✅ Kategori yönetimi  
✅ Sepet yönetimi (localStorage destekli)  
✅ Fatura oluşturma ve yazdırma  
✅ Günlük satış takibi  
✅ Toplam gelir ve vergi hesaplama  
✅ Duyarlı (responsive) tasarım  
✅ Admin paneli üzerinden tam yetki yönetimi

---

## ⚙️ Kurulum

### 1. Repoyu klonlayın

```bash
git clone https://github.com/AdemHos/pos-project.git
cd pos-project
```

### 2. Sunucu tarafı için

```bash
cd server
npm install
npm run start
```

- `.env` dosyası oluşturun:

```
PORT=5000
MONGO_URL=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

### 3. İstemci (Client) tarafı için

```bash
cd client
npm install
npm start
```

- `.env` dosyası oluşturun:

```
VITE_APP_API_URL=https://pos-project-backend-xxxx.onrender.com
```

---

## 🌐 Deployment

- **Frontend**: Render (Static Site olarak)
- **Backend**: Render (Web Service olarak)

> Render üzerinde her iki uygulama için ayrı servisler tanımlanmış ve istemci `.env` dosyasında backend URL’si ayarlanmıştır.

---

## 📁 Proje Yapısı

```
/client        → React frontend
/server        → Express backend
```

---

## 📌 Gelecek Planlar

- [ ] Excel & PDF export özellikleri
- [ ] Grafiksel satış raporları
- [ ] Ürünlerin QR/barcode ile okutulması
- [ ] React Native mobil uygulama (stok tarama + senkronizasyon)
- [ ] CRM entegrasyonu (uzun vadeli)

---

## 🧑‍💻 Geliştirici

**Adem Hoş**  
GitHub: [@githubAdemHos](https://github.com/AdemHos)

---

## 📄 Lisans

Bu proje MIT lisansı ile lisanslanmıştır.
