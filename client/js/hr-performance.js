const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const performanceForm = document.getElementById("performanceForm");
const performanceTable = document.getElementById("performanceTable");
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

async function loadPerformance() {

    const result = await api("/hr/performance");

    performanceTable.innerHTML = "";

    if (!result.success) {

        performanceTable.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    ${result.message}
                </td>
            </tr>
        `;

        return;

    }

    if (result.performances.length === 0) {

        performanceTable.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No Performance Records Found
                </td>
            </tr>
        `;

        return;

    }

    result.performances.forEach(record => {

        const employeeName = record.employee
            ? `${record.employee.firstName} ${record.employee.lastName}`
            : "Unknown";

        performanceTable.innerHTML += `
            <tr>
                <td>${employeeName}</td>
                <td>${record.reviewPeriod}</td>
                <td>${record.rating}/5</td>
                <td>${record.goalsCompleted}</td>
                <td>${record.reviewer}</td>
            </tr>
        `;

    });

}

performanceForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const payload = {
        employee: document.getElementById("employeeId").value.trim(),
        reviewPeriod: document.getElementById("reviewPeriod").value.trim(),
        rating: Number(document.getElementById("rating").value),
        goalsCompleted: Number(document.getElementById("goalsCompleted").value),
        feedback: document.getElementById("feedback").value.trim(),
        reviewer: document.getElementById("reviewer").value.trim()
    };

    const result = await api("/hr/performance", "POST", payload);

    if (result.success) {

        alert("Performance Saved Successfully");

        performanceForm.reset();

        loadPerformance();

    } else {

        alert(result.message);

    }

});

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

});

loadPerformance();