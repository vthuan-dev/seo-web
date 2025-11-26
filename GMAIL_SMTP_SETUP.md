# Hướng dẫn Setup Gmail SMTP với EmailJS

## Cách setup Gmail SMTP với App Password (Đơn giản)

### Bước 1: Tạo Gmail App Password

1. Truy cập: https://myaccount.google.com/
2. Vào **Security** (Bảo mật)
3. Bật **2-Step Verification** (Xác minh 2 bước) nếu chưa bật
4. Vào **App passwords** (Mật khẩu ứng dụng)
5. Chọn app: **Mail**
6. Chọn device: **Other (Custom name)** → Nhập "EmailJS"
7. Click **Generate**
8. **Copy App Password** (16 ký tự, dạng: `xxxx xxxx xxxx xxxx`)

### Bước 2: Đăng ký EmailJS

1. Truy cập: https://www.emailjs.com/
2. Đăng ký tài khoản miễn phí (200 email/tháng)
3. Xác nhận email

### Bước 3: Thêm Gmail Service vào EmailJS

1. Vào **Email Services** → **Add New Service**
2. Chọn **Gmail**
3. Điền thông tin:
   - **Service Name:** Gmail SMTP (hoặc tên bất kỳ)
   - **Gmail Address:** `YOUR_SENDER_EMAIL@gmail.com` (Email này dùng để GỬI email đi - thay bằng email bạn muốn dùng)
   - **Gmail Password:** Dán App Password của email gửi (16 ký tự, bỏ khoảng trắng)
4. Click **Create Service**
5. **Lưu lại Service ID** (ví dụ: `service_xxxxx`)

**Lưu ý:** 
- Email trong Service này là email GỬI (cần App Password của email này)
- Email NHẬN form là `Nxuanhoang55@gmail.com` (đã được cấu hình trong code)
- Có thể dùng email khác để gửi (không nhất thiết phải là Nxuanhoang55@gmail.com)

### Bước 4: Tạo Email Template

1. Vào **Email Templates** → **Create New Template**
2. Đặt tên: "Form Đăng Ký"
3. Cấu hình:

**To Email:** `{{to_email}}` (Sẽ là Nxuanhoang55@gmail.com - email nhận form)

**From Name:** `{{from_name}}`

**Subject:** `Đăng ký tư vấn từ {{site_name}}`

**Content:**
```
Thông tin đăng ký tư vấn:

Họ tên: {{from_name}}
Số điện thoại: {{phone}}
Zalo: {{zalo}}
Website: {{site_name}}
Thời gian: {{date}}

---
{{message}}
```

4. Click **Save**
5. **Lưu lại Template ID** (ví dụ: `template_xxxxx`)

### Bước 5: Lấy Public Key

1. Vào **Account** → **General**
2. Copy **Public Key** (ví dụ: `xxxxxxxxxxxxx`)

### Bước 6: Cập nhật code

Mở file `src/App.jsx` trong cả 2 dự án:
- `cccd-landing/src/App.jsx`
- `khacdau-landing/src/App.jsx`

Tìm và thay thế:

```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',     // ← Thay bằng Service ID từ bước 3
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',   // ← Thay bằng Template ID từ bước 4
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY'      // ← Thay bằng Public Key từ bước 5
};

const SENDER_EMAIL = 'YOUR_SENDER_EMAIL@gmail.com'; // ← Thay bằng email bạn dùng để gửi (email trong Service)
```

Ví dụ:
```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_abc123',
  TEMPLATE_ID: 'template_xyz789',
  PUBLIC_KEY: 'abcdefghijklmnop'
};

const SENDER_EMAIL = 'sender@gmail.com'; // Email dùng để gửi
```

### Bước 7: Test

1. Chạy website: `npm run dev`
2. Điền form và submit
3. Kiểm tra email **Nxuanhoang55@gmail.com**

## Lưu ý

- **Miễn phí:** 200 email/tháng với EmailJS
- **App Password:** Chỉ cần tạo 1 lần, dùng mãi mãi
- **Bảo mật:** App Password an toàn, có thể public trong code
- **Fallback:** Nếu chưa config, form vẫn hoạt động với mailto link

## Troubleshooting

- **Lỗi "Invalid credentials":** Kiểm tra lại App Password (16 ký tự, không có khoảng)
- **Email không đến:** Kiểm tra spam folder
- **Template variables:** Đảm bảo tên biến trong template khớp với code

