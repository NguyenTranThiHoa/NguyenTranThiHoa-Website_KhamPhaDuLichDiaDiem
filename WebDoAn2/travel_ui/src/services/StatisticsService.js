import axios from 'axios';

const API_URL = 'https://localhost:7054/api/Statistics';

const GetTotalLocations = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/GetTotalLocations`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};

const GetTotalTransport = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/GetTotalTransport`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};


const GetTotalHotels = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/GetTotalHotels`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};

const GetTotalFoods = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/GetTotalFoods`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};

const GetStatistics = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/GetStatistics`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};

const GetDailyReviewStats = async (token, year) => {
    try {
        const response = await axios.get(`https://localhost:7054/api/Reviews/GetReviewStatsByYear/${year}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};


export { GetDailyReviewStats };

export {
    GetTotalLocations,
    GetTotalTransport,
    GetTotalHotels,
    GetTotalFoods,
    GetStatistics
};
