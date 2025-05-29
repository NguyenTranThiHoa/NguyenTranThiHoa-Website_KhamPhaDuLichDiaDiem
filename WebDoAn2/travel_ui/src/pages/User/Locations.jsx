import React from 'react';
import { Row, Col, Typography,Breadcrumb } from 'antd';

import Nui1 from '../../assets/images/Nui1.jpg';
import Bien1 from '../../assets/images/Bien1.jpg';
import Vinh1 from '../../assets/images/Vinh1.jpg';
import LocationsUser from '../../components/LocationsUser';

const { Title, Paragraph } = Typography;

const Locations = () => {
  return (
    <>
      <Breadcrumb
          separator=">"
          items={[
              { title: 'Home' },
              { title: 'Địa điểm', href: '/locations', }
          ]}
          style={{padding: '10px 50px', backgroundColor: '#F6E2BC', color: 'black'}}
      />
    <Row justify="center" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Col xs={24} sm={24} md={20} style={{padding: '10px 10px', marginTop: 20}}>
            <Title level={2} style={{ color: '#3b7097', textAlign: 'center', marginBottom: '16px'}}>
                ĐỊA ĐIỂM CỦA DU LỊCH
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
          ---------------------- TẤT CẢ ĐỊA ĐIỂM ----------------------</h2>
          <p style={{textAlign: 'center', padding: '0px 360px'}}>
          Cảm giác bước đi trên bãi biển đầy nắng, nghe sóng vỗ rì rào hay leo lên đỉnh núi ngắm bình minh đều làm tâm hồn 
          trở nên thư thái và tràn đầy năng lượng. </p>
          <hr style={{ margin: '20px 550px', height: '3px', backgroundColor: '#3b7097', border: 'none' }} />
      <LocationsUser/>
    </div>
    </>
  );
};

export default Locations;

