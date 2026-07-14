const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const payrollForm = document.getElementById("payrollForm");
const payrollTable = document.getElementById("payrollTable");
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

async function loadPayrolls() {

    const result = await api("/hr/payroll");

    payrollTable.innerHTML = "";

    if (!result.success) {

        payrollTable.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">
                    ${result.message}
                </td>
            </tr>
        `;

        return;

    }

    if (result.payrolls.length === 0) {

        payrollTable.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">
                    No Payroll Records Found
                </td>
            </tr>
        `;

        return;

    }

    result.payrolls.forEach(payroll => {

        const employeeName = payroll.employee
            ? `${payroll.employee.firstName} ${payroll.employee.lastName}`
            : "Unknown";

        payrollTable.innerHTML += `
            <tr>
                <td>${employeeName}</td>
                <td>${payroll.month}</td>
                <td>${payroll.year}</td>
                <td>₹${Number(payroll.netSalary).toLocaleString()}</td>
            </tr>
        `;

    });

}

payrollForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const payload = {
        employee: document.getElementById("employeeId").value.trim(),
        month: document.getElementById("month").value.trim(),
        year: document.getElementById("year").value,
        basicSalary: Number(document.getElementById("basicSalary").value),
        hra: Number(document.getElementById("hra").value || 0),
        bonus: Number(document.getElementById("bonus").value || 0),
        deductions: Number(document.getElementById("deductions").value || 0)
    };

    const result = await api("/hr/payroll", "POST", payload);

    if (result.success) {

        alert("Payroll Generated Successfully");

        payrollForm.reset();

        loadPayrolls();

    } else {

        alert(result.message);

    }

});

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

});

loadPayrolls();