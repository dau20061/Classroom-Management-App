📂 back_end/                  → Backend (Node.js/Express, Firebase)
│── 📄 index.js               → File khởi động server Express, cấu hình route
│── 📄 firebase.js            → Kết nối Firebase
│── 📄 serviceAccountKey.json → Khóa dịch vụ Firebase
│── 📄 .env                   → Biến môi trường (email, mật khẩu, ...)
│── 📂 routes/                → Các route API
│   │── 📄 student.js         → Quản lý học sinh (CRUD)
│   │── 📄 emailOTP.js        → Xác thực OTP qua email, gửi mail, đặt lại mật khẩu
│   │── 📄 otp.js             → Xác thực OTP khác (nếu cần)
│── 📄 package.json
│── 📄 package-lock.json

📂 front_end/                 → Frontend (ReactJS)
│── 📂 public/                → File tĩnh (index.html, favicon, ...)
│── 📂 src/                   → Mã nguồn React
│   │── 📄 App.js             → Khởi tạo ứng dụng React
│   │── 📄 index.js           → Điểm vào ứng dụng
│   │── 📂 services/
│   │   │── 📄 api.js         → Giao tiếp backend qua axios
│   │── 📂 component/         → Các component dùng chung
│   │   │── 📄 setupaccount.js
│   │   │── 📄 studentform.js
│   │── 📂 Page/              → Các trang chức năng
│   │   │── 📂 login_form/    → Trang đăng nhập
│   │   │── 📂 manage_teacher/→ Quản lý giáo viên
│   │   │── 📂 verivyOTP/     → Xác thực OTP qua email
│   │   │    │── 📄 verifyotp.jsx
│   │── 📂 Router/
│   │   │── 📄 index.jsx      → Quản lý định tuyến React
│   │── 📄 App.css
│   │── 📄 index.css
│── 📄 package.json
│── 📄 package-lock.json

📄 README.md                  → Thông tin dự án
📄 package.json               
📄 package-lock.json


````markdown
## 🚀 Hướng dẫn chạy dự án

Để chạy dự án này, làm theo các bước dưới đây:

---

### 1️⃣ Backend

**1.1. Di chuyển vào thư mục backend:**
```bash
cd back_end
````

**1.2. Cài đặt các package cần thiết:**

```bash
npm install
```

**1.3. Cấu hình biến môi trường**
Tạo file `.env` nếu chưa có và điền các biến môi trường cần thiết, ví dụ:

```env
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
# Thêm các biến khác nếu có
```

**1.4. Chạy server backend:**

```bash
npm run dev
```

> ⚡ Backend mặc định chạy ở: `http://localhost:5000`

---

### 2️⃣ Frontend

**2.1. Di chuyển vào thư mục frontend:**

```bash
cd front_end
```

**2.2. Cài đặt các package cần thiết:**

```bash
npm install
```

**2.3. Chạy ứng dụng React:**

```bash
npm start
```

> ⚡ Frontend mặc định chạy ở: `http://localhost:3000`

---

### 3️⃣ Truy cập ứng dụng

* 🌐 **Frontend:** [http://localhost:3000](http://localhost:3000)
* 🔗 **Backend API:** [http://localhost:5000](http://localhost:5000)

---

### 💡 Lưu ý

* Đảm bảo backend đang chạy trước khi mở frontend để các API hoạt động bình thường.
* Kiểm tra `.env` có đúng thông tin email và các biến môi trường khác để chức năng OTP/email hoạt động.
* Có thể thay đổi port nếu cần bằng cách chỉnh file `index.js` hoặc `.env`.

```

---

Nếu bạn muốn, mình có thể làm **phiên bản README hoàn chỉnh**: bao gồm **cấu trúc thư mục + hướng dẫn cài đặt + truy cập ứng dụng**, tất cả **gọn, đẹp và chuyên nghiệp**, dùng luôn icon để nhìn trực quan trên GitHub.  

Bạn có muốn mình làm luôn không?
```

