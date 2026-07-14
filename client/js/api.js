const API_BASE_URL = "http://localhost:5000/api";

const getToken = () => {
    return localStorage.getItem("token");
};

async function apiRequest(endpoint, method = "GET", body = null) {

    const options = {

        method,

        headers: {

            "Content-Type": "application/json"

        }

    };

    const token = getToken();

    if (token) {

        options.headers.Authorization = `Bearer ${token}`;

    }

    if (body) {

        options.body = JSON.stringify(body);

    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    const result = await response.json();

    if (!response.ok) {

        throw new Error(result.message || "Request Failed");

    }

    return result;

}

async function loginUser(data) {

    return await apiRequest("/auth/login", "POST", data);

}

async function registerUser(data) {

    return await apiRequest("/auth/register", "POST", data);

}

async function getDashboard() {

    return await apiRequest("/employee/dashboard");

}

async function getProfile() {

    return await apiRequest("/employee/profile");

}