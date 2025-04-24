import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import GroupsIcon from '@mui/icons-material/Groups';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

const Dashboard = () => {
    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];

    return (
        <div>
            <Navbar />
            <Sidebar />
            <main className="main-container">
                <div className="main-title">
                    <h3>DASHBOARD</h3>
                </div>
                <div className="main-cards">
                    <div className="card blue-card">
                        <div className="inner-card">
                            <h3>Nombre Total des clients</h3>
                            <GroupsIcon className="card-icon" />
                        </div>
                        <h1>3000</h1>
                    </div>
                    <div className="card green-card">
                        <div className="inner-card">
                            <h3>Nombre Total des clients traiter</h3>
                            <HowToRegIcon className="card-icon" />
                        </div>
                        <h1>1000</h1>
                    </div>
                </div>
                <div className="charts">
                    <div className="line-chart-container">
                        <LineChart
                            width={1000}
                            height={300}
                            series={[
                                { data: pData, color: '#233E83' },
                                { data: uData, color: 'rgba(61, 182, 75, 0.99)' },
                            ]}
                            xAxis={[{ scaleType: 'point', data: xLabels }]}
                        />
                    </div>
                    <div className="bottom-charts">
                        <div className="bar-chart-container">
                            <BarChart
                                width={500}
                                height={300}
                                series={[
                                    { data: pData, id: 'pvId', color: '#233E83' },
                                    { data: uData, id: 'uvId', color: 'rgba(61, 182, 75, 0.99)' },
                                ]}
                                xAxis={[{ data: xLabels, scaleType: 'band' }]}
                            />
                        </div>
                        <div className="pie-chart-container">
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 10, label: 'series A', color: 'rgba(61, 182, 75, 0.99)' },
                                            { id: 1, value: 15, label: 'series B', color: '#233E83' },
                                            { id: 2, value: 20, label: 'series C', color: 'rgba(123, 44, 168, 0.99)' },
                                        ],
                                    },
                                ]}
                                width={400}
                                height={200}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;