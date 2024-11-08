import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TractionTracker = () => {
    const [data, setData] = useState('traffic');

    const trafficData = {
        labels: ['Community Building', 'Content Marketing', 'Paid Social', 'SEO', 'Email Marketing'],
        datasets: [
            {
                label: 'Traffic',
                data: [5000, 3500, 2800, 2200, 1500],
                backgroundColor: 'rgba(103, 159, 55, 0.7)',
                borderRadius: 4,
            },
        ],
    };

    const trafficOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 6000,
                ticks: {
                    stepSize: 1500,
                },
            },
        },
    };

    const clickThroughRateData = {
        labels: ['Community Building', 'Content Marketing', 'Paid Social', 'SEO', 'Email Marketing'],
        datasets: [
            {
                label: 'Click-Through rate',
                data: [3.2, 2.8, 1.9, 3.5, 4.1],
                backgroundColor: 'rgba(103, 159, 55, 0.7)',
                borderRadius: 4,
            },
        ],
    };

    const clickThroughRateOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 8,
                ticks: {
                    stepSize: 2,
                },
            },
        },
    };

    const conversionRateData = {
        labels: ['Community Building', 'Content Marketing', 'Paid Social', 'SEO', 'Email Marketing'],
        datasets: [
            {
                label: 'Traffic',
                data: [2.1, 1.8, 1.2, 2.3, 3.2],
                backgroundColor: 'rgba(103, 159, 55, 0.7)',
                borderRadius: 4,
            },
        ],
    };

    const conversionRateOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 8,
                ticks: {
                    stepSize: 2,
                },
            },
        },
    };

    const totalUsersData = {
        labels: ['Community Building', 'Content Marketing', 'Paid Social', 'SEO', 'Email Marketing'],
        datasets: [
            {
                label: 'Traffic',
                data: [105, 63, 34, 51, 48],
                backgroundColor: 'rgba(103, 159, 55, 0.7)',
                borderRadius: 4,
            },
        ],
    };

    const totalUsersOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 120,
                ticks: {
                    stepSize: 20,
                },
            },
        },
    };

    function handleData(e) {
        setData(e.target.value);
    }

    return (
        <div className='mt-20 w-11/12 mx-auto'>
            <h2 className="text-center font-bold lg:text-5xl sm:text-4xl text-3xl text-[#1e1e1e]">Traction Tracker</h2>
            <div className="p-6 rounded-lg shadow-lg w-11/12 mx-auto mt-5">
                <div className='flex items-center justify-between bg-[#EFFDF4] p-4 rounded-lg mb-6'>
                    <div>
                        <span className="text-gray-600 font-semibold">Total Users: </span>
                        <span className="text-lg font-bold text-gray-800">301</span>
                    </div>
                    <select onChange={handleData} className='px-4 py-2 rounded-lg border-[0.1rem] border-[#679F37]' name="data">
                        <option value="traffic">Traffic</option>
                        <option value="click-through-rate">Click-Through Rate</option>
                        <option value="conversion-rate">Conversion Rate</option>
                        <option value="total-users">Total Users</option>
                    </select>
                </div>
                
                <div className="mb-6 lg:w-5/6 w-full mx-auto overflow-x-auto">
                    <div style={{ minWidth: '500px' }}>
                        {
                            data === 'traffic' ? <Bar data={trafficData} options={trafficOptions} /> : 
                            data === 'click-through-rate' ? <Bar data={clickThroughRateData} options={clickThroughRateOptions} /> :
                            data === 'conversion-rate' ? <Bar data={conversionRateData} options={conversionRateOptions} /> :
                            <Bar data={totalUsersData} options={totalUsersOptions} />
                        }
                    </div>
                </div>
                
                <div className='md:overflow-x-hidden overflow-x-scroll'>
                    <table className="w-full bg-white rounded-lg shadow-md text-left">
                        <thead>
                            <tr className="bg-[#EFFDF4] text-gray-600 text-sm">
                                <th className="p-4">Channel</th>
                                <th className="p-4">Traffic</th>
                                <th className="p-4">Click-Through Rate</th>
                                <th className="p-4">Conversion Rate</th>
                                <th className="p-4">Total Users</th>
                                <th className="p-4">Trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="p-4">Community Building</td>
                                <td className="p-4">5,000</td>
                                <td className="p-4">3.2%</td>
                                <td className="p-4">2.1%</td>
                                <td className="p-4">105</td>
                                <td className="p-4 text-green-500">↑</td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-4">Content Marketing</td>
                                <td className="p-4">3,500</td>
                                <td className="p-4">2.8%</td>
                                <td className="p-4">1.8%</td>
                                <td className="p-4">63</td>
                                <td className="p-4 text-gray-500">—</td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-4">Paid Social</td>
                                <td className="p-4">2,800</td>
                                <td className="p-4">1.9%</td>
                                <td className="p-4">1.2%</td>
                                <td className="p-4">34</td>
                                <td className="p-4 text-red-500">↓</td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-4">SEO</td>
                                <td className="p-4">2,200</td>
                                <td className="p-4">3.5%</td>
                                <td className="p-4">2.3%</td>
                                <td className="p-4">51</td>
                                <td className="p-4 text-green-500">↑</td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-4">Email Marketing</td>
                                <td className="p-4">1,500</td>
                                <td className="p-4">4.1%</td>
                                <td className="p-4">3.2%</td>
                                <td className="p-4">48</td>
                                <td className="p-4 text-green-500">↑</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TractionTracker;
