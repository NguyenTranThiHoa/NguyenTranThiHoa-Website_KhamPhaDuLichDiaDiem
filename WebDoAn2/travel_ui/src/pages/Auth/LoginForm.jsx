import React from 'react';
import { Form, Input, Button, App } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/AuthService';

import Anh1 from '../../assets/Anh1.jpg';

const LoginForm = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await authService.Login(values);
      if (response.status === 200) {
        const data = response.data;
        message.success('Đăng nhập thành công!');
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('userID', JSON.stringify(data.userID));
        localStorage.setItem('role', data.role);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        const expireTime = new Date();
                expireTime.setDate(expireTime.getDate() + 1);
                localStorage.setItem('expireTime', expireTime);
                if (data.role !== 'User') {
                    navigate("/admin");
                    return;
                }
                navigate('/');
            } else if (response.status === 400) {
                message.error(response.message);
            }
        } catch (error) {
            message.error("Lỗi không xác định!");
            console.log(error);
        }
    };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '65%',
          height: '60%',
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 10,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          style={{
            width: '60%',
            height: '400px',
            backgroundImage: `url(${Anh1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 10,
            marginRight: '20px',
          }}
        ></div>

        <div style={{ width: '60%'}}>
          <Form
            name="login_form"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ width: '80%', padding: '0px 10px', marginLeft: '50px'}}
          >
            <h2 style={{ textAlign: 'center', marginBottom: 45, marginTop: -20, fontSize: '28px',fontWeight: 'bold' }}>ĐĂNG NHẬP</h2>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            >
              <Input prefix={<UserOutlined  style={{color: '#50409A'}}/>} placeholder="Tên đăng nhập"  style={{fontSize: '18px', marginBottom: '10px'}}/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password prefix={<LockOutlined  style={{color: '#50409A'}}/>} placeholder="Mật khẩu" style={{fontSize: '18px', marginBottom: '5px'}}/>
            </Form.Item>
            
            {/* Các phần tử Lưu mật khẩu và Quên mật khẩu nằm ngang */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: 10 }}>
                <Checkbox>Lưu mật khẩu</Checkbox>
              </Form.Item> */}
              <Form.Item name="forgot-password" style={{ marginBottom: 10, color: 'blue' }}>
                <a href="/auth/forgot-password">Quên mật khẩu?</a>
              </Form.Item>
            </div>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" block style={{padding: '20px 10px'}}>
                Đăng nhập
              </Button>
            </Form.Item>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              Bạn chưa có tài khoản?{' '} <a href="/auth/register" style={{color: 'blue'}}>Đăng ký ngay</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
