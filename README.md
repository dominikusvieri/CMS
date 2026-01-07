# CMS Portfolio Project

## 📌 Overview

Project ini adalah **CMS (Content Management System)** sederhana yang dibuat menggunakan **React + TypeScript** sebagai bagian dari portofolio. Aplikasi mendukung autentikasi, manajemen post (CRUD), filtering, pagination, dan protected routing.

Mock API menggunakan **MSW (Mock Service Worker)** sehingga tidak membutuhkan backend nyata namun tetap mendukung alur CRUD seperti aplikasi real.

---

## 🔐 Demo Login

Gunakan akun berikut untuk login:

```
Email    : admin@mail.com
Password : 123456
```

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



## 👨‍💻 Author

Dominikus Vieri Tegar Linestyo

Frontend Developer

