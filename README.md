# Cấu trúc dự án

## Backend (back_end)
- index.js: Khởi động server Express, cấu hình route  
- firebase.js, serviceAccountKey.json: Kết nối Firebase  
- .env: Biến môi trường  
- routes/student.js: Quản lý học sinh (CRUD)  
- routes/emailOTP.js: Xác thực OTP qua email, gửi mail, đặt lại mật khẩu  
- routes/otp.js: Xác thực OTP khác  
- package.json, package-lock.json: Quản lý thư viện  

## Frontend (front_end)
- public/: File tĩnh (index.html, favicon, ...)  
- src/App.js, src/index.js: Khởi tạo ứng dụng React  
- src/services/api.js: Giao tiếp backend qua axios  
- src/component/: Các component dùng chung (setupaccount.js, studentform.js, ...)  
- src/Page/login_form/: Trang đăng nhập  
- src/Page/manage_teacher/: Quản lý giáo viên  
- src/Page/verivyOTP/verifyotp.jsx: Xác thực OTP qua email  
- src/Router/index.jsx: Quản lý định tuyến React  
- src/App.css, src/index.css: File style  
- package.json, package-lock.json: Quản lý phụ thuộc frontend  

## Root
- README.md: Thông tin dự án  
- package.json, package-lock.json: Quản lý phụ thuộc chung
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

![Trang đăng nhập bằng số điện thoại](./front_end/src/images/Login_numberphone.png)
