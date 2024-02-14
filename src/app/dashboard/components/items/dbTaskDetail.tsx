import React from 'react';
import { Layout, Typography, Card, Tag, Timeline } from 'antd';
import { ClockCircleOutlined, FileTextOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const TaskDetail: React.FC<{ task: any }> = ({ task }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'start', background: '#f0f2f5' }}>
                <Card style={{ width: '100%', maxWidth: '800px', background: '#fff' }}>
                    <Title level={2}>{task.subject}</Title>
                    <Timeline>
                        <Timeline.Item dot={<UserOutlined style={{ fontSize: '16px' }} />} color="green">
                            From: <Text>{task.details}</Text>
                        </Timeline.Item>
                        <Timeline.Item dot={<UserOutlined style={{ fontSize: '16px' }} />} color="blue">
                            To: <Text>{task.to}</Text>
                        </Timeline.Item>
                        <Timeline.Item dot={<CalendarOutlined style={{ fontSize: '16px' }} />} color="red">
                            Date: <Text>{task.date}</Text>
                        </Timeline.Item>
                        <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                            Time: <Text>{task.time ? task.time : 'Not specified'}</Text>
                        </Timeline.Item>
                        <Timeline.Item dot={<FileTextOutlined style={{ fontSize: '16px' }} />} color="orange">
                            Document Context: <Text>{task.context ? task.context : 'General'}</Text>
                        </Timeline.Item>
                    </Timeline>
                    <Card type="inner" title="Message" extra={<Tag color="blue">Translation Task</Tag>}>
                        <Text>{task.message}</Text>
                    </Card>
                </Card>
            </Content>
        </Layout>
    );
};

export default TaskDetail;
