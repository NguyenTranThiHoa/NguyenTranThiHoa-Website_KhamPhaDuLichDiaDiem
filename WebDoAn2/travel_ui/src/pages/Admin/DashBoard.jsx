// import React, { useEffect, useState } from 'react';
// import { Card, Row, Col, message, Breadcrumb, Select } from 'antd';
// import { HomeOutlined, CarOutlined, RadarChartOutlined, AppleOutlined } from '@ant-design/icons';
// import * as statisticsService from '../../services/StatisticsService';
// import { useNavigate } from 'react-router-dom';
// import refreshToken from '../../utils/refreshToken';
// import { Pie, Line } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import axios from "axios";

// ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, LineElement, PointElement, ChartDataLabels);

// const DashBoard = () => {
//     const [totalLocations, setTotalLocations] = useState(0);
//     const [totalTransport, setTotalTransport] = useState(0);
//     const [totalHotels, setTotalHotels] = useState(0);
//     const [totalFoods, setTotalFoods] = useState(0);
//     const [dailyReviewStats, setDailyReviewStats] = useState([]);
//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());  // Trạng thái lưu năm đã chọn
//     const navigate = useNavigate();

//     const [weather, setWeather] = useState({});
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchStatistics = async () => {
//             try {
//                 let token = localStorage.getItem('accessToken');
//                 let response = await statisticsService.GetStatistics(token, selectedYear); // Thêm tham số năm vào API call

//                 if (response.status === 401) {
//                     const refreshTokenBolean = await refreshToken();
//                     if (!refreshTokenBolean) {
//                         message.error("Phiên đăng nhập của bạn đã hết hạn!");
//                         navigate("/auth/login");
//                         return;
//                     }
//                     token = localStorage.getItem('accessToken');
//                     response = await statisticsService.GetStatistics(token, selectedYear);
//                 }
//                 if (response.status === 200) {
//                     setTotalLocations(response.data.totalLocations);
//                     setTotalTransport(response.data.totalTransport);
//                     setTotalHotels(response.data.totalHotels);
//                     setTotalFoods(response.data.totalFoods);
//                 } else {
//                     message.error("Không thể thống kê!");
//                 }
//             } catch (error) {
//                 message.error("Có lỗi xảy ra khi lấy dữ liệu tổng quan!");
//                 console.log(error);
//             }
//         };

//         const fetchDailyReviewStats = async () => {
//             try {
//                 let token = localStorage.getItem('accessToken');
//                 let response = await statisticsService.GetDailyReviewStats(token, selectedYear);

//                 if (response.status === 401) {
//                     const refreshTokenBolean = await refreshToken();
//                     if (!refreshTokenBolean) {
//                         message.error("Phiên đăng nhập của bạn đã hết hạn!");
//                         navigate("/auth/login");
//                         return;
//                     }
//                     token = localStorage.getItem('accessToken');
//                     response = await statisticsService.GetDailyReviewStats(token, selectedYear);
//                 }
//                 if (response.status === 200) {
//                     setDailyReviewStats(response.data);
//                 } else {
//                     message.error("Không thể lấy dữ liệu đánh giá hằng ngày!");
//                 }
//             } catch (error) {
//                 message.error("Có lỗi xảy ra khi lấy dữ liệu đánh giá hằng ngày!");
//                 console.log(error);
//             }
//         };

//         const fetchWeather = async () => {
//             try {
//               const apiKey = "fba1d5e349e851756924ab6b8f181eab"; // Thay bằng API key của bạn
//               const city = "Sa Đéc"; // Tùy chỉnh thành phố
//               const response = await axios.get(
//                 `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
//               );
//               setWeather(response.data);
//               setIsLoading(false);
//             } catch (error) {
//               console.error("Error fetching weather data:", error);
//             }
//           };

//         fetchWeather();
//         fetchStatistics();
//         fetchDailyReviewStats();
//     }, [navigate, selectedYear]);  // Thêm selectedYear vào dependency array

//     // Dữ liệu biểu đồ hình tròn
//     const pieData = {
//         labels: ['Địa điểm', 'Phương tiện', 'Khách sạn', 'Món ăn'],
//         datasets: [
//             {
//                 label: 'Số lượng',
//                 data: [totalLocations, totalTransport, totalHotels, totalFoods],
//                 backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99'],
//                 hoverOffset: 4
//             }
//         ]
//     };

//     const pieOptions = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'bottom',
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function (tooltipItem) {
//                         return `${tooltipItem.label}: ${tooltipItem.raw}`;
//                     }
//                 }
//             },
//             datalabels: {
//                 formatter: (value, ctx) => {
//                     const total = ctx.dataset.data.reduce((acc, val) => acc + val, 0);
//                     const percentage = ((value / total) * 100).toFixed(2) + '%';
//                     return percentage;
//                 },
//                 color: '#fff',
//                 font: {
//                     weight: 'bold',
//                     size: 14
//                 },
//                 align: 'center',
//                 anchor: 'center',
//             }
//         }
//     };

//     // Dữ liệu biểu đồ đường
//     const lineData = {
//         labels: dailyReviewStats.map((stat) =>
//             new Date(stat.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
//         ),
//         datasets: [
//             {
//                 label: 'Đánh giá mới mỗi ngày',
//                 data: dailyReviewStats.map((stat) => stat.totalReviews || 0),
//                 borderColor: 'rgb(75, 192, 192)',
//                 backgroundColor: 'rgba(75, 192, 192, 0.5)',
//                 fill: true,
//                 tension: 0.4,
//             },
//         ],
//     };

//     const lineOptions = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function (tooltipItem) {
//                         return `Ngày: ${tooltipItem.label}, Số lượng: ${tooltipItem.raw}`;
//                     }
//                 }
//             },
//         },
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Ngày',
//                 }
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Số lượng đánh giá',
//                 },
//                 beginAtZero: true,
//                 min: 1,  // Giá trị tối thiểu cho trục Y
//                 max: 10, // Giá trị tối đa cho trục Y
//             }
//         },
//     };

//     return (
//         <div>
//             <Breadcrumb
//                 items={[
//                     { title: 'Admin' },
//                     { title: 'Trang chủ' }
//                 ]}
//             />
//         <div style={{
//             padding: '20px 20px',
//             borderRadius: '5px',
//             backgroundColor: "#fff",
//             marginTop: '10px'
//         }}>
//             <h2 style={{
//                 textAlign: 'center',
//                 fontWeight: 'bold',
//                 fontSize: '25px',
//                 paddingBottom: '10px',
//             }}>DỮ LIỆU - BIỂU ĐỒ THỐNG KÊ SỐ LƯỢNG</h2>
//             <Row gutter={16}>
//                 <Col span={6}>
//                     <Card title="Tổng số địa điểm" bordered={false} style={{ backgroundColor: '#E984E2' }}>
//                         <HomeOutlined style={{ fontSize: '30px', padding: '0px 20px' }} />
//                         {totalLocations}
//                     </Card>
//                 </Col>
//                 <Col span={6}>
//                     <Card title="Tổng số phương tiện" bordered={false} style={{ backgroundColor: '#B9CC95' }}>
//                         <CarOutlined style={{ fontSize: '30px', padding: '0px 20px' }} />
//                         {totalTransport}
//                     </Card>
//                 </Col>
//                 <Col span={6}>
//                     <Card title="Tổng số khách sạn" bordered={false} style={{ backgroundColor: '#F8D49B' }}>
//                         <RadarChartOutlined style={{ fontSize: '30px', padding: '0px 20px' }} />
//                         {totalHotels}
//                     </Card>
//                 </Col>
//                 <Col span={6}>
//                     <Card title="Tổng số món ăn" bordered={false} style={{ backgroundColor: '#50409A' }}>
//                         <AppleOutlined style={{ fontSize: '30px', padding: '0px 20px' }} />
//                         {totalFoods}
//                     </Card>
//                 </Col>
//             </Row>

//             <Row gutter={20}>
//                 <Col span={6} style={{ padding: '20px 0px' }}>
//                     <Card title="Biểu đồ thống kê" bordered={false}>
//                         <Pie data={pieData} options={pieOptions}  style={{
//                             backgroundColor: '#f0f5ff',
//                         }}/>
//                     </Card>
//                 </Col>
//                 <Col span={5} style={{ paddingLeft: '20px', paddingTop: '80px' }}>
//                     <Card
//                     title="Thời tiết hiện tại"
//                     bordered={false}
//                     style={{
//                         width: 250,
//                         height: '250px',
//                         textAlign: "center",
//                         backgroundColor: "#e6f7ff",
//                         borderRadius: "10px",
//                         boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
//                         padding: '0px 0px',
//                     }}
//                     >
//                     {isLoading ? (
//                         <p>Đang tải...</p>
//                     ) : (
//                         <div>
//                         <h2>Thành phố {weather.name}</h2>
//                         <p style={{ fontSize: "20px", fontWeight: "bold" }}>
//                             {Math.round(weather.main.temp)}°C
//                         </p>
//                         <p>{weather.weather[0].description}</p>
//                         <p>
//                             🌬️ Tốc độ gió: {weather.wind.speed} m/s <br />
//                             💧 Độ ẩm: {weather.main.humidity}%
//                         </p>
//                         </div>
//                     )}
//                     </Card>
//                 </Col>
//                 <Col span={12} style={{ paddingTop: '0px', marginLeft: '40px' }}>
//                     <Card
//                         title={
//                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 <span>Số lượng đánh giá mới mỗi ngày</span>
//                                 <Select
//                                     value={selectedYear}
//                                     onChange={(value) => setSelectedYear(value)}
//                                     style={{ width: 120 }}
//                                 >
//                                     {[2021, 2022, 2023, 2024, 2025].map((year) => (
//                                         <Select.Option key={year} value={year}>
//                                             {year}
//                                         </Select.Option>
//                                     ))}
//                                 </Select>
//                             </div>
//                         }
//                         bordered={false}
//                         style={{ textAlign: 'center' }}
//                     >
//                         <Line
//                             data={lineData}
//                             options={lineOptions}
//                             style={{
//                                 backgroundColor: '#f9f0ff',
//                             }}
//                         />
//                     </Card>
//                 </Col>
//             </Row>
//         </div>
//         </div>
//     );
// };

// export default DashBoard;


import React, { useEffect, useState } from 'react';
import { Card, Row, Col, message, Breadcrumb, Select } from 'antd';
import { HomeOutlined, CarOutlined, RadarChartOutlined, AppleOutlined } from '@ant-design/icons';
import * as statisticsService from '../../services/StatisticsService';
import { useNavigate } from 'react-router-dom';
import refreshToken from '../../utils/refreshToken';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from "axios";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, LineElement, PointElement, ChartDataLabels);

const DashBoard = () => {
    const [totalLocations, setTotalLocations] = useState(0);
    const [totalTransport, setTotalTransport] = useState(0);
    const [totalHotels, setTotalHotels] = useState(0);
    const [totalFoods, setTotalFoods] = useState(0);
    const [dailyReviewStats, setDailyReviewStats] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedCity, setSelectedCity] = useState('Sa Đéc'); // Trạng thái chọn thành phố
    const [weather, setWeather] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Danh sách các thành phố (có thể được lấy từ API hoặc danh sách cố định)
    const cities = ['Sa Đéc', 'Cần Thơ', 'Hà Nội', 'Cao Lãnh', 'Đà Nẵng', 'Hồ Chí Minh', 'Sóc Trăng'];

    // Hàm gọi API thời tiết
    const fetchWeather = async (city) => {
        try {
            const apiKey = "fba1d5e349e851756924ab6b8f181eab"; // Thay bằng API key của bạn
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            );
            setWeather(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setIsLoading(false);
        }
    };

    // Lấy URL biểu tượng thời tiết
    const getWeatherIcon = (icon) => {
        return `https://openweathermap.org/img/wn/${icon}.png`; // URL cho biểu tượng từ OpenWeatherMap
    };

    // Gọi API thời tiết khi component load hoặc khi thành phố được chọn
    useEffect(() => {
        fetchWeather(selectedCity);
    }, [selectedCity]);

    // Hàm lấy thống kê
    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                let token = localStorage.getItem('accessToken');
                let response = await statisticsService.GetStatistics(token, selectedYear);

                if (response.status === 401) {
                    const refreshTokenBolean = await refreshToken();
                    if (!refreshTokenBolean) {
                        message.error("Phiên đăng nhập của bạn đã hết hạn!");
                        navigate("/auth/login");
                        return;
                    }
                    token = localStorage.getItem('accessToken');
                    response = await statisticsService.GetStatistics(token, selectedYear);
                }
                if (response.status === 200) {
                    setTotalLocations(response.data.totalLocations);
                    setTotalTransport(response.data.totalTransport);
                    setTotalHotels(response.data.totalHotels);
                    setTotalFoods(response.data.totalFoods);
                } else {
                    message.error("Không thể thống kê!");
                }
            } catch (error) {
                message.error("Có lỗi xảy ra khi lấy dữ liệu tổng quan!");
                console.log(error);
            }
        };

        const fetchDailyReviewStats = async () => {
            try {
                let token = localStorage.getItem('accessToken');
                let response = await statisticsService.GetDailyReviewStats(token, selectedYear);

                if (response.status === 401) {
                    const refreshTokenBolean = await refreshToken();
                    if (!refreshTokenBolean) {
                        message.error("Phiên đăng nhập của bạn đã hết hạn!");
                        navigate("/auth/login");
                        return;
                    }
                    token = localStorage.getItem('accessToken');
                    response = await statisticsService.GetDailyReviewStats(token, selectedYear);
                }
                if (response.status === 200) {
                    setDailyReviewStats(response.data);
                } else {
                    message.error("Không thể lấy dữ liệu đánh giá hằng ngày!");
                }
            } catch (error) {
                message.error("Có lỗi xảy ra khi lấy dữ liệu đánh giá hằng ngày!");
                console.log(error);
            }
        };

        fetchStatistics();
        fetchDailyReviewStats();
    }, [navigate, selectedYear]);

    // Dữ liệu biểu đồ hình tròn
    const pieData = {
        labels: ['Địa điểm', 'Phương tiện', 'Khách sạn', 'Món ăn'],
        datasets: [
            {
                label: 'Số lượng',
                data: [totalLocations, totalTransport, totalHotels, totalFoods],
                backgroundColor: ['#3B7097', '#75BDE0', '#A9D09E', '#F6C2BC'],
                hoverOffset: 4
            }
        ]
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    }
                }
            },
            datalabels: {
                formatter: (value, ctx) => {
                    const total = ctx.dataset.data.reduce((acc, val) => acc + val, 0);
                    const percentage = ((value / total) * 100).toFixed(2) + '%';
                    return percentage;
                },
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 14
                },
                align: 'center',
                anchor: 'center',
            }
        }
    };

    // Dữ liệu biểu đồ đường
    const lineData = {
        labels: dailyReviewStats.map((stat) =>
            new Date(stat.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
        ),
        datasets: [
            {
                label: 'Đánh giá mới mỗi ngày',
                data: dailyReviewStats.map((stat) => stat.totalReviews || 0),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `Ngày: ${tooltipItem.label}, Số lượng: ${tooltipItem.raw}`;
                    }
                }
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Ngày',
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Số lượng đánh giá',
                },
                beginAtZero: true,
                min: 1,  // Giá trị tối thiểu cho trục Y
                max: 10, // Giá trị tối đa cho trục Y
            }
        },
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { title: 'Admin' },
                    { title: 'Trang chủ' }
                ]}
            />
            <div style={{
                padding: '10px 20px',
                borderRadius: '5px',
                backgroundColor: "#F0F0F0",
                marginTop: '10px'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '25px',
                    paddingBottom: '10px',
                }}>DỮ LIỆU - BIỂU ĐỒ THỐNG KÊ SỐ LƯỢNG</h2>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card title="Tổng số địa điểm" bordered={false} style={{ backgroundColor: '#3B7097' }}>
                            <HomeOutlined style={{ fontSize: '30px', padding: '0px 20px' }} />
                            {totalLocations}
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="Tổng số phương tiện" bordered={false} style={{ backgroundColor: '#75BDE0' }}>
                            <CarOutlined style={{ fontSize: '30px', padding: '0px 20px' }} />
                            {totalTransport}
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="Tổng số khách sạn" bordered={false} style={{ backgroundColor: '#A9D09E' }}>
                            <RadarChartOutlined style={{ fontSize: '30px', padding: '0px 20px' }} />
                            {totalHotels}
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="Tổng số món ăn" bordered={false} style={{ backgroundColor: '#F6E2BC' }}>
                            <AppleOutlined style={{ fontSize: '30px', padding: '0px 20px' }} />
                            {totalFoods}
                        </Card>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col span={6} style={{ padding: '20px 0px' }}>
                        <Card title="Biểu đồ thống kê" bordered={false} style={{height: '370px'}}>
                            <Pie data={pieData} options={pieOptions} style={{
                                backgroundColor: '#f0f5ff',
                            }} />
                        </Card>
                    </Col>
                    <Col span={12} style={{ paddingTop: '20px', marginLeft: '20px' }}>
                        <Card
                            title={
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>Số lượng đánh giá mới mỗi ngày</span>
                                    <Select
                                        value={selectedYear}
                                        onChange={(value) => setSelectedYear(value)}
                                        style={{ width: 120 }}
                                    >
                                        {[2021, 2022, 2023, 2024, 2025].map((year) => (
                                            <Select.Option key={year} value={year}>
                                                {year}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                            }
                            bordered={false}
                            style={{ textAlign: 'center' }}
                        >
                            <Line
                                data={lineData}
                                options={lineOptions}
                                style={{
                                    backgroundColor: '#f9f0ff',
                                }}
                            />
                        </Card>
                    </Col>
                    <Col span={5} style={{ paddingLeft: '20px', paddingTop: '20px' }}>
                        <Card
                            title="THỜI TIẾT ĐỊA PHƯƠNG"
                            bordered={false}
                            style={{
                                width: 250,
                                height: '370px',
                                textAlign: "center",
                                backgroundColor: "#3B7097",
                                borderRadius: "10px",
                                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                                padding: '0px 0px',
                            }}
                        >
                            <Select
                                defaultValue="Sa Đéc"
                                onChange={value => setSelectedCity(value)}
                                style={{ width: '180px'}}
                            >
                                {cities.map(city => (
                                    <Select.Option key={city} value={city}>
                                        {city}
                                    </Select.Option>
                                ))}
                            </Select>

                            {isLoading ? (
                                <p>Đang tải...</p>
                            ) : (
                                <div style={{ marginTop: '20px' }}>
                                    <h2>Thành phố {weather.name}</h2>
                                    <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                                        {Math.round(weather.main.temp)}°C
                                    </p>
                                    <p>{weather.weather[0].description}</p>

                                    <div>
                                        <img 
                                            src={getWeatherIcon(weather.weather[0].icon)} 
                                            alt={weather.weather[0].description} 
                                            style={{ width: "100px", height: "100px", marginLeft: '50px' }}
                                        />
                                    </div>

                                    <p>
                                        🌬️ Tốc độ gió: {weather.wind.speed} m/s <br />
                                        💧 Độ ẩm: {weather.main.humidity}%
                                    </p>
                            </div>
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default DashBoard;
