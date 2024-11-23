# PC Store Website Giới Thiệu và Bán Máy PC Trực Tuyến

# Chương 1: Giới Thiệu Đề Tài

## 1.1. Giới Thiệu Thành Viên Nhóm

### Phân Công Nhiệm Vụ và Đánh Giá (CLO1)

| Họ và Tên          | MSSV   | Nhiệm Vụ                                                        | Đánh Giá |
| ------------------ | ------ | --------------------------------------------------------------- | -------- |
| [Tên thành viên 1] | [MSSV] | Phát triển Frontend<br>Thiết kế UI/UX<br>Tích hợp API           | [Điểm]   |
| [Tên thành viên 2] | [MSSV] | Phát triển Backend<br>Thiết kế Database<br>Xử lý Authentication | [Điểm]   |

## 1.2. Giới Thiệu Đề Tài

Trong thời đại công nghệ 4.0, nhu cầu mua sắm trực tuyến ngày càng phát triển mạnh mẽ. Việc xây dựng một nền tảng thương mại điện tử chuyên biệt không chỉ giúp kết nối nhà cung cấp với người tiêu dùng mà còn tối ưu hóa trải nghiệm mua sắm của khách hàng. Đề tài "Website giới thiệu và bán máy PC trực tuyến" được xây dựng nhằm cung cấp một giải pháp toàn diện, hỗ trợ khách hàng dễ dàng tìm kiếm, so sánh và đặt mua các sản phẩm máy tính cá nhân (PC) theo nhu cầu.

Ứng dụng sử dụng Java Spring Boot một framework hiện đại và mạnh mẽ để xây dựng hệ thống backend. Đây là công nghệ phổ biến với khả năng mở rộng cao, giúp tối ưu hóa hiệu suất và dễ dàng tích hợp với các công nghệ hiện đại như Hibernate, Spring Security và RESTful API. Đồng thởi, giao diện người dùng sẽ được thiết kế thân thiện, trực quan, đảm bảo người dùng có thể dễ dàng tương tác, từ việc tìm kiếm sản phẩm đến hoàn tất thanh toán.

## 1.3. Mục Tiêu Thực Hiện Đề Tài

### 1.3.1. Mục Tiêu Chung

Xây dựng một nền tảng thương mại điện tử hoàn chỉnh, chuyên biệt về lĩnh vực PC và linh kiện máy tính.
Tạo ra một hệ thống an toàn, ổn định và dễ dàng mở rộng trong tương lai.
Tối ưu hóa trải nghiệm người dùng từ khâu tìm kiếm đến thanh toán.

### 1.3.2. Mục Tiêu Cụ Thể

1. Về Chức Năng:
   Xây dựng hệ thống quản lý sản phẩm đa dạng với nhiều danh mục
   Phát triển tính năng tìm kiếm và lọc sản phẩm thông minh
   Tích hợp hệ thống thanh toán trực tuyến an toàn (VNPay)
   Thiết lập hệ thống quản lý đơn hàng và theo dõi trạng thái
   Xây dựng hệ thống xác thực và phân quyền người dùng

2. Về Giao Diện:
   Thiết kế giao diện responsive, tương thích đa nền tảng
   Tối ưu hóa UX/UI theo các tiêu chuẩn hiện đại
   Xây dựng giao diện quản trị trực quan, dễ sử dụng

3. Về Kỹ Thuật:
   Áp dụng kiến trúc microservices cho khả năng mở rộng
   Đảm bảo hiệu suất và tốc độ tải trang
   Tích hợp các biện pháp bảo mật tiên tiến
   Xây dựng API có tính tái sử dụng cao

# Chương 2: Phân Tích Yêu Cầu (CLO3)

## 2.1. Yêu Cầu Chức Năng

### 2.1.1. Quản Lý Người Dùng

Đăng ký tài khoản
Đăng nhập/Đăng xuất
Quản lý thông tin cá nhân
Phân quyền người dùng (Admin, User)

### 2.1.2. Quản Lý Sản Phẩm

Thêm/Sửa/Xóa sản phẩm
Phân loại sản phẩm
Tìm kiếm và lọc sản phẩm
Hiển thị chi tiết sản phẩm

### 2.1.3. Quản Lý Đơn Hàng

Tạo đơn hàng mới
Theo dõi trạng thái đơn hàng
Xử lý đơn hàng (Admin)
Lịch sử đơn hàng

### 2.1.4. Thanh Toán

Tích hợp VNPay
Quản lý giỏ hàng
Xác nhận đơn hàng

## 2.2. Yêu Cầu Phi Chức Năng

**Hiệu Suất**: Thời gian phản hồi nhanh, tối ưu hóa tải trang
**Bảo Mật**: Đảm bảo an toàn thông tin người dùng và giao dịch
**Khả Năng Mở Rộng**: Dễ dàng thêm tính năng mới và mở rộng quy mô
**Độ Tin Cậy**: Hệ thống ổn định, có khả năng phục hồi sau sự cố
**Tính Sẵn Sàng**: Đảm bảo thời gian hoạt động cao

# Chương 3: Phân Tích Thiết Kế (CLO4, CLO5)

## 3.1. Screen Diagram

```mermaid
flowchart TB
    subgraph Public["Màn hình công khai"]
        direction TB
        Home["Trang chủ
        - Banner
        - Sản phẩm nổi bật
        - Danh mục SP"]
        Products["Danh sách SP
        - Bộ lọc
        - Tìm kiếm
        - Phân trang"]
        ProductDetail["Chi tiết SP
        - Thông tin SP
        - Hình ảnh
        - Cấu hình
        - Thêm vào giỏ"]
        Login["Đăng nhập
        - Form đăng nhập
        - Quên mật khẩu"]
        Register["Đăng ký
        - Form đăng ký
        - Xác thực email"]
    end

    subgraph Customer["Màn hình khách hàng"]
        direction TB
        Cart["Giỏ hàng
        - DS sản phẩm
        - Tổng tiền
        - Mã giảm giá"]
        Checkout["Thanh toán
        - Thông tin giao hàng
        - Phương thức TT
        - Xác nhận đơn"]
        OrderHistory["Lịch sử đơn hàng
        - DS đơn hàng
        - Trạng thái
        - Chi tiết đơn"]
        Profile["Tài khoản
        - Thông tin cá nhân
        - Đổi mật khẩu
        - Địa chỉ"]
    end

    subgraph Admin["Màn hình quản trị"]
        direction TB
        Dashboard["Thống kê
        - Doanh thu
        - Đơn hàng
        - Người dùng"]
        ProductManage["QL Sản phẩm
        - CRUD SP
        - Nhập hàng
        - Khuyến mãi"]
        OrderManage["QL Đơn hàng
        - DS đơn hàng
        - Xử lý đơn
        - Hoàn tiền"]
        UserManage["QL Người dùng
        - DS người dùng
        - Phân quyền
        - Khóa/Mở"]
    end

    %% Public Flow
    Home --> Products
    Home --> ProductDetail
    Products --> ProductDetail
    Home --> Login
    Home --> Register
    Login --> Register
    Register --> Login

    %% Customer Flow
    ProductDetail --> Cart
    Cart --> Checkout
    Checkout --> OrderHistory
    Profile --> OrderHistory

    %% Admin Flow
    Dashboard --> ProductManage
    Dashboard --> OrderManage
    Dashboard --> UserManage
    ProductManage --> ProductDetail
    OrderManage --> OrderHistory

    %% Access Levels
    Login --> |"Khách hàng"| Customer
    Login --> |"Admin"| Admin
```

## 3.2. Use Case Diagram

```mermaid
flowchart TB
    User((Khách hàng))
    Admin((Admin))

    subgraph User_Cases["Chức năng người dùng"]
        direction TB
        UC1[Đăng ký]
        UC2[Đăng nhập]
        UC3[Xem sản phẩm]
        UC4[Tìm kiếm SP]
        UC5[Quản lý giỏ hàng]
        UC6[Đặt hàng]
        UC7[Thanh toán]
        UC8[Xem lịch sử đơn hàng]
    end

    subgraph Admin_Cases["Chức năng quản trị"]
        direction TB
        UC9[Quản lý sản phẩm]
        UC10[Quản lý đơn hàng]
        UC11[Quản lý người dùng]
        UC12[Xem thống kê]
    end

    %% User connections
    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC6
    User --> UC7
    User --> UC8

    %% Admin connections - including all user functions
    Admin --> UC1
    Admin --> UC2
    Admin --> UC3
    Admin --> UC4
    Admin --> UC5
    Admin --> UC6
    Admin --> UC7
    Admin --> UC8
    Admin --> UC9
    Admin --> UC10
    Admin --> UC11
    Admin --> UC12
```

## 3.3. Activity Diagram

### Quy Trình Đặt Hàng

```mermaid
stateDiagram-v2
    direction TB
    [*] --> XemSanPham
    XemSanPham --> ThemVaoGio: Chọn sản phẩm
    ThemVaoGio --> XemGioHang: Xem giỏ hàng
    XemGioHang --> CapNhatGio: Cập nhật số lượng
    CapNhatGio --> XemGioHang
    XemGioHang --> TaoDonHang: Tiến hành đặt hàng
    TaoDonHang --> NhapThongTin: Điền thông tin
    NhapThongTin --> ChonPTTT: Chọn phương thức thanh toán
    ChonPTTT --> ThanhToanVNPay: Chọn VNPay
    ChonPTTT --> ThanhToanCOD: Chọn COD
    ThanhToanVNPay --> XacNhanDon: Thanh toán thành công
    ThanhToanCOD --> XacNhanDon
    XacNhanDon --> [*]
```

### Quy Trình Xử Lý Đơn Hàng (Admin)

```mermaid
stateDiagram-v2
    direction TB
    [*] --> DonHangMoi
    DonHangMoi --> XacNhan: Kiểm tra đơn hàng
    XacNhan --> DongGoi: Đơn hợp lệ
    XacNhan --> Huy: Đơn không hợp lệ
    DongGoi --> VanChuyen: Bàn giao vận chuyển
    VanChuyen --> DaGiao: Giao hàng thành công
    VanChuyen --> ThatBai: Giao hàng thất bại
    DaGiao --> HoanThanh
    ThatBai --> Huy
    HoanThanh --> [*]
    Huy --> [*]
```

## 3.4. Class Diagram

```mermaid
classDiagram
    direction TB
    User "1" -- "0..*" Order
    User "1" -- "1" Cart
    Order "1" -- "1..*" OrderItem
    OrderItem "1" -- "1" Product
    Cart "1" -- "0..*" CartItem
    CartItem "1" -- "1" Product

    class User {
        +String id
        +String username
        +String email
        +String password
        +String role
        +register()
        +login()
        +updateProfile()
    }

    class Product {
        +String id
        +String name
        +String description
        +double price
        +int stock
        +String category
        +create()
        +update()
        +delete()
    }

    class Order {
        +String id
        +User user
        +List~OrderItem~ items
        +double totalAmount
        +String status
        +Date createdAt
        +create()
        +updateStatus()
        +cancel()
    }

    class OrderItem {
        +String id
        +Product product
        +int quantity
        +double price
        +calculateTotal()
    }

    class Cart {
        +String id
        +User user
        +List~CartItem~ items
        +addItem()
        +removeItem()
        +updateQuantity()
        +clear()
    }
```

## 3.5. Sequence Diagram

### Quy Trình Đặt Hàng

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant D as Database
    participant V as VNPay

    U->>F: Chọn sản phẩm
    F->>B: POST /api/cart/add
    B->>D: Lưu vào giỏ hàng
    D-->>B: Xác nhận
    B-->>F: Cập nhật giỏ hàng

    U->>F: Tiến hành thanh toán
    F->>B: POST /api/orders/create
    B->>D: Tạo đơn hàng
    D-->>B: Order ID

    alt Thanh toán VNPay
        B->>V: Tạo URL thanh toán
        V-->>B: URL thanh toán
        B-->>F: Chuyển hướng
        U->>V: Thực hiện thanh toán
        V->>B: Callback kết quả
        B->>D: Cập nhật trạng thái
    else Thanh toán COD
        B->>D: Cập nhật trạng thái COD
    end

    D-->>B: Xác nhận
    B-->>F: Kết quả đặt hàng
    F-->>U: Hiển thị thông báo
```

## 3.6. Database Diagram

```mermaid
erDiagram
    %% Relationships
    User ||--o{ Order : places
    User ||--|| Cart : has
    Order ||--|{ OrderItem : contains
    Cart ||--|{ CartItem : contains
    Product ||--o{ OrderItem : "ordered in"
    Product ||--o{ CartItem : "added to"

    %% Entities
    User {
        string id PK
        string username
        string email
        string password
        string role
        datetime createdAt
    }

    Product {
        string id PK
        string name
        string description
        float price
        int stock
        string category
        string[] images
        datetime createdAt
    }

    Order {
        string id PK
        string userId FK
        float totalAmount
        string status
        string paymentMethod
        datetime createdAt
    }

    OrderItem {
        string id PK
        string orderId FK
        string productId FK
        int quantity
        float price
    }

    Cart {
        string id PK
        string userId FK
        datetime updatedAt
    }

    CartItem {
        string id PK
        string cartId FK
        string productId FK
        int quantity
    }
```

# Chương 4: Hiện Thực Ứng Dụng (CLO4, CLO5, CLO6)

## 4.1. Frontend

### Công Nghệ Sử Dụng

**Công nghệ chính**: React + TypeScript + Vite
**UI Framework**: Tailwind CSS với các components tùy chỉnh
**State Management**: Redux Toolkit
**Routing**: React Router DOM
**Form Validation**: Zod
**HTTP Client**: Axios
**UI Components**:
Radix UI cho các components cơ bản
Custom components với Tailwind CSS
Lucide React cho icons

### Cấu Trúc Frontend

```mermaid
graph TD
    Client[Client] --> src[src/]
    src --> assets[assets/]
    src --> components[components/]
    src --> features[features/]
    src --> hooks[hooks/]
    src --> layouts[layouts/]
    src --> lib[lib/]
    src --> pages[pages/]
    src --> services[services/]
    src --> store[store/]
    src --> types[types/]
    src --> utils[utils/]

    components --> common[common/]
    components --> ui[ui/]

    features --> auth[auth/]
    features --> cart[cart/]
    features --> order[order/]
    features --> product[product/]
    features --> user[user/]

    store --> slices[slices/]
    store --> api[api/]

    services --> axios[axios.ts]
    services --> api-client[api-client.ts]
```

### Chi Tiết Cấu Trúc Thư Mục

#### Frontend Structure

- **assets/**: Static files như images, fonts
- **components/**
  - **common/**: Các components dùng chung
  - **ui/**: UI components (buttons, inputs, etc.)
- **features/**: Feature-based modules
  - **auth/**: Authentication related
  - **cart/**: Shopping cart
  - **order/**: Order management
  - **product/**: Product catalog
  - **user/**: User management
- **hooks/**: Custom React hooks
- **layouts/**: Layout components
- **lib/**: Third-party library configurations
- **pages/**: Page components
- **services/**: API services
- **store/**: Redux store configuration
- **types/**: TypeScript type definitions
- **utils/**: Utility functions

## 4.2. Backend

### Công Nghệ Sử Dụng

Spring Boot 3.3.5
Java 21
MongoDB
JWT Authentication
VNPay Payment Integration

### Cấu Trúc Backend

```mermaid
graph TD
    Server[Server] --> src[src/]
    src --> main[main/]
    src --> test[test/]

    main --> java[java/]
    main --> resources[resources/]

    java --> com[com.pcstore/]

    com --> config[config/]
    com --> controller[controller/]
    com --> dto[dto/]
    com --> entity[entity/]
    com --> exception[exception/]
    com --> repository[repository/]
    com --> security[security/]
    com --> service[service/]
    com --> util[util/]

    resources --> static[static/]
    resources --> templates[templates/]
    resources --> application.yml[application.yml]
```

### Chi Tiết Cấu Trúc Thư Mục

#### Backend Structure

- **config/**: Configuration classes
- **controller/**: REST API endpoints
- **dto/**: Data Transfer Objects
- **entity/**: Database entities
- **exception/**: Custom exceptions
- **repository/**: Data access layer
- **security/**: Security configurations
- **service/**: Business logic
- **util/**: Utility classes

# Chương 5: Kết Luận

## 5.1. Kết Quả Đạt Được

Hoàn thành các chức năng cơ bản của hệ thống
Xây dựng được giao diện người dùng thân thiện
Tích hợp thành công hệ thống thanh toán
Đảm bảo các yêu cầu về bảo mật và hiệu suất

## 5.2. Hạn Chế

[Liệt kê các hạn chế]

## 5.3. Hướng Phát Triển

Bổ sung thêm phương thức thanh toán
Phát triển tính năng đánh giá sản phẩm
Tích hợp chatbot hỗ trợ khách hàng
Tối ưu hóa SEO
Phát triển ứng dụng mobile

# Tài Liệu Tham Khảo (CLO2)

1. Spring Framework Documentation
   https://docs.spring.io/spring-framework/reference/
   Sử dụng cho việc phát triển backend với Spring Boot

2. React Documentation
   https://react.dev/
   Tham khảo cho việc xây dựng frontend

3. MongoDB Documentation
   https://www.mongodb.com/docs/
   Hướng dẫn thiết kế và quản lý cơ sở dữ liệu

4. [Các tài liệu tham khảo khác]
