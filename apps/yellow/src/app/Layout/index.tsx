import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './style.less';
import Students from '../Student';

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
      setCollapsed(true);
    } else {
      setIsMobile(false);
      setCollapsed(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth={isMobile ? 0 : 80}
        trigger={null}
        style={{
          overflow: 'auto',
          background:
            'linear-gradient(90deg, rgba(37,64,179,1) 0%, rgba(145,52,234,1) 100%)',
        }}
        className="sider"
      ></Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="header-tongle">
            <h1>Students</h1>
            {isMobile && (
              <Button type="primary" onClick={toggle} className="tonggle-btn">
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button>
            )}
          </div>
        </Header>

        <Content className="content-wrapper">
          <div style={{ minHeight: '100%' }}>
            <Students />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
