const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const leaveTable = document.getElementById("leaveTable");
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

async function loadLeaves() {

    const result = await api("/hr/leaves");

    if (!result.success) {

        leaveTable.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    ${result.message}
                </td>
            </tr>
        `;

        return;
    }

    leaveTable.innerHTML = "";

    if (result.leaves.length === 0) {

        leaveTable.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    No Leave Requests Found
                </td>
            </tr>
        `;

        return;
    }

    result.leaves.forEach(leave => {

        const employeeName = leave.employee
            ? `${leave.employee.firstName} ${leave.employee.lastName}`
            : "Unknown";

        leaveTable.innerHTML += `
            <tr>

                <td>${employeeName}</td>

                <td>${leave.leaveType}</td>

                <td>${new Date(leave.fromDate).toLocaleDateString()}</td>

                <td>${new Date(leave.toDate).toLocaleDateString()}</td>

                <td>${leave.reason}</td>

                <td class="${leave.status.toLowerCase()}">
                    ${leave.status}
                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="approve-btn"
                            onclick="updateLeave('${leave._id}','Approved')">
                            Approve
                        </button>

                        <button
                            class="reject-btn"
                            onclick="updateLeave('${leave._id}','Rejected')">
                            Reject
                        </button>

                    </div>

                </td>

            </tr>
        `;

    });

}

async function updateLeave(id, status) {

    const result = await api(`/hr/leaves/${id}`, "PUT", {
        status
    });

    if (result.success) {

        alert(`Leave ${status} Successfully`);

        loadLeaves();

    } else {

        alert(result.message);

    }

}

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

});

loadLeaves();