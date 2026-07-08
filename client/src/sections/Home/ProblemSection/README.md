# Panduan Kode ProblemSection (Framer Motion Scrollytelling)

Dokumen ini adalah panduan teknis yang menjelaskan alur kerja (*flow*) dan fungsi spesifik dari blok-blok kode utama yang menyusun fitur *scrollytelling* di `ProblemSection`.

---

## 1. `index.tsx` (File Utama & Kontainer Scroll)
File ini bertugas menyediakan kanvas panjang dan melacak sejauh mana *user* sudah menggulir halaman.

```tsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"],
});
```
- **Fungsi**: Hook `useScroll` dari Framer Motion digunakan untuk mendeteksi persentase scroll dari elemen `containerRef` (0 berarti paling atas, 1 berarti paling bawah). Nilai `scrollYProgress` inilah yang nantinya dioper/di-*passing* ke semua komponen anak (`Fish`, `OverlayCards`, `Scenes`) agar semua animasi tersinkronisasi.

```tsx
const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.3333%"]);
```
- **Fungsi**: Hook `useTransform` memetakan nilai input ke nilai output. Saat *scroll* dari `0` ke `1`, nilai `x` akan berubah dari `0%` ke `-83.3333%`.
- **Alur**: Angka `83.33%` didapat dari `5/6`. Karena kita punya 6 scene (600vw), untuk melihat scene terakhir, kita perlu menggeser kontainer ke kiri sebesar `500vw`. Translasi horisontal ini yang memberikan efek kamera "bergerak maju" menelusuri lautan padahal *user* sekadar men-scroll ke bawah.

```tsx
<section ref={containerRef} className="relative h-[300vh] bg-slate-900">
  <div className="sticky top-0 h-screen w-full overflow-hidden">
     {/* Isi animasi */}
  </div>
</section>
```
- **Fungsi**: 
  - `h-[300vh]`: Memaksa tinggi area scroll menjadi 3x tinggi layar agar perjalanan ceritanya cukup panjang dan tenang.
  - `sticky top-0 h-screen`: Saat bagian atas `section` menyentuh bagian atas browser, layarnya "terkunci" dan tidak ikut terguling ke atas, melainkan konten di dalamnya (animasi) yang bermain sampai `300vh` terlampaui.

---

## 2. `Fish.tsx` (Pergerakan Karakter Utama)
Membaca `scrollYProgress` dan mengubahnya menjadi animasi berenang ikan.

```tsx
const x = useTransform(
  scrollYProgress,
  [0, 0.1, 0.3, 0.5, 0.7, 0.85, 1],
  ["-20vw", "10vw", "30vw", "40vw", "50vw", "60vw", "50vw"]
);
```
- **Fungsi `x`**: Mendorong posisi horizontal ikan. Di awal (0), ikan berada di `-20vw` (luar layar kiri), lalu perlahan bergeser ke tengah layar (`50vw` sampai `60vw`), seolah ikan mendahului layar yang ikut bergerak. 

```tsx
const y = useTransform(
  scrollYProgress,
  [0, 0.1, 0.3, 0.5, 0.7, 0.85, 1],
  ["0vh", "5vh", "-5vh", "8vh", "-2vh", "4vh", "0vh"]
);
```
- **Fungsi `y`**: Membuat ikan *bobbing* atau naik-turun. Saat berada di titik *scroll* tertentu (misal 0.3), ikan naik ke `-5vh`, lalu di 0.5 turun ke `8vh`. Ini meniru pola renang makhluk hidup.

```tsx
const rotate = useTransform(scrollYProgress, [...], [0, 5, -5, 8, -2, 5, 180, 0]);
```
- **Fungsi `rotate`**: Digabungkan dengan gerakan `y`, memutar (*rotate*) moncong ikan sedikit ke atas atau ke bawah. Di akhir cerita, ikan melakukan manuver cepat balik badan (180).

---

## 3. `OverlayCards.tsx` (Logika Muncul/Hilang Teks)
File ini merender kotak *glassmorphism* di depan scene. Agar tiap teks masalah tidak bertumpuk, opacity dan posisi tiap kotak diatur spesifik pada titik *scroll* tertentu.

```tsx
const card2Opacity = useTransform(scrollYProgress, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
const card2Y = useTransform(scrollYProgress, [0.15, 0.2, 0.3, 0.35], [50, 0, 0, -50]);
```
- **Alur & Fungsi**: 
  - `[0.15, 0.2]`: Rentang muncul. Saat *scroll* mencapai `15%`, kartu akan perlahan transparan (`0`) dan perlahan jelas (`1`) saat mencapai `20%`. Di rentang yang sama, posisinya bergeser dari `50px` bawah ke `0px` (*slide up*).
  - `[0.2, 0.3]`: Rentang bertahan. Kartu diam di posisi (opacity `1`, Y `0`).
  - `[0.3, 0.35]`: Rentang hilang. Saat *scroll* memasuki `30%`, kartu akan naik sejauh `-50px` dan memudar hingga hilang sepenuhnya di `35%`.
- Logika ini diulang untuk *Card* ke-3, ke-4, dan ke-5 dengan titik rentang (misalnya `0.35-0.55`, `0.55-0.75`) agar muncul secara bergantian.

---

## 4. `Scene5Processing.tsx` (Manipulasi Bagian Scene)
Setiap Scene di dalam folder `Scenes` menempati `w-screen h-screen` dan memanipulasi elemennya sendiri, contohnya `Scene 5`.

```tsx
const wasteOpacity = useTransform(scrollYProgress, [0.72, 0.78], [1, 0]);
const filletOpacity = useTransform(scrollYProgress, [0.72, 0.82], [1, 0.3]);
```
- **Fungsi**: Di scene ini kita ingin menunjukkan bahwa sebagian dari ikan terbuang (limbah) dan hanya fillet yang dipertahankan. 
- Nilai `wasteOpacity` akan turun menjadi `0` lebih cepat, sehingga label "Kepala/Tulang/Kulit" akan hilang lebih dulu di titik *scroll* `0.78`. Sedangkan `filletOpacity` hanya redup menjadi `0.3` dan bertahan lebih lama.

```tsx
initial={{ x: 0, y: 0 }}
animate={{ x, y }} // Nilai dikalkulasi dari radius & angle
transition={{ duration: 1, delay: 0.5 }}
```
- **Fungsi**: Saat komponen Scene 5 ini mulai terender, bagian-bagian ikan ini "meledak" perlahan dari tengah (*x=0, y=0*) menyebar ke posisi radialnya selama 1 detik (berkat *props* `animate` & `transition` bawaan *Framer Motion*).

---

## 5. `Scene6Hub.tsx` (Animasi Klimaks di Akhir Cerita)
Di sini SirkuLaut menghubungkan semua *node* yang sebelumnya tercerai-berai.

```tsx
const glowScale = useTransform(scrollYProgress, [0.85, 0.95], [0.5, 2]);
```
- **Fungsi**: Saat mencapai `85%`, ada sebuah *div* berbentuk lingkaran *blur* biru (`bg-blue-500/20 blur-[100px]`) di tengah layar yang ukurannya membesar dari `0.5` menjadi `2` kali lipat, menciptakan efek cahaya biru dramatis yang memenuhi layar belakang.

```tsx
<line x1="250" y1="250" x2="500" y2="250" stroke="url(#line-glow)" strokeDasharray="4 4" className="animate-pulse" />
```
- **Fungsi**: Setiap *node* (Nelayan, Restoran, dll.) yang diputar secara melingkar memiliki elemen `<line>` SVG ini yang mengarah ke pusat layar. Penambahan kelas CSS biasa `animate-pulse` digunakan di sini untuk membuat efek *networking* (data mengalir berkedip) ke arah pusat platform.

---
Dengan struktur yang terdesentralisasi seperti ini, **Framer Motion** mempermudah Anda jika ingin mengganti waktu kemunculan animasi; Anda cukup mengubah angka-angka desimal `[0.1, 0.2, ...]` di hook `useTransform` masing-masing komponen.
