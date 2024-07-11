'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { date: '2023-01-01', price: 150 },
    { date: '2023-02-01', price: 160 },
    { date: '2023-03-01', price: 155 },
    { date: '2023-04-01', price: 80 },
    { date: '2023-05-01', price: 180 },
    { date: '2023-06-01', price: 175 },
];

interface Props {
    className?: string;
}

const StockPriceChart: React.FC<Props> = ({ className }) => {
    return (
        <div className={`w-full bg-white p-5 rounded-lg shadow ${className || ''}`}>
            <h2 className="mb-4 text-xl font-semibold leading-none tracking-tight">General stocks performance</h2>
            <div className="h-[300px] md:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default StockPriceChart;