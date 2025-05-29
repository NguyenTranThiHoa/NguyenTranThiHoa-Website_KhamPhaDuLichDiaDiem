import React, { useState, useEffect } from "react";
import { Pagination, Button, Row, Col, Card, Select, Input } from "antd";
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, CheckCircleOutlined } from '@ant-design/icons';
import * as transportsService from '../services/TransportsService';
import * as locationsService from '../services/LocationsService';
import * as transportTypeService from '../services/TransportTypeService';

const { Option } = Select;

const TransportsUser = ({ pageSize = 8 }) => {
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

    const [transports, setTransports] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredTransports, setFilteredTransports] = useState([]);
    const [locations, setLocations] = useState([]);
    const [transportTypes, setTransportTypes] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedTransportTypes, setSelectedTransportTypes] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchTransports = async () => {
            try {
                const response = await transportsService.GetTransports();
                setTransports(response.data || []);
                setFilteredTransports(response.data || []);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu phương tiện:", error);
            }
        };
        const fetchLocations = async () => {
            try {
                const response = await locationsService.GetLocations();
                setLocations(response.data || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách địa điểm:", error);
            }
        };
        const fetchTransportTypes = async () => {
            try {
                const response = await transportTypeService.GetTransportType();
                setTransportTypes(response.data || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách loại phương tiện:", error);
            }
        };

        fetchTransports();
        fetchLocations();
        fetchTransportTypes();
    }, []);

    useEffect(() => {
        let filtered = transports;

        // Lọc theo tỉnh
        if (selectedProvince && selectedProvince !== 'Tất cả') {
            filtered = filtered.filter(loc => loc.provinceTransports === selectedProvince);
        }

        // Lọc theo thành phố
        if (selectedCity && selectedCity !== 'Tất cả') {
            filtered = filtered.filter(loc => loc.cityTransports === selectedCity);
        }

        // Lọc theo loại phương tiện
        if (selectedTransportTypes.length > 0) {
            filtered = filtered.filter(loc => selectedTransportTypes.includes(loc.transportTypeID));
        }

        // Lọc theo tên phương tiện
        if (searchText) {
            filtered = filtered.filter(loc => 
                loc.transportTypeName && loc.transportTypeName.toLowerCase().includes(searchText.toLowerCase())
            );
        }
        setFilteredTransports(filtered);
        setCurrentPage(1);
    }, [selectedProvince, selectedCity, selectedTransportTypes, searchText, transports]);

    const totalPages = Math.ceil(filteredTransports.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentTransports = filteredTransports.slice(startIndex, endIndex);

    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    const truncateDescription = (descriptionTransports, maxLength = 60) => {
        if (descriptionTransports.length > maxLength) {
            const words = descriptionTransports.split(' ');
            let truncatedDescription = '';
            let currentLength = 0;
            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                if (currentLength + word.length + 1 <= maxLength) {
                    truncatedDescription += `${word} `;
                    currentLength += word.length + 1;
                } else {
                    if (maxLength - currentLength >= 15) {
                        truncatedDescription += `${word} `;
                        currentLength += word.length + 1;
                    } else {
                        truncatedDescription += '...';
                        break;
                    }
                }
            }
            return truncatedDescription.trim();
        }
        return descriptionTransports;
    };

    const getLocationName = (locationID) => {
        const location = locations.find((loc) => loc.locationID === locationID);
        return location ? location.name : "Không xác định";
    };

    const getTransportTypeName = (transportTypeID) => {
        const transportType = transportTypes.find((type) => type.transportTypeID === transportTypeID);
        return transportType ? transportType.name : "Không xác định";
    };

    return (
        <>
            <div style={{ marginBottom: '20px', backgroundColor: '#75BDE0', borderRadius: '5px', padding: '20px 20px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '18px' }}>LỌC VÀ TÌM KIẾM DANH SÁCH PHƯƠNG TIỆN</h2>
                <Input
                    placeholder="Tìm kiếm tên phương tiện"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 350, marginRight: 10, marginLeft: 70 }}
                />
                <Select
                    placeholder="Chọn tỉnh"
                    style={{ width: 250, marginRight: 10, marginLeft: '80' }}
                    onChange={value => {
                        setSelectedProvince(value);
                        setSelectedCity(null);
                    }}
                >
                    <Option value="Tất cả">Tất cả</Option>
                    {provinces.map(province => (
                        <Option key={province.id} value={province.name}>{province.name}</Option>
                    ))}
                </Select>

                <Select
                    placeholder="Chọn thành phố"
                    style={{ width: 250, marginRight: 10 }}
                    onChange={value => setSelectedCity(value)}
                >
                    <Option value="Tất cả">Tất cả</Option>
                    {selectedProvince && selectedProvince !== 'Tất cả' && provinces.find(p => p.name === selectedProvince)?.cities.map(city => (
                        <Option key={city} value={city}>{city}</Option>
                    ))}
                </Select>

                <Select
                    placeholder="Chọn loại phương tiện"
                    style={{ width: 250, marginRight: 10 }}
                    onChange={value => {
                        if (value === "Tất cả") {
                            setSelectedTransportTypes([]);
                        } else {
                            setSelectedTransportTypes([value]);
                        }
                    }}
                >
                    <Option value="Tất cả">Tất cả</Option>
                    {transportTypes.map((type) => (
                        <Option key={type.transportTypeID} value={type.transportTypeID}>
                            {type.name} {/* Hiển thị tên loại phương tiện */}
                        </Option>
                    ))}
                </Select>
            </div>

            {filteredTransports.length === 0 ? (
                <div>Phương tiện hiện tại chưa có, chúng tôi sẽ cập nhật thêm</div>
            ) : (
                <Row gutter={[16, 16]}>
                    {currentTransports.map((loc) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={loc.transportID}>
                            <Card 
                                hoverable
                                style={{ height: '400px', border: '0.1px solid black' }}
                                cover={
                                    <img
                                        alt={getTransportTypeName(loc.transportTypeID)} // Hiển thị tên loại phương tiện
                                        src={`https://localhost:7054/api/images/${loc.imageUrl}`}
                                        style={{ height: '170px', objectFit: 'cover' }}
                                    />
                                }
                            >
                                <Card.Meta title={getTransportTypeName(loc.transportTypeID)} description={truncateDescription(loc.descriptionTransports)} />
                                <div style={{ margin: '10px 0' }}>
                                    <p><HomeOutlined style={{ marginRight: '10px', color: 'blue' }} />Địa điểm: {getLocationName(loc.locationID)}</p>
                                    <p><CheckCircleOutlined style={{ marginRight: '10px', color: 'blue' }} />Tỉnh: {loc.provinceTransports}</p>
                                    <p><MoneyCollectOutlined style={{ marginRight: '10px', color: 'blue' }} />Giá thuê: {loc.priceRange} VNĐ/1 người</p>
                                </div>
                                <Link to={`/transports/${loc.transportID}`}>
                                    <Button type="primary" style={{ marginLeft: 60, padding: '20px 30px' }}>Xem chi tiết</Button>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    <Pagination
                        current={currentPage}
                        total={filteredTransports.length}
                        pageSize={pageSize}
                        onChange={onChangePage}
                    />
                </div>
            )}
        </>
    );
};

export default TransportsUser;
