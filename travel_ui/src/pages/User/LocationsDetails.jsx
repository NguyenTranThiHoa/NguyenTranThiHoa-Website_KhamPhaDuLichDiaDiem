import React, { useState, useEffect, useCallback } from "react";
import { Image, Spin, App, Rate, Breadcrumb, Form, Button, List, Avatar, Input, Row, Col, Pagination } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import * as locationsService from '../../services/LocationsService';
import * as reviewsService from '../../services/ReviewsService';
import refreshToken from "../../utils/refreshToken";
import LocationsList from '../../components/LocationsList';

const LocationsDetails = () => {
    const navigate = useNavigate();
    const { message } = App.useApp();
    const { id } = useParams();
    const [locationsDetail, setDetailLocations] = useState({});
    const [locations, setLocations] = useState([]);
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage] = useState(3); // Số bình luận trên mỗi trang
    const [form] = Form.useForm();

    const getDetailPage = useCallback(async () => {
        try {
            const responseDetail = await locationsService.GetLocationsById(id);
            const responseRelate = await locationsService.GetLocations(id);
            const token = await refreshAccessToken();
            if (token) {
                const reviewsResponse = await reviewsService.GetReviewsByLocationId(token, id);
                setComments(reviewsResponse.data || []);
            }
            setDetailLocations(responseDetail.data);
            setLocations(responseRelate.data);
        } catch (error) {
            message.error("Không thể tải dữ liệu!");
        }
    }, [message, id]);

    useEffect(() => {
        getDetailPage();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [getDetailPage]);

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

    const handleAddComment = async (values) => {
        const { noiDung, ratingReviews } = values;
        const token = await refreshAccessToken();
        if (!token) {
            return;
        }

        if (!noiDung || !ratingReviews) {
            message.error('Vui lòng nhập nội dung và đánh giá!');
            return;
        }

        const newComment = {
            NoiDung: noiDung,
            RatingReviews: ratingReviews,
            UserID: localStorage.getItem('userID'),
            LocationID: parseInt(id),
            ReviewDate: new Date().toISOString(),
        };

        try {
            const response = await reviewsService.CreateReviews(token, newComment);
            if (response.status === 200) {
                setComments([response.data, ...comments]);
                form.resetFields();
                message.success('Đã thêm bình luận thành công!');
            } else {
                message.error('Bạn chưa đăng nhập khi thêm bình luận!');
            }
        } catch (error) {
            message.error('Có lỗi xảy ra khi thêm bình luận!');
        }
    };

    // Phân trang bình luận
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Breadcrumb
                separator=">"
                items={[
                    { title: 'Home' },
                    { title: 'Địa điểm', href: '/locations' },
                    { title: locationsDetail.name || 'Chi tiết' },
                ]}
                style={{ padding: '10px 50px', backgroundColor: '#F6E2BC', color: 'black' }}
            />
            <div style={{ padding: '20px 100px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '0px', fontFamily: 'monospace', color: '#3b7097',
                    padding: '10px 0px', borderRadius: '5px', fontSize: '30px', fontWeight: 'bold', marginLeft: 120, marginRight: 120
                }}>
                    --------------------- CHI TIẾT VỀ ĐỊA ĐIỂM ---------------------
                </h2>
                <p style={{ textAlign: 'center', padding: '0px 360px' }}>
                    Cảm giác bước đi trên bãi biển đầy nắng, nghe sóng vỗ rì rào hay leo lên đỉnh núi ngắm bình minh đều làm tâm hồn 
                    trở nên thư thái và tràn đầy năng lượng.
                </p>
                <hr style={{ margin: '15px 550px', height: '3px', backgroundColor: '#3b7097', border: 'none' }} />
            </div>
            <div style={{ padding: '10px 150px' }}>
                <Row gutter={16} justify="center">
                    <Col xs={20} sm={12} style={{ textAlign: 'center' }}>
                        <Image
                            src={locationsDetail.imageUrl ? `https://localhost:7054/api/images/${locationsDetail.imageUrl}` : ""}
                            alt={locationsDetail.name}
                            width={600} // Thay đổi kích thước hình ảnh nếu cần
                            height={400}
                            style={{ borderRadius: '8px' }}
                        />
                    </Col>
                    <Col xs={20} sm={12} style={{ textAlign: 'center' }}>
                        <div className="w-full mt-6 border border-gray-300 overflow-hidden">
                            <iframe
                                title="Google Maps Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.02330629317!2d105.64124277368369!3d10.419723489708167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a64d83b2792df%3A0x17bca5e601420f5a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyDEkOG7k25nIFRow6Fw!5e0!3m2!1svi!2s!4v1733123560401!5m2!1svi!2s"
                                width="100%"
                                height="400"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </Col>
                </Row>
                <h2 style={{ textAlign: 'center', marginBottom: '0px', fontFamily: 'monospace', color: '#3b7097', fontSize: '30px', fontWeight: 'bold' }}>
                    GIỚI THIỆU TỔNG QUAN
                </h2>
                <div style={{ padding: '0px 20px', textAlign: 'center' }}>
                    <p>
                        Tên địa điểm: <span style={{ fontSize: '25px' }}>{locationsDetail.name}</span>
                    </p>
                    <p>
                        Địa chỉ: Tỉnh {locationsDetail.province}, {locationsDetail.city}
                    </p>
                    <p>
                        Điểm đánh giá: {locationsDetail.rating} 
                        <Rate allowHalf value={locationsDetail.rating} disabled style={{ color: '#fadb14' }} />
                    </p>
                </div>
                <p style={{ textAlign: 'justify', padding: '0px 50px'}}>
                        Nếu có dịp đến với du lịch này, đừng quên ghé thăm nơi du lịch để cảm nhận vẻ đẹp chân thực của thiên nhiên và con người nơi đây. 
                        Chuyến hành trình chắc chắn sẽ để lại những kỷ niệm khó phai trong lòng bạn!
                        Giữ gìn giá trị truyền thống giữa lòng di sản thế giới:
                        Trong bối cảnh phát triển du lịch, du lịch vẫn giữ được nét mộc mạc, giản dị vốn có. 
                        Người dân nơi đây không chỉ làm du lịch mà còn nỗ lực bảo tồn giá trị văn hóa truyền thống và cảnh quan thiên nhiên. 
                        Chính điều này đã làm nên sức hút bền vững cho ngôi làng nhỏ giữa lòng di sản thế giới.
                        Đến với du lịch, bạn sẽ cảm nhận được sự giao hòa giữa con người và thiên nhiên, giữa lịch sử và hiện đại. 
                        Dù là người yêu thích phiêu lưu hay chỉ đơn giản muốn tìm nơi thư giãn, chắc chắn sẽ để lại trong lòng bạn những dấu ấn khó quên. 
                </p>
                <div>
                    {locationsDetail.description
                        ?.split(/\n+/) // Chia đoạn văn bằng các ký tự xuống dòng liên tiếp
                        .filter((paragraph) => paragraph.trim() !== "") // Loại bỏ các dòng trống
                        .map((paragraph, index) => (
                        <p key={index} style={{ marginBottom: "16px", lineHeight: "1.6" ,  padding: '0px 50px'}}>
                            {paragraph.trim()}
                        </p>
                        ))}
                </div>

            </div>

            <div style={{ padding: '20px 200px'}}>
                <div style={{ backgroundColor: '#f0f0f0', padding: '10px 20px', borderRadius: '5px'}}>
                    <h2 style={{ fontSize: '18px' }}>Bình luận & Đánh giá</h2>
                    <Form form={form} onFinish={handleAddComment} layout="vertical">
                        <Form.Item
                            name="ratingReviews"
                            label="Đánh giá"
                            rules={[{ required: true, message: 'Vui lòng chọn số sao đánh giá!' }]}
                        >
                            <Rate />
                        </Form.Item>
                        <Form.Item
                            name="noiDung"
                            label="Nội dung bình luận"
                            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                        >
                            <Input.TextArea rows={2} placeholder="Nhập nội dung bình luận của bạn..." />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Gửi bình luận
                            </Button>
                        </Form.Item>
                    </Form>

                    <List
                        className="comment-list"
                        header={`${comments.length} bình luận`}
                        itemLayout="horizontal"
                        dataSource={currentComments}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://joeschmoe.io/api/v1/random`} />}
                                    title={`Người dùng ${item.userID}`}
                                    description={`Đánh giá: ${item.ratingReviews} - Ngày: ${new Date(item.reviewDate).toLocaleString()}`}
                                />
                                <Rate allowHalf value={item.ratingReviews} disabled style={{ marginRight: '50px' }} />
                                <div>{item.noiDung}</div>
                            </List.Item>
                        )}
                    />
                    <Pagination
                        current={currentPage}
                        pageSize={commentsPerPage}
                        total={comments.length}
                        onChange={handlePageChange}
                        style={{ textAlign: 'center', marginTop: '20px', marginLeft: '450px' }}
                    />
                </div>
            </div>

            <div style={{ padding: '20px 100px' }}>
                <h2 style={{ marginBottom: '10px', color: '#FFA500', fontSize: '25px' }}>GỢI Ý CÁC ĐỊA ĐIỂM</h2>
                <hr style={{ height: '3px', backgroundColor: '#3B7097', border: 'none', marginRight: '1050px', marginBottom: '10px' }} />
                {locations.length > 0 ? (
                    <LocationsList book={locations} />
                ) : (
                    <Spin tip="Đang tải dữ liệu..." />
                )}
            </div>
        </>
    );
};

export default LocationsDetails;



