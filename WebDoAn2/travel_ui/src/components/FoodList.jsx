import React, { useState, useEffect } from "react";
import { Pagination, Button, Rate, Row, Col, Card } from "antd";
import { Link } from 'react-router-dom';
import * as specialtyService from '../services/SpecialtyService';
import * as locationsService from '../services/LocationsService'; // Đường dẫn đúng
import { HomeOutlined }
    from '@ant-design/icons';

const FoodList = ({ pageSize = 4, col = 4, descriptionLength = 100 }) => {
    const [specialtys, setSpecialty] = useState([]);
    const [locations, setLocations] = useState([]); // Danh sách locations
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchSpecialty = async () => {
            try {
                const response = await specialtyService.GetSpecialty();
                setSpecialty(response.data || []);
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

    const totalPages = Math.ceil(specialtys.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentLocations = specialtys.slice(startIndex, endIndex);

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
            <Row gutter={[16, 16]}>
                {currentLocations.map((loc) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={loc.specialtyID}>
                        <Card 
                            hoverable
                            style={{ height: '420px', border: '0.1px solid black'  }}
                            cover={
                                <img
                                    alt={loc.nameFood}
                                    src={`https://localhost:7054/api/images/${loc.imageUrlFood}`}
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
                                    ĐẶC SẢN
                                </div>
                            <Card.Meta title={loc.nameFood} description={truncateDescription(loc.descriptionFood)} />
                            <div style={{ margin: '10px 0' }}>
                                <Rate allowHalf value={loc.ratingFood} disabled style={{ color: '#fadb14' }}/>
                                <p>Đánh giá: {loc.ratingFood}</p>
                                <p> <HomeOutlined style={{marginRight: '10px', color: 'blue'}}/>Địa điểm: {getLocationName(loc.locationID)}</p>
                            </div>
                            <Link to={`/specialty/${loc.specialtyID}`}>
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
                        total={specialtys.length}
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

export default FoodList;
