const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

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

    const result = await api("/performance");

    if (!result.success) {
        alert(result.message);
        return;
    }

    performanceTable.innerHTML = "";

    if (result.performances.length === 0) {

        performanceTable.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No performance reviews available.
                </td>
            </tr>
        `;

        return;
    }

    result.performances.forEach(item => {

        performanceTable.innerHTML += `
            <tr>
                <td>${item.reviewPeriod}</td>
                <td class="rating">${item.rating}/5</td>
                <td>${item.goalsCompleted}</td>
                <td>${item.reviewer}</td>
                <td>${item.feedback}</td>
            </tr>
        `;

    });

}

logoutBtn.addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "login.html";

});

loadPerformance();