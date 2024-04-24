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
  { name: 'January', General: 1.25, Specialized: 2, Media: 0.75 },
  { name: 'February', General: 2, Specialized: 2.5, Media: 1.25 },
  { name: 'March', General: 2.5, Specialized: 3.75, Media: 5 },
  { name: 'April', General: 3, Specialized: 4.25, Media: 4.5 },
  { name: 'May', General: 3.75, Specialized: 5, Media: 6.25 },
  { name: 'June', General: 2.75, Specialized: 3.5, Media: 5.5 },
  { name: 'July', General: 3.25, Specialized: 4.75, Media: 5.25 },
  { name: 'August', General: 2.25, Specialized: 3, Media: 5.75 },
  { name: 'September', General: 3.5, Specialized: 4.5, Media: 4.75 },
  { name: 'October', General: 1.75, Specialized: 2.75, Media: 6 },
  { name: 'November', General: 4, Specialized: 5, Media: 5.5 },
  { name: 'December', General: 3, Specialized: 3.75, Media: 4.5 },
];

const translatorData: TranslatorData[] = [
  { month: 'January', translators: [{ name: 'Alice', tasks: 1.25 }, { name: 'Bob', tasks: 2 }] },
  { month: 'February', translators: [{ name: 'Charlie', tasks: 1.75 }, { name: 'David', tasks: 1.5 }] },
  { month: 'March', translators: [{ name: 'Eve', tasks: 2.25 }, { name: 'Frank', tasks: 1 }] },
  { month: 'April', translators: [{ name: 'George', tasks: 0.75 }, { name: 'Hannah', tasks: 1.75 }] },
  { month: 'May', translators: [{ name: 'Ivy', tasks: 1.5 }, { name: 'John', tasks: 2 }] },
  { month: 'June', translators: [{ name: 'Karen', tasks: 1.25 }, { name: 'Leo', tasks: 2.25 }] },
  { month: 'July', translators: [{ name: 'Mia', tasks: 1.75 }, { name: 'Nick', tasks: 1.25 }] },
  { month: 'August', translators: [{ name: 'Olivia', tasks: 2 }, { name: 'Peter', tasks: 1.5 }] },
  { month: 'September', translators: [{ name: 'Quincy', tasks: 1 }, { name: 'Rachel', tasks: 2.5 }] },
  { month: 'October', translators: [{ name: 'Steve', tasks: 1.25 }, { name: 'Tina', tasks: 1.75 }] },
  { month: 'November', translators: [{ name: 'Ursula', tasks: 1.5 }, { name: 'Victor', tasks: 2 }] },
  { month: 'December', translators: [{ name: 'Wendy', tasks: 2.25 }, { name: 'Xavier', tasks: 0.75 }] },
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



