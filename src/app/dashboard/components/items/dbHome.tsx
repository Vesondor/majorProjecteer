import React, { useState } from 'react';
import { Card, Row, Col, Space, Button } from 'antd';
import { FileTextOutlined, ClockCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import TextContent from './dbText';

interface File {
    id: number;
    name: string;
    content: string;
    timestamp: string;
}

const HomeContent: React.FC = () => {
    const [files, setFiles] = useState<File[]>([
        { id: 1, name: 'File 1', content: 'Content of File 1', timestamp: '2 hours ago' },
        { id: 2, name: 'File 2', content: 'Content of File 2', timestamp: '1 day ago' },
        // Add more files as needed
    ]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showTextContent, setShowTextContent] = useState(false);

    const handleFileClick = (file: File) => {
        setSelectedFile(file);
        setShowTextContent(true);
    };

    const handleBackButtonClick = () => {
        setShowTextContent(false);
    };

    return (
        <div className="container mx-auto mt-8 min-h-[680px]">
            {!showTextContent ? (
                <>
                    <h1 className="text-4xl font-bold mb-6">Document Progress</h1>
                    <Row gutter={[16, 16]}>
                        {files.map((file) => (
                            <Col key={file.id} xs={24} sm={12} md={12} lg={6}>
                                <a onClick={() => handleFileClick(file)}>
                                    <Card hoverable>
                                        <Space direction="vertical" size={12}>
                                            <FileTextOutlined style={{ fontSize: '24px' }} />
                                            <p className="text-lg font-semibold">{file.name}</p>
                                            <p>
                                                <ClockCircleOutlined style={{ marginRight: '8px' }} />
                                                {file.timestamp}
                                            </p>
                                        </Space>
                                    </Card>
                                </a>
                            </Col>
                        ))}
                    </Row>
                </>
            ) : (
                <>
                    <div className="mt-8">
                        <TextContent initialText={selectedFile?.content || ''} onBackButtonClick={handleBackButtonClick} />
                    </div>
                </>
            )}
        </div>
    );
};

export default HomeContent;
