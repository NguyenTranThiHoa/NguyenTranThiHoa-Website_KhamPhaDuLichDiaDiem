import axios from 'axios';

const API_URL = 'https://localhost:7054/api/Locations';

const GetLocations = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/GetLocations`);
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};

const GetLocationsById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/GetLocationsById/${id}`);
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};

const CreateLocations = async (token, data) => {
    try {
        const response = await axios.post(`${API_URL}/CreateLocations`, data, {
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

const UpdateLocations = async (token, id, data) => {
    try {
        const response = await axios.put(`${API_URL}/UpdateLocations/${id}`, data, {
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

const DeleteLocations = async (token, id) => {
    try {
        const response = await axios.delete(`${API_URL}/DeleteLocations/${id}`, {
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


const SearchLocations = async (searchName) => {
    try {
        const response = await axios.get(`${API_URL}/SearchLocations/${searchName}`);
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
    GetLocations,
    GetLocationsById,
    CreateLocations,
    UploadImage,
    UpdateLocations,
    DeleteLocations,
    SearchLocations
};
