const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const employees = document.getElementById("employees");
const hrs = document.getElementById("hrs");
const admins = document.getElementById("admins");
const activeUsers = document.getElementById("activeUsers");
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

async function loadAnalytics() {

    const dashboardResult = await api("/admin/dashboard");
    const usersResult = await api("/admin/users");

    if (!dashboardResult.success || !usersResult.success) {

        alert("Failed to load analytics.");

        return;

    }

    employees.innerText = dashboardResult.dashboard.totalEmployees;
    hrs.innerText = dashboardResult.dashboard.totalHR;
    admins.innerText = dashboardResult.dashboard.totalAdmins;

    const activeCount = usersResult.users.filter(
        user => user.status === "Active"
    ).length;

    activeUsers.innerText = activeCount;

}

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

});

loadAnalytics();