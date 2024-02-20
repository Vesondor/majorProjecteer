import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Dropdown, Menu, Typography, Button, List } from 'antd';
import { MoreOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import TextContent from './dbText';
import '../../../../styles/app.css';
const { Text } = Typography;

interface File {
    id: number;
    name: string;
    content: string;
    timestamp: string;
    dateCreated: string;
    deadline: string;
}

const HomeContent: React.FC = () => {
    const [viewMode, setViewMode] = useState<'card' | 'list'>('card');


    const [files, setFiles] = useState<File[]>([
        { id: 1, name: 'File 1', content: 'Content of File 1', timestamp: '2 hours ago', dateCreated: '2024-02-14', deadline: '2024-02-20' },
        { id: 2, name: 'File 2', content: 'Content of File 2', timestamp: '1 day ago', dateCreated: '2024-02-13', deadline: '2024-02-21' },
    ]);

    const [completedFiles, setCompletedFiles] = useState<File[]>([
        { id: 3, name: 'Completed File 1', content: 'Content of Completed File 1', timestamp: '2 hours ago', dateCreated: '2024-02-14', deadline: '2024-02-22' },
        { id: 4, name: 'Completed File 2', content: 'Content of Completed File 2', timestamp: '1 day ago', dateCreated: '2024-02-13', deadline: '2024-02-10' },
        { id: 5, name: 'Completed File 3', content: 'Content of Completed File 1', timestamp: '2 hours ago', dateCreated: '2024-02-14', deadline: '2024-02-03' },
        { id: 6, name: 'Completed File 4', content: 'Content of Completed File 2', timestamp: '1 day ago', dateCreated: '2024-02-01', deadline: '2024-02-19' },
        { id: 7, name: 'Completed File 3', content: 'Content of Completed File 1', timestamp: '2 hours ago', dateCreated: '2024-02-14', deadline: '2024-02-03' },
        { id: 8, name: 'Completed File 4', content: 'Content of Completed File 2', timestamp: '1 day ago', dateCreated: '2024-02-01', deadline: '2024-02-19' },
        { id: 9, name: 'Completed File 3', content: 'Content of Completed File 1', timestamp: '2 hours ago', dateCreated: '2024-02-14', deadline: '2024-02-03' },
        { id: 10, name: 'Completed File 4', content: 'Content of Completed File 2', timestamp: '1 day ago', dateCreated: '2024-02-01', deadline: '2024-02-19' },
    
        // Add more completed files as needed
    ]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showTextContent, setShowTextContent] = useState(false);

    const [sortCriterionRecent, setSortCriterionRecent] = useState<'dateCreated' | 'deadline'>('dateCreated');
    const [sortCriterionCompleted, setSortCriterionCompleted] = useState<'dateCreated' | 'deadline'>('dateCreated');

    const toggleViewMode = () => {
        setViewMode(prevMode => (prevMode === 'card' ? 'list' : 'card'));
    };


    const sortFiles = (filesArray: File[], criterion: 'dateCreated' | 'deadline') => {
        return [...filesArray].sort((a, b) => new Date(a[criterion]).getTime() - new Date(b[criterion]).getTime());
    };

    const toggleSortCriterionRecent = () => {
        setSortCriterionRecent(prevCriterion => prevCriterion === 'dateCreated' ? 'deadline' : 'dateCreated');
    };

    const toggleSortCriterionCompleted = () => {
        setSortCriterionCompleted(prevCriterion => prevCriterion === 'dateCreated' ? 'deadline' : 'dateCreated');
    };

    useEffect(() => {
        setFiles(sortFiles(files, sortCriterionRecent));
    }, [sortCriterionRecent, files]);

    useEffect(() => {
        setCompletedFiles(sortFiles(completedFiles, sortCriterionCompleted));
    }, [sortCriterionCompleted, completedFiles]);

    const handleFileClick = (file: File) => {
        setSelectedFile(file);
        setShowTextContent(true);
    };

    const handleBackButtonClick = () => {
        setShowTextContent(false);
        setSelectedFile(null);
    };

    const handleRename = () => {/* Rename logic */ };
    const handleRemove = () => {/* Remove logic */ };
    const handleShare = () => {/* Share logic */ };

    const handleSortByRecent = (criteria: 'dateCreated' | 'deadline') => {
        setSortCriterionRecent(criteria);
    };

    const handleSortByCompleted = (criteria: 'dateCreated' | 'deadline') => {
        setSortCriterionCompleted(criteria);
    };

    const renderFileCard = (file: File) => (
        <Col key={file.id} xs={24} sm={12} md={12} lg={6}>
            <div>
                <p className="text-lg font-semibold">{file.name}</p>
                <Card
                    hoverable
                    onClick={() => handleFileClick(file)}
                    className="notebook-card"
                >
                    <div className="line-design"></div> {/* Add line design inside the card */}
                </Card>
                <div className="mt-2 flex flex-col">
                    <div className="flex items-center">
                        <Text type="secondary" style={{ marginRight: '8px', fontSize: '12px' }}>
                            {`Date Created: ${file.dateCreated}`}
                        </Text>
                        <Dropdown overlay={() => menu((handleShare))} trigger={['click']}>
                            <MoreOutlined style={{ fontSize: '24px' }} />
                        </Dropdown>
                    </div>
                    <Text className="text-red-700" style={{ fontSize: '12px' }}>
                        {`Deadline: ${file.deadline}`}
                    </Text>
                </div>
            </div>
        </Col>
    );

    const menu = (handleSort: (criteria: 'dateCreated' | 'deadline') => void) => (
        <Menu>
            <Menu.Item key="dateCreated" onClick={() => handleSort('dateCreated')}>Sort by Date Created</Menu.Item>
            <Menu.Item key="deadline" onClick={() => handleSort('deadline')}>Sort by Deadline</Menu.Item>
        </Menu>
    );
    const renderFileList = (file: File) => (
        <List.Item
            key={file.id}
            onClick={() => handleFileClick(file)}
            style={{
                cursor: 'pointer',
                transition: 'background-color 0.3s',
            }}
            className="hoverable-list-item" // Assuming you have defined this class in your CSS
        >
            <List.Item.Meta
                title={<div>{file.name}</div>}
                description={
                    <div>
                        <div>Date Created: {file.dateCreated}</div>
                        <div style={{ color: 'red' }}>Deadline: {file.deadline}</div>
                    </div>
                }
            />
        </List.Item>
    );


    if (showTextContent && selectedFile) {
        return <TextContent initialText={selectedFile.content} onBackButtonClick={handleBackButtonClick} />;
    }
    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold mb-6">Recent Documents</h1>
                <div>
                    <Dropdown overlay={() => menu(setSortCriterionRecent)} trigger={['click']}>
                        <Button>Sort by {sortCriterionRecent === 'dateCreated' ? 'Deadline' : 'Date Created'}</Button>
                    </Dropdown>
                    <Button onClick={toggleViewMode} style={{ marginLeft: '8px' }}>
                        {viewMode === 'card' ? <UnorderedListOutlined /> : <AppstoreOutlined />}
                    </Button>
                </div>
            </div>

            {viewMode === 'card' ? (
                <Row gutter={[16, 16]}>
                    {files.map(file => renderFileCard(file))}
                </Row>
            ) : (
                <List dataSource={files} renderItem={renderFileList} />
            )}

            <div className="flex justify-between items-center mt-8">
                <h1 className="text-4xl font-bold mb-6">Completed Documents</h1>
                <Dropdown overlay={() => menu(setSortCriterionCompleted)} trigger={['click']}>
                    <Button>Sort by {sortCriterionCompleted === 'dateCreated' ? 'Deadline' : 'Date Created'}</Button>
                </Dropdown>
            </div>

            {viewMode === 'card' ? (
                <Row gutter={[16, 16]}>
                    {completedFiles.map(file => renderFileCard(file))}
                </Row>
            ) : (
                <List dataSource={completedFiles} renderItem={renderFileList} />
            )}
        </div>
    );
};

export default HomeContent;
