import React, { useState, useEffect } from "react";
import { Pagination, Button, Rate, Row, Col, Card, Select, Input } from "antd";
import { Link } from 'react-router-dom';
import { HomeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import * as specialtyService from '../services/SpecialtyService';
import * as locationsService from '../services/LocationsService'; // Đường dẫn đúng

const { Option } = Select;

const FoodUser = ({ pageSize = 12, col = 4, descriptionLength = 100 }) => {
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

    const [specialtys, setSpecialty] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredSpecialty, setFilteredSpecialty] = useState([]);
    const [locations, setLocations] = useState([]); // Danh sách locations
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchSpecialty = async () => {
            try {
                const response = await specialtyService.GetSpecialty();
                setSpecialty(response.data || []);
                filteredSpecialty(response.data || []);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu món ăn:", error);
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
        
        fetchSpecialty();
        fetchLocations();
    }, []);

    useEffect(() => {
        let filtered = specialtys;

        // Lọc theo tỉnh
        if (selectedProvince && selectedProvince !== 'Tất cả') {
            filtered = filtered.filter(loc => loc.provinceFood === selectedProvince);
        }

        // Lọc theo thành phố
        if (selectedCity && selectedCity !== 'Tất cả') {
            filtered = filtered.filter(loc => loc.cityFood === selectedCity);
        }

        // Lọc theo đánh giá
        if (selectedRating && selectedRating !== 'Tất cả') {
            filtered = filtered.filter(loc => loc.ratingFood >= selectedRating);
        }

        // Lọc theo tên địa điểm
        if (searchText) {
            filtered = filtered.filter(loc => loc.nameFood.toLowerCase().includes(searchText.toLowerCase())||
            loc.provinceFood.toLowerCase().includes(searchText.toLowerCase()) ||
            loc.cityFood.toLowerCase().includes(searchText.toLowerCase())
        );
        }

        setFilteredSpecialty(filtered);
        setCurrentPage(1); 
    }, [selectedProvince, selectedCity, selectedRating, searchText, specialtys]);

    const totalPages = Math.ceil(filteredSpecialty.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentSpecialty = filteredSpecialty.slice(startIndex, endIndex);

    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    const truncateDescription = (descriptionFood, maxLength = 60) => {
        if (descriptionFood.length > maxLength) {
            const words = descriptionFood.split(' ');
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
        return descriptionFood;
    };

    const getLocationName = (locationID) => {
        const location = locations.find((loc) => loc.locationID === locationID);
        return location ? location.name : "Không xác định";
    };

    return (
        <>
            <div style={{ marginBottom: '20px', backgroundColor: '#75BDE0', borderRadius: '5px', padding: '20px 20px' }}>
                <h2 style={{textAlign: 'center', marginBottom: '10px', fontSize: '18px'}}>LỌC VÀ TÌM KIẾM DANH SÁCH MÓN ĂN</h2>
                <Input
                    placeholder="Tìm kiếm địa điểm"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 350, marginRight: 10, marginLeft: 70}}
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
                    placeholder="Chọn đánh giá"
                    style={{ width: 250, marginRight: 10 }}
                    onChange={value => setSelectedRating(value)}
                >
                    <Option value="Tất cả">Tất cả</Option>
                    <Option value={1}>1 sao trở lên</Option>
                    <Option value={2}>2 sao trở lên</Option>
                    <Option value={3}>3 sao trở lên</Option>
                    <Option value={4}>4 sao trở lên</Option>
                    <Option value={5}>5 sao</Option>
                </Select>
            </div>

            {filteredSpecialty.length === 0 ? (
                <div>Món ăn hiện tại chưa có, chúng tôi sẽ cập nhật thêm</div>
            ) : (
                <Row gutter={[16, 16]}>
                    {currentSpecialty.map((loc) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={loc.specialtyID}>
                            <Card 
                                hoverable
                                style={{ height: '450px', border: '0.1px solid black' }}
                                cover={
                                    <img
                                        alt={loc.nameFood}
                                        src={`https://localhost:7054/api/images/${loc.imageUrlFood}`}
                                        style={{ height: '170px', objectFit: 'cover' }}
                                    />
                                }
                            >
                                <Card.Meta title={loc.nameFood} description={truncateDescription(loc.descriptionFood)} />
                                <div style={{ margin: '10px 0' }}>
                                    <Rate allowHalf value={loc.ratingFood} disabled style={{ color: '#fadb14' }}/>
                                    <p>Đánh giá: {loc.ratingFood}</p>
                                    <p> <HomeOutlined style={{marginRight: '10px', color: 'blue'}}/>Địa điểm: {getLocationName(loc.locationID)}</p>
                                    <p><CheckCircleOutlined style={{marginRight: '10px', color: 'blue'}}/>Tỉnh: {loc.provinceFood}</p>
                                </div>
                                <Link to={`/specialty/${loc.specialtyID}`}>
                                    <Button type="primary" style={{marginLeft: 60, padding: '20px 30px'}}>Xem chi tiết</Button>
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
                        total={filteredSpecialty.length}
                        pageSize={pageSize}
                        onChange={onChangePage}
                        showSizeChanger={false}
                        style={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '10px'
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default FoodUser;
