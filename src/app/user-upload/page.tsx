"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Button, Card, message, Progress } from 'antd';
import { UploadOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import Header from '@/partials/Header';
import Footer from '@/partials/Footer';

const UploadPage: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0); // State for tracking upload progress
    const router = useRouter();

    const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
        let newFileList = [...info.fileList];
        newFileList = newFileList.slice(-1);

        // Show upload progress and status
        newFileList = newFileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });

        setFileList(newFileList);
    };

    const handleUpload = () => {
        setUploading(true);

        // Simulate file upload progress with checkpoints
        let progress = 0;
        const interval = setInterval(() => {
            progress += 35;
            setUploadProgress(progress); // Update upload progress state

            if (progress >= 100) {
                clearInterval(interval);
                setUploading(false);
                message.success('Upload completed.');
                setTimeout(() => {
                    router.push('/ProgressPage');
                }, 1000); // Redirect after success
            }
        }, 1000); // Interval duration for progress update
    };

    const uploadProps = {
        onRemove: (file: UploadFile) => {
            setFileList(currentFileList => {
                return currentFileList.filter(f => f.uid !== file.uid);
            });
        },
        beforeUpload: (file: RcFile) => {
            setFileList([file as UploadFile]);
            return false;
        },
        fileList,
    };

    return (
        <div>
            <Header />
            <div className="upload-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 120px)', textAlign: 'center' }}>
                <Card style={{ width: '100%', maxWidth: 600, margin: '20px', padding: '20px' }}>
                    <h1 style={{ marginBottom: '20px' }}>File Upload</h1>
                    <p>Select the file you want to upload and track the progress in real-time.</p>
                    <Upload {...uploadProps} onChange={handleChange} maxCount={1}>
                        <Button icon={<CloudUploadOutlined />} disabled={uploading}>Select File</Button>
                    </Upload>
                    {uploading && ( // Conditionally render Progress component when uploading is true
                        <Progress percent={uploadProgress} status="active" style={{ margin: '20px 0' }} />
                    )}
                    <Button
                        type="primary"
                        icon={<UploadOutlined />}
                        onClick={handleUpload}
                        disabled={fileList.length === 0 || uploading}
                        style={{ marginTop: '10px' }}
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </Button>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default UploadPage;
