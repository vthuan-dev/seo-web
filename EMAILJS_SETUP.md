# Hướng dẫn Setup EmailJS để tự động gửi email

## Bước 1: Đăng ký tài khoản EmailJS (Miễn phí)

1. Truy cập: https://www.emailjs.com/
2. Đăng ký tài khoản miễn phí (200 email/tháng)
3. Xác nhận email

## Bước 2: Thêm Email Service

1. Vào **Email Services** → **Add New Service**
2. Chọn **Gmail** (hoặc email service khác)
3. Kết nối với Gmail của bạn (Nxuanhoang55@gmail.com)
4. Lưu lại **Service ID** (ví dụ: `service_xxxxx`)

## Bước 3: Tạo Email Template

1. Vào **Email Templates** → **Create New Template**
2. Đặt tên template: "Form Đăng Ký Tư Vấn"
3. Cấu hình template như sau:

**To Email:** `{{to_email}}`

**Subject:** `Đăng ký tư vấn từ {{site_name}}`

**Body:**
```
Thông tin đăng ký tư vấn:

Họ tên: {{from_name}}
Số điện thoại: {{phone}}
Zalo: {{zalo}}
Website: {{site_name}}
Thời gian: {{date}}

---
Email này được gửi tự động từ form đăng ký trên website.
```

4. Lưu lại **Template ID** (ví dụ: `template_xxxxx`)

## Bước 4: Lấy Public Key

1. Vào **Account** → **General**
2. Copy **Public Key** (ví dụ: `xxxxxxxxxxxxx`)

## Bước 5: Cập nhật code

Mở file `src/App.jsx` trong cả 2 dự án (cccd-landing và khacdau-landing), tìm dòng:

```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY'
};
```

Thay thế bằng các giá trị thực tế:

```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_xxxxx',      // Service ID từ bước 2
  TEMPLATE_ID: 'template_xxxxx',    // Template ID từ bước 3
  PUBLIC_KEY: 'xxxxxxxxxxxxx'       // Public Key từ bước 4
};
```

## Bước 6: Test

1. Chạy website: `npm run dev`
2. Điền form và submit
3. Kiểm tra email Nxuanhoang55@gmail.com

## Lưu ý

- **Miễn phí:** 200 email/tháng
- **Không cần backend:** EmailJS chạy hoàn toàn từ frontend
- **Bảo mật:** Public Key an toàn để public, không cần giấu
- **Fallback:** Nếu chưa config EmailJS, form vẫn hoạt động với mailto link

## Troubleshooting

- **Lỗi gửi email:** Kiểm tra lại Service ID, Template ID, Public Key
- **Email không đến:** Kiểm tra spam folder
- **Template variables:** Đảm bảo tên biến trong template khớp với code

