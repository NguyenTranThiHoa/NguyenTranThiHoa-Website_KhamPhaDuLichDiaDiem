<p align="center"><b>XÂY DỰNG WEBSITE HỖ TRỢ DU LỊCH VÀ KHÁM PHÁ ĐỊA ĐIỂM MỚI</b></p>  
<b>1. Đặt vấn đề</b>

Trong những năm gần đây, du lịch đã trở thành một phần quan trọng trong đời sống của con người, không chỉ giúp giải trí mà còn mở ra cơ hội khám phá văn hóa, lịch sử và thiên nhiên ở những vùng đất mới.  
Tuy nhiên, để có một chuyến du lịch trọn vẹn, du khách thường gặp nhiều khó khăn trong việc tìm kiếm thông tin đáng tin cậy về các điểm đến, lên kế hoạch hành trình, và lựa chọn các dịch vụ phù hợp.  

Mặc dù hiện nay có rất nhiều nền tảng hỗ trợ du lịch, nhưng không phải tất cả đều đáp ứng được nhu cầu cá nhân hóa hoặc cung cấp thông tin toàn diện và chính xác.  
Một số nền tảng tập trung quá nhiều vào quảng cáo, khiến người dùng khó tiếp cận với những thông tin khách quan và hữu ích.  
Điều này đặt ra yêu cầu về một giải pháp công nghệ có thể vừa đáp ứng nhu cầu tìm kiếm thông tin, vừa mang lại trải nghiệm tương tác và hỗ trợ lập kế hoạch hiệu quả cho người dùng.  

Trước thực tế này, việc xây dựng một website hỗ trợ du lịch và khám phá địa điểm mới là điều cần thiết.  
Website này không chỉ cung cấp thông tin chi tiết về các điểm du lịch, mà còn tích hợp các tính năng hiện đại như công cụ tìm kiếm đa dạng và các gợi ý cá nhân hóa dựa trên sở thích người dùng.  
Đồng thời, việc tạo ra một không gian chia sẻ kinh nghiệm du lịch cũng góp phần tăng cường tính kết nối trong cộng đồng và hỗ trợ người dùng có được những đánh giá chân thực từ chính trải nghiệm của người đi trước.  

**Đề tài này hướng đến việc giải quyết những khó khăn mà du khách thường gặp phải, góp phần nâng cao trải nghiệm du lịch và thúc đẩy sự phát triển của ngành du lịch địa phương cũng như quốc tế.**  
**Website không chỉ mang đến sự tiện lợi mà còn trở thành cầu nối giúp mỗi chuyến đi trở nên ý nghĩa và đáng nhớ hơn.**

<b>2. Đặc tả hệ thống</b>  

Website được thiết kế nhằm hỗ trợ người dùng khám phá và tìm hiểu thông tin về các địa điểm du lịch mới một cách dễ dàng và thuận tiện.  
Hệ thống cung cấp chức năng **tìm kiếm linh hoạt theo từ khóa, danh mục**, đồng thời hiển thị **thông tin chi tiết về các địa điểm** như mô tả, hình ảnh, đánh giá, và các tiện ích đi kèm như bản đồ.  

Người dùng có thể **lập kế hoạch hành trình cá nhân** cho riêng mình, tùy theo mô tả chi tiết của địa điểm muốn đến và **quản lý danh sách địa điểm, món ăn, khách sạn, phương tiện di chuyển tại nơi yêu thích**.  
Hệ thống còn cho phép người dùng **đánh giá, viết nhận xét**, để đóng góp thông tin cho cộng đồng, qua đó **nâng cao trải nghiệm du lịch của mọi người**.  

Đối với **quản trị viên**, hệ thống cung cấp chức năng **quản lý nội dung** như thêm mới, chỉnh sửa hoặc xóa thông tin về địa điểm du lịch.  
Ngoài ra, quản trị viên có thể **theo dõi và kiểm soát hoạt động của người dùng**, đảm bảo nội dung trên website luôn chính xác và phù hợp.  

Hệ thống được xây dựng trên nền tảng web với **giao diện hiện đại, tối ưu hóa cho thiết bị di động và máy tính**.  

**Công nghệ sử dụng:**
- **Backend:** ASP.NET Core C# Web API  
- **Frontend:** ReactJS  
- **Giao diện:** Ant Design  
- **Cơ sở dữ liệu:** SQL Server  

Hệ thống không chỉ hỗ trợ người dùng **khám phá địa điểm mới** mà còn góp phần **quảng bá du lịch địa phương, kết nối cộng đồng du lịch và thúc đẩy sự phát triển của ngành du lịch Việt Nam**.  

<b>3. Sơ đồ hệ thống</b>  

Hệ thống bao gồm các chức năng chính dành cho **User (người dùng)** và **Admin (quản trị viên)** như sau:

### 📌 Dành cho **User (Người dùng)**:
- **Xem thông tin chi tiết** về địa điểm du lịch, món ăn, khách sạn, phương tiện di chuyển tại địa phương.
- **Đăng ký** và **đăng nhập tài khoản**.
- **Đánh giá, bình luận** các địa điểm du lịch.
- **Tìm kiếm theo từ khóa** cho các địa điểm.
- **Lọc tìm kiếm theo tỉnh/thành phố**.

### 📌 Dành cho **Admin (Quản trị viên)**:
- **Quản lý địa điểm, món ăn, khách sạn, phương tiện di chuyển**:
  - Thêm mới
  - Chỉnh sửa
  - Xóa
  - Tìm kiếm và lọc theo phương thức chọn hoặc nhập từ khóa.
- **Quản lý người dùng**:
  - Phân quyền vai trò (Admin/Người dùng)
  - Cập nhật mật khẩu
- **Xem, chỉnh sửa bình luận và đánh giá** từ người dùng.

![image](https://github.com/user-attachments/assets/5c14fc44-b4a4-4349-b67f-c3549a029d42)  

<b>4. Sơ đồ tổng quát UseCase</b>  

### **User (Người dùng)**  
Là người sử dụng website với các chức năng:
- **Xem và tương tác** với các trang:
  - Trang chủ
  - Món ăn
  - Địa điểm
  - Khách sạn
  - Về chúng tôi
- **Tìm kiếm địa điểm** du lịch theo từ khóa hoặc danh mục.
- **Xem chi tiết** về:
  - Địa điểm
  - Món ăn
  - Khách sạn
  - Phương tiện di chuyển tại địa phương
- **Quản lý và cập nhật thông tin cá nhân.**
- **Bình luận và đánh giá** các địa điểm, món ăn, khách sạn.
- Thực hiện các chức năng trên thông qua **đăng nhập hoặc đăng ký tài khoản người dùng**.

### **Admin (Quản trị viên)**  
Là người quản lý toàn bộ hệ thống, thực hiện các chức năng:
- **Quản lý nội dung**:
  - Địa điểm
  - Món ăn
  - Khách sạn
  - Phương tiện di chuyển
  - Bình luận và đánh giá
- **Quản lý người dùng**, bao gồm:
  - Phân quyền vai trò (Admin / Người dùng)
  - Cập nhật mật khẩu
- **Thống kê số lượng** các mục quản lý (địa điểm, món ăn, khách sạn…)
- **Tìm kiếm và lọc dữ liệu** theo từ khóa hoặc danh mục
- Đảm bảo nội dung trên hệ thống luôn **chính xác và phù hợp**.

![image](https://github.com/user-attachments/assets/8e8110cb-0667-4347-97c2-303232f061b6)  

