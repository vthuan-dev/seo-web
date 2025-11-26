# Hướng dẫn Setup Web3Forms - Đơn giản, chỉ cần 1 email!

## Web3Forms là gì?
- **Miễn phí:** 250 email/tháng
- **Đơn giản:** Chỉ cần 1 email để nhận form
- **Không cần backend:** Chạy hoàn toàn từ frontend
- **Tự động gửi:** Email tự động đến inbox của bạn

## Cách setup (2 phút):

### Bước 1: Lấy Access Key
1. Truy cập: https://web3forms.com/
2. Nhập email: **Nxuanhoang55@gmail.com**
3. Click **Get Your Access Key**
4. Kiểm tra email và copy **Access Key** (dạng: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Bước 2: Cập nhật code
Mở file `src/App.jsx` trong cả 2 dự án:
- `cccd-landing/src/App.jsx`
- `khacdau-landing/src/App.jsx`

Tìm dòng:
```javascript
access_key: 'YOUR_ACCESS_KEY',
```

Thay bằng Access Key bạn vừa lấy:
```javascript
access_key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
```

### Bước 3: Xong!
- Form sẽ tự động gửi email về **Nxuanhoang55@gmail.com**
- Không cần config gì thêm!

## Test
1. Chạy website: `npm run dev`
2. Điền form và submit
3. Kiểm tra email **Nxuanhoang55@gmail.com**

## Lưu ý
- **Miễn phí:** 250 email/tháng
- **Spam protection:** Có captcha tự động
- **Fallback:** Nếu API lỗi, sẽ tự động dùng mailto link

## Thay đổi email nhận
Nếu muốn đổi email nhận form, tìm dòng:
```javascript
const RECEIVER_EMAIL = 'Nxuanhoang55@gmail.com';
```

Thay bằng email mới và lấy Access Key mới từ web3forms.com với email đó.

