const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

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

async function loadPayroll() {

    const result = await api("/payroll");

    if (!result.success) {
        alert(result.message);
        return;
    }

    payrollTable.innerHTML = "";

    if (result.payrolls.length === 0) {

        payrollTable.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center;">
                    No payroll records available.
                </td>
            </tr>
        `;

        return;
    }

    result.payrolls.forEach(payroll => {

        payrollTable.innerHTML += `
            <tr>
                <td>${payroll.month}</td>
                <td>${payroll.year}</td>
                <td>₹${payroll.basicSalary.toLocaleString()}</td>
                <td>₹${payroll.hra.toLocaleString()}</td>
                <td>₹${payroll.bonus.toLocaleString()}</td>
                <td>₹${payroll.deductions.toLocaleString()}</td>
                <td><strong>₹${payroll.netSalary.toLocaleString()}</strong></td>
                <td class="${payroll.status.toLowerCase()}">${payroll.status}</td>
            </tr>
        `;

    });

}

logoutBtn.addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "login.html";

});

loadPayroll();