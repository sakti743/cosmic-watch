"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const RiskChart = ({ data }) => {
  // 1. Process the manual/automated data for the chart
  const chartData = [
    { name: 'Low Risk', value: data.filter(a => a.riskScore < 30).length, color: '#22c55e' }, // Green
    { name: 'Medium Risk', value: data.filter(a => a.riskScore >= 30 && a.riskScore < 70).length, color: '#eab308' }, // Yellow
    { name: 'High Threat', value: data.filter(a => a.riskScore >= 70).length, color: '#ef4444' }, // Red
  ];

  return (
    <div className="bg-[#0a0b14] border border-gray-800 p-6 rounded-2xl shadow-2xl h-[350px] w-full">
      <h3 className="text-gray-400 text-[10px] uppercase tracking-[0.3em] mb-4 font-mono">
        Threat Level Distribution
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={chartData}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#11121d', border: '1px solid #374151', borderRadius: '8px' }}
            itemStyle={{ color: '#fff', fontSize: '12px' }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskChart;