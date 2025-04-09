'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                AdminWeb©{new Date().getFullYear()} Created by NguyenDuy
            </Footer>
        </>
    )
}

export default AdminFooter;