import React, { useState } from 'react';
import { Card, Row, Col, Space, Dropdown, Menu, Typography } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import TextContent from './dbText';
import '../../../../styles/app.css';
const { Text } = Typography;

interface File {
    id: number;
    name: string;
    content: string;
    timestamp: string;
    dateCreated: string;
}

const HomeContent: React.FC = () => {
    const [files, setFiles] = useState<File[]>([
        { id: 1, name: 'File 1', content: 'Content of File 1', timestamp: '2 hours ago', dateCreated: '2024-02-14' },
        { id: 2, name: 'File 2', content: 'Content of File 2', timestamp: '1 day ago', dateCreated: '2024-02-13' },
        // Add more files as needed
    ]);

    const [completedFiles, setCompletedFiles] = useState<File[]>([
        { id: 3, name: 'Completed File 1', content: 'Content of Completed File 1', timestamp: '2 hours ago', dateCreated: '2024-02-14' },
        { id: 4, name: 'Completed File 2', content: 'Content of Completed File 2', timestamp: '1 day ago', dateCreated: '2024-02-13' },
        { id: 5, name: 'Completed File 1', content: 'Content of Completed File 1', timestamp: '2 hours ago', dateCreated: '2024-02-14' },
        { id: 6, name: 'Completed File 2', content: 'Content of Completed File 2', timestamp: '1 day ago', dateCreated: '2024-02-13' },
        // Add more completed files as needed
    ]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileClick = (file: File) => {
        setSelectedFile(file);
    };

    const handleRename = () => {
        // Implement renaming logic
    };

    const handleRemove = () => {
        // Implement removing logic
    };

    const handleShare = () => {
        // Implement sharing logic
    };

    const handleClose = () => {
        setSelectedFile(null);
    };

    const menu = (file: File) => (
        <Menu>
            <Menu.Item key="rename" onClick={handleRename}>
                Rename
            </Menu.Item>
            <Menu.Item key="remove" onClick={handleRemove}>
                Remove
            </Menu.Item>
            <Menu.Item key="share" onClick={handleShare}>
                Share
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-4xl font-bold mb-6">Recent Documents</h1>
            <Row gutter={[16, 16]}>
                {files.map((file) => (
                    <Col key={file.id} xs={24} sm={12} md={12} lg={6}>
                        <div>
                            <p className="text-lg font-semibold">{file.name}</p>
                            <Card
                                hoverable
                                onClick={() => handleFileClick(file)}
                                className="notebook-card"
                            >
                                <div className="line-design"></div> {/* Add line design inside the card */}
                                <div className="content-container">
                                </div>
                            </Card>
                            <div className="mt-2 flex ">
                                <Text type="secondary" style={{ marginRight: '8px' , fontSize:'12px'}}>{`Date Created: ${file.dateCreated}`}</Text>
                                <Dropdown overlay={menu(file)} trigger={['click']}>
                                    <EllipsisOutlined style={{ fontSize: '24px' }} />
                                </Dropdown>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            <h1 className="text-4xl font-bold mb-6 mt-8">Completed Documents</h1>
            <Row gutter={[16, 16]}>
                {completedFiles.map((file) => (
                    <Col key={file.id} xs={24} sm={12} md={12} lg={6}>
                        <div>
                            <p className="text-lg font-semibold">{file.name}</p>
                            <Card
                                hoverable
                                onClick={() => handleFileClick(file)}
                                className="notebook-card"
                            >
                                <div className="line-design"></div> {/* Add line design inside the card */}
                                <div className="content-container">
                                </div>
                            </Card>
                            <div className="mt-2 flex ">
                                <Text type="secondary" style={{ marginRight: '8px' , fontSize:'12px'}}>{`Date Created: ${file.dateCreated}`}</Text>
                                <Dropdown overlay={menu(file)} trigger={['click']}>
                                    <EllipsisOutlined style={{ fontSize: '24px' }} />
                                </Dropdown>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

        </div>
    );
};

export default HomeContent;
