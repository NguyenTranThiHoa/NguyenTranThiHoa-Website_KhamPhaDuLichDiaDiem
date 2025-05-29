import React, { useEffect, useState, useCallback, useRef } from 'react';
import { App, Table, Tooltip, Breadcrumb, Input, Button, Form, Upload, Image, Select, Modal, Popconfirm } from 'antd';    
import * as hotelsService from '../../services/HotelsService';
import { useNavigate } from 'react-router-dom';
import refreshToken from '../../utils/refreshToken';
import * as locationsService from '../../services/LocationsService';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';

const ManageHotels = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    const [hotels, setHotels] = useState([]);
    const [locations, setLocations] = useState([]); 
    const [locationsOptions, setLocationsOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const modalType = useRef("add");
    const selectedHotelsID = useRef(null);
    const selectedHotelsImage = useRef("");
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

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

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [cityOptions, setCityOptions] = useState([]);

    const getHotels = useCallback(async () => {
        try {
            const response = await hotelsService.GetHotels();
            setHotels(response.data);
        } catch (error) {
            message.error("Không thể tải dữ liệu khách sạn!");
        } finally {
            setLoading(false);
        }
    }, [message]);

    const getLocations = useCallback(async () => {
        try {
            const response = await locationsService.GetLocations();
            if (response.status === 200) {
                const locations = response.data.map(loc => ({
                    label: loc.name,
                    value: loc.locationID,
                    locationID: loc.locationID,
                    name: loc.name,
                    province: loc.province,
                    city: loc.city,
                }));
                setLocationsOptions(locations);
                setLocations(response.data);
            }
        } catch (error) {
            message.error("Không thể tải dữ liệu địa điểm!");
        }
    }, [message]);    

    useEffect(() => {
        getHotels();
        getLocations();
    }, [getHotels, getLocations]);

    const filteredHotels = hotels.filter(hotel => {
        const stringSearch = searchText.toLowerCase();
        const isProvinceMatch = selectedProvince ? hotel.provinceHotel === selectedProvince : true;
        const isCityMatch = selectedCity ? hotel.cityHotel === selectedCity : true;

        return (String(hotel.hotelID).includes(stringSearch) ||
                hotel.hotelName.toLowerCase().includes(stringSearch) ||
                hotel.provinceHotel.toLowerCase().includes(stringSearch) ||
                hotel.cityHotel.toLowerCase().includes(stringSearch)) &&
               isProvinceMatch &&
               isCityMatch;
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

    const showEditModal = (hotel) => {
        modalType.current = "edit";
        const selectedLocation = locations.find(loc => loc.locationID === hotel.locationID);

        form.setFieldsValue({
            nameHotel: hotel.nameHotel,
            locationID: hotel.locationID,
            descriptionHotel: hotel.descriptionHotel,
            pricePerNight: hotel.pricePerNight,
            ratingHotel: hotel.ratingHotel,
            imageHotel: hotel.imageHotel,
        });

        setSelectedProvince(selectedLocation ? selectedLocation.province : ''); 
        setSelectedCity(selectedLocation ? selectedLocation.city : ''); 

        if (hotel.imageHotel) {
            setFileList([
                {
                    uid: '-1',
                    name: hotel.imageHotel,
                    status: 'done',
                    url: `https://localhost:7054/api/images/${hotel.imageHotel}`,
                },
            ]);
        }
        setIsModalOpen(true);
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
        form.resetFields();
        setFileList([]);
    };

    const refreshAccessToken = async () => {
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
            let response = await hotelsService.UploadImage(token, formData);
            if (response.status === 401) {
                token = await refreshAccessToken();
                if (!token) return;
                response = await hotelsService.UploadImage(token, formData);
            }

            if (response.status === 200) {
                return response.data.imagePath;
            } else {
                message.error("Không thể upload hình ảnh!");
            }
        } catch (error) {
            message.error("Lỗi khi upload hình ảnh!");
            console.log(error);
            return null;
        }
    }

    const handleAddHotels = async (values) => {
        try {
            const imageHotel = await handleUploadImage();
            if (!imageHotel) return;
            values.imageHotel = imageHotel;

            values.provinceHotel = selectedProvince;
            values.cityHotel = selectedCity;

            let token = localStorage.getItem('accessToken');
            const response = await hotelsService.CreateHotels(token, values);

            if (response.status === 200) {
                message.success("Thêm mới khách sạn thành công!");
                await getHotels();
                setIsModalOpen(false);
            } else {
                message.error("Thêm mới khách sạn thất bại!");
            }
        } catch (error) {
            message.error("Lỗi khi thêm khách sạn!");
        }
    };

    const handleEditHotels = async (values) => {
        try {
            if (fileList[0]?.originFileObj) {
                const imageHotel = await handleUploadImage();
                values.imageHotel = imageHotel; // Chỉ cập nhật hình ảnh nếu có
            }
    
            const { nameHotel, pricePerNight, ratingHotel, descriptionHotel, imageHotel } = values;
            const updatedValues = { nameHotel, pricePerNight, ratingHotel, descriptionHotel, imageHotel };
    
            let token = localStorage.getItem('accessToken');
            const response = await hotelsService.UpdateHotels(token, selectedHotelsID.current, updatedValues);
    
            if (response.status === 200) {
                message.success("Cập nhật khách sạn thành công!");
                await getHotels();
                setIsModalOpen(false);
            } else {
                message.error("Cập nhật khách sạn thất bại!");
            }
        } catch (error) {
            message.error("Lỗi khi cập nhật khách sạn!");
        }
    };    
    
    const handleSubmit = async (values) => {
        try {
            if (modalType.current === "add") {
                await handleAddHotels(values);
            } else {
                await handleEditHotels(values);
            }
            setIsModalOpen(false);
        } catch (error) {
            message.error("Có lỗi xảy ra!");
        }
    };

    const handleDelete = async () => {
        try {
            let token = localStorage.getItem('accessToken');
            let response = await hotelsService.DeleteHotels(token, selectedHotelsID.current);
            if (response.status === 401) {
                token = await refreshAccessToken();
                if (!token) return;
                response = await hotelsService.DeleteHotels(token, selectedHotelsID.current);
            }

            if (response.status === 200) {
                message.success(response.data.message);
                await getHotels();
            } else {
                message.warning(response.message || "Khách sạn này có dữ liệu đã sử dụng không thể xóa!");
            }
        } catch (error) {
            message.error("Lỗi khi xóa dữ liệu!");
        }
    };

    const handleProvinceChange = (value) => {
        setSelectedProvince(value);
        const province = provinces.find((prov) => prov.name === value);
        setCityOptions(province ? province.cities : []);
        setSelectedCity('');
    };

    const handleCityChange = (value) => {
        setSelectedCity(value);
        const province = provinces.find((prov) => prov.cities.includes(value));
        setSelectedProvince(province ? province.name : '');
    };

    const getLocationName = (locationID) => {
        if (!locations || locations.length === 0) {
            return 'Không tìm thấy';
        }
        const location = locations.find((loc) => loc.locationID === locationID);
        return location ? location.name : 'Không tìm thấy';
    };    

    const columns = [
        { title: 'ID', dataIndex: 'hotelID', key: 'hotelID', align: 'center', width: 40 },
        {
            title: 'Ảnh', dataIndex: 'imageHotel', key: 'imageHotel', align: 'center', width: 80,
            render: (path) => (
                <img src={`https://localhost:7054/api/images/${path}`} alt="Hotel" className='w-full h-12 object-cover' />
            )
        },
        {
            title: 'Tên khách sạn', dataIndex: 'nameHotel', key: 'nameHotel', align: 'center', width: 190, ellipsis: true,
            render: (nameHotel) => (
                <Tooltip placement="topLeft" title={nameHotel}>
                    {nameHotel}
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
            title: 'Thành phố', dataIndex: 'cityHotel', key: 'cityHotel', align: 'center', width: 120, ellipsis: true,
            render: (cityHotel) => (
                <Tooltip placement="topLeft" title={cityHotel}>
                    {cityHotel}
                </Tooltip>
            ),
        },
        {
            title: 'Tỉnh', dataIndex: 'provinceHotel', key: 'provinceHotel', align: 'center', width: 120, ellipsis: true,
            render: (provinceHotel) => (
                <Tooltip placement="topLeft" title={provinceHotel}>
                    {provinceHotel}
                </Tooltip>
            ),
        },
        {
            title: 'Giá khách sạn', dataIndex: 'pricePerNight', key: 'pricePerNight', align: 'center', width: 120, ellipsis: true,
            sorter: (a, b) => a.pricePerNight - b.pricePerNight, sortDirections: ['descend'],
            render: (pricePerNight) => (
                <Tooltip placement="topLeft" title={`${pricePerNight} VNĐ`}>
                    {pricePerNight.toLocaleString()}
                </Tooltip>
            ),
        },
        {
            title: 'Đánh giá', dataIndex: 'ratingHotel', key: 'ratingHotel', align: 'center', width: 120, ellipsis: true,
            sorter: (a, b) => a.ratingHotel - b.ratingHotel, sortDirections: ['descend'],
            render: (ratingHotel) => (
                <Tooltip placement="topLeft" title={`${ratingHotel}`}>
                    {ratingHotel.toLocaleString()}
                </Tooltip>
            ),
        },
        {
            title: 'Mô tả', dataIndex: 'descriptionHotel', key: 'descriptionHotel', align: 'center', ellipsis: true,
            render: (descriptionHotel) => (
                <Tooltip placement="topLeft" title={descriptionHotel}>
                    {descriptionHotel}
                </Tooltip>
            ),
        },
        {
            title: 'Thao tác', key: 'actions', align: 'center', width: 120, 
            render: (_, record) => (
                <div className='flex gap-2 justify-center'>
                    <Tooltip title="Cập nhật khách sạn" placement='bottom' color={"gold"}>
                        <Button
                            className='px-3 py-5 border-yellow-500 hover:!border-yellow-500'
                            onClick={() => {
                                selectedHotelsID.current = record.hotelID;
                                selectedHotelsImage.current = record.imageHotel;
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
                            selectedHotelsID.current = record.hotelID;
                            handleDelete();
                        }}>
                        <Tooltip title="Xóa khách sạn" placement='bottom' color={"red"}>
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
                    { title: 'Quản lý khách sạn' }
                ]}
            />
            <div className='bg-white mt-4 p-4 rounded-md shadow-md' style={{ minHeight: 'calc(100vh - 8rem)', backgroundColor: '#f0f0f0', marginTop: '10px', borderRadius: '5px' }}>
                <h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize: '25px'}}>QUẢN LÝ KHÁCH SẠN</h2>
                <div className="flex justify-between mb-4" style={{ padding: '10px 10px', marginLeft: '50px' }}>
                    <Input
                        placeholder="Tìm kiếm khách sạn..."
                        prefix={<SearchOutlined className='mr-2 ' />}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 400 }}
                    />
                    <Select
                        placeholder="Chọn tỉnh"
                        onChange={handleProvinceChange}
                        style={{ width: 200, marginLeft: 10 }}
                    >
                        <Select.Option value="">Tất cả</Select.Option>
                        {provinces.map(prov => (
                            <Select.Option key={prov.id} value={prov.name}>
                                {prov.name}
                            </Select.Option>
                        ))}
                    </Select>
                    <Select
                        placeholder="Chọn thành phố"
                        onChange={handleCityChange}
                        style={{ width: 200, marginLeft: 10 }}
                        disabled={!selectedProvince} // Vô hiệu hóa nếu chưa chọn tỉnh
                    >
                        <Select.Option value="">Tất cả</Select.Option>
                        {cityOptions.map((city, index) => (
                            <Select.Option key={index} value={city}>
                                {city}
                            </Select.Option>
                        ))}
                    </Select>
                    
                    <Button
                        type="primary"
                        onClick={showAddModal}
                        style={{ marginLeft: '30px' }}
                    >
                        <PlusOutlined className='mr-2' />
                        Thêm khách sạn mới
                    </Button>
                </div>
                
                <Table
                    columns={columns}
                    dataSource={filteredHotels}
                    rowKey="hotelID"
                    loading={loading}
                    pagination={{ pageSize: 8 }}  
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
                {modalType.current === "add" ? "THÊM KHÁCH SẠN MỚI" : "CẬP NHẬT KHÁCH SẠN"}
                </p>
                <Form form={form} onFinish={handleSubmit} layout="horizontal" requiredMark={false} labelCol={{ span: 6 }}>
                    <Form.Item
                        name="nameHotel"
                        label="Tên khách sạn"
                        rules={[{ required: true, message: 'Vui lòng nhập tên khách sạn!' }]}
                    >
                        <Input className='mb-1 mt-2' placeholder='Nhập tên khách sạn' />
                    </Form.Item>

                    <Form.Item
                        name="locationID"
                        label="Địa điểm"
                        rules={[{ required: true, message: 'Vui lòng chọn địa điểm!' }]}
                    >
                        <Select
                            placeholder="Chọn địa điểm"
                            options={locationsOptions} // Hiển thị tên địa điểm
                            disabled={modalType.current === "edit"} // Vô hiệu hóa khi đang chỉnh sửa
                        />
                    </Form.Item>
            
                    <Form.Item
                        name="descriptionHotel"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <Input.TextArea className='mb-1 mt-2' placeholder='Nhập mô tả khách sạn' rows={3} />
                    </Form.Item>
                    
                    <Form.Item label="Tỉnh">
                        <Select
                            name="selectedProvince"
                            value={selectedProvince}
                            onChange={handleProvinceChange}
                            placeholder="Chọn tỉnh"
                            options={provinces.map(prov => ({ label: prov.name, value: prov.name }))}
                            disabled={modalType.current === "edit"} // Vô hiệu hóa khi đang chỉnh sửa
                        />
                    </Form.Item>

                    <Form.Item label="Thành phố">
                        <Select
                            value={selectedCity}
                            onChange={handleCityChange}
                            placeholder="Chọn thành phố"
                            options={cityOptions.map(city => ({ label: city, value: city }))}
                            disabled={!selectedProvince || modalType.current === "edit"} // Vô hiệu hóa nếu chưa chọn tỉnh hoặc đang chỉnh sửa
                        />
                    </Form.Item>

                    <Form.Item
                        name="pricePerNight"
                        label="Giá tiền"
                        rules={[
                            { required: true, message: 'Vui lòng nhập giá tiền!' },
                            { validator: (_, value) => (value > 0 ? Promise.resolve() : Promise.reject('Giá phải lớn hơn 0!')) }
                        ]}
                    >
                        <Input type="number" className='mb-1 mt-2' placeholder='Nhập giá tiền' />
                    </Form.Item>

                    <Form.Item
                        name="ratingHotel"
                        label="Đánh giá"
                        rules={[
                            { required: true, message: 'Vui lòng nhập đánh giá!' },
                            { validator: (_, value) => (value >= 0 && value <= 5 ? Promise.resolve() : Promise.reject('Đánh giá phải từ 0 đến 5!')) }
                        ]}
                    >
                        <Input type="number" className='mb-1 mt-2' placeholder='Nhập đánh giá' />
                    </Form.Item>
                    
                    <Form.Item
                        name="imageHotel"
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

export default ManageHotels;
