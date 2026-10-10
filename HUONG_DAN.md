# 🌐 HƯỚNG DẪN SỬ DỤNG WEBSITE TIAN-YOU PRECISION

---

## 📋 MỤC LỤC
1. [Các File Trong Website](#-các-file-trong-website)
2. [Cách Chạy Website](#-cách-chạy-website)
3. [Các Trang Và Chức Năng](#-các-trang-và-chức-năng)
4. [Cách Chỉnh Sửa Nội Dung](#-cách-chỉnh-sửa-nội-dung)
5. [Các Lỗi Phổ Biến & Cách Sửa](#-các-lỗi-phổ-biến--cách-sửa)
6. [Hỏi Đáp](#-hỏi-đáp)

---

## 📁 Các File Trong Website

```
tian-you-website/
├── index.html           ← Trang chủ
├── products.html        ← Trang Sản phẩm
├── equipment.html       ← Trang Thiết bị
├── contact.html         ← Trang Liên hệ
├── style.css            ← File CSS (Styling)
├── script.js            ← File JavaScript (Interactivity)
└── HUONG_DAN.md        ← File hướng dẫn này
```

**Giải thích:**
- **HTML files** (`.html`) - Nội dung của các trang
- **CSS file** (`.css`) - Trang trí giao diện (màu sắc, kích thước, vị trí, v.v)
- **JavaScript file** (`.js`) - Xử lý tương tác (form validation, menu, v.v)

---

## 🚀 Cách Chạy Website

### **Phương pháp 1: Double-Click (Đơn Giản Nhất)**
1. Tìm file `index.html`
2. **Double-click** chuột trái vào file
3. Website sẽ mở ngay trong trình duyệt mặc định ✅

### **Phương pháp 2: Kéo vào trình duyệt**
1. Mở trình duyệt (Chrome, Firefox, Edge, v.v)
2. Kéo file `index.html` vào cửa sổ trình duyệt
3. Website sẽ hiển thị ✅

### **Phương pháp 3: Click chuột phải → Mở với**
1. Click chuột phải vào file `index.html`
2. Chọn **"Mở với"** → Chọn Chrome, Firefox, v.v
3. Website sẽ mở ✅

**⚠️ Lưu ý quan trọng:**
- Tất cả các file phải ở **cùng một folder**
- Không được tách riêng các file CSS, JavaScript ra folder khác
- Nếu di chuyển folder, giữ lại tất cả các file trong folder

---

## 🏠 Các Trang Và Chức Năng

### **1. Trang Chủ (index.html)**
**Nội dung:**
- ✅ Header với navigation menu
- ✅ Hero section (giới thiệu công ty)
- ✅ Contact cards (thông tin Taiwan & Vietnam)
- ✅ Features section (tại sao chọn Tian-You)
- ✅ Footer

**Chức năng:**
- Nhấn vào các link navigation để đi tới trang khác
- Nhấn "Xem Sản Phẩm" để tới trang sản phẩm
- Nhấn "Liên Hệ Ngay" để tới trang liên hệ

---

### **2. Trang Sản Phẩm (products.html)**
**Nội dung:**
- 6 sản phẩm chính với hình ảnh, mô tả
- Các thông số kỹ thuật
- Các tính năng nổi bật

**Chức năng:**
- Hover chuột vào card sản phẩm sẽ thấy animation
- Nhấn nút "Liên Hệ Ngay" để tới trang contact

---

### **3. Trang Thiết Bị (equipment.html)**
**Nội dung:**
- 6 máy móc công nghệ cao
- Thông số kỹ thuật chi tiết
- Ứng dụng của từng máy
- Năng lực sản xuất hàng tháng

**Chức năng:**
- Hình ảnh và mô tả máy móc
- Thông tin năng lực sản xuất

---

### **4. Trang Liên Hệ (contact.html)**
**Nội dung:**
- ✅ Form liên hệ (Họ tên, Email, Phone, v.v)
- ✅ Thông tin văn phòng Taiwan & Vietnam
- ✅ Bản đồ vị trí
- ✅ FAQ (Câu hỏi thường gặp)

**Chức năng:**
- **Form validation** - Kiểm tra dữ liệu trước khi gửi
- **FAQ accordion** - Click câu hỏi để xem trả lời
- **Interactive map** - Hiển thị vị trí văn phòng

---

## ✏️ Cách Chỉnh Sửa Nội Dung

### **Sửa Text (Nội Dung Chữ)**

**Bước 1:** Mở file HTML bằng Notepad hoặc VS Code
- Cách mở: Click chuột phải vào file → "Edit with" → Chọn Notepad

**Bước 2:** Tìm text bạn muốn sửa
- Ví dụ: Để sửa tên công ty "Tian-You Precision", Ctrl+F để tìm kiếm

**Bước 3:** Sửa text và lưu file
- Nhấn Ctrl+S hoặc File → Save

**Bước 4:** Refresh trang web để thấy thay đổi
- Nhấn F5 hoặc Ctrl+R

---

### **Sửa Màu Sắc (CSS)**

**Ví dụ:** Thay đổi màu nút "Liên Hệ"

1. **Mở file `style.css`** bằng Notepad
2. **Tìm đoạn code** bằng Ctrl+F:
   ```css
   .btn-primary {
       background-color: #1960a3;
   }
   ```
3. **Thay đổi màu:** 
   - `#1960a3` là màu xanh hiện tại
   - Thay bằng màu khác: `#ff0000` (đỏ), `#00ff00` (xanh lá), v.v
   - Hay dùng trang web: https://www.color-hex.com để lấy mã màu

4. **Lưu file (Ctrl+S)** và **Refresh trang (F5)**

---

### **Thêm Sản Phẩm Mới**

1. **Mở `products.html`** bằng text editor
2. **Tìm đoạn code product-card:**
   ```html
   <div class="product-card">
       <div class="product-image">
           <img src="https://via.placeholder.com/..." alt="...">
       </div>
       <div class="product-info">
           <h3>Tên Sản Phẩm</h3>
           <p>Mô tả sản phẩm...</p>
       </div>
   </div>
   ```
3. **Copy toàn bộ đoạn code trên**
4. **Paste vào bên dưới** và chỉnh sửa thông tin:
   - Thay `src="..."` bằng URL hình ảnh mới
   - Thay `<h3>` bằng tên sản phẩm mới
   - Thay `<p>` bằng mô tả mới

5. **Lưu file (Ctrl+S)** và **Refresh (F5)**

---

### **Sửa Thông Tin Liên Hệ**

1. **Mở bất kỳ file `.html`** nào
2. **Tìm số điện thoại hoặc email:**
   - `+886-3-3699575` (Taiwan)
   - `+84-274-3553598` (Vietnam)
   - `charles.hsieh@tian-yuan.com.tw`

3. **Thay bằng số mới**
4. **Ctrl+S để lưu** và **F5 để refresh**

---

## 🐛 Các Lỗi Phổ Biến & Cách Sửa

### **Lỗi 1: Link Navigation Không Hoạt Động**

**Nguyên nhân:** File HTML bị di chuyển vị trí

**Cách sửa:**
- Kiểm tra tất cả file (`index.html`, `products.html`, `contact.html`, `equipment.html`, `style.css`, `script.js`) có cùng folder không
- Di chuyển lại cùng folder nếu cần

---

### **Lỗi 2: Giao Diện Không Hiển Thị Đúng**

**Nguyên nhân:** File `style.css` bị mất hoặc di chuyển

**Cách sửa:**
1. Kiểm tra file `style.css` có trong folder không
2. Mở file `index.html` bằng text editor
3. Tìm dòng: `<link rel="stylesheet" href="style.css">`
4. Đảm bảo đường dẫn chính xác
5. Nếu cần, đặt file `style.css` cùng folder với `index.html`

---

### **Lỗi 3: Hình Ảnh Không Hiển Thị**

**Nguyên nhân:** Đường dẫn hình ảnh bị sai

**Cách sửa:**
1. Mở file HTML bằng text editor
2. Tìm dòng `<img src="..."`
3. Đảm bảo đường dẫn hình ảnh chính xác
4. Nếu hình ảnh trong folder: `<img src="images/photo.jpg">`
5. Nếu hình ảnh từ URL: `<img src="https://example.com/photo.jpg">`

---

### **Lỗi 4: Form Không Gửi Được**

**Nguyên nhân:** File `script.js` bị mất

**Cách sửa:**
1. Kiểm tra file `script.js` có trong folder không
2. Mở file HTML bằng text editor
3. Tìm dòng: `<script src="script.js"></script>`
4. Đảm bảo file `script.js` ở cùng folder

---

## ❓ Hỏi Đáp

### **Q1: Làm sao để chạy website này trên điện thoại?**
A: Bạn có thể:
- Sử dụng ứng dụng như Kiwix (offline)
- Upload lên web hosting (GoDaddy, Hostinger, v.v)
- Dùng ứng dụng Apache/Nginx để serve locally

---

### **Q2: Website chỉ chạy offline được không?**
A: Có! Website này **chạy 100% offline** - không cần internet. Tất cả nội dung đã có trong file HTML.

---

### **Q3: Làm sao để thêm favicon (icon trên tab)?**
A: Thêm dòng này vào `<head>` của file HTML:
```html
<link rel="icon" href="favicon.ico" type="image/x-icon">
```
(Đặt file `favicon.ico` cùng folder với HTML)

---

### **Q4: Làm sao để đổi font chữ?**
A: Sửa file `style.css`, tìm dòng:
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```
Thay bằng font khác: `'Arial'`, `'Times New Roman'`, v.v

---

### **Q5: Làm sao để thêm trang mới?**
A: 
1. Copy file `products.html` (hoặc file HTML khác)
2. Rename thành tên mới: `new-page.html`
3. Sửa nội dung bên trong
4. Thêm link navigation trong `<nav>`:
   ```html
   <a href="new-page.html" class="nav-link">Trang Mới</a>
   ```
5. Thêm link vào tất cả file HTML khác

---

### **Q6: Làm sao để upload lên web?**
A:
1. Mua hosting (GoDaddy, Hostinger, 000webhost, v.v)
2. Upload tất cả file qua FTP/File Manager
3. Đặt `index.html` ở thư mục root
4. Truy cập qua URL: `yourdomain.com`

---

### **Q7: Có thể dùng VS Code để edit không?**
A: **Có!** VS Code rất tốt:
1. Tải VS Code: https://code.visualstudio.com
2. Mở folder website: File → Open Folder
3. Edit các file
4. Install extension "Live Server" để preview realtime

---

## 🎨 Tùy Chỉnh Thêm

### **Thay Đổi Màu Chủ Đạo**

Mở file `style.css` và tìm các mã màu này:
- `#002045` - Xanh tối (Primary)
- `#1960a3` - Xanh sáng (Secondary)
- `#1a365d` - Xanh tối đậm (Dark)

Thay bằng màu của bạn (dùng: https://www.color-hex.com)

---

### **Sửa Chiều Rộng Trang**

Tìm trong `style.css`:
```css
max-width: 1280px;
```
Sửa thành:
- `1024px` - Hẹp hơn
- `1400px` - Rộng hơn

---

## 📞 Liên Hệ Hỗ Trợ

Nếu gặp vấn đề:
1. **Kiểm tra lại hướng dẫn** trên
2. **Google search** vấn đề bạn gặp
3. **Liên hệ Tian-You**: +84-274-3553598

---

## ✅ Checklist Hoàn Thành

- [ ] Tất cả file ở cùng folder
- [ ] Website chạy bằng double-click `index.html`
- [ ] Các link navigation hoạt động
- [ ] Các trang load đúng
- [ ] Thông tin liên hệ được update
- [ ] Thêm được sản phẩm mới (nếu cần)
- [ ] Form liên hệ hoạt động
- [ ] Responsive trên điện thoại

---

**Chúc bạn thành công! 🎉**

*Thi đốc: Hướng dẫn này được tạo ra để giúp bạn dễ dàng chỉnh sửa và quản lý website.*
