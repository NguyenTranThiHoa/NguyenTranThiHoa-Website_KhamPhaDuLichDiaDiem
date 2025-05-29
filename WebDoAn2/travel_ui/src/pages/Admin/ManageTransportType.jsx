import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import refreshToken from '../../utils/refreshToken';
import { App, Breadcrumb, Table, Input, Popconfirm, Tooltip, Modal, Form, Button}
    from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, QuestionCircleOutlined }
    from '@ant-design/icons';
    
import * as transportTypeService from '../../services/TransportTypeService';

const ManageTransportType = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    const [transportType, setTransportType] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    // const [modalType, setModalType] = useState("add");
    const modalType = useRef("add");
    const selectedTransportTypeID = useRef(null);

    const getTransportType = useCallback(async () => {
        try {
            const response = await transportTypeService.GetTransportType();
            setTransportType(response.data);
        } catch (error) {
            message.error("Không thể tải danh sách!");
        } finally {
            setLoading(false);
        }
    }, [message]);

    useEffect(() => {
        getTransportType();
    }, [getTransportType]);

    const filteredtransportType = transportType.filter(transportType => {
        var stringSearch = searchText.toLowerCase();
        return (
            String(transportType.transportTypeID).includes(stringSearch) || 
            transportType.name.toLowerCase().includes(stringSearch) 
        );
    });    

    const showAddModal = () => {
        // setModalType("add");
        modalType.current = "add";
        form.resetFields();
        setIsModalOpen(true);
    };

    const showEditModal = (transportType) => {
        modalType.current = "edit";
        selectedTransportTypeID.current = transportType.transportTypeID;

        form.setFieldsValue({
            name: transportType.name,
        });
        setIsModalOpen(true);
    };

    // const handleCancelModal = () => {
    //     setIsModalOpen(false);
    //     form.resetFields();
    //     setFileList([]);
    // };


    const handleAddTransportType = async (values) => {
        try {
           
            let token = localStorage.getItem('accessToken');
            console.log(values)
            let response = await transportTypeService.CreateTransportType(token, values);
            if (response.status === 401) {
                const refreshTokenBolean = await refreshToken();
                if (!refreshTokenBolean) {
                    message.error("Phiên đăng nhập của bạn đã hết hạn!");
                    navigate("/auth/login");
                    return null;
                }
                token = localStorage.getItem('accessToken');
                response = await transportTypeService.CreateTransportType(token, values);
            }
            if (response.status === 200) {
                message.success("Thêm mới tên phân loại thành công!");
                await getTransportType();
            } else {
                message.error("Thêm mới tên phân loại thất bại!");
            }
        } catch (error) {
            message.error("Lỗi không xác định!");
            console.log(error);
        }
    }

    const handleEditTransportType = async (values) => {
        try {

            let token = localStorage.getItem('accessToken');
            let response = await transportTypeService.UpdateTransportType(token, selectedTransportTypeID.current, values);

            if (response.status === 401) {
                const refreshTokenBolean = await refreshToken();
                if (!refreshTokenBolean) {
                    message.error("Phiên đăng nhập của bạn đã hết hạn!");
                    navigate("/auth/login");
                    return null;
                }
                token = localStorage.getItem('accessToken');
                response = await transportTypeService.UpdateTransportType(token, selectedTransportTypeID.current, values);
            }
            if (response.status === 200) {
                message.success("Cập nhật tên phân loại thành công!");
                await getTransportType();
            } else {
                message.error("Cập nhật tên phân loại thất bại!");
            }
        } catch (error) {
            message.error("Lỗi không xác định!");
            console.log(error);
        }
    }

    const handleSubmit = async (values) => {
        try {

            if (modalType.current === "add") {
                handleAddTransportType(values);
            } else {
                handleEditTransportType(values);
            }
            setIsModalOpen(false);

        } catch (error) {
            message.error("Có lỗi xảy ra!");
            console.log(error);
        }
    };


    const handleDelete = async () => {
        try {
            let token = localStorage.getItem('accessToken');
            let response = await transportTypeService.DeleteTransportType(token, selectedTransportTypeID.current);
            if (response.status === 401) {
                const refreshTokenBolean = await refreshToken();
                if (!refreshTokenBolean) {
                    message.error("Phiên đăng nhập của bạn đã hết hạn!");
                    navigate("/auth/login");
                    return null;
                }
                token = localStorage.getItem('accessToken');
                response = await transportTypeService.DeleteTransportType(token, selectedTransportTypeID.current);
            }

            if (response.status === 200) {
                message.success(response.data.message);
                await getTransportType();
            } else {
                message.error("Xóa tên phân loại thất bại!");
            }
        } catch (error) {
            message.error("Lỗi khi xóa tên phân loại!");
            console.log(error);
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'transportTypeID', key: 'transportTypeID', align: 'center', width: 40},
        {
            title: 'Tên địa điểm', dataIndex: 'name', key: 'name', align: 'center', width: 190, ellipsis: true,
            render: (name) => (
                <Tooltip placement="topLeft" title={name}>
                    {name}
                </Tooltip>
            ),
        },
        {
            title: 'Thao tác', key: 'actions', align: 'center', width: 120, 
            render: (_, record) => (
                <div className='flex gap-2 justify-center'>
                    <Tooltip title="Cập nhật tên phân loại" placement='bottom' color={"gold"}>
                        <Button
                            className='px-3 py-5 border-yellow-500 hover:!border-yellow-500'
                            onClick={() => {
                                selectedTransportTypeID.current = record.transportTypeID;
                                showEditModal(record);
                            }}>
                            <EditOutlined className='text-yellow-500' />
                        </Button>
                    </Tooltip>

                    <Popconfirm
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        title="Xác nhận xóa?"
                        okText="Xác nhận"
                        cancelText="Hủy"
                        onConfirm={() => {
                            selectedTransportTypeID.current = record.transportTypeID;
                            handleDelete();
                        }}>
                        <Tooltip title="Xóa tên phân loại" placement='bottom' color={"red"}>
                            <Button danger className='px-3 py-5'>
                                <DeleteOutlined />
                            </Button>
                        </Tooltip>
                    </Popconfirm>
                </div>
            )
        }
    ];

    return (
        <>
            <Breadcrumb
                items={[
                    { title: 'Admin' },
                    { title: 'Tên phân loại' }
                ]}
            />
            <div className='bg-white mt-4 p-4 rounded-md shadow-md' style={{ minHeight: 'calc(100vh - 8rem)', backgroundColor: '#f0f0f0', marginTop: '10px', borderRadius: '5px' }}>
            <h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize: '25px'}}>LOẠI PHƯƠNG TIỆN</h2>
                <div className="flex justify-between mb-4" style={{ padding: '10px 10px', marginLeft: '280px' }}>
                    <Input
                        placeholder="Tìm kiếm phân loại..."
                        prefix={<SearchOutlined className='mr-2 ' />}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 400,
                        }}
                    />
                    <Button
                        type="primary"
                        onClick={showAddModal}
                        style={{
                            marginLeft: '30px',
                        }}
                    >
                        <PlusOutlined className='mr-2' />
                        Thêm tên phân loại mới
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredtransportType}
                    rowKey="transportTypeID"
                    loading={loading}
                    pagination={{ pageSize: 7 }}  
                    style={{
                        padding: '0px 20px'
                    }}
                />
            </div>
            <Modal
                open={isModalOpen}
                // onCancel={handleCancelModal}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={600}
                style={{ top: 20 }}
            >
                <p className='text-center text-xl text-custom1 font-bold mb-4' style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bold', paddingBottom: '5px'}}>
                    {modalType.current === "add" ? "THÊM PHÂN LOẠI MỚI" : "CẬP NHẬT PHÂN LOẠI"}
                </p>
                <Form form={form} onFinish={handleSubmit} layout="horizontal" requiredMark={false} labelCol={{ span: 6 }}>
                    <Form.Item
                        name="name"
                        label="Tên phân loại"
                        rules={[{ required: true, message: 'Vui lòng nhập tên phân loại!' }]}
                    >
                        <Input className='mb-1 mt-2' placeholder='Nhập tên phân loại' />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType="submit"
                            className="w-full h-10 mt-2"
                            style={{padding: '0px 40px', marginLeft: '200px'}}
                        >
                            <PlusOutlined className='mr-2' />
                            {modalType.current === "add" ? "Thêm mới" : "Cập nhật"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ManageTransportType;


