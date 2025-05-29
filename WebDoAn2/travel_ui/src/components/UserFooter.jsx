import React from 'react';
import { Layout, Row, Col, Image } from 'antd';
import { PhoneOutlined, FacebookOutlined, MailOutlined, InstagramOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Anh2 from '../assets/images/Anh2.jpg';

const { Footer } = Layout;

const UserFooter = () => {
  return (
    <Layout>
    <Footer style={{ backgroundColor: '#3B7097', color: 'white' }}>
      <Row gutter={[32, 32]} justify="space-between" align="top">
        {/* Logo Section */}
        <Col xs={24} sm={8} md={6} lg={6} xl={6} style={{ textAlign: 'center' }}>
          <Image width={110} src={Anh2} />
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>TRAVEL THIHOA</h3>
        </Col>

        {/* Shop Information Section */}
        <Col xs={24} sm={8} md={6} lg={6} xl={6}>
          <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>THÔNG TIN DỊCH VỤ</h4>
          <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <EnvironmentOutlined style={{ marginRight: '8px' }} />
            Địa chỉ: Số 123, Lấp Vò, Đồng Tháp
          </p>
          <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <PhoneOutlined style={{ marginRight: '8px' }} />
            Số điện thoại: 0123456789
          </p>
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <MailOutlined style={{ marginRight: '8px' }} />
            Email: info@cuahang.com
          </p>
        </Col>

        {/* Social Media Section */}
        <Col xs={24} sm={8} md={6} lg={6} xl={6}>
          <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>MẠNG XÃ HỘI</h4>
          <p style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <FacebookOutlined style={{ marginRight: '8px' }} />
            <Link to="https://facebook.com" target="_blank" style={{ color: 'white', textDecoration: 'none' }}>
              Facebook
            </Link>
          </p>
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <InstagramOutlined style={{ marginRight: '8px' }} />
            <Link to="https://instagram.com" target="_blank" style={{ color: 'white', textDecoration: 'none' }}>
              Instagram
            </Link>
          </p>
        </Col>

        {/* Category Section */}
        <Col xs={24} sm={8} md={6} lg={6} xl={6}>
          <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>DANH MỤC</h4>
          <p style={{ marginBottom: '10px' }}>
            <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}>
              Trang chủ
            </Link>
          </p>
          <p style={{ marginBottom: '10px' }}>
            <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
              Về chúng tôi
            </Link>
          </p>
          <p>
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>
              Liên hệ
            </Link>
          </p>
        </Col>
      </Row>
    </Footer>
    </Layout>
  );
};

export default UserFooter;
