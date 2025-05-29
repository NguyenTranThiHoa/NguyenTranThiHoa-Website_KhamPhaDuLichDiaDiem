import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
// import { UserOutlined} from '@ant-design/icons';

import DuLich7 from '../../assets/images/DuLich7.jpg';
import Nui1 from '../../assets/images/Nui1.jpg';
import Bien1 from '../../assets/images/Bien1.jpg';
import Vinh1 from '../../assets/images/Vinh1.jpg';
import DuLich6 from '../../assets/images/DuLich6.jpg';
// import DuLich8 from '../../assets/images/DuLich8.jpg';
import LocationsList from '../../components/LocationsList';

import MonAn1 from '../../assets/images/MonAn1.jpg';
import LyTuong1 from '../../assets/images/LyTuong1.jpg';
import DangNho1 from '../../assets/images/DangNho1.jpg';
import HotelsList from '../../components/HotelsList';
import FoodList from '../../components/FoodList';


const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <>

<div style={{ marginTop: '2rem', padding: '20px 150px', backgroundColor:'#f0f0f0' }}>
<Row gutter={16} justify="space-between">
  {/* Cột 1 */}
  <Col xs={24} sm={8} md={8}>
    <Card
      title="Nơi lựa chọn lý tưởng"
      bordered={false}
      style={{ height: '100%' }}
      bodyStyle={{ padding: '16px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img
          src={LyTuong1}
          alt="Nơi lý tưởng"
          style={{ width: '50px', height: '50px', borderRadius: '8px' }}
        />
        <p>
          Du lịch biển độc đáo với nhiều màu sắc xanh của biển, làn gió mát mẻ.
        </p>
      </div>
    </Card>
  </Col>

  {/* Cột 2 */}
  <Col xs={24} sm={8} md={8}>
    <Card
      title="Du lịch đáng nhớ"
      bordered={false}
      style={{ height: '100%' }}
      bodyStyle={{ padding: '16px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img
          src={DangNho1}
          alt="Du lịch đáng nhớ"
          style={{ width: '50px', height: '50px', borderRadius: '8px' }}
        />
        <p>
          Nơi được trải nghiệm hòa mình vào thiên nhiên và khoảnh khắc đáng nhớ.
        </p>
      </div>
    </Card>
  </Col>

  {/* Cột 3 */}
  <Col xs={24} sm={8} md={8}>
    <Card
      title="Món ăn hấp dẫn nhất"
      bordered={false}
      style={{ height: '100%' }}
      bodyStyle={{ padding: '16px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img
          src={MonAn1}
          alt="Món ăn hấp dẫn"
          style={{ width: '50px', height: '50px', borderRadius: '8px' }}
        />
        <p>
          Món ăn phong phú đa dạng ẩm thực vùng miền, đem lại sự yêu thương.
        </p>
      </div>
    </Card>
  </Col>
</Row>

    </div>

    <article style={{ marginTop: '5rem', marginBottom: '5rem', maxWidth: '1200px', margin: '0 auto', padding: '20px 0px' }}>
      <Row gutter={26} justify="space-between" align="middle">
        <Col xs={24} sm={12} md={12}>
            <div style={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <img
                src={DuLich6}
                alt="Example"
                style={{ width: '100%', height: '320px', objectFit: 'cover' }}
                />
            </div>
        </Col>

                {/* Cột phải: Nội dung */}
        <Col xs={24} sm={12} md={12} style={{padding: '0px 50px'}}>
            <Title level={2} style={{ color: '#3b7097', textAlign: 'center', marginBottom: '16px'}}>
                TRẢI NGHIỆM DU LỊCH
            </Title>
            <Paragraph style={{ color: '#4a4a4a', textAlign: 'justify', lineHeight: '1.8' }}>
            Mỗi chuyến đi đều là một cơ hội khám phá và trải nghiệm mới mẻ. Từ việc hòa mình vào thiên nhiên hùng vĩ, 
            thưởng thức những món ăn đặc sản đến gặp gỡ con người địa phương thân thiện, du lịch mang lại những ký ức khó quên. 
            Cảm giác bước đi trên bãi biển đầy nắng, nghe sóng vỗ rì rào hay leo lên đỉnh núi ngắm bình minh đều làm tâm hồn 
            trở nên thư thái và tràn đầy năng lượng. 
            Trải nghiệm du lịch không chỉ là hành trình khám phá thế giới mà còn là cách để hiểu thêm về bản thân.
            </Paragraph>
        </Col>
      </Row>
    </article>

    <div style={{ padding: '20px 100px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '0px', fontFamily: 'monospace', color: '#3b7097',
          padding: '10px 0px', borderRadius: '5px', fontSize: '30px', fontWeight: 'bold', marginLeft: 120, marginRight: 120
          }}>
          ---------------------- ĐỊA ĐIỂM NỔI TIẾNG ----------------------</h2>
          <p style={{textAlign: 'center', padding: '0px 360px'}}>
          Cảm giác bước đi trên bãi biển đầy nắng, nghe sóng vỗ rì rào hay leo lên đỉnh núi ngắm bình minh đều làm tâm hồn 
          trở nên thư thái và tràn đầy năng lượng. </p>
          <hr style={{ margin: '20px 550px', height: '3px', backgroundColor: '#3b7097', border: 'none' }} />
      {/* <Row gutter={[16, 16]}>
        {locations.map((location) => (
          <Col xs={24} sm={12} md={8} lg={6} key={location.id}>
              <Card
              hoverable
              cover={
                  <img
                  alt={location.name}
                  src={location.image}
                  style={{ height: '100px', objectFit: 'cover' }}
                  />
              }
              >
              <Meta title={location.name} />
              <div style={{ margin: '10px 0' }}>
                  <Rate allowHalf value={location.rating} disabled style={{ color: '#fadb14' }} />
              </div>
              <Button type="primary" block>
                  Xem chi tiết
              </Button>
              </Card>
          </Col>
        ))}
      </Row> */}

      <LocationsList/>
    </div>

    <Row justify="center" style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Col
            xs={24} sm={24} md={24}
            style={{
            height: '24rem', // Tương đương với h-96
            width: '100%',
            backgroundImage: `url(${DuLich7})`,
            backgroundSize: 'cover', // Đảm bảo ảnh phủ đầy toàn bộ
            backgroundPosition: 'center', // Căn giữa ảnh
            }}
        />
          <Col xs={24} sm={24} md={20} style={{padding: '10px 10px', marginTop: 20}}>
            <Title level={2} style={{ color: '#3b7097', textAlign: 'center', marginBottom: '16px'}}>
                TIỀM NĂNG CỦA DU LỊCH
            </Title>
            <Paragraph style={{ color: '#4a4a4a', textAlign: 'center', lineHeight: '1.8' }}>
                Du lịch là ngành có tiềm năng phát triển mạnh mẽ nhờ vào sự gia tăng nhu cầu khám phá và trải nghiệm của con người. 
                Với sự phát triển của các phương tiện vận chuyển, công nghệ và hạ tầng du lịch, du khách ngày càng dễ dàng tiếp cận các điểm đến mới. 
                Bên cạnh đó, xu hướng du lịch bền vững và trải nghiệm cá nhân hóa đang trở thành yếu tố quan trọng thúc đẩy sự tăng trưởng của ngành. 
                Đặc biệt, du lịch nội địa và quốc tế đang có cơ hội lớn trong việc khai thác các địa phương chưa được phát triển đầy đủ, 
                góp phần tạo ra nhiều cơ hội kinh tế và việc làm cho cộng đồng.
            </Paragraph>
          </Col>
    </Row>
    <Row justify="center" style={{ marginTop: '0px', marginBottom: '20px', marginLeft: 70 }}>
      <Col span={4}>
        <div>
          <img
          src={Nui1}
          alt="Example"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '15px',
        }}
          />
        </div>
      </Col>
      <Col span={4}>
        <div>
            <img
            src={Vinh1}
            alt="Example"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '15px',
          }}
            />
        </div>
      </Col>

      <Col span={4}>
          <div>
              <img
              src={Bien1}
              alt="Example"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '15px',
            }}
              />
          </div>
      </Col>
    </Row>

    <div style={{ padding: '20px 100px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '0px', fontFamily: 'monospace', color: '#3b7097',
          padding: '10px 0px', borderRadius: '5px', fontSize: '30px', fontWeight: 'bold', marginLeft: 120, marginRight: 120
          }}>
          ---------------------- KHÁCH SẠN GIÁ TỐT ----------------------</h2>
          <p style={{textAlign: 'center', padding: '0px 360px'}}>
          Cảm giác bước đi trên bãi biển đầy nắng, nghe sóng vỗ rì rào hay leo lên đỉnh núi ngắm bình minh đều làm tâm hồn 
          trở nên thư thái và tràn đầy năng lượng. </p>
          <hr style={{ margin: '20px 550px', height: '3px', backgroundColor: '#3b7097', border: 'none' }} />

      <HotelsList/>
    </div>

    {/* <Row justify="center" style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Col
            xs={24} sm={24} md={24}
            style={{
            height: '24rem', // Tương đương với h-96
            width: '100%',
            backgroundImage: `url(${DuLich8})`,
            backgroundSize: 'cover', // Đảm bảo ảnh phủ đầy toàn bộ
            backgroundPosition: 'center', // Căn giữa ảnh
            }}
        />
    </Row> */}
                <article style={{ backgroundColor: '#f0f0f0', padding: '40px', textAlign: 'center', marginBottom: '32px' }}>
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

    <div style={{ padding: '20px 100px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '0px', fontFamily: 'monospace', color: '#3b7097',
          padding: '10px 0px', borderRadius: '5px', fontSize: '30px', fontWeight: 'bold', marginLeft: 120, marginRight: 120
          }}>
          ---------------------- MÓN ĂN HẤP DẪN ----------------------</h2>
          <p style={{textAlign: 'center', padding: '0px 360px'}}>
          Cảm giác bước đi trên bãi biển đầy nắng, nghe sóng vỗ rì rào hay leo lên đỉnh núi ngắm bình minh đều làm tâm hồn 
          trở nên thư thái và tràn đầy năng lượng. </p>
          <hr style={{ margin: '20px 550px', height: '3px', backgroundColor: '#3b7097', border: 'none' }} />

      <FoodList/>
    </div>
    </>
  );
};

export default Home;

