# Setup EmailJS nhanh với thông tin của bạn

## Thông tin đã có:
- **Email gửi:** vthuanng.it@gmail.com
- **App Password:** mcid ioqz svev uhgu (bỏ khoảng = `mcidioqzsvevuhgu`)
- **Email nhận:** Nxuanhoang55@gmail.com

## Các bước setup:

### Bước 1: Đăng ký EmailJS
1. Truy cập: https://www.emailjs.com/
2. Đăng ký tài khoản miễn phí
3. Xác nhận email

### Bước 2: Thêm Gmail Service

**Cách 1: Dùng SMTP (Khuyến nghị - Đơn giản hơn)**

1. Vào **Email Services** → **Add New Service**
2. Chọn **Gmail** → Chọn tab **SMTP** (không dùng OAuth)
3. Điền:
   - **Service Name:** Gmail SMTP
   - **Gmail Address:** `vthuanng.it@gmail.com`
   - **Gmail Password:** `mcidioqzsvevuhgu` (App Password, bỏ khoảng)
4. Click **Create Service**
5. **Copy Service ID** (ví dụ: `service_xxxxx`)

**Cách 2: Dùng OAuth (Nếu cách 1 không được)**

1. Nếu đang có lỗi "412 insufficient authentication scopes":
   - Click **Disconnect** để ngắt kết nối hiện tại
   - Click **Connect** lại
   - Khi Google hỏi quyền, chọn **"Allow"** cho tất cả quyền (đặc biệt là "Send email on your behalf")
   - Đảm bảo checkbox "Send test email to verify configuration" được bỏ chọn trước khi Create
2. Sau khi kết nối thành công, **Copy Service ID**

### Bước 3: Tạo Email Template
1. Vào **Email Templates** → **Create New Template**
2. Đặt tên: "Form Đăng Ký"
3. Cấu hình:

**To Email:** `{{to_email}}`

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
5. **Copy Template ID** (ví dụ: `template_xxxxx`)

### Bước 4: Lấy Public Key
1. Vào **Account** → **General**
2. Copy **Public Key**

### Bước 5: Cập nhật code
Mở file `src/App.jsx` trong cả 2 dự án:
- `cccd-landing/src/App.jsx`
- `khacdau-landing/src/App.jsx`

Tìm và thay thế:

```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',     // ← Thay bằng Service ID từ bước 2
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',   // ← Thay bằng Template ID từ bước 3
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY'      // ← Thay bằng Public Key từ bước 4
};
```

Ví dụ:
```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_abc123',
  TEMPLATE_ID: 'template_xyz789',
  PUBLIC_KEY: 'abcdefghijklmnop'
};
```

### Bước 6: Test
1. Chạy website: `npm run dev`
2. Điền form và submit
3. Kiểm tra email **Nxuanhoang55@gmail.com**

## Kết quả:
- Email gửi từ: **vthuanng.it@gmail.com**
- Email nhận tại: **Nxuanhoang55@gmail.com**
- Tự động gửi khi người dùng submit form

