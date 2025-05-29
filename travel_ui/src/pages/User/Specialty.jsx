import React from 'react';
import { Row, Col, Typography, Breadcrumb } from 'antd';

import Anh3 from '../../assets/images/Anh3.jpg';

import FoodUser from '../../components/FoodUser';

const { Title, Paragraph } = Typography;

const Specialty = () => {
  return (
    <>
        <Breadcrumb
            separator=">"
            items={[
                { title: 'Home' },
                { title: 'Món ăn', href: '/specialty', }
            ]}
            style={{padding: '10px 50px', backgroundColor: '#F6E2BC', color: 'black'}}
      />
    <article style={{ marginTop: '5rem', marginBottom: '5rem', maxWidth: '1200px', margin: '0 auto', padding: '20px 0px' }}>
      <Row gutter={26} justify="space-between" align="middle">
        {/* Cột phải: Nội dung */}
        <Col xs={24} sm={12} md={12} style={{padding: '0px 50px'}}>
            <Title level={2} style={{ color: '#3b7097', textAlign: 'center', marginBottom: '16px'}}>
                THƯỞNG THỨC CÁC MÓN ĂN 
            </Title>
            <Paragraph style={{ color: '#4a4a4a', textAlign: 'justify', lineHeight: '1.8' }}>
            Mỗi chuyến đi đều là một cơ hội khám phá và trải nghiệm mới mẻ. Từ việc hòa mình vào thiên nhiên hùng vĩ, 
            thưởng thức những món ăn đặc sản đến gặp gỡ con người địa phương thân thiện, du lịch mang lại những ký ức khó quên. 
            Cảm giác bước đi trên bãi biển đầy nắng, nghe sóng vỗ rì rào hay leo lên đỉnh núi ngắm bình minh đều làm tâm hồn 
            trở nên thư thái và tràn đầy năng lượng. 
            Trải nghiệm du lịch không chỉ là hành trình khám phá thế giới mà còn là cách để hiểu thêm về bản thân.
            </Paragraph>
        </Col>
        <Col xs={24} sm={12} md={12}>
            <div style={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <img
                src={Anh3}
                alt="Example"
                style={{ width: '100%', height: '320px', objectFit: 'cover' }}
                />
            </div>
        </Col>
      </Row>
    </article>

    <div style={{ padding: '20px 100px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '0px', fontFamily: 'monospace', color: '#3b7097',
          padding: '10px 0px', borderRadius: '5px', fontSize: '30px', fontWeight: 'bold', marginLeft: 120, marginRight: 120
          }}>
          -------------------- TẤT CẢ MÓN ĂN ĐẶC SẢN --------------------</h2>
          <p style={{textAlign: 'center', padding: '0px 360px'}}>
          Cảm giác bước đi trên bãi biển đầy nắng, nghe sóng vỗ rì rào hay leo lên đỉnh núi ngắm bình minh đều làm tâm hồn 
          trở nên thư thái và tràn đầy năng lượng. </p>
          <hr style={{ margin: '20px 550px', height: '3px', backgroundColor: '#3b7097', border: 'none' }} />
      <FoodUser/>
    </div>
    </>
  );
};

export default Specialty ;

