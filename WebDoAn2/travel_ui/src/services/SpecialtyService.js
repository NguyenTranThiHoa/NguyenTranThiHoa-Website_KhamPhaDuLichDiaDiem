import axios from 'axios';

const API_URL = 'https://localhost:7054/api/Specialty';

const GetSpecialty = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/GetSpecialty`);
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};

const GetSpecialtyById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/GetSpecialtyById/${id}`);
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};

const CreateSpecialty = async (token, data) => {
    try {
        const response = await axios.post(`${API_URL}/CreateSpecialty`, data, {
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

const UpdateSpecialty = async (token, id, data) => {
    try {
        const response = await axios.put(`${API_URL}/UpdateSpecialty/${id}`, data, {
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

const DeleteSpecialty = async (token, id) => {
    try {
        const response = await axios.delete(`${API_URL}/DeleteSpecialty/${id}`, {
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
    GetSpecialty,
    GetSpecialtyById,
    CreateSpecialty,
    UploadImage,
    UpdateSpecialty,
    DeleteSpecialty
};
