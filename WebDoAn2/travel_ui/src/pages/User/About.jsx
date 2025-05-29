import React from "react";
import { Row, Col, Typography, Card, Breadcrumb } from 'antd';
import DuLich5 from '../../assets/images/DuLich5.jpg';
import Bien1 from '../../assets/images/Bien1.jpg';
import Nui1 from '../../assets/images/Nui1.jpg';
import Vinh1 from '../../assets/images/Vinh1.jpg';
import DuLich6 from '../../assets/images/DuLich6.jpg';

const { Title, Paragraph } = Typography;

const About = () => {
    return (
        <>
            <Breadcrumb
                separator=">"
                items={[
                    { title: 'Home' },
                    { title: 'Về chúng tôi', href: '/abouts', }
                ]}
                style={{padding: '10px 50px', backgroundColor: '#F6E2BC', color: 'black'}}
            />
            <div style={{ padding: '20px 100px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '0px', fontFamily: 'monospace', color: '#3b7097',
                padding: '10px 0px', borderRadius: '5px', fontSize: '30px', fontWeight: 'bold', marginLeft: 120, marginRight: 120
                }}>
                ---------------------- VỀ CHÚNG TÔI ----------------------</h2>
                <p style={{textAlign: 'center', padding: '0px 360px'}}>
                Cảm giác bước đi trên bãi biển đầy nắng, nghe sóng vỗ rì rào hay leo lên đỉnh núi ngắm bình minh đều làm tâm hồn 
                trở nên thư thái và tràn đầy năng lượng. </p>
                <hr style={{ margin: '20px 550px', height: '3px', backgroundColor: '#3b7097', border: 'none' }} />
            </div>

            <article style={{ padding: '0px 150px', marginBottom: '32px' }}>
                <Row gutter={16} justify="space-between" align="middle">
                    <Col span={15}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            CUỘC SỐNG DU LỊCH THOẢI MÁI
                        </Title>
                        <Paragraph style={{ textAlign: 'justify' }}>
                            Cuộc sống du lịch thoải mái là khi bạn được tạm gác lại những lo toan thường nhật để tận hưởng sự tự do và niềm vui từ những hành trình mới. 
                            Đó có thể là cảm giác thư giãn bên bờ biển xanh mát, khám phá những vùng đất mới với văn hóa độc đáo, hay chỉ đơn giản là đắm mình trong không khí yên bình của thiên nhiên. 
                            Với sự chuẩn bị chu đáo và tinh thần tận hưởng, mỗi chuyến đi đều trở thành cơ hội để tái tạo năng lượng, 
                            làm giàu trải nghiệm sống và kết nối sâu sắc hơn với chính bản thân mình.
                            <br /><br />
                            Du lịch không chỉ là hành trình khám phá mà còn là cách để tìm lại sự cân bằng trong cuộc sống. 
                            Những khoảnh khắc thoải mái khi ngồi ngắm hoàng hôn, thưởng thức món ăn địa phương hay trò chuyện với người dân bản địa mang đến cảm giác an yên và gần gũi. 
                            Cuộc sống du lịch cho phép bạn bước ra khỏi guồng quay hối hả, chậm rãi cảm nhận giá trị của từng khoảnh khắc và trân trọng những điều giản dị nhưng đầy ý nghĩa trong cuộc sống.
                        </Paragraph>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
                            <img src={DuLich5} alt="Sứ Mệnh" style={{ height: '288px', objectFit: 'cover', borderRadius: '8px' }} />
                        </Card>
                    </Col>
                </Row>
            </article>

            <article style={{ backgroundColor: '#F6E2BC', padding: '40px', textAlign: 'center', marginBottom: '32px' }}>
                <Title level={4} style={{ marginBottom: '24px' }}>
                    CHUYẾN PHIÊU LƯU DU LỊCH KỶ NIỆM
                </Title>
                <Paragraph style={{ textAlign: 'justify' }}>
                    Hệ thống cửa hàng là cầu nối quan trọng giữa doanh nghiệp và khách hàng, mang đến trải nghiệm mua sắm tiện lợi và đáng tin cậy.
                    Mỗi cửa hàng được thiết kế đồng nhất, dễ nhận diện thương hiệu, đồng thời cung cấp sản phẩm đa dạng và dịch vụ chuyên nghiệp.
                    Đội ngũ nhân viên luôn sẵn sàng tư vấn, hỗ trợ tận tình, tạo cảm giác thoải mái cho khách hàng.
                </Paragraph>

                <Row gutter={16} justify="center" style={{ marginTop: '32px' }}>
                    {[Vinh1, Nui1, Bien1].map((image, index) => (
                        <Col key={index} span={8}>
                            <Card bordered={false}>
                                <img
                                    src={image}
                                    alt={`Hình ${index + 1}`}
                                    style={{ width: '100%', height: '250px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </article>

            <article style={{ padding: '0px 150px', marginBottom: '32px' }}>
                <Row gutter={16} justify="space-between" align="middle">
                    <Col span={8}>
                        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
                            <img src={DuLich6} alt="Sứ Mệnh" style={{ height: '288px', objectFit: 'cover', borderRadius: '8px' }} />
                        </Card>
                    </Col>
                    <Col span={15}>
                        <Title level={2} style={{ marginBottom: '16px' }}>
                            TRẢI NGHIỆM DU LỊCH HẤP DẪN
                        </Title>
                        <Paragraph style={{ textAlign: 'justify' }}>
                            Mỗi chuyến đi là một cơ hội để khám phá những điều mới mẻ và tận hưởng những trải nghiệm khó quên. 
                            Từ việc chinh phục những ngọn núi cao hùng vĩ, thả mình dưới làn nước biển trong xanh, đến thưởng thức ẩm thực độc đáo và khám phá văn hóa địa phương, 
                            du lịch luôn mang đến cảm giác phấn khích và bất ngờ. 
                            Đó không chỉ là hành trình di chuyển, mà còn là hành trình tìm kiếm niềm vui và những kỷ niệm đáng nhớ.
                            <br /><br />
                            Du lịch không chỉ là hành trình khám phá mà còn là cách để tìm lại sự cân bằng trong cuộc sống. 
                            Những khoảnh khắc thoải mái khi ngồi ngắm hoàng hôn, thưởng thức món ăn địa phương hay trò chuyện với người dân bản địa mang đến cảm giác an yên và gần gũi. 
                            Cuộc sống du lịch cho phép bạn bước ra khỏi guồng quay hối hả, chậm rãi cảm nhận giá trị của từng khoảnh khắc và trân trọng những điều giản dị nhưng đầy ý nghĩa trong cuộc sống.
                        </Paragraph>
                    </Col>
                </Row>
            </article>
        </>
    );
};

export default About;
