const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const trainingForm = document.getElementById("trainingForm");
const trainingTable = document.getElementById("trainingTable");
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

async function loadTraining() {

    const result = await api("/hr/training");

    trainingTable.innerHTML = "";

    if (!result.success) {

        trainingTable.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">
                    ${result.message}
                </td>
            </tr>
        `;

        return;

    }

    if (result.trainings.length === 0) {

        trainingTable.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">
                    No Training Records Found
                </td>
            </tr>
        `;

        return;

    }

    result.trainings.forEach(training => {

        const employeeName = training.employee
            ? `${training.employee.firstName} ${training.employee.lastName}`
            : "Unknown";

        trainingTable.innerHTML += `
            <tr>
                <td>${employeeName}</td>
                <td>${training.title}</td>
                <td>${training.trainer}</td>
                <td>${new Date(training.trainingDate).toLocaleDateString()}</td>
            </tr>
        `;

    });

}

trainingForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const payload = {
        employee: document.getElementById("employeeId").value.trim(),
        title: document.getElementById("title").value.trim(),
        trainer: document.getElementById("trainer").value.trim(),
        trainingDate: document.getElementById("trainingDate").value,
        description: document.getElementById("description").value.trim()
    };

    const result = await api("/hr/training", "POST", payload);

    if (result.success) {

        alert("Training Assigned Successfully");

        trainingForm.reset();

        loadTraining();

    } else {

        alert(result.message);

    }

});

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

});

loadTraining();