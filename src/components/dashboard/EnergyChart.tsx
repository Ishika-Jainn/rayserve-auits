
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnergyData } from '@/lib/db';

interface EnergyChartProps {
  data: EnergyData[];
  total: number;
  change: number;
}

const EnergyChart: React.FC<EnergyChartProps> = ({ data, total, change }) => {
  return (
    <Card className="w-full">
      <CardHeader className="bg-solar-primary text-white rounded-t-lg">
        <CardTitle className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          Energy Production
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`} 
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#FFD700" 
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0 }}
                dot={{ r: 4, strokeWidth: 0, fill: '#FFD700' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold">Total Production: {total} kWh</span>
            <span className="inline-flex ml-2 items-center bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 12.586V7z" clipRule="evenodd" />
              </svg>
              +{change}% from last month
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyChart;
