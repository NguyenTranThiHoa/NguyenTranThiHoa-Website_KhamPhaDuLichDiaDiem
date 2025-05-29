import React, { useEffect, useState, useCallback, useRef } from 'react';
import { App, Table, Tooltip, Breadcrumb, Input, Button, Form, Upload, Select, Modal, Popconfirm } from 'antd';    
import * as specialtyService from '../../services/SpecialtyService';
import { useNavigate } from 'react-router-dom';
import refreshToken from '../../utils/refreshToken';
import * as locationsService from '../../services/LocationsService';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const ManageSpecialty = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    const [specialtys, setSpecialty] = useState([]);
    const [locations, setLocations] = useState([]); 
    const [locationsOptions, setLocationsOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const modalType = useRef("add");
    const selectedSpecialtyID = useRef(null);
    const selectedSpecialtyImage = useRef("");
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    // Định nghĩa mảng provinces
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
    const [filteredProvince, setFilteredProvince] = useState('');
    const [filteredCity, setFilteredCity] = useState('');
    const [filteredLocation, setFilteredLocation] = useState('');

    const getSpecialty = useCallback(async () => {
        try {
            const response = await specialtyService.GetSpecialty();
            setSpecialty(response.data);
        } catch (error) {
            message.error("Không thể tải dữ liệu món ăn!");
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
                    city: loc.city 
                }));
                setLocationsOptions(locations);
                setLocations(response.data);
            }
        } catch (error) {
            message.error("Không thể tải dữ liệu địa điểm!");
        }
    }, [message]);    

    useEffect(() => {
        getSpecialty();
        getLocations();
    }, [getSpecialty, getLocations]);

    const filteredSpecialty = specialtys.filter(specialty => {
        const stringSearch = searchText.toLowerCase();
        const isProvinceMatch = filteredProvince ? specialty.provinceFood === filteredProvince : true;
        const isCityMatch = filteredCity ? specialty.cityFood === filteredCity : true;
        const isLocationMatch = filteredLocation ? specialty.locationID === filteredLocation : true;

        return (
            (String(specialty.specialtyID).includes(stringSearch) ||
            specialty.nameFood.toLowerCase().includes(stringSearch)) &&
            isProvinceMatch &&
            isCityMatch &&
            isLocationMatch
        );
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

    const showEditModal = (specialty) => {
        modalType.current = "edit";
        const selectedLocation = locations.find(loc => loc.locationID === specialty.locationID);

        form.setFieldsValue({
            nameFood: specialty.nameFood,
            descriptionFood: specialty.descriptionFood,
            imageUrlFood: specialty.imageUrlFood,
            ratingFood: specialty.ratingFood,
            locationID: specialty.locationID,
        });

        setSelectedProvince(selectedLocation ? selectedLocation.province : ''); 
        setSelectedCity(selectedLocation ? selectedLocation.city : ''); 

        if (specialty.imageUrlFood) {
            setFileList([
                {
                    uid: '-1',
                    name: specialty.imageUrlFood,
                    status: 'done',
                    url: `https://localhost:7054/api/images/${specialty.imageUrlFood}`,
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
            let response = await specialtyService.UploadImage(token, formData);
            if (response.status === 401) {
                token = await refreshAccessToken();
                if (!token) return;
                response = await specialtyService.UploadImage(token, formData);
            }

            if (response.status === 200) {
                return response.data.imagePath;
            } else {
                message.error("Không thể upload hình ảnh!");
            }
        } catch (error) {
            message.error("Lỗi khi upload hình ảnh!");
            return null;
        }
    }

    const handleAddSpecialty = async (values) => {
        try {
            const imageUrlFood = await handleUploadImage();
            if (!imageUrlFood) return;
            values.imageUrlFood = imageUrlFood;

            values.provinceFood = selectedProvince;
            values.cityFood = selectedCity;

            let token = localStorage.getItem('accessToken');
            const response = await specialtyService.CreateSpecialty(token, values);

            if (response.status === 200) {
                message.success("Thêm mới món ăn thành công!");
                await getSpecialty();
                setIsModalOpen(false);
            } else {
                message.error("Thêm mới món ăn thất bại!");
            }
        } catch (error) {
            message.error("Lỗi khi thêm món ăn!");
        }
    };

    const handleEditSpecialty = async (values) => {
        try {
            if (fileList[0]?.originFileObj) {
                const imageUrlFood = await handleUploadImage();
                values.imageUrlFood = imageUrlFood; 
            }
    
            const { nameFood, ratingFood, descriptionFood, imageUrlFood } = values;
            const updatedValues = { nameFood, ratingFood, descriptionFood, imageUrlFood };
    
            let token = localStorage.getItem('accessToken');
            const response = await specialtyService.UpdateSpecialty(token, selectedSpecialtyID.current, updatedValues);
    
            if (response.status === 200) {
                message.success("Cập nhật món ăn thành công!");
                await getSpecialty();
                setIsModalOpen(false);
            } else {
                message.error("Cập nhật món ăn thất bại!");
            }
        } catch (error) {
            message.error("Lỗi khi cập nhật món ăn!");
        }
    };    
    
    const handleSubmit = async (values) => {
        try {
            if (modalType.current === "add") {
                await handleAddSpecialty(values);
            } else {
                await handleEditSpecialty(values);
            }
            setIsModalOpen(false);
        } catch (error) {
            message.error("Có lỗi xảy ra!");
        }
    };

    const handleDelete = async () => {
        try {
            let token = localStorage.getItem('accessToken');
            let response = await specialtyService.DeleteSpecialty(token, selectedSpecialtyID.current);
            if (response.status === 401) {
                token = await refreshAccessToken();
                if (!token) return;
                response = await specialtyService.DeleteSpecialty(token, selectedSpecialtyID.current);
            }

            if (response.status === 200) {
                message.success(response.data.message);
                await getSpecialty();
            } else {
                message.warning(response.message || "Món ăn này có dữ liệu đã sử dụng không thể xóa!");
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
        setFilteredCity(''); // Reset lọc thành phố
        setFilteredProvince(value); // Thiết lập lọc tỉnh
    };

    const handleCityChange = (value) => {
        setSelectedCity(value);
        const province = provinces.find((prov) => prov.cities.includes(value));
        setSelectedProvince(province ? province.name : '');
        setFilteredCity(value); // Thiết lập lọc thành phố
    };

    const getLocationName = (locationID) => {
        if (!locations || locations.length === 0) {
            return 'Không tìm thấy';
        }
        const location = locations.find((loc) => loc.locationID === locationID);
        return location ? location.name : 'Không tìm thấy';
    };    

    const columns = [
        { title: 'ID', dataIndex: 'specialtyID', key: 'specialtyID', align: 'center', width: 40 },
        {
            title: 'Ảnh', dataIndex: 'imageUrlFood', key: 'imageUrlFood', align: 'center', width: 80,
            render: (path) => (
                <img src={`https://localhost:7054/api/images/${path}`} alt="Specialty" className='w-full h-12 object-cover' />
            )
        },
        {
            title: 'Tên món ăn', dataIndex: 'nameFood', key: 'nameFood', align: 'center', width: 190, ellipsis: true,
            render: (nameFood) => (
                <Tooltip placement="topLeft" title={nameFood}>
                    {nameFood}
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
            title: 'Thành phố', dataIndex: 'cityFood', key: 'cityFood', align: 'center', width: 120, ellipsis: true,
            render: (cityFood) => (
                <Tooltip placement="topLeft" title={cityFood}>
                    {cityFood}
                </Tooltip>
            ),
        },
        {
            title: 'Tỉnh', dataIndex: 'provinceFood', key: 'provinceFood', align: 'center', width: 120, ellipsis: true,
            render: (provinceFood) => (
                <Tooltip placement="topLeft" title={provinceFood}>
                    {provinceFood}
                </Tooltip>
            ),
        },
        {
            title: 'Đánh giá', dataIndex: 'ratingFood', key: 'ratingFood', align: 'center', width: 120, ellipsis: true,
            sorter: (a, b) => a.ratingFood - b.ratingFood, sortDirections: ['descend'],
            render: (ratingFood) => (
                <Tooltip placement="topLeft" title={`${ratingFood}`}>
                    {ratingFood.toLocaleString()}
                </Tooltip>
            ),
        },
        {
            title: 'Mô tả', dataIndex: 'descriptionFood', key: 'descriptionFood', align: 'center', ellipsis: true,
            render: (descriptionFood) => (
                <Tooltip placement="topLeft" title={descriptionFood}>
                    {descriptionFood}
                </Tooltip>
            ),
        },
        {
            title: 'Thao tác', key: 'actions', align: 'center', width: 120, 
            render: (_, record) => (
                <div className='flex gap-2 justify-center'>
                    <Tooltip title="Cập nhật món ăn" placement='bottom' color={"gold"}>
                        <Button
                            className='px-3 py-5 border-yellow-500 hover:!border-yellow-500'
                            onClick={() => {
                                selectedSpecialtyID.current = record.specialtyID;
                                selectedSpecialtyImage.current = record.imageUrlFood;
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
                            selectedSpecialtyID.current = record.specialtyID;
                            handleDelete();
                        }}>
                        <Tooltip title="Xóa món ăn" placement='bottom' color={"red"}>
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
                    { title: 'Quản lý món ăn địa phương'}
                ]}
            />
            <div className='bg-white mt-4 p-4 rounded-md shadow-md' style={{ minHeight: 'calc(100vh - 8rem)', backgroundColor: '#f0f0f0', marginTop: '10px', borderRadius: '5px' }}>
                <h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize: '25px'}}>QUẢN LÝ MÓN ĂN ĐẶC SẢN</h2>
                <div className="flex justify-between mb-4" style={{ padding: '10px 10px', marginLeft: '50px' }}>
                    <Input
                        placeholder="Tìm kiếm món ăn..."
                        prefix={<SearchOutlined className='mr-2 ' />}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 250 }}
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
                        disabled={!selectedProvince} // Disable nếu chưa chọn tỉnh
                    >
                        <Select.Option value="">Tất cả</Select.Option>
                        {cityOptions.map(city => (
                            <Select.Option key={city} value={city}>
                                {city}
                            </Select.Option>
                        ))}
                    </Select>
                    <Select
                        placeholder="Chọn địa điểm"
                        onChange={setFilteredLocation}
                        style={{ width: 200, marginLeft: 10 }}
                    >
                        <Select.Option value="">Tất cả</Select.Option>
                        {locationsOptions.map(option => (
                            <Select.Option key={option.locationID} value={option.locationID}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                    <Button
                        type="primary"
                        onClick={showAddModal}
                        style={{ marginLeft: '30px' }}
                    >
                        <PlusOutlined className='mr-2' />
                        Thêm món ăn mới
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredSpecialty}
                    rowKey="specialtyID"
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
                    {modalType.current === "add" ? "THÊM MÓN ĂN MỚI" : "CẬP NHẬT MÓN ĂN"}
                </p>
                <Form form={form} onFinish={handleSubmit} layout="horizontal" requiredMark={false} labelCol={{ span: 6 }}>
                    <Form.Item
                        name="nameFood"
                        label="Tên món ăn"
                        rules={[{ required: true, message: 'Vui lòng nhập tên món ăn!' }]}
                    >
                        <Input className='mb-1 mt-2' placeholder='Nhập tên món ăn' />
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
                        name="descriptionFood"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <Input.TextArea className='mb-1 mt-2' placeholder='Nhập mô tả món ăn' rows={3} />
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
                        name="ratingFood"
                        label="Đánh giá"
                        rules={[
                            { required: true, message: 'Vui lòng nhập đánh giá!' },
                            { validator: (_, value) => (value >= 0 && value <= 5 ? Promise.resolve() : Promise.reject('Đánh giá phải từ 0 đến 5!')) }
                        ]}
                    >
                        <Input type="number" className='mb-1 mt-2' placeholder='Nhập đánh giá' />
                    </Form.Item>
                    
                    <Form.Item
                        name="imageUrlFood"
                        label="Ảnh"
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleUploadChange}
                            onPreview={handlePreview}
                            beforeUpload={() => false} // Ngăn chặn upload tự động
                        >
                            {fileList.length < 1 && '+ Upload'}
                        </Upload>
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            {modalType.current === "add" ? "Thêm món ăn" : "Cập nhật món ăn"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img alt="preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};

export default ManageSpecialty;


