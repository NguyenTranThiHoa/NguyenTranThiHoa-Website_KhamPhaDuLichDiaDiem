import React from 'react';
import { Breadcrumb } from 'antd';

import TransportsUser from '../../components/TransportsUser';

const Transports = () => {
  return (
    <>
        <Breadcrumb
            separator=">"
            items={[
                { title: 'Home' },
                { title: 'Phương tiện', href: '/transports', }
            ]}
            style={{padding: '10px 50px', backgroundColor: '#F6E2BC', color: 'black'}}
      />

    <div style={{ padding: '20px 100px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '0px', fontFamily: 'monospace', color: '#3b7097',
          padding: '10px 0px', borderRadius: '5px', fontSize: '30px', fontWeight: 'bold', marginLeft: 120, marginRight: 120
          }}>
          ------------------ LOẠI PHƯƠNG TIỆN DI CHUYỂN ------------------</h2>
          <p style={{textAlign: 'center', padding: '0px 360px'}}>
          Cảm giác bước đi trên bãi biển đầy nắng, nghe sóng vỗ rì rào hay leo lên đỉnh núi ngắm bình minh đều làm tâm hồn 
          trở nên thư thái và tràn đầy năng lượng. </p>
          <hr style={{ margin: '20px 550px', height: '3px', backgroundColor: '#3b7097', border: 'none' }} />
      <TransportsUser/>
    </div>
    </>
  );
};

export default Transports;

