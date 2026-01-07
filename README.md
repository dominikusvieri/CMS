# CMS Portfolio Project

## 📌 Overview

Project ini adalah **CMS (Content Management System)** sederhana yang dibuat menggunakan **React + TypeScript** sebagai bagian dari portofolio. Aplikasi mendukung autentikasi, manajemen post (CRUD), filtering, pagination, dan protected routing.

Mock API menggunakan **MSW (Mock Service Worker)** sehingga tidak membutuhkan backend nyata namun tetap mendukung alur CRUD seperti aplikasi real.

---

## 🔐 Demo Login

Gunakan akun berikut untuk login:

```
Email    : admin@mail.com
Password : admin123
```

> Data user dimock menggunakan MSW dan disimpan di memory browser.

---

## 🧭 Alur Kerja Aplikasi

### 1️⃣ Login

* User mengisi email & password
* Data dikirim ke `authService.login`
* MSW memvalidasi user
* Token + user disimpan di **Zustand Store**
* Redirect ke **Dashboard**

### 2️⃣ Protected Route

* Semua halaman setelah login dibungkus `ProtectedLayout`
* Jika token tidak ada / expired → redirect ke `/login`

### 3️⃣ Dashboard

* Menampilkan email user yang sedang login
* Menu navigasi ke halaman Post
* Logout melalui icon user

### 4️⃣ Post Management (CMS)

Fitur pada halaman Post:

* ✅ List post
* ✅ Pagination
* ✅ Search (server-side mock)
* ✅ Filter language & status
* ✅ Reset filter
* ✅ Create post
* ✅ Edit post
* ✅ Delete post
* ✅ Detail post

Semua operasi CRUD dilakukan via **postService → postApi → MSW handler**.

---

## 🧱 Tech Stack

### Frontend

* **React 18**
* **TypeScript**
* **Vite**
* **Ant Design** (UI Component)
* **React Router v6**
* **Zustand** (State Management)

### Mock Backend

* **MSW (Mock Service Worker)**

  * Auth handler
  * Post CRUD handler

---

## 🧩 Komponen & Struktur Utama

```
src/
├─ layouts/
│  ├─ RootLayout.tsx
│  ├─ ProtectedLayout.tsx
│  └─ DashboardLayout.tsx
│
├─ pages/
│  ├─ Login.tsx
│  ├─ Dashboard.tsx
│  ├─ Post.tsx
│  ├─ PostCreate.tsx
│  ├─ PostEdit.tsx
│  └─ PostDetail.tsx
│
├─ services/
│  ├─ auth.api.ts
│  ├─ auth.service.ts
│  ├─ post.api.ts
│  └─ post.service.ts
│
├─ store/
│  └─ auth.store.ts
│
├─ mocks/
│  ├─ handlers/
│  │  ├─ auth.handler.ts
│  │  └─ post.handler.ts
│  └─ browser.ts
│
├─ types/
│  ├─ auth.ts
│  └─ post.ts
│
└─ router/
   └─ index.tsx
```

---

## 🔄 Authentication Flow

```
Login Form
   ↓
authService.login
   ↓
authApi.login
   ↓
MSW auth handler
   ↓
Zustand Store
   ↓
ProtectedLayout
```

Token memiliki expiration dan akan otomatis logout jika expired.

---

## 🚀 Menjalankan Project

```bash
npm install
npm run dev
```

MSW akan otomatis aktif di mode development.

---

## 📎 Catatan

* Project ini **tidak menggunakan backend real**
* Seluruh data hanya hidup di memory browser
* Cocok untuk demo, testing, dan portofolio frontend

---

## 👨‍💻 Author

Dominikus Vieri Tegar Linestyo

Frontend Developer

---

Jika ingin versi dengan backend real (NestJS / Express) atau deployment, silakan hubungi 👋
