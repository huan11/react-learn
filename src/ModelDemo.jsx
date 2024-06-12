import {useState} from "react";

function MainLayout() {
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState(null);

    const showUserModal = (user) => {
        setModalVisible(true);
        setUser(user);
    };

    return (
        <div className="main-layout">
            <Sider onNewUser={showUserModal} />
            <UserList onEditUser={(user) => showUserModal(user)} />
            <UserInfoModal visible={modalVisible} user={user} />
        </div>
    );
}