const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

const profileImage = document.getElementById("profileImage");
const userPhoto = document.getElementById("userPhoto");

const fullName = document.getElementById("fullName");
const designation = document.getElementById("designation");

const employeeId = document.getElementById("employeeId");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const department = document.getElementById("department");
const role = document.getElementById("role");
const status = document.getElementById("status");
const joiningDate = document.getElementById("joiningDate");

const logoutBtn = document.getElementById("logoutBtn");

async function loadProfile() {

    try {

        const result = await getProfile();

        if (!result.success) {

            alert(result.message);

            localStorage.clear();

            window.location.href = "login.html";

            return;

        }

        const user = result.user;

        const avatar =
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName + " " + user.lastName)}&background=2563eb&color=ffffff&size=200`;

        profileImage.src = avatar;
        userPhoto.src = avatar;

        fullName.textContent =
            `${user.firstName} ${user.lastName}`;

        designation.textContent = user.designation;

        employeeId.textContent = user.employeeId;
        email.textContent = user.email;
        phone.textContent = user.phone || "-";
        department.textContent = user.department || "-";
        role.textContent = user.role;
        status.textContent = user.status;
        joiningDate.textContent =
            new Date(user.joiningDate).toLocaleDateString();

    } catch (error) {

        alert(error.message);

    }

}

logoutBtn.addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "login.html";

});

document.getElementById("editProfileBtn").addEventListener("click", () => {

    alert("Edit Profile module will be implemented next.");

});

loadProfile();