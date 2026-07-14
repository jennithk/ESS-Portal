const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const loginData = {

            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value

        };

        try {

            const result = await loginUser(loginData);

            if (!result.success) {

                alert(result.message);
                return;

            }

            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));

            alert(result.message);

            switch (result.user.role) {

                case "Admin":
                    window.location.href = "admin-dashboard.html";
                    break;

                case "HR":
                    window.location.href = "hr-dashboard.html";
                    break;

                default:
                    window.location.href = "dashboard.html";
                    break;

            }

        } catch (error) {

            console.error(error);
            alert("Unable to connect to server.");

        }

    });

}

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const registerData = {

            employeeId: document.getElementById("employeeId").value.trim(),
            firstName: document.getElementById("firstName").value.trim(),
            lastName: document.getElementById("lastName").value.trim(),
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value,
            phone: document.getElementById("phone").value.trim(),
            department: document.getElementById("department").value.trim(),
            designation: document.getElementById("designation").value.trim(),
            role: document.getElementById("role").value

        };

        try {

            const result = await registerUser(registerData);

            if (result.success) {

                alert(result.message);
                window.location.href = "login.html";

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.error(error);
            alert("Unable to connect to server.");

        }

    });

}