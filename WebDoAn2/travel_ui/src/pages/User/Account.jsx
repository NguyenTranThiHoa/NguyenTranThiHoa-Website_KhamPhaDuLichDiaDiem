import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Spin, Row, Col, Upload, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as usersService from '../../services/UsersService';
import refreshToken from '../../utils/refreshToken';

const Account = () => {
    const navigate = useNavigate();
    const [formPass] = Form.useForm();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleUploadImage = async () => {
        if (!fileList || fileList.length === 0) {
            message.error("Vui lòng chọn ảnh!");
            return null;
        }
        try {
            let token = localStorage.getItem('accessToken');
            const formData = new FormData();
            formData.append('imageFile', fileList[0].originFileObj);
            let response = await usersService.UploadImage(token, formData);

            if (response.status === 401) {
                const refreshTokenBolean = await refreshToken();
                if (!refreshTokenBolean) {
                    message.error("Phiên đăng nhập của bạn đã hết hạn!");
                    navigate("/auth/login");
                    return null;
                }
                token = localStorage.getItem('accessToken');
                response = await usersService.UploadImage(token, formData);
            }

            if (response.status === 200) {
                return response.data.imagePath; // Đảm bảo rằng đường dẫn hình ảnh là đúng
            } else {
                message.error("Lỗi khi tải ảnh lên!");
            }
        } catch (error) {
            message.error("Lỗi khi upload hình ảnh!");
            console.log(error);
            return null;
        }
    };

    const refreshAccessToken = useCallback(async () => {
        try {
            const refreshTokenBolean = await refreshToken();
            if (!refreshTokenBolean) {
                message.error("Phiên đăng nhập của bạn đã hết hạn!");
                localStorage.setItem('isAuthenticated', false);
                navigate("/auth/login");
                return null;
            }
            return localStorage.getItem('accessToken');
        } catch (error) {
            console.error("Lỗi làm mới token:", error);
            message.error("Không thể làm mới phiên đăng nhập!");
            return null;
        }
    }, [navigate]);

    const getUsers = useCallback(async () => {
        try {
            const userID = localStorage.getItem('userID');
            let token = localStorage.getItem('accessToken');
            let response = await usersService.GetUsersById(token, userID);
            
            console.log("API Response:", response); // Thêm log để kiểm tra phản hồi
    
            if (response.status === 401) {
                token = await refreshAccessToken();
                if (!token) return;
                response = await usersService.GetUsersById(token, userID);
            }
            if (response.status === 200) {
                setUser(response.data);
            } else if (response.status === 404) {
                message.error(response.message);
            }
        } catch (error) {
            message.error("Không thể tải dữ liệu!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [refreshAccessToken]);    

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const handleUpdatePassword = async (values) => {
        try {
            const userID = localStorage.getItem('userID');
            let token = localStorage.getItem('accessToken');
            const formData = { ...values, userID };
            let response = await usersService.UpdatePassword(token, formData);
    
            if (response.status === 401) {
                token = await refreshAccessToken();
                if (!token) return;
                response = await usersService.UpdatePassword(token, formData);
            }
            if (response.status === 200) {
                formPass.resetFields();
                message.success(response.data.message);
            } else if (response.status === 404 || response.status === 400) {
                message.error(response.message);
            }
        } catch (error) {
            message.error("Lỗi khi cập nhật mật khẩu!");
            console.log(error);
        }
    };    

    const handleUpdateUser = async (values) => {
        try {
            const isSame = Object.keys(values).every(
                (key) => values[key] === user[key]
            );

            if (isSame) {
                message.info("Không có thay đổi nào để cập nhật!");
                return;
            }
            const userID = localStorage.getItem('userID');
            const formData = { ...values };
            let token = localStorage.getItem('accessToken');

            // Upload image if exists
            const imagePath = await handleUploadImage();
            if (imagePath) {
                formData.imageUser = imagePath; // Add image path to form data
            }

            let response = await usersService.UpdateUsers(token, userID, formData);

            if (response.status === 401) {
                token = await refreshAccessToken();
                if (!token) return;
                response = await usersService.UpdateUsers(token, userID, formData);
            }
            if (response.status === 200) {
                // Cập nhật user state với hình ảnh mới
                setUser(prevUser => ({ ...prevUser, imageUser: imagePath || prevUser.imageUser }));
                message.success('Cập nhật thông tin thành công!');
            } else if (response.status === 404 || response.status === 400) {
                message.error(response.message);
            }
        } catch (error) {
            message.error("Lỗi khi cập nhật thông tin!");
            console.log(error);
        }
    };

    if (loading) {
        return <Spin tip="Loading..." />;
    }

    return (
        <div style={{padding: '20px 50px'}}>
            <Row gutter={16}>
                <Col span={5}>
                {previewImage && (
                            <Image
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                                style={{ width: '70%', marginTop: 10}}
                            />
                        )}
                        {/* Hiển thị hình ảnh đã lưu */}
                        {user.imageUser && (
                            <Image
                                src={`https://localhost:7054/api/images/${user.imageUser}`}
                                style={{ width: '70%', marginTop: 30, border: '1px solid #d9d9d9', marginLeft: '50px' }}
                                alt="User Image"
                            />
                        )}
                </Col>
                <Col span={8}>
                    <h2 style={{textAlign: 'center', padding: '20px 0px', fontSize: '25px', fontWeight: 'bold'}}>THÔNG TIN TÀI KHOẢN CÁ NHÂN</h2>
                    <Form initialValues={user} onFinish={handleUpdateUser}>
                        <Form.Item
                            name="username"
                            label="Tên đăng nhập"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
                            <Input className='mb-1' placeholder="Nhập họ và tên" disabled/>
                        </Form.Item>
                        <Form.Item
                            name="fullName"
                            label="Họ và tên"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
                            <Input className='mb-1' placeholder="Nhập họ và tên" />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                { pattern: /^[0-9]{10}$/, message: 'Số điện thoại là 10 số' }
                            ]}>
                            <Input maxLength={10} placeholder='Nhập số điện thoại' />
                        </Form.Item>
                        <Form.Item
                            name="imageUser"
                            label="Hình ảnh"
                            rules={[
                                {
                                    validator: (_, value) => {
                                        if (fileList.length === 0) {
                                            return Promise.reject(new Error('Vui lòng chọn hình ảnh!'));
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Upload
                                beforeUpload={() => false}
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleUploadChange}
                                accept="image/*"
                                listType="picture"
                            >
                                {fileList.length < 1 && (
                                    <Button className="mt-2 mb-1" icon={<UploadOutlined />}>
                                        Chọn Ảnh
                                    </Button>
                                )}
                            </Upload>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginLeft: '180px'}}>Cập nhật thông tin</Button>
                    </Form>
                </Col>

                <Col span={8} style={{marginLeft:'50px'}}>
                <h2 style={{textAlign: 'center', padding: '20px 0px', fontSize: '25px', fontWeight: 'bold'}}>THAY ĐỔI MẬT KHẨU CÁ NHÂN</h2>
                <Form form={formPass} onFinish={handleUpdatePassword}>
                    <Form.Item name="oldPassword" label="Mật khẩu hiện tại" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="newPassword" label="Mật khẩu mới" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="confirmPassword" dependencies={['newPassword']} label="Xác nhận mật khẩu mới" rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu mới!' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Cập nhật mật khẩu</Button>
                </Form>
                </Col>
            </Row>
        </div>
    );
};

export default Account;
