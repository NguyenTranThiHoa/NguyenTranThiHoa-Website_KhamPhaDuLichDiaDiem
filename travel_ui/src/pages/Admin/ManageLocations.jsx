import React, { useEffect, useState, useRef, useCallback } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import refreshToken from '../../utils/refreshToken';
import { App, Breadcrumb, Table, Input, Popconfirm, Tooltip, Modal, Form, Button, DatePicker, Upload, Image, Select }
    from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, QuestionCircleOutlined, UploadOutlined }
    from '@ant-design/icons';
    
import * as locationsService from '../../services/LocationsService';

const ManageLocations = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    const [location, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const modalType = useRef("add");
    const selectedLocationsID = useRef(null);
    const selectedLocationsImage = useRef("");

    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState('');
    
    const provinces = [
        { id: 1, name: 'Quảng Ninh', cities: ['Thành phố Hạ Long', 'Thành phố Móng Cái'] },
        { id: 2, name: 'Đà Nẵng', cities: ['Hải Châu', 'Sơn Trà', 'Ngũ Hành Sơn'] },
        { id: 3, name: 'Đồng Tháp', cities: ['Thành phố Sa Đéc', 'Thành phố Cao Lãnh', 'Huyện Lấp Vò', 'Huyện Lai Vung'] },
        { id: 4, name: 'Bình Thuận', cities: ['Thành phố Phan Thiết', 'Thị xã LaGi'] },
        { id: 5, name: 'An Giang', cities: ['Thành phố Châu Đốc', 'Thành phố Long Xuyên'] },
        { id: 6, name: 'Cần Thơ', cities: ['Quận Ninh Kiều', 'Quận Cái Răng'] },
        { id: 7, name: 'Lâm Đồng', cities: ['Thành phố Đà Lạt', 'Thị xã Bảo Lộc'] },
        { id: 8, name: 'Bạc Liêu', cities: ['Thành phố Bạc Liêu', 'Thị xã Giá Rai'] },
        { id: 9, name: 'Kiên Giang', cities: ['Thành phố Kiên Giang', 'Thị xã Hà Tiên'] },
    ];
    
    const [cityOptions, setCityOptions] = useState([]);

    const handleProvinceChange = (value) => {
        setSelectedProvince(value);
        const province = provinces.find((prov) => prov.name === value);
        setCityOptions(province ? province.cities : []);
        setSelectedCity(''); // Reset city when province changes
    };
    
    const handleCityChange = (value) => {
        setSelectedCity(value);
    };

    const getLocations = useCallback(async () => {
        try {
            const response = await locationsService.GetLocations();
            setLocations(response.data);
        } catch (error) {
            message.error("Không thể tải danh sách!");
        } finally {
            setLoading(false);
        }
    }, [message]);

    useEffect(() => {
        getLocations();
    }, [getLocations]);

    const filteredLocations = location.filter(loc => {
        const stringSearch = searchText.toLowerCase();
        const isSearchMatch = 
            String(loc.locationID).includes(stringSearch) || 
            loc.name.toLowerCase().includes(stringSearch) ||
            loc.city.toLowerCase().includes(stringSearch) ||
            loc.province.toLowerCase().includes(stringSearch);

        const isCityMatch = selectedCity && selectedCity !== "all" ? loc.city === selectedCity : true; // Lọc theo thành phố
        const isProvinceMatch = selectedProvince && selectedProvince !== "all" ? loc.province === selectedProvince : true; // Lọc theo tỉnh

        return isSearchMatch && isCityMatch && isProvinceMatch; 
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

    const showAddModal = () => {
        modalType.current = "add";
        form.resetFields();
        setIsModalOpen(true);
        setFileList([]);
    };

    const showEditModal = (loc) => {
        modalType.current = "edit";
        selectedLocationsID.current = loc.locationID;
        selectedLocationsImage.current = loc.imageUrl;

        form.setFieldsValue({
            name: loc.name,
            description: loc.description,
            city: loc.city,
            province: loc.province,
            publishedDate: dayjs(loc.publishedDate),
            rating: loc.rating,
        });
        if (loc.imageUrl) {
            setFileList([
                {
                    uid: '-1',
                    name: loc.imageUrl,
                    status: 'done',
                    url: `https://localhost:7054/api/images/${loc.imageUrl}`,
                },
            ]);
        }
        setIsModalOpen(true);
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
            let response = await locationsService.UploadImage(token, formData);
            if (response.status === 401) {
                const refreshTokenBolean = await refreshToken();
                if (!refreshTokenBolean) {
                    message.error("Phiên đăng nhập của bạn đã hết hạn!");
                    navigate("/auth/login");
                    return null;
                }
                token = localStorage.getItem('accessToken');
                response = await locationsService.UploadImage(token, formData);
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

    const handleAddLocations = async (values) => {
        try {
            const imagePath = await handleUploadImage();
            if (!imagePath) {
                return;
            }
            values.imageUrl = imagePath;

            values.province = selectedProvince;
            values.city = selectedCity;

            let token = localStorage.getItem('accessToken');
            let response = await locationsService.CreateLocations(token, values);
            if (response.status === 401) {
                const refreshTokenBolean = await refreshToken();
                if (!refreshTokenBolean) {
                    message.error("Phiên đăng nhập của bạn đã hết hạn!");
                    navigate("/auth/login");
                    return null;
                }
                token = localStorage.getItem('accessToken');
                response = await locationsService.CreateLocations(token, values);
            }
            if (response.status === 200) {
                message.success("Thêm mới địa điểm thành công!");
                await getLocations();
            } else {
                message.error("Thêm mới địa điểm thất bại!");
            }
        } catch (error) {
            message.error("Lỗi không xác định!");
            console.log(error);
        }
    }

    const handleEditLocations = async (values) => {
        try {
            values.imageUrl = selectedLocationsImage.current;
            if (values.imageUrl !== fileList[0].name) {
                const imageUrl = await handleUploadImage();
                values.imageUrl = imageUrl;
            }

            values.province = selectedProvince;
            values.city = selectedCity;

            let token = localStorage.getItem('accessToken');
            let response = await locationsService.UpdateLocations(token, selectedLocationsID.current, values);

            if (response.status === 401) {
                const refreshTokenBolean = await refreshToken();
                if (!refreshTokenBolean) {
                    message.error("Phiên đăng nhập của bạn đã hết hạn!");
                    navigate("/auth/login");
                    return null;
                }
                token = localStorage.getItem('accessToken');
                response = await locationsService.UpdateLocations(token, selectedLocationsID.current, values);
            }
            if (response.status === 200) {
                message.success("Cập nhật địa điểm thành công!");
                await getLocations();
            } else {
                message.error("Cập nhật địa điểm thất bại!");
            }
        } catch (error) {
            message.error("Lỗi không xác định!");
            console.log(error);
        }
    }

    const handleSubmit = async (values) => {
        try {
            values.publishedDate = values.publishedDate.format('YYYY-MM-DD');

            if (modalType.current === "add") {
                await handleAddLocations(values);
            } else {
                await handleEditLocations(values);
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
            let response = await locationsService.DeleteLocations(token, selectedLocationsID.current);
            if (response.status === 401) {
                const refreshTokenBolean = await refreshToken();
                if (!refreshTokenBolean) {
                    message.error("Phiên đăng nhập của bạn đã hết hạn!");
                    navigate("/auth/login");
                    return null;
                }
                token = localStorage.getItem('accessToken');
                response = await locationsService.DeleteLocations(token, selectedLocationsID.current);
            }

            if (response.status === 200) {
                message.success(response.data.message);
                await getLocations();
            } else {
                message.error("Xóa địa điểm thất bại!");
            }
        } catch (error) {
            message.error("Lỗi khi xóa địa điểm!");
            console.log(error);
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'locationID', key: 'locationID', align: 'center', width: 40},
        {
            title: 'Ảnh', dataIndex: 'imageUrl', key: 'imageUrl', align: 'center', width: 80,
            render: (path) =>
                <img src={`https://localhost:7054/api/images/${path}`} alt="Location" className='w-full h-12 object-cover' />
        },
        {
            title: 'Tên địa điểm', dataIndex: 'name', key: 'name', align: 'center', width: 190, ellipsis: true,
            render: (name) => (
                <Tooltip placement="topLeft" title={name}>
                    {name}
                </Tooltip>
            ),
        },
        {
            title: 'Mô tả', dataIndex: 'description', key: 'description', align: 'center', ellipsis: true,
            render: (description) => (
                <Tooltip placement="topLeft" title={description}>
                    {description}
                </Tooltip>
            ),
        },
        {
            title: 'Thành phố', dataIndex: 'city', key: 'city', align: 'center', width: 120, ellipsis: true,
            render: (city) => (
                <Tooltip placement="topLeft" title={city}>
                    {city}
                </Tooltip>
            ),
        },
        {
            title: 'Tỉnh', dataIndex: 'province', key: 'province', align: 'center', width: 120, ellipsis: true,
            render: (province) => (
                <Tooltip placement="topLeft" title={province}>
                    {province}
                </Tooltip>
            ),
        },
        {
            title: 'Ngày thêm', dataIndex: 'publishedDate', key: 'publishedDate', align: 'center', width: 130,
            ellipsis: true,
            render: (date) => (
                <Tooltip placement="topLeft" title={new Date(date).toLocaleDateString()}>
                    {new Date(date).toLocaleDateString()}
                </Tooltip>
            ),
        },
        {
            title: 'Đánh giá', dataIndex: 'rating', key: 'rating', align: 'center', width: 120, ellipsis: true,
            sorter: (a, b) => a.rating - b.rating, sortDirections: ['descend'],
            render: (rating) => (
                <Tooltip placement="topLeft" title={`${rating}`}>
                    {rating.toLocaleString()}
                </Tooltip>
            ),
        },
        {
            title: 'Thao tác', key: 'actions', align: 'center', width: 120, 
            render: (_, record) => (
                <div className='flex gap-2 justify-center'>
                    <Tooltip title="Cập nhật địa điểm" placement='bottom' color={"gold"}>
                        <Button
                            className='px-3 py-5 border-yellow-500 hover:!border-yellow-500'
                            onClick={() => {
                                selectedLocationsID.current = record.locationID;
                                selectedLocationsImage.current = record.imageUrl;
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
                            selectedLocationsID.current = record.locationID;
                            handleDelete();
                        }}>
                        <Tooltip title="Xóa địa điểm" placement='bottom' color={"red"}>
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
                    { title: 'Quản lý địa điểm' }
                ]}
            />
            <div className='bg-white mt-4 p-4 rounded-md shadow-md' style={{ minHeight: 'calc(100vh - 8rem)', backgroundColor: '#f0f0f0', marginTop: '10px', borderRadius: '5px' }}>
                <h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize: '25px'}}>QUẢN LÝ ĐỊA ĐIỂM</h2>
                <div className="flex justify-between mb-4" style={{ padding: '10px 10px', marginLeft: '50px' }}>
                    <Input
                        placeholder="Tìm kiếm địa điểm..."
                        prefix={<SearchOutlined className='mr-2 ' />}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 400 }}
                    />
                    <Select
                        placeholder="Chọn thành phố"
                        onChange={handleCityChange}
                        style={{ width: 200, marginLeft: 10 }}
                    >
                        <Select.Option value="all">Tất cả</Select.Option>
                        {cityOptions.map(city => (
                            <Select.Option key={city} value={city}>
                                {city}
                            </Select.Option>
                        ))}
                    </Select>
                    <Select
                        placeholder="Chọn tỉnh"
                        onChange={handleProvinceChange}
                        style={{ width: 200, marginLeft: 10 }}
                    >
                        <Select.Option value="all">Tất cả</Select.Option>
                        {provinces.map(prov => (
                            <Select.Option key={prov.id} value={prov.name}>
                                {prov.name}
                            </Select.Option>
                        ))}
                    </Select>
                    <Button
                        type="primary"
                        onClick={showAddModal}
                        style={{
                            marginLeft: '30px',
                        }}
                    >
                        <PlusOutlined className='mr-2' />
                        Thêm địa điểm mới
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredLocations}
                    rowKey="locationID"
                    loading={loading}
                    pagination={{ pageSize: 7 }}  
                    style={{
                        padding: '0px 20px'
                    }}
                />
            </div>
            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={600}
                style={{ top: 20 }}
            >
                <p className='text-center text-xl text-custom1 font-bold mb-4' style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bold', paddingBottom: '5px'}}>
                    {modalType.current === "add" ? "THÊM ĐỊA ĐIỂM MỚI" : "CẬP NHẬT ĐỊA ĐIỂM"}
                </p>
                <Form form={form} onFinish={handleSubmit} layout="horizontal" requiredMark={false} labelCol={{ span: 6 }}>
                    <Form.Item
                        name="name"
                        label="Tên địa điểm"
                        rules={[{ required: true, message: 'Vui lòng nhập tên địa điểm!' }]}
                    >
                        <Input placeholder='Nhập tên địa điểm' />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả địa điểm!' }]}
                    >
                                                <Input.TextArea className='mb-1 mt-2' placeholder='Nhập mô tả địa điểm' rows={3} />
                    </Form.Item>

                    <Form.Item label="Tỉnh">
                        <Select
                            value={selectedProvince}
                            onChange={handleProvinceChange}
                            placeholder="Chọn tỉnh"
                            options={provinces.map((prov) => ({ label: prov.name, value: prov.name }))}
                        />
                    </Form.Item>

                    <Form.Item label="Thành phố">
                        <Select
                            value={selectedCity}
                            onChange={handleCityChange}
                            placeholder="Chọn thành phố"
                            options={cityOptions.map((city) => ({ label: city, value: city }))}
                        />
                    </Form.Item>

                    <Form.Item
                        name="publishedDate"
                        label="Ngày thêm"
                        rules={[{ required: true, message: 'Vui lòng nhập ngày thêm!' }]}
                    >
                        <DatePicker
                            format="DD-MM-YYYY"
                            className='w-full mb-1 mt-2'
                            placeholder='Chọn ngày thêm'
                        />
                    </Form.Item>

                    <Form.Item
                        name="rating"
                        label="Đánh giá"
                        rules={[
                            { required: true, message: 'Vui lòng nhập đánh giá!' },
                            { validator: (_, value) => (value > 0 ? Promise.resolve() : Promise.reject('Giá phải lớn hơn 0!')) }
                        ]}
                    >
                        <Input type="number" className='mb-1 mt-2' placeholder='Nhập đánh giá' />
                    </Form.Item>

                    <Form.Item
                        name="imageUrl"
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
                            <PlusOutlined className='mr-2' />
                            {modalType.current === "add" ? "Thêm mới" : "Cập nhật"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ManageLocations;

                   
