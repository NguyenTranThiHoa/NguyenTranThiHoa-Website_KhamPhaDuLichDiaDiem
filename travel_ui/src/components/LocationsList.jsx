import React, { useState, useEffect } from "react";
import { Pagination, Button, Rate, Row, Col, Card } from "antd";
import { Link } from 'react-router-dom';
import { FieldTimeOutlined, CheckCircleOutlined  }
    from '@ant-design/icons';
import * as locationsService from '../services/LocationsService'; // Import service để lấy dữ liệu

const LocationsList = ({ pageSize = 4, col = 4, descriptionLength = 100 }) => {
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await locationsService.GetLocations();
                setLocations(response.data || []);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu địa điểm:", error);
            }
        };
        fetchLocations();
    }, []);

    const totalPages = Math.ceil(locations.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentLocations = locations.slice(startIndex, endIndex);

    const onChangePage = (page) => {
        setCurrentPage(page);
    };

    const truncateDescription = (description, maxLength = 60) => {
        if (description.length > maxLength) {
            const words = description.split(' ');
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
        return description;
    };
    
    const formatPublishedDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <>
            <Row gutter={[16, 16]}>
                {currentLocations.map((loc) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={loc.locationID}>
                        <Card 
                            hoverable
                            style={{ height: '450px',border: '0.1px solid black'  }}
                            cover={
                                <img
                                    alt={loc.name}
                                    src={`https://localhost:7054/api/images/${loc.imageUrl}`}
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
                                    HẤP DẪN
                                </div>
                            <Card.Meta title={loc.name} description={truncateDescription(loc.description)} />
                            <div style={{ margin: '10px 0' }}>
                                <Rate allowHalf value={loc.rating} disabled style={{ color: '#fadb14' }}/>
                                <p>Đánh giá: {loc.rating}</p>
                                <p><FieldTimeOutlined style={{marginRight: '10px', color: 'blue'}}/>Ngày đăng: {formatPublishedDate(loc.publishedDate)}</p>
                                <p><CheckCircleOutlined style={{marginRight: '10px', color: 'blue'}}/>Tỉnh: {loc.province}</p>
                            </div>
                            <Link to={`/locations/${loc.locationID}`}>
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
                        total={locations.length}
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

export default LocationsList;