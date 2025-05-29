import React, { useState, useEffect } from "react";
import { Pagination, Button, Rate, Row, Col, Card } from "antd";
import { Link } from 'react-router-dom';
import * as hotelsService from '../services/HotelsService';
import * as locationsService from '../services/LocationsService'; // Đường dẫn đúng
import { HomeOutlined, MoneyCollectOutlined }
    from '@ant-design/icons';

const HotelsList = ({ pageSize = 4, col = 4, descriptionLength = 100 }) => {
    const [hotels, setHotels] = useState([]);
    const [locations, setLocations] = useState([]); // Danh sách locations
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await hotelsService.GetHotels();
                setHotels(response.data || []);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu khách sạn:", error);
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

        fetchHotels();
        fetchLocations();
    }, []);

    const totalPages = Math.ceil(hotels.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentLocations = hotels.slice(startIndex, endIndex);

    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    const truncateDescription = (descriptionHotel, maxLength = 60) => {
        if (descriptionHotel.length > maxLength) {
            const words = descriptionHotel.split(' ');
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
        return descriptionHotel;
    };

    const getLocationName = (locationID) => {
        const location = locations.find((loc) => loc.locationID === locationID);
        return location ? location.name : "Không xác định";
    };

    return (
        <>
            <Row gutter={[16, 16]}>
                {currentLocations.map((loc) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={loc.hotelID}>
                        <Card 
                            hoverable
                            style={{ height: '460px',border: '0.1px solid black'  }}
                            cover={
                                <img
                                    alt={loc.nameHotel}
                                    src={`https://localhost:7054/api/images/${loc.imageHotel}`}
                                    style={{ height: '170px', objectFit: 'cover' }}
                                />
                            }
                        >
                            <div
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        left: "10px",
                                        backgroundColor: "red",
                                        color: "white",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    HOT
                                </div>
                            <Card.Meta title={loc.nameHotel} description={truncateDescription(loc.descriptionHotel)} />
                            <div style={{ margin: '10px 0' }}>
                                <Rate allowHalf value={loc.ratingHotel} disabled style={{ color: '#fadb14' }}/>
                                <p>Đánh giá: {loc.ratingHotel}</p>
                                <p> <HomeOutlined style={{marginRight: '10px', color: 'blue'}}/>Địa điểm: {getLocationName(loc.locationID)}</p>
                                <p> <MoneyCollectOutlined style={{marginRight: '10px', color: 'blue'}}/>Giá thuê: {loc.pricePerNight} VNĐ/1 người</p>
                            </div>
                            <Link to={`/hotels/${loc.hotelID}`}>
                                <Button type="primary" style={{marginLeft: 60, padding: '20px 30px'}}>Xem chi tiết</Button>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
            {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    <Pagination
                        current={currentPage}
                        total={hotels.length}
                        pageSize={pageSize}
                        onChange={onChangePage}
                        showSizeChanger={false}
                        style={{
                            marginLeft: 580,
                            marginTop: '10px'
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default HotelsList;
