import React, { useEffect, useState, useCallback, useRef } from 'react';
import { App, Table, Tooltip, Breadcrumb, Input, Button, Form, Upload, Image, Select, Modal, Popconfirm } from 'antd';    
import { useNavigate } from 'react-router-dom';
import refreshToken from '../../utils/refreshToken';
import * as locationsService from '../../services/LocationsService';
import * as transportsService from '../../services/TransportsService';
import * as transportTypeService from '../../services/TransportTypeService';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';

const ManageTransports = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    const [transportType, setTransportType] = useState([]); 
    const [transportTypeOptions, setTransportTypeOptions] = useState([]);
    const [transports, setTransports] = useState([]);
    const [locations, setLocations] = useState([]); 
    const [locationsOptions, setLocationsOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const modalType = useRef("add");
    const selectedTransportsID = useRef(null);
    const selectedTransportsImage = useRef("");
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

    // State for filtering
    const [filteredTransportType, setFilteredTransportType] = useState('');
    const [filteredLocation, setFilteredLocation] = useState('');

    const getTransports = useCallback(async () => {
        setLoading(true);
        try {
            const response = await transportsService.GetTransports();
            if (response.status === 200) {
                setTransports(response.data || []);
            } else {
                message.error("Không thể tải dữ liệu phương tiện!");
            }
        } catch (error) {
            message.error("Không thể tải dữ liệu phương tiện!");
            console.error(error);
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
                }));
                setLocationsOptions(locations);
                setLocations(response.data);
            } else {
                message.error("Không thể tải dữ liệu địa điểm!");
            }
        } catch (error) {
            message.error("Không thể tải dữ liệu địa điểm!");
            console.error(error);
        }
    }, [message]);    

    const getTransportType = useCallback(async () => {
        try {
            const response = await transportTypeService.GetTransportType();
            if (response.status === 200) {
                const types = response.data.map(type => ({
                    label: type.name,
                    value: type.transportTypeID,
                }));
                setTransportTypeOptions(types);
                setTransportType(response.data);
            } else {
                message.error("Không thể tải dữ liệu tên phân loại!");
            }
        } catch (error) {
            message.error("Không thể tải dữ liệu tên phân loại!");
            console.error(error);
        }
    }, [message]); 

    useEffect(() => {
        getTransportType();
        getLocations();
        getTransports(); // Thêm gọi getTransports tại đây
    }, [getTransportType, getLocations, getTransports]);

    const filteredTransports = transports.filter(transport => {
        const stringSearch = searchText.toLowerCase();
        const isTransportTypeMatch = filteredTransportType ? transport.transportTypeID === filteredTransportType : true;
        const isLocationMatch = filteredLocation ? transport.locationID === filteredLocation : true;

        return (String(transport.transportID).includes(stringSearch) ||
               transport.type.toLowerCase().includes(stringSearch) ||
               transport.provinceTransports.toLowerCase().includes(stringSearch) ||
               transport.cityTransports.toLowerCase().includes(stringSearch)) &&
               isTransportTypeMatch &&
               isLocationMatch;
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

    const showEditModal = (transport) => {
        modalType.current = "edit";
        form.setFieldsValue({
            transportTypeID: transport.transportTypeID,
            locationID: transport.locationID,
            descriptionTransports: transport.descriptionTransports,
            contactTransports: transport.contactTransports,
            priceRange: transport.priceRange,
        });
        setSelectedProvince(transport.province); 
        setSelectedCity(transport.city); 

        if (transport.imageUrl) {
            setFileList([{
                uid: '-1',
                name: transport.imageUrl,
                status: 'done',
                url: `https://localhost:7054/api/images/${transport.imageUrl}`,
            }]);
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
            let response = await transportsService.UploadImage(token, formData);
            if (response.status === 401) {
                token = await refreshAccessToken();
                if (!token) return;
                response = await transportsService.UploadImage(token, formData);
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

    const handleAddTransports = async (values) => {
        try {
            const imageUrl = await handleUploadImage();
            if (!imageUrl) return;
            values.imageUrl = imageUrl;

            values.provinceTransports = selectedProvince;
            values.cityTransports = selectedCity;

            let token = localStorage.getItem('accessToken');
            const response = await transportsService.CreateTransports(token, values);

            if (response.status === 200) {
                message.success("Thêm mới phương tiện thành công!");
                await getTransports();
                setIsModalOpen(false);
            } else {
                message.error("Thêm mới phương tiện thất bại!");
            }
        } catch (error) {
            message.error("Lỗi khi thêm phương tiện!");
        }
    };

    const handleEditTransports = async (values) => {
        try {
            if (fileList[0]?.originFileObj) {
                const imageUrl = await handleUploadImage();
                if (!imageUrl) {
                    values.imageUrl = selectedTransportsImage.current; // Giữ nguyên hình ảnh cũ
                } else {
                    values.imageUrl = imageUrl; // Cập nhật hình ảnh mới
                }
            } else {
                values.imageUrl = selectedTransportsImage.current; // Giữ nguyên hình ảnh cũ nếu không có hình ảnh mới
            }
    
            const { transportTypeID, priceRange, contactTransports, descriptionTransports, imageUrl } = values;
            const updatedValues = {transportTypeID, priceRange, contactTransports, descriptionTransports, imageUrl };
    
            let token = localStorage.getItem('accessToken');
            const response = await transportsService.UpdateTransports(token, selectedTransportsID.current, updatedValues);
    
            if (response.status === 200) {
                message.success("Cập nhật phương tiện thành công!");
                await getTransports();
                setIsModalOpen(false);
            } else {
                message.error("Cập nhật phương tiện thất bại!");
            }
        } catch (error) {
            message.error("Lỗi khi cập nhật phương tiện !");
            console.error(error);
        }
    };      
    
    const handleSubmit = async (values) => {
        try {
            if (modalType.current === "add") {
                await handleAddTransports(values);
            } else {
                await handleEditTransports(values);
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
            let response = await transportsService.DeleteTransports(token, selectedTransportsID.current);
            if (response.status === 401) {
                token = await refreshAccessToken();
                if (!token) return;
                response = await transportsService.DeleteTransports(token, selectedTransportsID.current);
            }

            if (response.status === 200) {
                message.success(response.data.message);
                await getTransports();
            } else {
                message.warning(response.message || "Phương tiện này có dữ liệu đã sử dụng không thể xóa!");
            }
        } catch (error) {
            message.error("Lỗi khi xóa dữ liệu!");
            console.log(error);
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
    
    const getTransportTypeName = (transportTypeID) => {
        if (!transportType || transportType.length === 0) {
            return 'Không tìm thấy';
        }
        const transportTypeItem = transportType.find((type) => type.transportTypeID === transportTypeID);
        return transportTypeItem ? transportTypeItem.name : 'Không tìm thấy';
    };  

    const columns = [
        { title: 'ID', dataIndex: 'transportID', key: 'transportID', align: 'center', width: 40 },
        {
            title: 'Ảnh', dataIndex: 'imageUrl', key: 'imageUrl', align: 'center', width: 80,
            render: (path) => (
                <img src={`https://localhost:7054/api/images/${path}`} alt="Transport" className='w-full h-12 object-cover' />
            )
        },
        {
            title: 'Tên phương tiện',
            dataIndex: 'transportTypeID',
            key: 'transportType',
            align: 'center',
            width: 180,
            render: (transportTypeID) => {
                const transportTypeName = getTransportTypeName(transportTypeID);
                return (
                    <Tooltip placement="topLeft" title={transportTypeName}>
                        {transportTypeName}
                    </Tooltip>
                );
            },            
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
            title: 'Thành phố', dataIndex: 'cityTransports', key: 'cityTransports', align: 'center', width: 120, ellipsis: true,
            render: (cityTransports) => (
                <Tooltip placement="topLeft" title={cityTransports}>
                    {cityTransports}
                </Tooltip>
            ),
        },
        {
            title: 'Tỉnh', dataIndex: 'provinceTransports', key: 'provinceTransports', align: 'center', width: 120, ellipsis: true,
            render: (provinceTransports) => (
                <Tooltip placement="topLeft" title={provinceTransports}>
                    {provinceTransports}
                </Tooltip>
            ),
        },
        {
            title: 'Giá thuê phương tiện', dataIndex: 'priceRange', key: 'priceRange', align: 'center', width: 120, ellipsis: true,
            sorter: (a, b) => a.priceRange - b.priceRange, sortDirections: ['descend'],
            render: (priceRange) => (
                <Tooltip placement="topLeft" title={`${priceRange} VNĐ`}>
                    {priceRange.toLocaleString()}
                </Tooltip>
            ),
        },
        {
            title: 'Liên hệ', dataIndex: 'contactTransports', key: 'contactTransports', align: 'center', ellipsis: true,
            render: (contactTransports) => (
                <Tooltip placement="topLeft" title={contactTransports}>
                    {contactTransports}
                </Tooltip>
            ),
        },
        {
            title: 'Mô tả', dataIndex: 'descriptionTransports', key: 'descriptionTransports', align: 'center', ellipsis: true,
            render: (descriptionTransports) => (
                <Tooltip placement="topLeft" title={descriptionTransports}>
                    {descriptionTransports}
                </Tooltip>
            ),
        },
        {
            title: 'Thao tác', key: 'actions', align: 'center', width: 120, 
            render: (_, record) => (
                <div className='flex gap-2 justify-center'>
                    <Tooltip title="Cập nhật phương tiện" placement='bottom' color={"gold"}>
                        <Button
                            className='px-3 py-5 border-yellow-500 hover:!border-yellow-500'
                            onClick={() => {
                                selectedTransportsID.current = record.transportID;
                                selectedTransportsImage.current = record.imageUrl;
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
                            selectedTransportsID.current = record.transportID;
                            handleDelete();
                        }}>
                        <Tooltip title="Xóa phương tiện" placement='bottom' color={"red"}>
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
                    { title: 'Quản lý phương tiện di chuyển' }
                ]}
            />
            <div className='bg-white mt-4 p-4 rounded-md shadow-md' style={{ minHeight: 'calc(100vh - 8rem)', backgroundColor: '#f0f0f0', marginTop: '10px', borderRadius: '5px' }}>
                <h2 style={{textAlign: 'center', fontWeight: 'bold', fontSize: '25px'}}>QUẢN LÝ PHƯƠNG TIỆN DI CHUYỂN</h2>
                <div className="flex justify-between mb-4" style={{ padding: '10px 10px', marginLeft: '50px' }}>
                    <Input
                        placeholder="Tìm kiếm phương tiện..."
                        prefix={<SearchOutlined className='mr-2 ' />}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 400 }}
                    />
                    <Select
                        placeholder="Lọc theo loại phương tiện"
                        onChange={setFilteredTransportType}
                        style={{ width: 200, marginLeft: 10 }}
                    >
                        <Select.Option value="">Tất cả</Select.Option>
                        {transportTypeOptions.map(option => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                    <Select
                        placeholder="Lọc theo địa điểm"
                        onChange={setFilteredLocation}
                        style={{ width: 200, marginLeft: 10 }}
                    >
                        <Select.Option value="">Tất cả</Select.Option>
                        {locationsOptions.map(option => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                    <Button
                        type="primary"
                        onClick={showAddModal}
                        style={{ marginLeft: '30px' }}
                    >
                        <PlusOutlined className='mr-2' />
                        Thêm phương tiện mới
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredTransports}
                    rowKey="transportID"
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
                    {modalType.current === "add" ? "THÊM PHƯƠNG TIỆN MỚI" : "CẬP NHẬT PHƯƠNG TIỆN"}
                </p>
                <Form form={form} onFinish={handleSubmit} layout="horizontal" requiredMark={false} labelCol={{ span: 6 }}>
                    <Form.Item
                        name="transportTypeID"
                        label="Tên phương tiện"
                        rules={[{ required: true, message: 'Vui lòng chọn phương tiện!' }]}
                    >
                        <Select
                            placeholder="Chọn phương tiện"
                            options={transportTypeOptions}
                        />
                    </Form.Item>

                    <Form.Item
                        name="locationID"
                        label="Địa điểm"
                        rules={[{ required: true, message: 'Vui lòng chọn địa điểm!' }]}
                    >
                        <Select
                            placeholder="Chọn địa điểm"
                            options={locationsOptions}
                        />
                    </Form.Item>
            
                    <Form.Item
                        name="descriptionTransports"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                    >
                        <Input.TextArea className='mb-1 mt-2' placeholder='Nhập mô tả phương tiện' rows={3} />
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
                        name="contactTransports"
                        label="Liên hệ"
                        rules={[{ required: true, message: 'Vui lòng nhập liên hệ!' }]}
                    >
                        <Input.TextArea className='mb-1 mt-2' placeholder='Nhập liên hệ' rows={3} />
                    </Form.Item>

                    <Form.Item
                        name="priceRange"
                        label="Giá tiền"
                        rules={[
                            { required: true, message: 'Vui lòng nhập giá tiền!' },
                            { validator: (_, value) => (value > 0 ? Promise.resolve() : Promise.reject('Giá phải lớn hơn 0!')) }
                        ]}
                    >
                        <Input type="number" className='mb-1 mt-2' placeholder='Nhập giá tiền' />
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

export default ManageTransports;
