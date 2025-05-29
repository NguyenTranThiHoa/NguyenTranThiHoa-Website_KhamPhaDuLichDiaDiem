// import React from 'react';
// import { Layout, Input, Select, Carousel } from 'antd';
// import { UserOutlined, SearchOutlined, PhoneOutlined } from '@ant-design/icons';
// import { NavLink } from 'react-router-dom';

// import DuLich5 from '../assets/images/DuLich5.jpg';
// import DuLich1 from '../assets/images/DuLich1.jpg';
// import DuLich2 from '../assets/images/DuLich2.jpg';
// import Anh2 from '../assets/images/Anh2.jpg';


// const AppHeader = () => {
//   const handleSearch = (value) => {
//     console.log("Searching for:", value);
//   };

//   const { Header } = Layout;
//   const { Option } = Select;

//   const images = [DuLich5 ,DuLich1, DuLich2];

//   return (
//     <Layout>
//       <Header
//         style={{
//           background: '#fff',
//           padding: '0px 20px',
//           borderBottom: '1px solid #f0f0f0',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}
//       >
//         <div style={{ flex: '1', textAlign: 'left', display: 'flex', alignItems: 'center' , marginLeft: 60}}>
//           <img src={Anh2} alt="Logo" style={{ width: 50, marginRight: '10px'}} />
//           <h2 style={{ color: '#3B7097', fontSize: '25px', margin: 0 }}>TRAVEL THIHOA</h2>
//         </div>

//         <div
//           style={{
//             flex: '2',
//             display: 'flex',
//             // justifyContent: 'center',
//             // alignItems: 'center',
//             marginRight: 50
//           }}
//         >
//           <Select
//             placeholder="Chọn địa điểm"
//             style={{ width: 160, marginRight: 10 }}
//             allowClear
//           >
//             <Option value="dong-thap">Đồng Tháp</Option>
//             <Option value="can-tho">Cần Thơ</Option>
//             <Option value="an-giang">An Giang</Option>
//           </Select>
//           <Input.Search
//             placeholder="Nhập nội dung tìm kiếm"
//             onSearch={handleSearch}
//             style={{ width: '70%' }}
//             enterButton={<SearchOutlined />}
//           />
//         </div>

//         <div
//           style={{
//             flex: '1',
//             display: 'flex',
//             alignItems: 'center',
//           }}
//         >
//           <NavLink
//             to="/auth/login"
//             className={({ isActive }) => (isActive ? 'active-menu' : 'inactive-menu')}
//             style={{
//               borderRadius: '5px',
//               backgroundColor: '#A9D09E',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               height: '40px', // Chiều cao nút
//               width: '120px', // Chiều rộng nút cố định
//               fontSize: '16px', // Kích thước chữ
//               textAlign: 'center', // Canh giữa chữ
//             }}
//           >
//             <UserOutlined style={{ paddingRight: '8px' }} />
//             Đăng nhập
//           </NavLink>
//           <NavLink
//             to="/auth/register"
//             className={({ isActive }) => (isActive ? 'active-menu' : 'inactive-menu')}
//             style={{
//               borderRadius: '5px',
//               backgroundColor: '#A9D09E',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               height: '40px', // Chiều cao nút
//               width: '120px', // Chiều rộng nút cố định
//               fontSize: '16px', // Kích thước chữ
//               textAlign: 'center', // Canh giữa chữ
//               marginLeft: '60px'
//             }}
//           >
//             <UserOutlined style={{ paddingRight: '8px' }} />
//             Đăng ký
//           </NavLink>
//         </div>
//       </Header>

//       <nav
//         style={{
//           background: '#3B7097',
//           padding: '12px 20px',
//           color: '#fff',
//         }}
//       >
//         <div
//           style={{
//             display: 'inline-flex',
//             marginLeft: '180px',
//             width: 'auto',
//           }}
//         >
//           <NavLink
//             to="/"
//             className={({ isActive }) => (isActive ? 'active-menu' : 'inactive-menu')}
//             style={{ padding: '8px 20px' }}
//           >
//             TRANG CHỦ
//           </NavLink>
//           <NavLink
//             to="/locations"
//             className={({ isActive }) => (isActive ? 'active-menu' : 'inactive-menu')}
//             style={{ padding: '8px 20px' }}
//           >
//             ĐỊA ĐIỂM
//           </NavLink>
//           <NavLink
//             to="/hotels"
//             className={({ isActive }) => (isActive ? 'active-menu' : 'inactive-menu')}
//             style={{ padding: '8px 20px' }}
//           >
//             KHÁCH SẠN
//           </NavLink>
//           <NavLink
//             to="/specialty"
//             className={({ isActive }) => (isActive ? 'active-menu' : 'inactive-menu')}
//             style={{ padding: '8px 20px' }}
//           >
//             MÓN ĂN
//           </NavLink>
//           <NavLink
//             to="/transports"
//             className={({ isActive }) => (isActive ? 'active-menu' : 'inactive-menu')}
//             style={{ padding: '8px 20px' }}
//           >
//             PHƯƠNG TIỆN
//           </NavLink>
//           <NavLink
//             to="/contact"
//             className={({ isActive }) => (isActive ? 'active-menu' : 'inactive-menu')}
//             style={{ padding: '8px 20px' }}
//           >
//             VỀ CHÚNG TÔI
//           </NavLink>
//           <p style={{ marginLeft: '140px', padding: '8px 0px' }}>
//             <PhoneOutlined style={{ paddingRight: '5px' }} />
//             Hotline: 0123456789
//           </p>
//         </div>
//       </nav>

//       <Carousel autoplay>
//         {images.map((image, index) => (
//           <div key={index}>
//             <img src={image} alt={`${index + 1}`} style={{ width: '100%', height: '550px' }} />
//           </div>
//         ))}
//       </Carousel>
//     </Layout>
//   );
// };

// export default AppHeader;





import React, { useState, useEffect } from 'react';
import { Layout, Input, Carousel, Button, Dropdown, Menu } from 'antd';
import { UserOutlined, SearchOutlined, PhoneOutlined } from '@ant-design/icons';
import { NavLink, useNavigate, Link } from 'react-router-dom';

import DuLich5 from '../assets/images/DuLich5.jpg';
import DuLich1 from '../assets/images/DuLich1.jpg';
import DuLich2 from '../assets/images/DuLich2.jpg';
import Anh2 from '../assets/images/Anh2.jpg';

import { SearchLocations } from '../services/LocationsService';

const UserHeader = () => {
  const [username, setUsername] = useState(null);
  const { Header } = Layout;
  const images = [DuLich5, DuLich1, DuLich2];
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const expireTime = localStorage.getItem('expireTime');
  const currentTime = new Date();
  const isLogin = isAuthenticated && expireTime && new Date(expireTime) > currentTime;
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLogin) {
      setUsername(localStorage.getItem('username'));
    }
  }, [isLogin]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('expireTime');
    localStorage.removeItem('username');
    localStorage.removeItem('userID');
    setUsername(null);
    navigate('/home');
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    try {
        if (value !== "") {
            setLoading(true);
            const response = await SearchLocations(value);
            if (response.status === 200) {
                setSearchResults(response.data);
            } else {
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    } catch (error) {
        console.error("Có lỗi khi tìm kiếm:", error);
        setSearchResults([]);
    } finally {
        setLoading(false);
    }
  };  

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearchChange = debounce(handleSearchChange, 500);

  const accountMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => navigate('/account')}>
        Cập nhật thông tin  
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item> 
    </Menu>
  );

  return (
    <Layout>
      <Header
        style={{
          background: '#fff',
          padding: '0px 20px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ flex: '1', textAlign: 'left', display: 'flex', alignItems: 'center', marginLeft: 60 }}>
          <img src={Anh2} alt="Logo" style={{ width: 50, marginRight: '10px' }} />
          <h2 style={{ color: '#3B7097', fontSize: '25px', margin: 0 }}>TRAVEL THIHOA</h2>
        </div>

        <div
          style={{
            flex: '2',
            display: 'flex',
            marginRight: 20,
            position: 'relative'
          }}
        >
          <Input
            type="text"
            placeholder="Tìm kiếm địa điểm..."
            onChange={debouncedSearchChange}
            style={{
              width: '80%',
              padding: '6px 40px',
              border: '1px solid #ccc',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s',
              position: 'relative',
            }}
          />
          <SearchOutlined style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#888'
          }} />
          {query && !loading && searchResults.length === 0 && (
            <div style={{
              position: 'absolute',
              left: '0',
              right: '0',
              backgroundColor: '#f0f0f0',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              marginTop: '50px',
              borderRadius: '5px',
              zIndex: 10,
              width: '80%',
            }}>
              <p style={{ color: '#888', fontWeight: 'bold', textAlign: 'center', padding: '5px' }}>Không có kết quả tìm thấy!</p>
            </div>
          )}
          {searchResults.length > 0 && !loading && (
            <div style={{
              position: 'absolute',
              left: '0',
              right: '0',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              marginTop: '50px',
              borderRadius: '5px',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 10,
              width: '80%'
            }}>
              {searchResults.map((location) => (
                <Link
                  to={`/locations/${location?.locationID}`}
                  key={location?.locationID}
                  style={{
                    display: 'flex',
                    padding: '10px',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: '#333',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f0f0f0'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <img
                    src={`https://localhost:7054/api/images/${location?.imageUrl}`}
                    alt={location?.name}
                    style={{ width: '50px', height: '50px', borderRadius: '5px', marginRight: '10px' }} />
                  <span style={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{location?.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            flex: '1',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isLogin ? (
            <Dropdown overlay={accountMenu} trigger={['click']}>
              <Button type="primary" icon={<UserOutlined />} style={{ marginRight: '10px' }}>
                {username || "Người dùng"}
              </Button>
            </Dropdown>
          ) : (
            <>
              <NavLink
                to="/auth/login"
                style={{
                  borderRadius: '5px',
                  backgroundColor: '#A9D09E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '40px',
                  width: '120px',
                  fontSize: '16px',
                  textAlign: 'center',
                }}
              >
                <UserOutlined style={{ paddingRight: '8px' }} />
                Đăng nhập
              </NavLink>
              <NavLink
                to="/auth/register"
                style={{
                  borderRadius: '5px',
                  backgroundColor: '#A9D09E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '40px',
                  width: '120px',
                  fontSize: '16px',
                  textAlign: 'center',
                  marginLeft: '60px'
                }}
              >
                <UserOutlined style={{ paddingRight: '8px' }} />
                Đăng ký
              </NavLink>
            </>
          )}
        </div>
      </Header>

      <nav
        style={{
          background: '#3B7097',
          padding: '12px 20px',
          color: '#fff',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            marginLeft: '180px',
            width: 'auto',
          }}
        >
          <NavLink to="/home" style={({ isActive }) => (isActive ? { color: "yellow", padding: '8px 20px' } : { padding: '8px 20px' })}>TRANG CHỦ</NavLink>
          <NavLink to="/locations" style={({ isActive }) => (isActive ? { color: "yellow", padding: '8px 20px' } : { padding: '8px 20px' })}>ĐỊA ĐIỂM</NavLink>
          <NavLink to="/hotels" style={({ isActive }) => (isActive ? { color: "yellow", padding: '8px 20px' } : { padding: '8px 20px' })}>KHÁCH SẠN</NavLink>
          <NavLink to="/specialty" style={({ isActive }) => (isActive ? { color: "yellow", padding: '8px 20px' } : { padding: '8px 20px' })}>MÓN ĂN</NavLink>
          <NavLink to="/transports" style={({ isActive }) => (isActive ? { color: "yellow", padding: '8px 20px' } : { padding: '8px 20px' })}>PHƯƠNG TIỆN</NavLink>
          <NavLink to="/abouts" style={({ isActive }) => (isActive ? { color: "yellow", padding: '8px 20px' } : { padding: '8px 20px' })}>VỀ CHÚNG TÔI</NavLink>
          <p style={{ marginLeft: '140px', padding: '8px 0px' }}>
            <PhoneOutlined style={{ paddingRight: '5px' }} />
            Hotline: 0123456789
          </p>
        </div>
      </nav>

      <Carousel autoplay>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '550px' }} />
          </div>
        ))}
      </Carousel>
    </Layout>
  );
};

export default UserHeader;
