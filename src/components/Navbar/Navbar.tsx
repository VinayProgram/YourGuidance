import React, { useState } from 'react';
import { CoffeeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
     title:'name',
     key:'Logo',
     label:'Your Guidance',
     style:{fontFamily:'cursive',fontWeight:'bold'}
  },
  {
    label: 'Posts',
    key: 'SubMenu',
    icon: <CoffeeOutlined />,
    children: [
      {
        type: 'group',
        children: [
          { label: 'Coding', key: 'setting:1' },
          { label: 'Life', key: 'setting:2' },
          { label: 'Tech', key: 'setting:2' },
        ],
      },
    ],
  }

];

const App: React.FC = () => {
  const [current, setCurrent] = useState('mail');
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };


  return (
 
     <nav style={{ display: "flex",alignItems:'center', gap:'2px' ,boxShadow:'0 2px 4px 0 rgba(0,0,0,.2),',borderBottom:'1px solid black'}}>
      <Avatar style={{marginLeft:'1rem'}} src='https://avatars.githubusercontent.com/u/125792283?v=4'/>
    <Menu style={{width:'100%' ,border:'none'}} onClick={onClick} selectedKeys={[current]} mode="horizontal"  items={items}>
    </Menu>
    </nav>
    )
};

export default App;