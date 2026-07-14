const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const usersTable = document.getElementById("usersTable");
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

async function loadUsers() {

    const result = await api("/admin/users");

    usersTable.innerHTML = "";

    if (!result.success) {

        usersTable.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    ${result.message}
                </td>
            </tr>
        `;

        return;

    }

    if (result.users.length === 0) {

        usersTable.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    No Users Found
                </td>
            </tr>
        `;

        return;

    }

    result.users.forEach(user => {

        usersTable.innerHTML += `
            <tr>

                <td>${user.employeeId || "-"}</td>

                <td>${user.firstName} ${user.lastName}</td>

                <td>${user.email}</td>

                <td>${user.department || "-"}</td>

                <td>${user.designation || "-"}</td>

                <td>${user.role}</td>

                <td class="${user.status === "Inactive" ? "inactive-status" : "active-status"}">
                    ${user.status || "Active"}
                </td>

            </tr>
        `;

    });

}

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

});

loadUsers();