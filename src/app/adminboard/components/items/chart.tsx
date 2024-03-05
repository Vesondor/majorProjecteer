import React, { useState } from 'react';
import { Typography, Row, Col, List } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

interface DataBar {
  name: string;
  General: number;
  Specialized: number;
  Media: number;
}

interface TranslatorData {
  month: string;
  translators: { name: string; tasks: number }[];
}

const dataBar: DataBar[] = [
  { name: 'January', General: 10, Specialized: 15, Media: 20 },
  { name: 'February', General: 8, Specialized: 15, Media: 20 },
  { name: 'March', General: 10, Specialized: 15, Media: 20 },
  { name: 'April', General: 12, Specialized: 17, Media: 18 },
  { name: 'May', General: 15, Specialized: 20, Media: 25 },
  { name: 'June', General: 11, Specialized: 14, Media: 22 },
  { name: 'July', General: 13, Specialized: 19, Media: 21 },
  { name: 'August', General: 9, Specialized: 12, Media: 23 },
  { name: 'September', General: 14, Specialized: 18, Media: 19 },
  { name: 'October', General: 7, Specialized: 11, Media: 24 },
  { name: 'November', General: 16, Specialized: 20, Media: 22 },
  { name: 'December', General: 12, Specialized: 15, Media: 18 },
];

const translatorData: TranslatorData[] = [
  { month: 'January', translators: [{ name: 'Alice', tasks: 5 }, { name: 'Bob', tasks: 8 }] },
  { month: 'February', translators: [{ name: 'Charlie', tasks: 7 }, { name: 'David', tasks: 6 }] },
  { month: 'March', translators: [{ name: 'Eve', tasks: 9 }, { name: 'Frank', tasks: 4 }] },
  { month: 'April', translators: [{ name: 'George', tasks: 3 }, { name: 'Hannah', tasks: 7 }] },
  { month: 'May', translators: [{ name: 'Ivy', tasks: 6 }, { name: 'John', tasks: 8 }] },
  { month: 'June', translators: [{ name: 'Karen', tasks: 5 }, { name: 'Leo', tasks: 9 }] },
  { month: 'July', translators: [{ name: 'Mia', tasks: 7 }, { name: 'Nick', tasks: 5 }] },
  { month: 'August', translators: [{ name: 'Olivia', tasks: 8 }, { name: 'Peter', tasks: 6 }] },
  { month: 'September', translators: [{ name: 'Quincy', tasks: 4 }, { name: 'Rachel', tasks: 10 }] },
  { month: 'October', translators: [{ name: 'Steve', tasks: 5 }, { name: 'Tina', tasks: 7 }] },
  { month: 'November', translators: [{ name: 'Ursula', tasks: 6 }, { name: 'Victor', tasks: 8 }] },
  { month: 'December', translators: [{ name: 'Wendy', tasks: 9 }, { name: 'Xavier', tasks: 3 }] },
];


const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];


const CustomTooltipBar = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, General, Specialized, Media } = payload[0].payload;
    return (
      <div style={{ backgroundColor: 'white', padding: '8px', border: '1px solid #ccc' }}>
        <p>{`${name}`}</p>
        <p>General Translations: {General}</p>
        <p>Specialized Translation: {Specialized}</p>
        <p>Media Contents: {Media}</p>
      </div>
    );
  }

  return null;
};

const Charts: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<TranslatorData | undefined>(undefined);

  const handleBarClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length) {
      const name = data.activePayload[0].payload.name;
      const monthData = translatorData.find(t => t.month === name);
      setSelectedMonth(monthData);
    }
  };
  
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataBar} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} onClick={handleBarClick}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="General" fill={COLORS[3]} />
                <Bar dataKey="Specialized" fill={COLORS[1]} />
                <Bar dataKey="Media" fill={COLORS[4]} />
                <Legend />
                <Tooltip content={<CustomTooltipBar />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ height: '300px', overflowY: 'auto' }}>
            <h4>Task Division</h4>
            <List
              header={<div style={{fontWeight:'bold', color:'#214B71'}}>{selectedMonth ? selectedMonth.month : 'Select a month'}</div>}
              bordered
              dataSource={selectedMonth?.translators}
              renderItem={item => (
                <List.Item>
                  {item.name} - {item.tasks} tasks
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Charts;



