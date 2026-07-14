const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const employeeTable = document.getElementById("employeeTable");
const employeeCount = document.getElementById("employeeCount");
const departmentCount = document.getElementById("departmentCount");
const pendingLeaves = document.getElementById("pendingLeaves");
const payrollCount = document.getElementById("payrollCount");
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

async function loadDashboard() {

    employeeTable.innerHTML = "";

    const employeeResult = await api("/hr/employees");
    const leaveResult = await api("/hr/leaves");
    const payrollResult = await api("/hr/payroll");

    if (!employeeResult.success) {
        alert(employeeResult.message);
        return;
    }

    employeeCount.innerText = employeeResult.employees.length;

    const departments = new Set();

    employeeResult.employees.forEach(employee => {

        if (employee.department) {
            departments.add(employee.department);
        }

        employeeTable.innerHTML += `
            <tr>
                <td>${employee.employeeId || "-"}</td>
                <td>${employee.firstName} ${employee.lastName}</td>
                <td>${employee.email}</td>
                <td>${employee.department || "-"}</td>
                <td>${employee.designation || "-"}</td>
                <td class="${employee.status === "Inactive" ? "inactive-status" : "active-status"}">
                    ${employee.status || "Active"}
                </td>
            </tr>
        `;

    });

    departmentCount.innerText = departments.size;

    if (leaveResult.success) {

        const pending = leaveResult.leaves.filter(
            leave => leave.status === "Pending"
        );

        pendingLeaves.innerText = pending.length;

    } else {

        pendingLeaves.innerText = "0";

    }

    if (payrollResult.success) {

        payrollCount.innerText = payrollResult.payrolls.length;

    } else {

        payrollCount.innerText = "0";

    }

}

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

});

loadDashboard();