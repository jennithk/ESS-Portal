const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const notificationForm = document.getElementById("notificationForm");
const notificationTable = document.getElementById("notificationTable");
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

async function loadNotifications() {

    const result = await api("/notifications");

    notificationTable.innerHTML = "";

    if (!result.success) {

        notificationTable.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;">
                    ${result.message}
                </td>
            </tr>
        `;

        return;

    }

    if (result.notifications.length === 0) {

        notificationTable.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;">
                    No Notifications Found
                </td>
            </tr>
        `;

        return;

    }

    result.notifications.forEach(notification => {

        notificationTable.innerHTML += `
            <tr>
                <td>${notification.title}</td>
                <td>${notification.message}</td>
                <td>${new Date(notification.createdAt).toLocaleDateString()}</td>
            </tr>
        `;

    });

}

notificationForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const payload = {
        title: document.getElementById("title").value.trim(),
        message: document.getElementById("message").value.trim()
    };

    const result = await api("/notifications", "POST", payload);

    if (result.success) {

        alert("Notification Sent Successfully");

        notificationForm.reset();

        loadNotifications();

    } else {

        alert(result.message);

    }

});

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

});

loadNotifications();