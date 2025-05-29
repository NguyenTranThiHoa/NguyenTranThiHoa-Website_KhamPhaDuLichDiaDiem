import axios from 'axios';

const API_URL = 'https://localhost:7054/api/Hotels';

const GetHotels = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/GetHotels`);
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};

const GetLocations = async () => {
    try {
        const response = await axios.get(`https://localhost:7054/api/Locations/GetLocations`);
      return response.data; // Trả về dữ liệu địa điểm
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};
const GetHotelsById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/GetHotelsById/${id}`);
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};

const CreateHotels = async (token, data) => {
    try {
        const response = await axios.post(`${API_URL}/CreateHotels`, data, {
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

const UpdateHotels = async (token, id, data) => {
    try {
        const response = await axios.put(`${API_URL}/UpdateHotels/${id}`, data, {
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

const DeleteHotels = async (token, id) => {
    try {
        const response = await axios.delete(`${API_URL}/DeleteHotels/${id}`, {
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
    GetHotels,
    GetLocations,
    GetHotelsById,
    CreateHotels,
    UploadImage,
    UpdateHotels,
    DeleteHotels
};
