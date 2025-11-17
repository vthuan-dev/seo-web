# Landing Page - Dịch vụ Căn Cước Công Dân

Landing page đơn trang (single page) cho dịch vụ làm CCCD, được xây dựng bằng React + Vite.

## Tính năng

- ✅ Single page layout, clean và professional
- ✅ SEO-friendly với meta tags, structured data
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ React Helmet Async cho SEO
- ✅ React Icons cho icons đẹp
- ✅ Performance tối ưu với Vite

## Cài đặt

```bash
npm install
```

## Chạy development

```bash
npm run dev
```

## Build production

```bash
npm run build
```

## Cấu trúc

- `src/App.jsx` - Component chính
- `src/App.css` - Styling cho landing page
- `src/index.css` - Global styles
- `index.html` - HTML template với SEO meta tags

## Cấu hình nội dung

Tất cả nội dung được quản lý trong file `src/data/content.json`:

### Cập nhật thông tin liên hệ:
```json
"contact": {
  "hotline": "0123456789",
  "zalo1": "0123456789",
  "zalo2": "0987654321",
  "address": "Địa chỉ của bạn",
  "workingHours": "Phục vụ 24/7"
}
```

### Thay đổi ảnh:
```json
"images": {
  "hero": "/image/cccd2.png",
  "service": "/image/cccd1.png"
}
```

### Chỉnh sửa nội dung:
- Mở file `src/data/content.json`
- Tìm section cần sửa
- Cập nhật text, thêm/xóa items
- Save và reload trang

## SEO

- Meta tags đầy đủ (title, description, keywords)
- Open Graph tags cho social sharing
- Structured Data (LocalBusiness schema)
- Semantic HTML
- Lang="vi" cho tiếng Việt
