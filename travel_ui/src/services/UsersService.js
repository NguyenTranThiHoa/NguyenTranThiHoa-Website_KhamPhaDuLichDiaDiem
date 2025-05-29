import axios from 'axios';

const API_URL = 'https://localhost:7054/api/Users';

const GetUsers = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/GetUsers`, {
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

const GetUsersById = async (token, id) => {
    try {
        const response = await axios.get(`${API_URL}/GetUsersById/${id}`, {
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

const UpdateUsers = async (token, id, data) => {
    try {
        const response = await axios.put(`${API_URL}/UpdateUsers/${id}`, data, {
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

const UpdatePassword = async (token, data) => {
    try {
        const response = await axios.put(`${API_URL}/UpdatePassword`, data, {
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

const UpdateUsersRole = async (token, id, data) => {
    try {
        const response = await axios.put(`${API_URL}/UpdateUsersRole/${id}`, data, {
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

export {
    GetUsers,
    GetUsersById,
    UpdatePassword,
    UpdateUsersRole,
    UpdateUsers,
    UploadImage
};
