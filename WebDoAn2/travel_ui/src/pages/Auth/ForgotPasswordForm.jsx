// import React, { useState, useRef, useEffect } from 'react';
// import { Form, Input, App, Button, Steps } from 'antd';
// import { MailOutlined, LockOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import * as authService from '../../services/AuthService';

// const { Step } = Steps;

// const ForgotPasswordForm = () => {
//     const { message } = App.useApp();
//     const [currentStep, setCurrentStep] = useState(0);
//     const [otp, setOtp] = useState(Array(4).fill(""));
//     const [countdown, setCountdown] = useState(0);
//     const [form] = Form.useForm();
//     const navigate = useNavigate();
//     const verificationCodeRef = useRef("");
//     const timerRef = useRef(null);

//     useEffect(() => {
//         return () => clearInterval(timerRef.current); // Clear timer when component unmounts
//     }, []);

//     const startCountdown = () => {
//         setCountdown(30);
//         timerRef.current = setInterval(() => {
//             setCountdown((prev) => {
//                 if (prev === 1) {
//                     clearInterval(timerRef.current);
//                     return 0;
//                 }
//                 return prev - 1;
//             });
//         }, 1000);
//     };

//     const handleSendOTP = async () => {
//         const email = form.getFieldValue('email');

//         if (!email) {
//             message.error('Vui lòng nhập email trước khi gửi OTP!');
//             return;
//         }

//         try {
//             const response = await authService.SendVerificationCode({ email });
//             if (response.status === 200) {
//                 verificationCodeRef.current = response.data.verificationCode;
//                 message.success('Mã OTP đã được gửi tới email của bạn.');
//                 startCountdown();
//             } else {
//                 message.error(response.data.message || 'Lỗi khi gửi OTP!');
//             }
//         } catch (error) {
//             message.error('Lỗi không xác định!');
//         }
//     };

//     const handleOtpChange = (value, index) => {
//         if (!/^[0-9]*$/.test(value)) return; // Only allow numeric input
//         const newOtp = [...otp];
//         newOtp[index] = value.slice(-1); // Keep only the last character
//         setOtp(newOtp);

//         if (value && index < otp.length - 1) {
//             document.getElementById(`otp-input-${index + 1}`).focus();
//         }
//     };

//     const handlePasswordReset = async (values) => {
//         const { email, newPassword } = values;
//         const enteredOtp = otp.join('');
    
//         if (enteredOtp !== verificationCodeRef.current) {
//             message.error('Mã OTP không chính xác!');
//             return;
//         }
    
//         try {
//             const response = await authService.ForgotPassword({ email, newPassword });
//             console.log(response); // Kiểm tra phản hồi từ API
//             if (response.status === 200) {
//                 message.success(response.data.message || 'Đặt lại mật khẩu thành công!');
//                 setCurrentStep(2);
//                 verificationCodeRef.current = ""; // Clear OTP after success
//             } else {
//                 message.error(response.data.message || 'Lỗi đặt lại mật khẩu!');
//             }
//         } catch (error) {
//             message.error('Lỗi không xác định!');
//         }
//     };    

//     const nextStep = () => {
//         if (currentStep === 0) {
//             handleSendOTP();
//         }
//         setCurrentStep((prev) => prev + 1);
//     };

//     const prevStep = () => {
//         if (currentStep > 0) {
//             setCurrentStep((prev) => prev - 1);
//         }
//     };

//     return (
//         <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
//             <h2 className="text-3xl font-bold text-center mb-10">QUÊN MẬT KHẨU</h2>
//             <Steps current={currentStep}>
//                 <Step title="Nhập Email" />
//                 <Step title="Nhập OTP & Mật Khẩu" />
//                 <Step title="Hoàn Tất" />
//             </Steps>

//             <Form form={form} onFinish={handlePasswordReset} layout="vertical">
//                 {currentStep === 0 && (
//                     <Form.Item
//                         name="email"
//                         label="Email"
//                         rules={[
//                             { required: true, message: 'Vui lòng nhập email!' },
//                             { type: 'email', message: 'Email không hợp lệ!' }
//                         ]}
//                     >
//                         <Input prefix={<MailOutlined />} placeholder="Nhập email của bạn" />
//                     </Form.Item>
//                 )}

//                 {currentStep === 1 && (
//                     <>
//                         <div className='flex justify-between mb-4'>
//                             {otp.map((value, index) => (
//                                 <Input
//                                     key={index}
//                                     id={`otp-input-${index}`}
//                                     maxLength={1}
//                                     value={value}
//                                     onChange={(e) => handleOtpChange(e.target.value, index)}
//                                     style={{ textAlign: 'center', width: '50px', marginRight: index < otp.length - 1 ? '10px' : '0' }}
//                                 />
//                             ))}
//                         </div>
//                         <Form.Item
//                             name="newPassword"
//                             label="Mật khẩu mới"
//                             rules={[
//                                 { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
//                                 { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' }
//                             ]}
//                         >
//                             <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu mới" />
//                         </Form.Item>
//                         <Form.Item
//                             name="confirmPassword"
//                             label="Xác nhận mật khẩu"
//                             dependencies={['newPassword']}
//                             rules={[
//                                 { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
//                                 ({ getFieldValue }) => ({
//                                     validator(_, value) {
//                                         if (!value || getFieldValue('newPassword') === value) {
//                                             return Promise.resolve();
//                                         }
//                                         return Promise.reject(new Error('Mật khẩu không khớp!'));
//                                     }
//                                 })
//                             ]}
//                         >
//                             <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" />
//                         </Form.Item>
//                         <Button type="default" block onClick={prevStep} className="mt-2">
//                             Quay lại
//                         </Button>
//                     </>
//                 )}

//                 {currentStep === 2 && (
//                     <div className="text-center">
//                         <p className="text-lg">Đặt lại mật khẩu thành công!</p>
//                         <Button type="link" onClick={() => navigate('/auth/login')}>
//                             Trở lại đăng nhập
//                         </Button>
//                     </div>
//                 )}

//                 {currentStep < 2 && (
//                     <Button type="primary" htmlType="submit" block onClick={nextStep} disabled={countdown > 0 && currentStep === 0}>
//                         {currentStep === 0 ? (countdown > 0 ? `Gửi lại OTP sau ${countdown}s` : 'Gửi OTP') : 'Xác nhận'}
//                     </Button>
//                 )}
//             </Form>
//         </div>
//     );
// };

// export default ForgotPasswordForm;


import React, { useState, useRef } from 'react';
import { Form, Input, App, Button, Modal } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/AuthService';

const ForgotPasswordForm = () => {
    const { message } = App.useApp();
    const [otpSent, setOtpSent] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const verifyCode = useRef("");
    const timerRef = useRef(null);
    const otpResetTimerRef = useRef(null);
    const [newPasswordModalVisible, setNewPasswordModalVisible] = useState(false);
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [otp, setOtp] = useState(Array(4).fill(''));

    const handleSendOTP = async () => {
        const email = form.getFieldValue('email');
        
        if (!email) {
            message.error('Vui lòng nhập email trước khi gửi OTP!');
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

        setOtpSent(true);
        setCountdown(30);
        timerRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                    setOtpSent(false); // Reset trạng thái gửi OTP
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        message.info('Mã OTP đã được gửi đến email của bạn.');
        try {
            const response = await authService.SendVerificationCode({ email });
            if (response.status === 200) {
                verifyCode.current = response.data.verificationCode;
                otpResetTimerRef.current = setTimeout(() => {
                    verifyCode.current = "";
                }, 180000);
                setNewPasswordModalVisible(true); // Open new password modal
            } else if (response.status === 404) {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error("Lỗi không xác định!");
            console.log(error);
        }
    };

    const onFinish = async (values) => {
        const otpValue = otp.join('');
        if (otpValue !== verifyCode.current) {
            message.error('Mã OTP không đúng!');
            return;
        }
        var formData = {
            email: values.email,
            newPassword: values.newPassword
        }
        try {
            const response = await authService.ForgotPassword(formData);
            if (response.status === 200) {
                message.success(response.data.message);
                navigate("/auth/login");
            } else if (response.data.status === 404) {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error("Lỗi không xác định!");
            console.log(error);
        }
    };

    const handleOtpInputChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleOtpSubmit = () => {
        const otpValue = otp.join('');
        if (otpValue.length === 4) {
            onFinish({ email: form.getFieldValue('email'), newPassword: form.getFieldValue('newPassword'), otp: otpValue });
            setOtpModalVisible(false);
        } else {
            message.error('Vui lòng nhập đầy đủ mã OTP!');
        }
    };

    const isNextButtonDisabled = () => {
        return !form.isFieldsTouched(['newPassword', 'confirmPassword'], true) ||
               form.getFieldsError().some(({ errors }) => errors.length > 0);
    };

    return (
        <div style={{backgroundColor: '#f0f0f0', width: '650px', margin: '150px auto', padding: '20px 90px', borderRadius: '10px'}}>
            <h2 style={{textAlign: 'center', fontSize:'25px', fontWeight: 'bold'}}>QUÊN MẬT KHẨU</h2>
            <Form form={form} layout="vertical" requiredMark={false}>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' },
                    ]}>
                    <Input
                        prefix={<MailOutlined className='mr-3 ' />}
                        className='mb-1'
                        placeholder="Nhập email" />
                </Form.Item>
                {!otpSent ? (
                    <Button
                        type='primary'
                        className="w-full h-12 mt-4 text-lg"
                        onClick={handleSendOTP}
                        style={{marginLeft: '170px', padding: '10px 40px'}}
                    >
                        Gửi OTP
                    </Button>
                ) : (
                    <p className="text-center mt-1 min-w-20">Gửi lại sau {countdown}s</p>
                )}
                <div className="text-center mt-4 ">
                    <Link to="/auth/login" className="text-custom1 hover:text-custom2 " style={{color: 'blueviolet'}}>
                        Trở lại đăng nhập
                    </Link>
                </div>
            </Form>

            {/* New Password Modal */}
            <Modal
                title="Nhập mật khẩu mới"
                visible={newPasswordModalVisible}
                onCancel={() => setNewPasswordModalVisible(false)}
                footer={null}
                style={{textAlign: 'center', padding: '60px 0px'}}
            >
                <Form form={form} onFinish={handleSendOTP}>
                    <Form.Item
                        name="newPassword"
                        label="Mật khẩu mới"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                            { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' },
                            { pattern: /^(?=.*[a-zA-Z])/, message: 'Mật khẩu phải chứa ít nhất một chữ cái!' },
                            { pattern: /^\S*$/, message: 'Mật khẩu không được chứa khoảng trắng!' }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className='mr-3' />}
                            placeholder="Mật khẩu mới"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Xác nhận mật khẩu"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className='mr-3' />}
                            placeholder="Xác nhận mật khẩu"
                        />
                    </Form.Item>
                    <Button
                        type='primary'
                        className="w-full h-12 mt-4 text-lg"
                        disabled={isNextButtonDisabled()}
                        onClick={() => {
                            setNewPasswordModalVisible(true);
                            setOtpModalVisible(true);
                        }}
                    >
                        Tiếp theo
                    </Button>
                </Form>
            </Modal>

            {/* OTP Modal */}
            <Modal
                title="Nhập mã OTP"
                visible={otpModalVisible}
                onCancel={() => setOtpModalVisible(false)}
                footer={null}
                style={{textAlign: 'center'}}
            >
                <p style={{ textAlign: 'center', padding: '10px 50px' }}>
                    Mã OTP dùng để xác thực lại tài khoản, vui lòng nhập vào mã OTP xin cảm ơn!
                </p>
                <hr style={{ height: '3px', backgroundColor: '#3B7097', border: 'none', marginBottom: '10px', marginLeft: '120px', marginRight: '120px' }} />
                
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '8px', // Khoảng cách giữa các ô
                        marginTop: '20px',
                    }}
                >
                    {otp.map((value, index) => (
                        <Input
                            key={index}
                            id={`otp-input-${index}`}
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleOtpInputChange(index, e.target.value)}
                            style={{
                                width: '50px',
                                height: '50px',
                                textAlign: 'center',
                                fontSize: '20px',
                            }}
                        />
                    ))}
                </div>
                
                <Button
                    type="primary"
                    className="w-full h-12 mt-4 text-lg"
                    onClick={handleOtpSubmit}
                    style={{margin: '25px 0px'}}
                >
                    Đặt lại mật khẩu
                </Button>
            </Modal>

        </div>
    );
};

export default ForgotPasswordForm;
