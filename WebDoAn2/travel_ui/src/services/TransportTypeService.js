import axios from 'axios';

const API_URL = 'https://localhost:7054/api/TransportType';

const GetTransportType = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/GetTransportType`);
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};

const GetTransportTypeById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/GetTransportTypeById/${id}`);
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};

const CreateTransportType = async (token, data) => {
    try {
        const response = await axios.post(`${API_URL}/CreateTransportType`, data, {
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


const UpdateTransportType = async (token, id, data) => {
    try {
        const response = await axios.put(`${API_URL}/UpdateTransportType/${id}`, data, {
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

const DeleteTransportType = async (token, id) => {
    try {
        const response = await axios.delete(`${API_URL}/DeleteTransportType/${id}`, {
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


export {
    GetTransportType,
    GetTransportTypeById,
    CreateTransportType,
    UpdateTransportType,
    DeleteTransportType
};
