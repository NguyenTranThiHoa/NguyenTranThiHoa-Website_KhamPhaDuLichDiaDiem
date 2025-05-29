import axios from 'axios';

const API_URL = 'https://localhost:7054/api/Reviews';

const GetReviews = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/GetReviews`);
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};

const GetReviewsById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/GetReviewsById/${id}`);
        return response;
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            message: error.response.data?.message
        };
    }
};

const CreateReviews = async (token, data) => {
    try {
        const response = await axios.post(`${API_URL}/CreateReviews`, data, {
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

const UpdateReviews = async (token, id, data) => {
    try {
        const response = await axios.put(`${API_URL}/UpdateReviews/${id}`, data, {
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

const DeleteReviews = async (token, id) => {
    try {
        const response = await axios.delete(`${API_URL}/DeleteReviews/${id}`, {
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

// Lấy bình luận theo LocationID
const GetReviewsByLocationId = async (token, locationId) => {
    try {
        const response = await axios.get(`${API_URL}/GetReviewsByLocationId/ByLocation/${locationId}`,{
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
    GetReviews,
    GetReviewsById,
    CreateReviews,
    UpdateReviews,
    DeleteReviews,
    GetReviewsByLocationId
};
