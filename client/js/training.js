const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

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

    const result = await api("/training");

    if (!result.success) {
        alert(result.message);
        return;
    }

    trainingTable.innerHTML = "";

    if (result.trainings.length === 0) {

        trainingTable.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No training programs assigned.
                </td>
            </tr>
        `;

        return;
    }

    result.trainings.forEach(training => {

        trainingTable.innerHTML += `
            <tr>
                <td>${training.title}</td>
                <td>${training.trainer}</td>
                <td>${new Date(training.date).toLocaleDateString()}</td>
                <td class="${training.status.toLowerCase()}">${training.status}</td>
                <td>${training.description}</td>
            </tr>
        `;

    });

}

logoutBtn.addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "login.html";

});

loadTraining();