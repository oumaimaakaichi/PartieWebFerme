import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Popover, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from './354dbc49db33ce3d657ecb44f8811f03-removebg-preview.png';
import ad from "../logg.jpg";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
function AppHeader() {
  const [comments, setComments] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const profileContent = (
    <div>
    {user && (
      <>
        <div style={{ display: "flex", alignItems: "center" }}>
          <PersonIcon style={{ marginRight: "8px" }} />
          <strong>Nom : </strong> {user.nom}
        </div><br/>
        <div style={{ display: "flex", alignItems: "center" }}>
          <PersonIcon style={{ marginRight: "8px" }} />
          <strong>Prénom : </strong> {user.prenom}
        </div><br/>
        <div style={{ display: "flex", alignItems: "center" }}>
          <EmailIcon style={{ marginRight: "8px" }} />
          <strong>Email : </strong>  {user.email}
        </div>
      </>
    )}
  </div>
  );

  return (
    <div className="AppHeader">

      <Typography.Title>
        <b style={{ color: 'black' , marginLeft:700 }}>
          FarmManager
        </b>
      </Typography.Title>

      <Space style={{ float: 'right' }}>
      
        <Popover content={profileContent} title="Profil" trigger="click">
          <UserOutlined style={{ fontSize: '24px', cursor: 'pointer', margin: '0 10px' }} />
        </Popover>
        
        
        <Badge count={0}>
          <BellFilled style={{ fontSize: '24px', cursor: 'pointer', margin: '0 10px' }} />
        </Badge>
        <Badge count={0}>
          <MailOutlined style={{ fontSize: '24px', cursor: 'pointer', margin: '0 10px' }} />
        </Badge>
      </Space>

      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => <List.Item>{item.body}</List.Item>}
        />
      </Drawer>
    </div>
  );
}

export default AppHeader;
