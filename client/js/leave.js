const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const leaveType = document.getElementById("leaveType");
const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");
const reason = document.getElementById("reason");

const applyLeaveBtn = document.getElementById("applyLeaveBtn");
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

    const result = await api("/leaves");

    if (!result.success) {
        alert(result.message);
        return;
    }

    leaveTable.innerHTML = "";

    result.leaves.forEach(leave => {

        leaveTable.innerHTML += `
            <tr>
                <td>${leave.leaveType}</td>
                <td>${new Date(leave.fromDate).toLocaleDateString()}</td>
                <td>${new Date(leave.toDate).toLocaleDateString()}</td>
                <td class="${leave.status.toLowerCase()}">${leave.status}</td>
            </tr>
        `;

    });

}

applyLeaveBtn.addEventListener("click", async () => {

    if (
        !leaveType.value ||
        !fromDate.value ||
        !toDate.value ||
        !reason.value.trim()
    ) {
        alert("Please fill all fields.");
        return;
    }

    const result = await api("/leaves", "POST", {
        leaveType: leaveType.value,
        fromDate: fromDate.value,
        toDate: toDate.value,
        reason: reason.value.trim()
    });

    alert(result.message);

    if (result.success) {

        leaveType.selectedIndex = 0;
        fromDate.value = "";
        toDate.value = "";
        reason.value = "";

        loadLeaves();

    }

});

logoutBtn.addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "login.html";

});

loadLeaves();