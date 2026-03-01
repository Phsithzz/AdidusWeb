# SeriousP

โปรเจกต์นี้เป็นเว็บแอปแบบ Fullstack (Node.js + Express backend และ React + Vite frontend) สำหรับตัวอย่างการจัดการสินค้า ตะกร้า คำสั่งซื้อ และผู้ใช้

**โครงสร้างโปรเจกต์ (สำคัญ)**
- backend/: โค้ดเซิร์ฟเวอร์ (API)
- frontend/: โค้ด React (UI)

**คุณสมบัติหลัก**
- จัดการสินค้า (รวม variant / รูปภาพ)
- ตะกร้าสินค้าและการสั่งซื้อ
- ระบบผู้ใช้ (register / login)
- เอกสาร API แบบ Swagger (ไฟล์: backend/Services/swagger.yaml)

**Prerequisites**
- Node.js (แนะนำ v18+)
- PostgreSQL (หรือ DB ที่ตั้งค่าไว้ใน `backend/Config/database.js`)

**ตั้งค่าและรัน (Backend)**
1. เข้าโฟลเดอร์ backend:

```bash
cd backend
```

2. ติดตั้ง dependencies:

```bash
npm install
```

3. สร้างไฟล์ `.env` ในโฟลเดอร์ `backend` และตั้งค่าตัวแปรที่จำเป็น เช่น:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
```

(ตรวจสอบ `backend/Config/database.js` เพื่อดูตัวแปรและรูปแบบที่โค้ดคาดหวัง)

4. รันเซิร์ฟเวอร์ (development):

```bash
npm run dev
```

สคริปต์ใน `backend/package.json`:
- `start` / `dev` — ใช้ `nodemon server.js` (จะรีสตาร์ทอัตโนมัติเมื่อไฟล์เปลี่ยน)

**ตั้งค่าและรัน (Frontend)**
1. เข้าโฟลเดอร์ frontend:

```bash
cd frontend
```

2. ติดตั้ง dependencies:

```bash
npm install
```

3. รันโหมดพัฒนา (Vite):

```bash
npm run dev
```

สคริปต์ใน `frontend/package.json`:
- `dev` — รัน Vite dev server
- `build` — สร้าง production bundle
- `preview` — พรีวิว build

**เชื่อมต่อระหว่าง Frontend และ Backend**
- ค่า API base URL ใน frontend ถูกตั้งในโค้ดส่วน `src/function` (ค้นหา `axios` การตั้งค่า) — ปรับเป็น `http://localhost:5000` หรือพอร์ตที่ backend ใช้งาน

**ไฟล์สำคัญที่ควรรู้**
- [backend/server.js](backend/server.js)
- [backend/Config/database.js](backend/Config/database.js)
- [backend/Controllers](backend/Controllers) — จัดการ logic ของแต่ละ route
- [frontend/src/main.jsx](frontend/src/main.jsx)
- [frontend/src/App.jsx](frontend/src/App.jsx)

**การใช้งาน API / Swagger**
- ถ้าเซิร์ฟเวอร์รันอยู่ ให้เปิด Swagger UI (ถ้ามีการตั้งค่า) ตามเส้นทางที่กำหนดใน `server.js` หรือดูไฟล์ `backend/Services/swagger.yaml` สำหรับสเปค

**คำแนะนำเพิ่มเติม**
- เพิ่มไฟล์ `.env.example` ใน `backend` เพื่อระบุตัวแปรสภาพแวดล้อมที่จำเป็น
- เพิ่มคำอธิบายการตั้งค่า DB และการรัน migrations (ถ้ามี)

**การพัฒนา/ทดสอบ**
- เปลี่ยนค่า `JWT_SECRET` และข้อมูลฐานข้อมูลก่อนใช้งานจริง
- ใช้ `nodemon` เพื่อรีโหลดอัตโนมัติในระหว่างพัฒนา (มีใน devDependencies ของ backend)

**การมีส่วนร่วม**
- สร้าง branch ใหม่สำหรับฟีเจอร์/บั๊ก: `git checkout -b feat/your-feature`
- เปิด PR พร้อมคำอธิบายและวิธีทดสอบ

**ไลเซนส์**
- ระบุไลเซนส์ตามต้องการ (เช่น MIT)

---

ถ้าต้องการให้ผมเพิ่มรายละเอียดเฉพาะ เช่นตัวแปร `.env` ทั้งหมด, ตัวอย่างคำสั่ง SQL สำหรับสร้างตาราง, หรือแปล README เป็นภาษาอังกฤษ แจ้งได้เลยครับ!