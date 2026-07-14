const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const employees = document.getElementById("employees");
const hrs = document.getElementById("hrs");
const admins = document.getElementById("admins");
const logoutBtn = document.getElementById("logoutBtn");

async function api(endpoint, method = "GET", body = null) {

    const options = {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    return await response.json();
}

async function loadDashboard() {

    const result = await api("/admin/dashboard");

    if (!result.success) {
        alert(result.message);
        return;
    }

    employees.innerText = result.dashboard.totalEmployees;
    hrs.innerText = result.dashboard.totalHR;
    admins.innerText = result.dashboard.totalAdmins;

}

logoutBtn.addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "login.html";

});

loadDashboard();