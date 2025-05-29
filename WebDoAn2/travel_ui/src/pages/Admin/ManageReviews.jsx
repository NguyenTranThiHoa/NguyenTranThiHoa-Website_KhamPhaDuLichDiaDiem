import React, { useEffect, useState, useCallback, useRef } from 'react';
import { App, Table, Tooltip, Breadcrumb, Input, Button, Form, Modal, Popconfirm, Select } from 'antd';    
import * as reviewsService from '../../services/ReviewsService';
import { useNavigate } from 'react-router-dom';
import refreshToken from '../../utils/refreshToken';
import * as locationsService from '../../services/LocationsService';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const ManageReviews = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);
    const [locations, setLocations] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const modalType = useRef("add");
    const selectedReviewsID = useRef(null);

    const [selectedLocation, setSelectedLocation] = useState(null);

    const getReviews = useCallback(async () => {
        try {
            const response = await reviewsService.GetReviews();
            console.log(response.data); 
            setReviews(response.data);
        } catch (error) {
            message.error("Không thể tải dữ liệu đánh giá!");
        } finally {
            setLoading(false);
        }
    }, [message]);  
    
    const getLocations = useCallback(async () => {
        try {
            const response = await locationsService.GetLocations();
            console.log(response.data); 
            if (response.status === 200) {
                const locations = response.data.map(loc => ({
                    label: loc.name,
                    value: loc.locationID,
                    locationID: loc.locationID,
                    name: loc.name,
                }));
                setLocations(locations);
            }
        } catch (error) {
            message.error("Không thể tải dữ liệu địa điểm!");
            console.log(error);
        }
    }, [message]);    

    useEffect(() => {
        getLocations();
        getReviews();
    }, [getReviews, getLocations]);

    const filteredReviews = reviews.filter(review => {
        const isSearchMatch = 
            String(review.reviewID).includes(searchText) || 
            review.ratingReviews.toString().includes(searchText) || 
            review.content.toLowerCase().includes(searchText.toLowerCase());
    
        const isLocationMatch = selectedLocation ? review.locationID === selectedLocation : true; // Nếu không chọn địa điểm, luôn trả về true
    
        return isSearchMatch && isLocationMatch 
    });    

    const showEditModal = (review) => {
        modalType.current = "edit";
        selectedReviewsID.current = review.reviewID;

        form.setFieldsValue({
            userID: review.userID,
            locationID: review.locationID,
            noiDung: review.noiDung,
            reviewDate: review.reviewDate,
            ratingReviews: review.ratingReviews,
        });
        setIsModalOpen(true);
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const refreshAccessToken = async () => {
        try {
            const refreshTokenBoolean = await refreshToken();
            if (!refreshTokenBoolean) {
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
    };

    const handleEditHotels = async (values) => {
        try {
            const { noiDung, ratingReviews } = values;
            const updatedValues = { noiDung, ratingReviews };

            console.log('Values to update:', updatedValues);

            let token = localStorage.getItem('accessToken');
            const response = await reviewsService.UpdateReviews(token, selectedReviewsID.current, updatedValues);

            if (response.status === 200) {
                message.success("Cập nhật đánh giá thành công!");
                await getReviews();
                setIsModalOpen(false);
            } else {
                message.error("Cập nhật đánh giá thất bại!");
                console.log('Response error:', response);
            }
        } catch (error) {
            message.error("Lỗi khi cập nhật đánh giá!");
            console.error(error);
        }
    };    
    
    const handleSubmit = async (values) => {
        try {
            if (modalType.current === "edit") {
                await handleEditHotels(values);
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
            let response = await reviewsService.DeleteReviews(token, selectedReviewsID.current);
            if (response.status === 401) {
                token = await refreshAccessToken();
                if (!token) return;
                response = await reviewsService.DeleteReviews(token, selectedReviewsID.current);
            }
            if (response.status === 200) {
                message.success("Xóa đánh giá thành công!");
                await getReviews();
            } else {
                message.error("Xóa đánh giá thất bại!");
            }
        } catch (error) {
            message.error("Lỗi khi xóa dữ liệu!");
            console.log(error);
        }
    };

    const getLocationName = (locationID) => {
        if (!locations || locations.length === 0) {
            return 'Không tìm thấy';
        }
        const location = locations.find((loc) => loc.locationID === locationID);
        return location ? location.name : 'Không tìm thấy';
    };    
    
    const columns = [
        { 
            title: 'ID', 
            dataIndex: 'reviewID', 
            key: 'reviewID', 
            align: 'center', 
            width: 40 
        },
        {
            title: 'Nội dung đánh giá',
            dataIndex: 'noiDung',
            key: 'noiDung',
            align: 'center',
            width: 190,
            ellipsis: true,
            render: (noiDung) => (
                <Tooltip placement="topLeft" title={noiDung}>
                    {noiDung}
                </Tooltip>
            ),
        },
        {
            title: 'Địa điểm',
            dataIndex: 'locationID',
            key: 'location',
            align: 'center',
            width: 180,
            render: (locationID) => {
                const locationName = getLocationName(locationID);
                return (
                    <Tooltip placement="topLeft" title={locationName}>
                        {locationName}
                    </Tooltip>
                );
            },            
        },
        {
            title: 'Điểm đánh giá',
            dataIndex: 'ratingReviews',
            key: 'ratingReviews',
            align: 'center',
            width: 120,
            ellipsis: true,
            sorter: (a, b) => a.ratingReviews - b.ratingReviews,
            sortDirections: ['descend'],
            render: (ratingReviews) => (
                <Tooltip placement="topLeft" title={`${ratingReviews}`}>
                    {ratingReviews.toLocaleString()}
                </Tooltip>
            ),
        },
        {
            title: 'Ngày đánh giá',
            dataIndex: 'reviewDate',
            key: 'reviewDate',
            align: 'center',
            width: 130,
            ellipsis: true,
            render: (date) => (
                <Tooltip placement="topLeft" title={new Date(date).toLocaleDateString()}>
                    {new Date(date).toLocaleDateString()}
                </Tooltip>
            ),
        },
        {
            title: 'Người đánh giá',
            dataIndex: 'userID',
            key: 'userID',
            align: 'center',
            width: 190,
            ellipsis: true,
            render: (userID) => (
                <Tooltip placement="topLeft" title={userID}>
                    {userID}
                </Tooltip>
            ),
        },
        {
            title: 'Thao tác',
            key: 'actions',
            align: 'center',
            width: 120, 
            render: (_, record) => (
                <div className='flex gap-2 justify-center'>
                    <Tooltip title="Cập nhật đánh giá" placement='bottom' color={"gold"}>
                        <Button
                            className='px-3 py-5 border-yellow-500 hover:!border-yellow-500'
                            onClick={() => {
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
                            selectedReviewsID.current = record.reviewID;
                            handleDelete();
                        }}>
                        <Tooltip title="Xóa đánh giá" placement='bottom' color={"red"}>
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
                    { title: 'Quản lý đánh giá' }
                ]}
            />
            <div className='bg-white mt-4 p-4 rounded-md shadow-md' style={{ minHeight: 'calc(100vh - 8rem)', backgroundColor: '#f0f0f0', marginTop: '10px', borderRadius: '5px' }}>
                <h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize: '25px'}}>QUẢN LÝ ĐÁNH GIÁ</h2>
                <div className="flex justify-between mb-4" style={{ padding: '10px 10px', marginLeft: '280px' }}>
                    <Input
                        placeholder="Tìm kiếm đánh giá..."
                        prefix={<SearchOutlined className='mr-2 ' />}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 400 }}
                    />
                    <Select
                        placeholder="Chọn địa điểm"
                        onChange={value => setSelectedLocation(value === 'all' ? null : value)} // Nếu chọn 'all', thì không lọc
                        style={{ width: 200, marginLeft: 10 }}
                    >
                        <Select.Option value="all">Tất cả</Select.Option>
                        {locations.map(location => (
                            <Select.Option key={location.value} value={location.value}>
                                {location.label}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredReviews}
                    rowKey="reviewID"
                    loading={loading}
                    pagination={{ pageSize: 7 }}  
                    style={{ padding: '0px 20px' }}
                />
            </div>
            <Modal
                open={isModalOpen}
                onCancel={handleCancelModal}
                footer={null}
                width={600}
                style={{ top: 20 }}
            >
                <p className='text-center text-xl text-custom1 font-bold mb-4' style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold', paddingBottom: '5px' }}>
                {modalType.current === "edit" ? "CHỈNH SỬA ĐÁNH GIÁ" : "Thêm đánh giá"}
                </p>
                <Form form={form} onFinish={handleSubmit} layout="horizontal" requiredMark={false} labelCol={{ span: 6 }}>
                    <Form.Item
                        name="noiDung"
                        label="Nội dung bình luận"
                        rules={[{ required: true, message: 'Vui lòng nhập bình luận!' }]}
                    >
                        <Input.TextArea className='mb-1 mt-2' placeholder='Nhập bình luận' rows={3} />
                    </Form.Item>

                    <Form.Item
                        name="ratingReviews"
                        label="Đánh giá"
                        rules={[
                            { required: true, message: 'Vui lòng nhập đánh giá!' },
                            { validator: (_, value) => (value >= 0 && value <= 5 ? Promise.resolve() : Promise.reject('Đánh giá phải từ 0 đến 5!')) }
                        ]}
                    >
                        <Input type="number" className='mb-1 mt-2' placeholder='Nhập đánh giá' />
                    </Form.Item>
    
                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType="submit"
                            className="w-full h-10 mt-2"
                            style={{ padding: '0px 40px', marginLeft: '200px' }}
                        >
                            <PlusOutlined className='mr-2' />
                            {modalType.current === "edit" ? "Cập nhật" : "Thêm"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ManageReviews;
