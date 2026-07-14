const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const notificationList = document.getElementById("notificationList");
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

    if (!result.success) {
        alert(result.message);
        return;
    }

    notificationList.innerHTML = "";

    if (result.notifications.length === 0) {

        notificationList.innerHTML = `
            <div class="notification-card">
                <h3>No Notifications</h3>
                <p>You don't have any notifications.</p>
            </div>
        `;

        return;

    }

    result.notifications.forEach(notification => {

        notificationList.innerHTML += `
            <div class="notification-card ${notification.isRead ? "read" : "unread"}">
                <h3>${notification.title}</h3>
                <p>${notification.message}</p>
                <small>${new Date(notification.createdAt).toLocaleString()}</small>
            </div>
        `;

    });

}

logoutBtn.addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "login.html";

});

loadNotifications();