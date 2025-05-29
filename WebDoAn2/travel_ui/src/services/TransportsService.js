import axios from 'axios';

const API_URL = 'https://localhost:7054/api/Transports';

const GetTransports = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/GetTransports`);
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};

const GetTransportsById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/GetTransportsById/${id}`);
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};

const CreateTransports = async (token, data) => {
    try {
        const response = await axios.post(`${API_URL}/CreateTransports`, data, {
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

const UploadImage = async (token, data) => {
    try {
        const response = await axios.post(`${API_URL}/UploadImage`, data, {
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

const UpdateTransports = async (token, id, data) => {
    try {
        const response = await axios.put(`${API_URL}/UpdateTransports/${id}`, data, {
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

const DeleteTransports = async (token, id) => {
    try {
        const response = await axios.delete(`${API_URL}/DeleteTransports/${id}`, {
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
    GetTransports,
    GetTransportsById,
    CreateTransports,
    UploadImage,
    UpdateTransports,
    DeleteTransports
};
