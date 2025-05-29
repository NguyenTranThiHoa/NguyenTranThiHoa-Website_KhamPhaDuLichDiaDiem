import React, { useState, useRef } from "react";
import { Form, Input, Row, Col, Button, App } from "antd";
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined, SafetyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/AuthService";
import DuLich7 from '../../assets/images/DuLich7.jpg';

const RegisterForm = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(0);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();
  const verificationCodeRef = useRef("");
  const timerRef = useRef(null);
  const otpResetTimerRef = useRef(null);

  // Gửi mã OTP
  const handleSendOTP = async () => {
    const email = form.getFieldValue("email");
    if (!email) {
      message.error("Vui lòng nhập email trước khi gửi OTP.");
      return;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (otpResetTimerRef.current) {
      clearTimeout(otpResetTimerRef.current);
      otpResetTimerRef.current = null;
    }

    setCountdown(60);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    message.info('Mã OTP đã được gửi đến email của bạn.');
    try {
      const response = await authService.SendVerificationCode({ email });
      if (response.status === 200) {
        verificationCodeRef.current = response.data.verificationCode;
        otpResetTimerRef.current = setTimeout(() => {
          verificationCodeRef.current = "";
        }, 180000); // Xóa mã OTP sau 3 phút
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Lỗi không xác định!");
      console.error(error);
    }
  };

  // Xử lý khi người dùng nhập OTP
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Đảm bảo chỉ lấy 1 ký tự duy nhất
    setOtp(newOtp);

    // Chuyển sang ô tiếp theo khi nhập xong 1 ký tự
    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Xử lý khi form đăng ký được submit
  const onFinish = async (values) => {
    // Kiểm tra mã OTP trước khi gửi yêu cầu đăng ký
    if (otp.join("") === "" || otp.join("") !== verificationCodeRef.current) {
      message.error("Vui lòng nhập mã OTP đúng!");
      return;
    }

    const formData = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      username: values.username,
      password: values.password,
      role: "User", // Vai trò mặc định là "User"
    };

    try {
      const response = await authService.Register(formData);
      if (response.status === 200) {
        message.success(response.data.message);
        navigate("/auth/login");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra khi đăng ký!");
    }
  };

  return (
    <div style={{ margin: "20px auto", maxWidth: "700px", backgroundColor: '#f0f0f0', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '10px', fontWeight: 'bold' }}>ĐĂNG KÝ</h2>
      <div
        style={{
          width: '100%',
          height: '200px',
          backgroundImage: `url(${DuLich7})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 10,
          marginRight: '20px',
          marginBottom: '10px'
        }}
      ></div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input placeholder="Nhập họ và tên" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input placeholder="Nhập email" prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
            >
              <Input placeholder="Nhập số điện thoại" prefix={<PhoneOutlined />} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
            >
              <Input placeholder="Nhập tên đăng nhập" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item
              label="Mã OTP"
              rules={[{ required: true, message: "Vui lòng nhập mã OTP!" }]}
            >
              <Row gutter={8} justify="center">
                {otp.map((value, index) => (
                  <Col key={index}>
                    <Input
                      id={`otp-input-${index}`}
                      maxLength={1}
                      value={value}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onFocus={(e) => e.target.select()} // Tự động chọn nội dung khi ô được chọn
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && index > 0 && !value) {
                          document.getElementById(`otp-input-${index - 1}`).focus(); // Chuyển về ô trước nếu ô hiện tại trống và nhấn Backspace
                        }
                        if (e.key !== 'Backspace' && index < otp.length - 1 && value) {
                          document.getElementById(`otp-input-${index + 1}`).focus(); // Chuyển sang ô tiếp theo khi nhập xong
                        }
                      }}
                      prefix={<SafetyOutlined className='mr-3' />}
                      placeholder=""
                      style={{ textAlign: 'center', fontSize: '18px', width: '70px' }}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Row gutter={16} justify="space-between">
            <Col xs={24} sm={12}>
              <Button type="primary" htmlType="submit" block>
                Đăng ký
              </Button>
            </Col>

            <Col xs={24} sm={12}>
              <Button
                type="primary"
                onClick={handleSendOTP}
                disabled={countdown > 0}
                block
              >
                {countdown > 0 ? `Gửi lại sau ${countdown}s` : "Gửi mã OTP"}
              </Button>
            </Col>
          </Row>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            Bạn đã có tài khoản?{' '} <a href="/auth/login" style={{ color: 'blue' }}>Đăng nhập ngay</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
