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

<b>5. Sơ đồ Diagram</b>  

Trong sơ đồ này, sẽ hiển thị đầy đủ toàn bộ các bảng trong cơ sở dữ liệu bao gồm các ràng buộc khoá chính, khoá ngoại như hình bên dưới  

![image](https://github.com/user-attachments/assets/89b29e10-465d-4739-a4b1-db234c17e7bc)  

<b>6. Môi trường và công cụ phát triển</b>  

Phần này đề cập đến các công cụ, phần mềm và cấu hình được sử dụng để xây dựng, kiểm tra và triển khai website. Dưới đây là các thành phần chính:

### Môi trường phát triển
- **Visual Studio**: Sử dụng cho backend với các chức năng **C# ASP.NET Core Web API**.
- **Visual Studio Code**: Sử dụng cho frontend giao diện ReactJS, với nhiều tiện ích mở rộng hỗ trợ lập trình React.

### Thư viện và Framework
- **ReactJS**: Thư viện JavaScript để xây dựng giao diện người dùng.
- **Ant Design**: Thư viện UI cho React, cung cấp các component giao diện đẹp và dễ sử dụng.
- **Axios**: Thư viện giúp thực hiện các yêu cầu HTTP, thường được sử dụng để gọi API.

### Quản lý dự án
- **npm (Node Package Manager)**: Công cụ quản lý các gói và thư viện trong dự án frontend.

### Quản lý trạng thái
- **Redux**: Thư viện quản lý trạng thái toàn cục cho ứng dụng React, giúp chia sẻ dữ liệu giữa các component một cách hiệu quả.

### 🛠Công cụ phát triển khác
- **Postman** (hoặc **Swagger API**): Công cụ để thử nghiệm và kiểm tra các API.
- **Git**: Hệ thống quản lý phiên bản để theo dõi thay đổi mã nguồn và làm việc nhóm hiệu quả.

<b>7. Một số giao diện chính của Website</b>  
## Giao diện Đăng nhập

| Loại tài khoản | Username | Password     |
|:---------------|:------------|:---------------|
| User           | EchCon       | EchCon2003      |
| Admin          | ThiHoa       | ThiHoa0309@     |  

![image](https://github.com/user-attachments/assets/986e0127-6423-4cf1-a441-22fb6f5b5e2e)  

## Giao diện Đăng ký

Khi chưa có tài khoản, người dùng có thể đăng ký tài khoản mới trực tiếp trên website để dễ dàng sử dụng các chức năng và tương tác với quyền người dùng.

### Chức năng

- Nhập đầy đủ thông tin vào **form đăng ký**:
  - Họ tên
  - Email
  - Mật khẩu
  - Xác nhận mật khẩu

- Hệ thống sẽ gửi **mã OTP qua email** đã đăng ký.

- Người dùng nhập **mã OTP** để xác thực.

- Nếu mã OTP hợp lệ, tài khoản sẽ được tạo thành công và người dùng có thể đăng nhập.

---

### Quy trình Đăng ký Tài khoản:

1. Người dùng truy cập vào trang **Đăng ký**.
2. Nhập đầy đủ thông tin yêu cầu vào form.
3. Nhấn nút **Đăng ký**.
4. Hệ thống gửi **email xác nhận OTP**.
5. Người dùng kiểm tra email và nhập **mã OTP** vào hệ thống.
6. Hoàn tất đăng ký và đăng nhập vào website.

![image](https://github.com/user-attachments/assets/175cbdad-e351-4eb4-8b41-c0116a8b813b)  

## Giao diện Quên mật khẩu  

Tại đây nếu người dùng quên tài khoản mật khẩu, sẽ được nhập gmail đã đăng ký tài khoản trước đó, và được gửi mã OTP về, nhập mới các thông tin về mật khẩu mới, sau đó sẽ nhập vào mã OTP để xác thực và cập nhật lại mật khẩu mới.  

![image](https://github.com/user-attachments/assets/7515ae54-dbee-4c3d-9a9d-2ccf13247daa)  
![image](https://github.com/user-attachments/assets/bd53c883-0cec-4799-843b-6d4002ed8c46)  
![image](https://github.com/user-attachments/assets/1b6e800e-e496-416a-a240-2dce7d0df90a)  

## Giao diện Trang chủ  

![image](https://github.com/user-attachments/assets/fbc58a95-68e0-4822-98c5-dcd8e9b81199)  

## Giao diện Trang địa điểm  

![image](https://github.com/user-attachments/assets/1815e684-bec1-4980-80d0-40321c7524c4)  

## Giao diện Trang chi tiết địa điểm  

![image](https://github.com/user-attachments/assets/cf77b8e1-b7c4-484c-86c7-a136d6c18b42)  

## Giao diện Trang khách sạn  

![image](https://github.com/user-attachments/assets/fd92b394-f098-4c35-9a57-f61d618040d2)  

## Giao diện Trang món ăn  

![image](https://github.com/user-attachments/assets/56bd894b-d0f6-410d-a98e-49499b4aa5dd)  

## Giao diện Trang trang phương tiện di chuyển tại địa phương  

![image](https://github.com/user-attachments/assets/a82f4b32-0611-4310-9f33-c5c934768e42)  

## Giao diện Trang về chúng tôi  

![image](https://github.com/user-attachments/assets/30bd5aa5-3802-4439-8b0d-bf52eb60de76)  

## Giao diện Trang thông tin người dùng và cập nhật lại mật khẩu  

![image](https://github.com/user-attachments/assets/c88e6d1a-c140-43f0-91b0-bbf6655e5288)  

## Giao diện Trang Dashboard của Admin  

![image](https://github.com/user-attachments/assets/27f19afc-4d5f-4f26-b6b5-14fb9bc5040b)  

## Giao diện Trang quản lý địa điểm  

![image](https://github.com/user-attachments/assets/fc7d41a3-e18d-4812-a37c-cb1af62971a0)  

## Giao diện Trang quản lý khách sạn  

![image](https://github.com/user-attachments/assets/834f3839-c965-47cf-8c7e-443d74fd1c02)  

## Giao diện Trang quản lý loại phương tiện  

![image](https://github.com/user-attachments/assets/a4250f4a-6ea9-4bc8-a98a-b813634d3a27)  

## Giao diện Trang quản lý các phương tiện di chuyển tại địa phương  

![image](https://github.com/user-attachments/assets/2b3e6744-3cbc-4aee-9fe2-7325594c5dce)  

## Giao diện Trang quản lý món ăn  

![image](https://github.com/user-attachments/assets/d44d7bf5-7724-4128-b9f9-b8f968e61779)  

## Giao diện Trang quản lý đánh giá  

![image](https://github.com/user-attachments/assets/3282b70d-9c20-4127-ac87-a7a8b229053e)  

## Giao diện Trang quản lý người dùng  

![image](https://github.com/user-attachments/assets/94a85067-a4f3-40f0-84ec-86aa97732ec2)  

## Giao diện Trang cập nhật lại mật khẩu  

![image](https://github.com/user-attachments/assets/a1e7b1ce-cff1-4a75-a5d9-31094d9ed718)  

<b>8. Kết quả đạt được</b>  

Website hỗ trợ du lịch và khám phá địa điểm mới trực tuyến được xây dựng hoàn chỉnh với giao diện hiện đại, thân thiện và dễ sử dụng. Các tính năng như tìm kiếm địa điểm, món ăn, khách sạn, phương tiện phù hợp tại địa phương, tìm kiếm, xem bản đồ. Bên cạnh đó còn còn có thêm đánh giá về địa điểm mà người dùng muốn được trải nghiệm hoặc đã đi đến, xem sửa lại thông tin cá nhân, cập nhật lại mật khẩu mới, giúp đem lại tiện lợi cho người dùng.  

Hệ thống quản trị dành cho Admin cũng được tối ưu, cho phép dễ dàng quản lý danh mục phương tiện, địa điểm, món ăn, khách sạn. Quản lý các đánh giá bình luận được chính xác và mang tính quy tắc không vi phạm ngôn ngữ cộng đồng, đồng thời được phép sửa hoặc bình luận gây ra nhiều vấn đề cần giải quyết. Việc áp dụng ReactJS, Ant Design, và ASP.NET Web API đã đảm bảo tính chuyên nghiệp, hiệu suất cao và bảo mật vững chắc cho hệ thống.  

<b>9. Hạn chế</b>  

Giao diện chưa được mở rộng về tính năng xem bản đồ trực tiếp tại địa phương, xem thông tin chi tiết còn hạn chế về hình ảnh, Lưu lịch và xem danh sách lịch sử bình luận của người dùng khi đăng nhập còn chưa được khai thác hết.  

Màu sắc của các giao diện khi phối màu chưa được đẹp mắt, thông tin liên hệ chưa được cập nhật. Quản trị Admin chưa được tối ưu hóa về quản lý nghiệp vụ hiệu quả và chính xác.  

<b>10. Hướng phát triển</b>  

Bổ sung thêm nhiều tính năng mới cho người trải nghiệm về bản đồ tại địa phương, đa dạng các hình ảnh cho chi tiết địa đểm, màu sắc sẽ được cân chỉnh cho phù hợp với giao diện, xử lý nghiệp vụ quản lý người dùng được chính xác nhất, cập nhật thông tin mới về nhiều địa điểm được khám phá.   

Tính năng lưu lại và xem lịch sử bình luận được mở rộng, cập nhật trạng thái mới cho người dùng về nhiều tiện ích khác nhau.


























