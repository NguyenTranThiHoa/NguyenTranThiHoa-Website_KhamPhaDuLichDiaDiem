// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { App, Breadcrumb, Table, Input, Tooltip, Modal, Form, Button, Select, Upload, Image } from 'antd';
// import { SearchOutlined, EditOutlined, UploadOutlined, FormOutlined } from '@ant-design/icons';
// import * as usersService from '../../services/UsersService';
// import refreshToken from '../../utils/refreshToken';

// const ManageUsers = () => {
//     const navigate = useNavigate();
//     const { message } = App.useApp();

//     const [user, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchText, setSearchText] = useState('');
//     const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
//     const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
//     const [form] = Form.useForm();

//     const [fileList, setFileList] = useState([]);
//     const [previewOpen, setPreviewOpen] = useState(false);
//     const [previewImage, setPreviewImage] = useState('');
//     const selectedUsersImage = useRef("");

//     const selectUsersID = useRef(null);

//     const refreshAccessToken = useCallback(async () => {
//         try {
//             const refreshTokenBolean = await refreshToken();
//             if (!refreshTokenBolean) {
//                 message.error("Phiên đăng nhập của bạn đã hết hạn!");
//                 localStorage.setItem('isAuthenticated', false);
//                 navigate("/auth/login");
//                 return null;
//             }
//             return localStorage.getItem('accessToken');
//         } catch (error) {
//             console.error("Lỗi làm mới token:", error);
//             message.error("Không thể làm mới phiên đăng nhập!");
//             return null;
//         }
//     }, [message, navigate]);

//     const getUsers = useCallback(async () => {
//         try {
//             let token = localStorage.getItem('accessToken');
//             let response = await usersService.GetUsers(token);

//             if (response.status === 401) {
//                 token = await refreshAccessToken();
//                 if (!token) return;
//                 response = await usersService.GetUsers(token);
//             }

//             if (response.status === 200) {
//                 setUsers(response.data);
//             }
//         } catch (error) {
//             message.error("Không thể tải dữ liệu người dùng!");
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     }, [message, refreshAccessToken]);

//     useEffect(() => {
//         getUsers();
//     }, [getUsers]);

//     const filteredUsers = user.filter(c => {
//         const stringSearch = searchText.toLowerCase();
//         return String(c.userID) === stringSearch || c.fullName.toLowerCase().includes(stringSearch);
//     });

//     const getBase64 = (file) =>
//         new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = () => resolve(reader.result);
//             reader.onerror = (error) => reject(error);
//         });

//     const handleUploadChange = ({ fileList: newFileList }) => {
//         setFileList(newFileList);
//     };

//     const handlePreview = async (file) => {
//         if (!file.url && !file.preview) {
//             file.preview = await getBase64(file.originFileObj);
//         }
//         setPreviewImage(file.url || file.preview);
//         setPreviewOpen(true);
//     };

//     const handleOpenRoleModal = (user) => {
//         setIsRoleModalOpen(true);
//         selectUsersID.current = user.userID;
//         form.setFieldsValue({ role: user.role });
//     };

//     const handleOpenInfoModal = (user) => {
//         setIsInfoModalOpen(true);
//         selectUsersID.current = user.userID;
//         selectedUsersImage.current = user.imageUser;

//         form.setFieldsValue({
//             fullName: user.fullName,
//             phone: user.phone
//         });
//         if (user.imageUser) {
//             setFileList([
//                 {
//                     uid: '-1',
//                     name: user.imageUser,
//                     status: 'done',
//                     url: `https://localhost:7054/api/images/${user.imageUser}`,
//                 },
//             ]);
//         }
//     };

//     const handleCancelRoleModal = () => {
//         setIsRoleModalOpen(false);
//         form.resetFields();
//     };

//     const handleCancelInfoModal = () => {
//         setIsInfoModalOpen(false);
//         selectUsersID.current = null;
//         form.resetFields();
//         setFileList([]); // Reset file list on modal close
//     };

//     const handleSubmitRole = async (values) => {
//         try {
//             let token = localStorage.getItem('accessToken');
//             let response = await usersService.UpdateUsersRole(token, selectUsersID.current, { role: values.role });

//             if (response.status === 401) {
//                 token = await refreshAccessToken();
//                 if (!token) return;
//                 response = await usersService.UpdateUsersRole(token, selectUsersID.current, { role: values.role });
//             }

//             if (response.status === 200) {
//                 message.success("Cập nhật vai trò người dùng thành công!");
//                 await getUsers();
//             } else {
//                 message.error("Không thể cập nhật vai trò người dùng!");
//             }
//         } catch (error) {
//             message.error("Lỗi cập nhật vai trò người dùng!");
//             console.log(error);
//         }
//         handleCancelRoleModal();
//     }

//     const handleUploadImage = async () => {
//         if (!fileList || fileList.length === 0) {
//             message.error("Vui lòng chọn ảnh!");
//             return null;
//         }
//         try {
//             let token = localStorage.getItem('accessToken');
//             const formData = new FormData();
//             formData.append('imageFile', fileList[0].originFileObj);
//             let response = await usersService.UploadImage(token, formData);
//             if (response.status === 401) {
//                 const refreshTokenBolean = await refreshToken();
//                 if (!refreshTokenBolean) {
//                     message.error("Phiên đăng nhập của bạn đã hết hạn!");
//                     navigate("/auth/login");
//                     return null;
//                 }
//                 token = localStorage.getItem('accessToken');
//                 response = await usersService.UploadImage(token, formData);
//             }

//             if (response.status === 200) {
//                 return response.data.imagePath;
//             } else {
//                 message.error("Lỗi khi tải ảnh lên!");
//             }
//         } catch (error) {
//             message.error("Lỗi khi upload hình ảnh!");
//             console.log(error);
//             return null;
//         }
//     }

//     const handleEditUser = async (values) => {
//         try {
//             values.imageUser = selectedUsersImage.current;
//             if (values.imageUser !== fileList[0]?.name) {
//                 const imageUser = await handleUploadImage();
//                 values.imageUser = imageUser;
//             }

//             let token = localStorage.getItem('accessToken');
//             let response = await usersService.UpdateUsers(token, selectUsersID.current, values);

//             if (response.status === 401) {
//                 const refreshTokenBolean = await refreshToken();
//                 if (!refreshTokenBolean) {
//                     message.error("Phiên đăng nhập của bạn đã hết hạn!");
//                     navigate("/auth/login");
//                     return null;
//                 }
//                 token = localStorage.getItem('accessToken');
//                 response = await usersService.UpdateUsers(token, selectUsersID.current, values);
//             }
//             if (response.status === 200) {
//                 message.success("Cập nhật người dùng thành công!");
//                 await getUsers();
//             } else {
//                 message.error("Cập nhật người dùng thất bại!");
//             }
//         } catch (error) {
//             message.error("Lỗi không xác định!");
//             console.log(error);
//         }
//         handleCancelInfoModal();
//     }

//     const maskData = (data, type) => {
//         if (!data) return '';
//         let firstPart, lastPart;
//         switch (type) {
//             case 'email':
//                 firstPart = data.split('@')[0].slice(0, 3);
//                 lastPart = data.split('@')[0].slice(-2);
//                 return firstPart + '***' + lastPart + '@' + data.split('@')[1];
//             case 'phone':
//                 firstPart = data.slice(0, 4);
//                 lastPart = data.slice(-4);
//                 return firstPart + '****' + lastPart;
//             default:
//                 return data;
//         }
//     };

//     const roleMap = {
//         Admin: 'Admin',
//         User: 'Người dùng',
//     };

//     const columns = [
//         { title: 'ID', dataIndex: 'userID', key: 'userID', align: 'center', width: 50 },
//         {
//             title: 'Họ và tên', dataIndex: 'fullName', key: 'fullName', align: 'center', ellipsis: true, width: 150,
//             render: (fullName) => (
//                 <Tooltip placement="topLeft" title={fullName}>
//                     {fullName}
//                 </Tooltip>
//             ),
//         },
//         {
//             title: 'Email', dataIndex: 'email', key: 'email', align: 'center', ellipsis: true,
//             render: (email) => (
//                 <Tooltip placement="topLeft" title={maskData(email, "email")}>
//                     {maskData(email, "email")}
//                 </Tooltip>
//             ),
//         },
//         {
//             title: 'Số điện thoại', dataIndex: 'phone', key: 'phone', align: 'center', ellipsis: true,
//             render: (phone) => (
//                 <Tooltip placement="topLeft" title={phone}>
//                     {phone}
//                 </Tooltip>
//             ),
//         },
//         {
//             title: 'Ảnh', dataIndex: 'imageUser', key: 'imageUser', align: 'center', width: 80,
//             render: (path) =>
//                 <img src={`https://localhost:7054/api/images/${path}`} alt="Hình ảnh" className='w-full h-12 object-cover' />
//         },
//         {
//             title: 'Tên đăng nhập', dataIndex: 'username', key: 'username', align: 'center', ellipsis: true,
//             render: (username) => (
//                 <Tooltip placement="topLeft" title={username}>
//                     {username}
//                 </Tooltip>
//             ),
//         },
//         {
//             title: 'Mật khẩu', dataIndex: 'password', key: 'password', align: 'center', ellipsis: true,
//             render: (password) => (
//                 <Tooltip placement="topLeft" title={password}>
//                     {password}
//                 </Tooltip>
//             ),
//         },
//         {
//             title: 'Chức năng', dataIndex: 'role', key: 'role', align: 'center',
//             render: (role) => (
//                 <span className={`${role === "Admin" ? "text-violet-600" : "text-blue-500"} font-medium`}>
//                     {roleMap[role] || 'Người dùng'}
//                 </span>
//             ),
//             filters: [
//                 { text: 'Quản lý', value: 'Admin' },
//                 { text: 'Người dùng', value: 'User' },
//             ],
//             onFilter: (value, record) => record.role.startsWith(value),
//             filterSearch: true,
//         },
//         {
//             title: 'Thao tác', key: 'actions', align: 'center', width: 150,
//             render: (_, record) => {
//                 return (
//                     <div className='flex gap-2 justify-center'>
//                         <Tooltip title="Cập nhật chức năng" placement='bottom' color={"gold"}>
//                             <Button
//                                 className="px-3 py-5 border-yellow-500 hover:!border-yellow-500"
//                                 onClick={() => handleOpenRoleModal(record)}>
//                                 <EditOutlined className='text-yellow-500' />
//                             </Button>
//                         </Tooltip>
//                         <Tooltip title="Cập nhật thông tin" placement='bottom' color={"gold"}>
//                             <Button
//                                 className='px-3 py-5 border-red-500 hover:!border-yellow-500'
//                                 onClick={() => handleOpenInfoModal(record)}>
//                                 <FormOutlined style={{ color: 'blueviolet' }} />
//                             </Button>
//                         </Tooltip>
//                     </div>
//                 );
//             }
//         }
//     ];

//     return (
//         <>
//             <Breadcrumb
//                 items={[
//                     { title: 'Admin' },
//                     { title: "Quản lý người dùng" }
//                 ]}
//             />
//             <div className='bg-white mt-4 p-4 rounded-md shadow-md' style={{ minHeight: 'calc(100vh - 8rem)', backgroundColor: '#f0f0f0', marginTop: '10px', borderRadius: '5px' }}>
//                 <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>QUẢN LÝ NGƯỜI DÙNG</h2>
//                 <div className="flex justify-between items-center mb-4" style={{ padding: '10px 10px', marginLeft: '50px' }}>
//                     <Input
//                         placeholder="Tìm người dùng..."
//                         prefix={<SearchOutlined className='mr-2' />}
//                         onChange={(e) => setSearchText(e.target.value)}
//                         className='mb-4'
//                         style={{ width: 450, marginLeft: '330px' }}
//                     />
//                 </div>

//                 <Table
//                     columns={columns}
//                     dataSource={filteredUsers}
//                     rowKey="userID"
//                     loading={loading}
//                     pagination={{ pageSize: 5 }}
//                     style={{ padding: '0px 20px' }}
//                 />
//             </div>

//             {/* Modal Cập Nhật Vai Trò */}
//             <Modal
//                 open={isRoleModalOpen}
//                 onCancel={handleCancelRoleModal}
//                 footer={null}
//                 width={350}
//                 style={{ top: 150 }}
//             >
//                 <p className='text-center text-xl text-custom1 font-bold mb-6'>CẬP NHẬT CHỨC NĂNG</p>
//                 <Form form={form} onFinish={handleSubmitRole} layout="horizontal" requiredMark={false}>
//                     <Form.Item
//                         name="role"
//                         label="Chức năng"
//                         rules={[{ required: true, message: 'Vui lòng chọn chức năng!' }]}
//                     >
//                         <Select
//                             placeholder="Chọn chức năng"
//                             className='mb-1 mt-2'
//                             options={[
//                                 { label: 'Quản lý', value: 'Admin' },
//                                 { label: 'Người dùng', value: 'User' }
//                             ]}
//                         />
//                     </Form.Item>
//                     <Form.Item>
//                         <Button type='primary' htmlType="submit" className="w-full h-10 mt-2">
//                             Cập nhật
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </Modal>

//             {/* Modal Cập Nhật Thông Tin Người Dùng */}
//             <Modal
//                 open={isInfoModalOpen}
//                 onCancel={handleCancelInfoModal}
//                 footer={null}
//                 width={600}
//                 style={{ top: 20 }}
//             >
//                 <p className='text-center text-xl text-custom1 font-bold mb-4' style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold', paddingBottom: '5px' }}>
//                     CẬP NHẬT NGƯỜI DÙNG
//                 </p>
//                 <Form form={form} onFinish={handleEditUser} layout="horizontal" requiredMark={false} labelCol={{ span: 6 }}>
//                     <Form.Item
//                         name="fullName"
//                         label="Họ và tên"
//                         rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
//                     >
//                         <Input placeholder='Nhập tên!' />
//                     </Form.Item>

//                     <Form.Item
//                         name="phone"
//                         label="Số điện thoại"
//                         rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
//                     >
//                         <Input className='mb-1 mt-2' placeholder='Nhập số điện thoại' />
//                     </Form.Item>

//                     <Form.Item
//                         name="imageUser"
//                         label="Hình ảnh"
//                         rules={[
//                             {
//                                 validator: (_, value) => {
//                                     if (fileList.length === 0) {
//                                         return Promise.reject(new Error('Vui lòng chọn hình ảnh!'));
//                                     }
//                                     return Promise.resolve();
//                                 },
//                             },
//                         ]}
//                     >
//                         <Upload
//                             beforeUpload={() => false}
//                             fileList={fileList}
//                             onPreview={handlePreview}
//                             onChange={handleUploadChange}
//                             accept="image/*"
//                             listType="picture"
//                         >
//                             {fileList.length < 1 && (
//                                 <Button className="mt-2 mb-1" icon={<UploadOutlined />}>
//                                     Chọn Ảnh
//                                 </Button>
//                             )}
//                         </Upload>
//                     </Form.Item>

//                     {previewImage && (
//                         <Image
//                             wrapperStyle={{
//                                 display: 'none',
//                             }}
//                             preview={{
//                                 visible: previewOpen,
//                                 onVisibleChange: (visible) => setPreviewOpen(visible),
//                                 afterOpenChange: (visible) => !visible && setPreviewImage(''),
//                             }}
//                             src={previewImage}
//                         />
//                     )}

//                     <Form.Item>
//                         <Button
//                             type='primary'
//                             htmlType="submit"
//                             className="w-full h-10 mt-2"
//                             style={{ padding: '0px 40px', marginLeft: '200px' }}
//                         >
//                             Cập nhật
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </>
//     );
// }

// export default ManageUsers;






import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, Breadcrumb, Table, Input, Tooltip, Modal, Form, Button, Select, Upload, Image } from 'antd';
import { SearchOutlined, EditOutlined, UploadOutlined, FormOutlined } from '@ant-design/icons';
import * as usersService from '../../services/UsersService';
import refreshToken from '../../utils/refreshToken';

const ManageUsers = () => {
    const navigate = useNavigate();
    const { message } = App.useApp();

    const [user, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [form] = Form.useForm();

    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const selectedUsersImage = useRef("");

    const selectUsersID = useRef(null);

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
    }, [message, navigate]);

    const getUsers = useCallback(async () => {
        try {
            let token = localStorage.getItem('accessToken');
            let response = await usersService.GetUsers(token);

            if (response.status === 401) {
                token = await refreshAccessToken();
                if (!token) return;
                response = await usersService.GetUsers(token);
            }

            if (response.status === 200) {
                setUsers(response.data);
            }
        } catch (error) {
            message.error("Không thể tải dữ liệu người dùng!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [message, refreshAccessToken]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const filteredUsers = user.filter(c => {
        const stringSearch = searchText.toLowerCase();
        return String(c.userID) === stringSearch || c.fullName.toLowerCase().includes(stringSearch);
    });

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

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

    const handleOpenRoleModal = (user) => {
        setIsRoleModalOpen(true);
        selectUsersID.current = user.userID;
        form.setFieldsValue({ role: user.role });
    };

    const handleOpenInfoModal = (user) => {
        selectUsersID.current = user.userID;
        selectedUsersImage.current = user.imageUser;

        form.setFieldsValue({
            fullName: user.fullName,
            phone: user.phone,
        });
        if (user.imageUser) {
            setFileList([
                {
                    uid: '-1',
                    name: user.imageUser,
                    status: 'done',
                    url: `https://localhost:7054/api/images/${user.imageUser}`,
                },
            ]);
        }
        setIsInfoModalOpen(true);
    };

    const handleCancelRoleModal = () => {
        setIsRoleModalOpen(false);
        form.resetFields();
    };

    const handleCancelInfoModal = () => {
        setIsInfoModalOpen(false);
        selectUsersID.current = null;
        form.resetFields();
        setFileList([]); // Reset file list on modal close
    };

    const handleSubmitRole = async (values) => {
        try {
            let token = localStorage.getItem('accessToken');
            let response = await usersService.UpdateUsersRole(token, selectUsersID.current, { role: values.role });

            if (response.status === 401) {
                token = await refreshAccessToken();
                if (!token) return;
                response = await usersService.UpdateUsersRole(token, selectUsersID.current, { role: values.role });
            }

            if (response.status === 200) {
                message.success("Cập nhật vai trò người dùng thành công!");
                await getUsers();
            } else {
                message.error("Không thể cập nhật vai trò người dùng!");
            }
        } catch (error) {
            message.error("Lỗi cập nhật vai trò người dùng!");
            console.log(error);
        }
        handleCancelRoleModal();
    }

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
                return response.data.imagePath;
            } else {
                message.error("Lỗi khi tải ảnh lên!");
            }
        } catch (error) {
            message.error("Lỗi khi upload hình ảnh!");
            console.log(error);
            return null;
        }
    }

    const handleEditUser = async (values) => {
        try {
            values.imageUser = selectedUsersImage.current;

            // Nếu có hình ảnh mới, hãy tải lên hình ảnh
            if (fileList.length > 0 && fileList[0].originFileObj) {
                const imageUser = await handleUploadImage();
                if (imageUser) {
                    values.imageUser = imageUser; // Cập nhật đường dẫn hình ảnh
                }
            }

            let token = localStorage.getItem('accessToken');
            let response = await usersService.UpdateUsers(token, selectUsersID.current, values);

            if (response.status === 401) {
                const refreshTokenBolean = await refreshToken();
                if (!refreshTokenBolean) {
                    message.error("Phiên đăng nhập của bạn đã hết hạn!");
                    navigate("/auth/login");
                    return null;
                }
                token = localStorage.getItem('accessToken');
                response = await usersService.UpdateUsers(token, selectUsersID.current, values);
            }
            if (response.status === 200) {
                message.success("Cập nhật người dùng thành công!");
                await getUsers();
            } else {
                message.error("Cập nhật người dùng thất bại!");
            }
        } catch (error) {
            message.error("Lỗi không xác định!");
            console.log(error);
        }
        handleCancelInfoModal();
    }

    const maskData = (data, type) => {
        if (!data) return '';
        let firstPart, lastPart;
        switch (type) {
            case 'email':
                firstPart = data.split('@')[0].slice(0, 3);
                lastPart = data.split('@')[0].slice(-2);
                return firstPart + '***' + lastPart + '@' + data.split('@')[1];
            case 'phone':
                firstPart = data.slice(0, 4);
                lastPart = data.slice(-4);
                return firstPart + '****' + lastPart;
            default:
                return data;
        }
    };

    const roleMap = {
        Admin: 'Admin',
        User: 'Người dùng',
    };

    const columns = [
        { title: 'ID', dataIndex: 'userID', key: 'userID', align: 'center', width: 50 },
        {
            title: 'Họ và tên', dataIndex: 'fullName', key: 'fullName', align: 'center', ellipsis: true, width: 150,
            render: (fullName) => (
                <Tooltip placement="topLeft" title={fullName}>
                    {fullName}
                </Tooltip>
            ),
        },
        {
            title: 'Email', dataIndex: 'email', key: 'email', align: 'center', ellipsis: true,
            render: (email) => (
                <Tooltip placement="topLeft" title={maskData(email, "email")}>
                    {maskData(email, "email")}
                </Tooltip>
            ),
        },
        {
            title: 'Số điện thoại', dataIndex: 'phone', key: 'phone', align: 'center', ellipsis: true,
            render: (phone) => (
                <Tooltip placement="topLeft" title={phone}>
                    {phone}
                </Tooltip>
            ),
        },
        {
            title: 'Ảnh', dataIndex: 'imageUser', key: 'imageUser', align: 'center', width: 80,
            render: (path) =>
                <img src={`https://localhost:7054/api/images/${path}`} alt="Hình ảnh" className='w-full h-12 object-cover' />
        },
        {
            title: 'Tên đăng nhập', dataIndex: 'username', key: 'username', align: 'center', ellipsis: true,
            render: (username) => (
                <Tooltip placement="topLeft" title={username}>
                    {username}
                </Tooltip>
            ),
        },
        {
            title: 'Mật khẩu', dataIndex: 'password', key: 'password', align: 'center', ellipsis: true,
            render: (password) => (
                <Tooltip placement="topLeft" title={password}>
                    {password}
                </Tooltip>
            ),
        },
        {
            title: 'Chức năng', dataIndex: 'role', key: 'role', align: 'center',
            render: (role) => (
                <span className={`${role === "Admin" ? "text-violet-600" : "text-blue-500"} font-medium`}>
                    {roleMap[role] || 'Người dùng'}
                </span>
            ),
            filters: [
                { text: 'Quản lý', value: 'Admin' },
                { text: 'Người dùng', value: 'User' },
            ],
            onFilter: (value, record) => record.role.startsWith(value),
            filterSearch: true,
        },
        {
            title: 'Thao tác', key: 'actions', align: 'center', width: 150,
            render: (_, record) => {
                return (
                    <div className='flex gap-2 justify-center'>
                        <Tooltip title="Cập nhật chức năng" placement='bottom' color={"gold"}>
                            <Button
                                className="px-3 py-5 border-yellow-500 hover:!border-yellow-500"
                                onClick={() => handleOpenRoleModal(record)}>
                                <EditOutlined className='text-yellow-500' />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Cập nhật thông tin" placement='bottom' color={"gold"}>
                            <Button
                                className='px-3 py-5 border-red-500 hover:!border-yellow-500'
                                onClick={() => handleOpenInfoModal(record)}>
                                <FormOutlined style={{ color: 'blueviolet' }} />
                            </Button>
                        </Tooltip>
                    </div>
                );
            }
        }
    ];

    return (
        <>
            <Breadcrumb
                items={[
                    { title: 'Admin' },
                    { title: "Quản lý người dùng" }
                ]}
            />
            <div className='bg-white mt-4 p-4 rounded-md shadow-md' style={{ minHeight: 'calc(100vh - 8rem)', backgroundColor: '#f0f0f0', marginTop: '10px', borderRadius: '5px' }}>
                <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px' }}>QUẢN LÝ NGƯỜI DÙNG</h2>
                <div className="flex justify-between items-center mb-4" style={{ padding: '10px 10px', marginLeft: '50px' }}>
                    <Input
                        placeholder="Tìm người dùng..."
                        prefix={<SearchOutlined className='mr-2' />}
                        onChange={(e) => setSearchText(e.target.value)}
                        className='mb-4'
                        style={{ width: 450, marginLeft: '330px' }}
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredUsers}
                    rowKey="userID"
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                    style={{ padding: '0px 20px' }}
                />
            </div>

            {/* Modal Cập Nhật Vai Trò */}
            <Modal
                open={isRoleModalOpen}
                onCancel={handleCancelRoleModal}
                footer={null}
                width={350}
                style={{ top: 150 }}
            >
                <p className='text-center text-xl text-custom1 font-bold mb-6'>CẬP NHẬT CHỨC NĂNG</p>
                <Form form={form} onFinish={handleSubmitRole} layout="horizontal" requiredMark={false}>
                    <Form.Item
                        name="role"
                        label="Chức năng"
                        rules={[{ required: true, message: 'Vui lòng chọn chức năng!' }]}
                    >
                        <Select
                            placeholder="Chọn chức năng"
                            className='mb-1 mt-2'
                            options={[
                                { label: 'Quản lý', value: 'Admin' },
                                { label: 'Người dùng', value: 'User' }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType="submit" className="w-full h-10 mt-2">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal Cập Nhật Thông Tin Người Dùng */}
            <Modal
                open={isInfoModalOpen}
                onCancel={handleCancelInfoModal}
                footer={null}
                width={600}
                style={{ top: 20 }}
            >
                <p className='text-center text-xl text-custom1 font-bold mb-4' style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold', paddingBottom: '5px' }}>
                    CẬP NHẬT NGƯỜI DÙNG
                </p>
                <Form form={form} onFinish={handleEditUser} layout="horizontal" requiredMark={false} labelCol={{ span: 6 }}>
                    <Form.Item
                        name="fullName"
                        label="Họ và tên"
                        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                    >
                        <Input placeholder='Nhập tên!' />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                        <Input className='mb-1 mt-2' placeholder='Nhập số điện thoại' />
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

                    {previewImage && (
                        <Image
                            wrapperStyle={{
                                display: 'none',
                            }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType="submit"
                            className="w-full h-10 mt-2"
                            style={{ padding: '0px 40px', marginLeft: '200px' }}
                        >
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default ManageUsers;