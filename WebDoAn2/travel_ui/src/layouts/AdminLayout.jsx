import React, { useState } from 'react';
import { Modal, Menu, Button } from 'antd';
import { LockOutlined, BookOutlined, DashboardOutlined, AppleOutlined, HomeOutlined, CarOutlined, 
    UsergroupAddOutlined } from '@ant-design/icons';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import Logo from '../assets/images/Anh2.jpg';

import { Dropdown, Avatar, App, Form, Input } from 'antd';
import {
    UserOutlined, DownOutlined
} from '@ant-design/icons';

import * as usersService from '../services/UsersService';
import refreshToken from '../utils/refreshToken';

const AdminLayout = () => {
    const navigate = useNavigate();
    const [openLogoutModal, setOpenLogoutModal] = useState(false);

    const { message } = App.useApp();
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [form] = Form.useForm();

    const handleUpdatePassword = async (values) => {
        try {
            const userID = localStorage.getItem('userID');
            let token = localStorage.getItem('accessToken');
            const formData = { ...values, userID};

            let response = await usersService.UpdatePassword(token, formData);

            if (response.status === 401) {
                const refreshTokenBolean = await refreshToken();
                if (!refreshTokenBolean) {
                    message.error("Phiên đăng nhập của bạn đã hết hạn!");
                    localStorage.setItem('isAuthenticated', false);
                    navigate("/auth/login");
                    return null;
                }
                token = localStorage.getItem('accessToken');
                response = await usersService.UpdatePassword(token, formData);
            }

            if (response.status === 200) {
                message.success(response.data.message);
                setOpenPasswordModal(false);
            } else if (response.status === 404 || response.status === 400) {
                message.error(response.message);
            }
        } catch (error) {
            message.error("Lỗi không xác định!");
            console.log(error);
        }
    };

    const items = [
        {
            key: '1',
            label: (
                <Button type='text' className='p-0 hover:!bg-transparent hover:!text-custom1 font-semibold'
                    icon={<LockOutlined className='text-lg' />}
                    onClick={() => {
                        setOpenPasswordModal(true);
                        form.resetFields();
                    }}
                >
                    Cập nhật mật khẩu
                </Button>
            ),
        }
    ];

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#3B7097' }}>
            {/* Sidebar */}
            <aside style={{
                width: '280px',
                background: '#3B7097',
                padding: '20px 10px',
                display: 'flex',
                flexDirection: 'column',
            }}>
                {/* Logo */}
                <div style={{ color: '#fff', fontSize: '24px', padding: '10px 0', textAlign: 'center' }}>
                    <img src={Logo} alt="Logo của quản lý du lịch" style={{ width: 70, marginLeft: 100 }} />
                </div>

                {/* Menu */}
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    theme="dark"
                    style={{ fontSize: '16px', background: '#3B7097', fontWeight: 'bold' }}
                    
                >
                    <Menu.Item key="1" icon={<DashboardOutlined />} style={{fontSize: '16px', padding: '30px 10px', }}>
                        <Link to="/admin/dash-board">TRANG CHỦ</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<BookOutlined />} style={{fontSize: '16px', padding: '30px 10px' }}>
                        <Link to="/admin/manage-locations">QUẢN LÝ ĐỊA ĐIỂM</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<HomeOutlined />} style={{fontSize: '16px', padding: '30px 10px' }}>
                        <Link to="/admin/manage-hotels">QUẢN LÝ KHÁCH SẠN</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<CarOutlined />} style={{fontSize: '16px', padding: '30px 10px' }}>
                        <Link to="/admin/manage-transportType">LOẠI PHƯƠNG TIỆN</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<CarOutlined />} style={{fontSize: '16px', padding: '30px 10px' }}>
                        <Link to="/admin/manage-transports">QUẢN LÝ PHƯƠNG TIỆN</Link>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<AppleOutlined />} style={{fontSize: '16px', padding: '30px 10px' }}>
                        <Link to="/admin/manage-specialty">QUẢN LÝ MÓN ĂN</Link>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<BookOutlined />} style={{fontSize: '16px', padding: '30px 10px' }}>
                        <Link to="/admin/manage-reviews">QUẢN LÝ ĐÁNH GIÁ</Link>
                    </Menu.Item>
                    <Menu.Item key="8" icon={<UsergroupAddOutlined />} style={{fontSize: '16px', padding: '30px 10px' }}>
                        <Link to="/admin/manage-user">QUẢN LÝ NGƯỜI DÙNG</Link>
                    </Menu.Item>
                </Menu>

                {/* Logout */}
                <div style={{ marginTop: '30px', padding: '10px' }}>
                    <Button
                        block
                        icon={<LockOutlined />}
                        onClick={() => setOpenLogoutModal(true)}
                    >
                        Đăng xuất
                    </Button>
                    <Modal
                        title="Xác nhận"
                        open={openLogoutModal}
                        width={350}
                        onOk={() => {
                            localStorage.setItem('isAuthenticated', false);
                            navigate("/auth/login");
                        }}
                        cancelText="Không"
                        okText="Xác nhận"
                        onCancel={() => setOpenLogoutModal(false)}
                    >
                        Bạn có chắc muốn đăng xuất?
                    </Modal>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <header style={{
                    padding: '10px 20px',
                    backgroundColor: '#75BDE0',
                    borderBottom: '1px solid #d9d9d9',
                    display: 'flex', // Sử dụng Flexbox
                    justifyContent: 'space-between', // Chia khoảng cách giữa các phần tử
                    alignItems: 'center' // Căn giữa theo chiều dọc
                }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        QUẢN LÝ DU LỊCH
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', marginRight: '50px', backgroundColor: '#3B7097', padding: '3px 10px', borderRadius: '10px' }}>
                        <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer hover:opacity-80" />
                                <h2 style={{ margin: '0 10px' }}>Chào Admin</h2>
                                <DownOutlined />
                            </div>
                        </Dropdown>
                    </div>
                </header>

                <Modal
                    footer={null}
                    width={400}
                    open={openPasswordModal}
                    onCancel={() => setOpenPasswordModal(false)}
                >
                    <p className='text-center text-xl text-custom1 font-bold mb-4' style={{textAlign: 'center', fontWeight: 'bold'}}>CẬP NHẬT MẬT KHẨU</p>
                    <Form form={form} onFinish={handleUpdatePassword} layout="vertical" requiredMark={false}>
                        <Form.Item
                            label="Mật khẩu cũ"
                            name="oldPassword"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
                        >
                            <Input.Password className='mb-1' placeholder="Nhập mật khẩu cũ" />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu mới"
                            name="newPassword"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                                { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' },
                                { pattern: /^(?=.*[a-zA-Z])/, message: 'Mật khẩu phải chứa ít nhất một chữ cái!' }
                            ]}
                        >
                            <Input.Password className='mb-1' placeholder="Nhập mật khẩu mới" />
                        </Form.Item>
                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="confirmPassword"
                            dependencies={['newPassword']}
                            rules={[
                                { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
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
                            <Input.Password className='mb-1' placeholder="Nhập lại mật khẩu mới" />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType="submit" className="w-full h-10 mt-2" style={{margin : '0px 100px', padding: '0px 35px'}}>
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Content */}
                <section style={{
                    flex: 1,
                    padding: '20px',
                    backgroundColor: '#fff',
                    overflowY: 'auto',
                }}>
                    <Outlet /> {/* Hiển thị các component con */}
                </section>
            </main>
        </div>
    );
};

export default AdminLayout;
