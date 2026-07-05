Saya ingin melakukan refactor project menjadi full-stack architecture yang scalable. Saat ini project saya adalah React + Vite + TypeScript dan seluruh UI frontend sudah selesai.

JANGAN mengubah desain UI, styling, animasi, layout, maupun behavior frontend yang sudah ada.

Fokus hanya pada reorganisasi struktur project agar siap untuk pengembangan backend di masa depan.

Tujuan

Pisahkan project menjadi dua bagian utama:

client → Frontend React + Vite
server → Backend API

Frontend harus tetap berjalan seperti sebelumnya setelah proses refactor.

Struktur project yang diinginkan
project-root/
│
├── client/
│   ├── public/
│   ├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── videos/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Marketplace.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Education.tsx
│   │   └── Contact.tsx
│   │
│   ├── sections/
│   │   ├── Home/
│   │   ├── Marketplace/
│   │   ├── Dashboard/
│   │   ├── Education/
│   │   └── Contact/
│   │
│   ├── layouts/
│   ├── routes/
│   ├── hooks/
│   ├── contexts/
│   ├── services/
│   ├── api/
│   ├── types/
│   ├── utils/
│   ├── styles/
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── server/
│   ├── src/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── repositories/
│   ├── utils/
│   ├── types/
│   ├── app.ts
│   └── server.ts
│
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── shared/
│   ├── types/
│   └── constants/
│
├── .gitignore
├── README.md
└── package.json
Frontend Rules
Pindahkan seluruh React project ke folder client.
Pertahankan seluruh UI.
Jangan mengubah desain.
Jangan mengubah Tailwind class.
Jangan mengubah animasi.
Jangan mengubah logic React.
Update seluruh import path yang berubah.
Pastikan project tetap bisa dijalankan.
Backend Rules

Siapkan struktur backend menggunakan:

Node.js
Express.js
TypeScript

Belum perlu membuat business logic.

Cukup siapkan struktur folder beserta file kosong yang nantinya akan digunakan.

Contoh:

controllers/
routes/
services/
models/
middleware/
config/
repositories/
utils/
types/

Tambahkan juga:

app.ts
server.ts
package.json
tsconfig.json
.env.example

Belum perlu membuat endpoint API.

Shared Folder

Buat folder shared yang nantinya digunakan bersama frontend dan backend.

Misalnya:

shared/
    types/
    constants/

Folder ini akan digunakan untuk:

interface TypeScript
enum
constants
shared validation
API Layer

Pada frontend, buat folder:

api/

yang nantinya akan berisi komunikasi ke backend.

Contoh:

authApi.ts
productApi.ts
marketApi.ts
educationApi.ts

Belum perlu mengimplementasikan request.

Services Layer

Pada frontend, buat folder:

services/

untuk business logic frontend.

Contoh:

authService.ts
storageService.ts
Future Features

Struktur ini harus siap untuk mendukung:

Authentication
User Management
Marketplace
Product CRUD
Fisher Dashboard
Buyer Dashboard
AI Recommendation
Education Module
Chat
Notifications
Order History
Analytics

tanpa perlu mengubah struktur folder lagi.

Refactor Requirements
Jangan menghapus komponen.
Jangan mengubah nama komponen kecuali diperlukan.
Perbaiki seluruh import path.
Pastikan project tetap dapat di-build tanpa error.
Jangan menambahkan library baru kecuali memang diperlukan untuk struktur backend.
Jangan membuat implementasi backend, cukup siapkan arsitekturnya.