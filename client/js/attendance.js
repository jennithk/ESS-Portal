const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const tableBody = document.getElementById("attendanceTable");
const checkInBtn = document.getElementById("checkInBtn");
const checkOutBtn = document.getElementById("checkOutBtn");
const logoutBtn = document.getElementById("logoutBtn");

async function api(endpoint, method = "GET") {

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    return await response.json();

}

async function loadAttendance() {

    const result = await api("/attendance");

    if (!result.success) {

        alert(result.message);

        return;

    }

    tableBody.innerHTML = "";

    result.attendance.forEach(record => {

        tableBody.innerHTML += `
            <tr>
                <td>${record.date}</td>
                <td>${record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : "-"}</td>
                <td>${record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : "-"}</td>
                <td>${record.workingHours}</td>
                <td class="${record.status.toLowerCase()}">${record.status}</td>
            </tr>
        `;

    });

}

checkInBtn.addEventListener("click", async () => {

    const result = await api("/attendance/checkin", "POST");

    alert(result.message);

    loadAttendance();

});

checkOutBtn.addEventListener("click", async () => {

    const result = await api("/attendance/checkout", "POST");

    alert(result.message);

    loadAttendance();

});

logoutBtn.addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "login.html";

});

loadAttendance();