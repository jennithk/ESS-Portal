const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const welcomeText = document.getElementById("welcomeText");
const profileImage = document.getElementById("profileImage");

const attendanceValue = document.getElementById("attendanceValue");
const leaveValue = document.getElementById("leaveValue");
const salaryValue = document.getElementById("salaryValue");
const performanceValue = document.getElementById("performanceValue");

const activityList = document.getElementById("activityList");
const announcementList = document.getElementById("announcementList");

const logoutBtn = document.getElementById("logoutBtn");

async function loadDashboard() {

    try {

        const result = await getDashboard();

        const employee = result.dashboard.employee;
        const stats = result.dashboard.stats;

        welcomeText.textContent =
            `Welcome, ${employee.firstName} ${employee.lastName}`;

        profileImage.src =
            `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.firstName + " " + employee.lastName)}&background=2563eb&color=ffffff&size=128`;

        attendanceValue.textContent = `${stats.attendance}%`;
        leaveValue.textContent = `${stats.leaveBalance} Days`;
        salaryValue.textContent = `₹${stats.salary.toLocaleString()}`;
        performanceValue.textContent = stats.performance;

        activityList.innerHTML = "";

        result.dashboard.recentActivities.forEach(activity => {

            const li = document.createElement("li");

            li.textContent = `✔ ${activity.title}`;

            activityList.appendChild(li);

        });

        announcementList.innerHTML = "";

        result.dashboard.announcements.forEach(item => {

            const div = document.createElement("div");

            div.innerHTML = `
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            `;

            announcementList.appendChild(div);

        });

    } catch (error) {

        alert(error.message);

        localStorage.clear();

        window.location.href = "login.html";

    }

}

logoutBtn.addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "login.html";

});

loadDashboard();