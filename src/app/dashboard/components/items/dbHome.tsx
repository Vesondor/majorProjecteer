import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Dropdown, Menu, Typography, Button, List, Input, Divider } from 'antd';
import { MoreOutlined, AppstoreOutlined, UnorderedListOutlined, SearchOutlined, FileTextOutlined, CheckCircleOutlined, SortAscendingOutlined } from '@ant-design/icons';

import TextContent from './dbText';
import '../../../../styles/app.css';
const { Text, Title } = Typography;

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
        { id: 1, name: 'របបផ្អាក ការអនុវត្ត', content: 'មានរបបផ្អាកការអនុវត្តដោយការដាក់ពាក្យបណ្តឹងទាមទារឱ្យ ជំនុំជម្រះសាជាថ្មី។ នេះគឺជារបបផ្អាក ការអនុវត្តមួយរយៈពេល ក្នុងករណីដែលមាន ការដាក់ពាក្យបណ្តឹង ទាមទារឱ្យជំនុំជម្រះសាជាថ្មី រហូតដល់  ពេលបានទទួលលទ្ធផល នៃការដាក់ពាក្យបណ្តឹងនោះ។ ពេលមានសាលក្រម ឬសាលដីកាចូលជាស្ថាពរហើយ តាម ធម្មតា គេអាចអនុវត្តដោយបង្ខំហើយ។ ហេតុនេះ ការសុំផ្អាក ការអនុវត្តនោះ តម្រូវឱ្យមានល័ក្ខខ័ណ្ឌតឹងរ៉ឹងណាស់។', timestamp: '2 hours ago', dateCreated: '2024-02-14', deadline: '2024-02-22' },

        { id: 2, name: 'ដើមបណ្តឹងនៃការជំនុំជម្រះសាជាថ្មី', content: 'ការអះអាងរបស់ដើមបណ្តឹងនៃការជំនុំជម្រះសាជាថ្មី ត្រូវតែហាក់ដូចជា មានមូលហេតុណាមួយដែលមានចែងក្នុងចំណុចណាមួយនៃមូលហេតុ នៃការជំនុំជម្រះសាជាថ្មី(មាត្រា307 កថាខណ្ឌទី1)។ បើសិនជាអង្គហេតុដែលអះអាងដោយដើមបណ្តឹងនៃការជំនុំជម្រះសា ជាថ្មីមិនត្រូវនឹងមូលហេតុណាមួយនៃការជំនុំជម្រះសាជាថ្មីទេ គឺមិនស្រប នឹងល័ក្ខខ័ណ្ឌនេះទេ។', timestamp: '1 day ago', dateCreated: '2024-02-13', deadline: '2024-02-10' },
    ]);

    const [completedFiles, setCompletedFiles] = useState<File[]>([
        { id: 3, name: 'របបផ្អាក ការអនុវត្ត', content: 'មានរបបផ្អាកការអនុវត្តដោយការដាក់ពាក្យបណ្តឹងទាមទារឱ្យ ជំនុំជម្រះសាជាថ្មី។ នេះគឺជារបបផ្អាក ការអនុវត្តមួយរយៈពេល ក្នុងករណីដែលមាន ការដាក់ពាក្យបណ្តឹង ទាមទារឱ្យជំនុំជម្រះសាជាថ្មី រហូតដល់  ពេលបានទទួលលទ្ធផល នៃការដាក់ពាក្យបណ្តឹងនោះ។ ពេលមានសាលក្រម ឬសាលដីកាចូលជាស្ថាពរហើយ តាម ធម្មតា គេអាចអនុវត្តដោយបង្ខំហើយ។ ហេតុនេះ ការសុំផ្អាក ការអនុវត្តនោះ តម្រូវឱ្យមានល័ក្ខខ័ណ្ឌតឹងរ៉ឹងណាស់។', timestamp: '2 hours ago', dateCreated: '2024-02-14', deadline: '2024-02-22' },

        { id: 4, name: 'ដើមបណ្តឹងនៃការជំនុំជម្រះសាជាថ្មី', content: 'ការអះអាងរបស់ដើមបណ្តឹងនៃការជំនុំជម្រះសាជាថ្មី ត្រូវតែហាក់ដូចជា មានមូលហេតុណាមួយដែលមានចែងក្នុងចំណុចណាមួយនៃមូលហេតុ នៃការជំនុំជម្រះសាជាថ្មី(មាត្រា307 កថាខណ្ឌទី1)។ បើសិនជាអង្គហេតុដែលអះអាងដោយដើមបណ្តឹងនៃការជំនុំជម្រះសា ជាថ្មីមិនត្រូវនឹងមូលហេតុណាមួយនៃការជំនុំជម្រះសាជាថ្មីទេ គឺមិនស្រប នឹងល័ក្ខខ័ណ្ឌនេះទេ។', timestamp: '1 day ago', dateCreated: '2024-02-13', deadline: '2024-02-10' },

        { id: 5, name: 'ការជំនុំជម្រះសាជាថ្មី', content: 'ការជំនុំជម្រះសាជាថ្មី គេមិនងាយទទួលស្គាល់ស្រួលៗទេ។ មានតែករណីយ៉ាងពិសេសតិចតួចណាស់ ដែលតុលាការទទួលស្គាល់។ ហេតុនេះហើយ ការផ្អាកការអនុវត្តដោយសារបណ្ដឹង ទាមទារឱ្យជំនុំជម្រះសាជាថ្មីក៏អាចទទួលស្គាល់បានតែក្នុង ករណីពិសេសណាស់ប៉ុណ្ណោះ។', timestamp: '2 hours ago', dateCreated: '2024-02-14', deadline: '2024-02-03' },
        // Add more completed files as needed
    ]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showTextContent, setShowTextContent] = useState(false);

    const [sortCriterionRecent, setSortCriterionRecent] = useState<'dateCreated' | 'deadline'>('dateCreated');
    const [sortCriterionCompleted, setSortCriterionCompleted] = useState<'dateCreated' | 'deadline'>('dateCreated');
    const [searchQuery, setSearchQuery] = useState('');


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

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredCompletedFiles = completedFiles.filter(file =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


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
        return <TextContent fileId={selectedFile.id} initialText={selectedFile.content} onBackButtonClick={handleBackButtonClick} />;
    }
    return (
        <div style={{
            backgroundColor: '#214B71', paddingTop: '10px', paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px',
            width: '100%', boxSizing: 'border-box'
        }}>
            <div className="container mx-auto mt-8" style={{
                backgroundColor: 'white', borderRadius: '10px', padding: '20px',
                margin: '0 auto', width: '100%', boxSizing: 'border-box', maxWidth: '100%'
            }}>

                {/* App Name and Search Bar */}
                <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <AppstoreOutlined style={{ fontSize: '24px', color: '#214B71', marginRight: '8px' }} />
                        <Typography.Title level={4} style={{ margin: 0, color: '#214B71' }}>BorkPrae</Typography.Title>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button type="default" icon={viewMode === 'card' ? <UnorderedListOutlined /> : <AppstoreOutlined />} onClick={toggleViewMode} style={{ marginRight: '16px', flexShrink: 0 }} />
                        <Input
                            suffix={
                                <Button icon={<SearchOutlined />} type="primary" style={{ border: 'none', background: 'none' }} />
                            }
                            placeholder="Search files..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ maxWidth: '400px', width: '100%', borderRadius: '20px', padding: '0 12px' }}
                        />
                    </div>

                </div>

                <Divider style={{ margin: '20px 0' }} />

                {/* Recent Documents Section */}
                <div>
                    <Title level={3} style={{ color: '#214B71' }}>
                        <FileTextOutlined /> Recent Documents
                    </Title>
                    {viewMode === 'card' ? (
                        <Row gutter={[16, 16]}>
                            {filteredFiles.map(file => renderFileCard(file))}
                        </Row>
                    ) : (
                        <List dataSource={filteredFiles} renderItem={renderFileList} />
                    )}
                </div>

                <Divider style={{ margin: '40px 0' }} />

                {/* Completed Documents Section */}
                <div>
                    <Title level={3} style={{ color: '#214B71' }}>
                        <CheckCircleOutlined /> Completed Documents
                    </Title>
                    {viewMode === 'card' ? (
                        <Row gutter={[16, 16]}>
                            {filteredCompletedFiles.map(file => renderFileCard(file))}
                        </Row>
                    ) : (
                        <List dataSource={filteredCompletedFiles} renderItem={renderFileList} />
                    )}
                </div>

            </div>
        </div>
    );








};

export default HomeContent;
