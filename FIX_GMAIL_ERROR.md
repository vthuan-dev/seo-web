# Fix lỗi "412 Gmail_API: Request had insufficient authentication scopes"

## Vấn đề:
Khi setup Gmail service trong EmailJS, bạn gặp lỗi:
```
412 Gmail_API: Request had insufficient authentication scopes
```

## Giải pháp:

### Cách 1: Dùng SMTP thay vì OAuth (Khuyến nghị)

1. **Disconnect** Gmail hiện tại (nếu đã kết nối)
2. Vào **Email Services** → **Add New Service**
3. Chọn **Gmail**
4. **Quan trọng:** Tìm và chọn tab **SMTP** (không dùng OAuth/Connect button)
5. Điền thông tin:
   - **Service Name:** Gmail SMTP
   - **Gmail Address:** `vthuanng.it@gmail.com`
   - **Gmail Password:** `mcidioqzsvevuhgu` (App Password, bỏ khoảng trắng)
6. **Bỏ chọn** checkbox "Send test email to verify configuration" (tạm thời)
7. Click **Create Service**
8. Sau khi tạo xong, test lại bằng cách gửi email thật

### Cách 2: Fix OAuth connection

1. Click **Disconnect** để ngắt kết nối Gmail hiện tại
2. Click **Connect** lại
3. Khi Google hiện popup xin quyền:
   - **Quan trọng:** Phải chọn **"Allow"** cho tất cả quyền
   - Đặc biệt chú ý quyền "Send email on your behalf"
4. **Bỏ chọn** checkbox "Send test email to verify configuration" trước khi Create
5. Click **Create Service**
6. Sau khi tạo xong, vào Email History để test gửi email

### Cách 3: Tạo Service mới hoàn toàn

1. Xóa service cũ (nếu có)
2. Tạo service mới từ đầu
3. Dùng **SMTP method** (Cách 1) thay vì OAuth

## Lưu ý:

- **SMTP method** đơn giản hơn và ít lỗi hơn OAuth
- App Password phải là 16 ký tự, không có khoảng trắng
- Nếu vẫn lỗi, thử tạo App Password mới từ Google Account

## Sau khi fix xong:

1. Copy **Service ID** (ví dụ: `service_62rurp8`)
2. Tiếp tục các bước setup còn lại trong file `EMAILJS_QUICK_SETUP.md`


