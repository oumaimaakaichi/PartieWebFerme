import { BellFilled, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Drawer, List, Popover, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

const socket = io('http://192.168.244.216:3000'); 

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log("Tentative de connexion au serveur Socket.io");
    socket.on('connect', () => {
        console.log('Connecté au serveur Socket.io');
    });

    socket.on('new-account-created', (notification) => {
        console.log('Notification reçue:', notification);
        setComments(prev => [...prev, notification]);
        setNotificationCount(prev => prev + 1);
    });

    return () => {
        socket.off('new-account-created');
    };
}, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    socket.on('new-account-created', (notification) => {
      console.log('Notification received:', notification);
      setComments(prev => [...prev, notification]);
      setNotificationCount(prev => prev + 1); 
    });

    return () => {
      socket.off('new-account-created');
    };
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

  const handleBellClick = () => {
    setCommentsOpen(true);
    setNotificationCount(0); 
  };

  return (
    <div className="AppHeader">

      <Typography.Title>
        <b style={{ color: 'black', marginLeft: 700 }}>
          FarmManager
        </b>
      </Typography.Title>

      <Space style={{ float: 'right' }}>
      
        <Popover content={profileContent} title="Profil" trigger="click">
          <UserOutlined style={{ fontSize: '24px', cursor: 'pointer', margin: '0 10px' }} />
        </Popover>
        
        <Badge count={notificationCount}>
          <BellFilled style={{ fontSize: '24px', cursor: 'pointer', margin: '0 10px' }} onClick={handleBellClick} />
        </Badge>
        <Badge count={0}>
          <MailOutlined style={{ fontSize: '24px', cursor: 'pointer', margin: '0 10px' }} />
        </Badge>
      </Space>

      <Drawer
        title="Notifications"
        open={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => <List.Item>{item.message} - {new Date(item.timestamp).toLocaleString()}</List.Item>}
        />
      </Drawer>
    </div>
  );
}

export default AppHeader;
