document.getElementById("expenseform").addEventListener("submit", function (e) {
    e.preventDefault();
    let category = document.getElementById("category").value;
    let amount = document.getElementById("amount").value;
    let date = document.getElementById("date").value;
    let description = document.getElementById("description").value;

    let expensedata = new FormData();
    expensedata.append("category", category);
    expensedata.append("amount", amount);
    expensedata.append("date", date);
    expensedata.append("description", description);

    fetch("process.php", {
        method: "POST",
        body: expensedata,
    })
        .then((response) => response.text())
        .then((data) => {
            alert(data);
            location.reload();
        });
});

function loadExpenses() {
    fetch("fetch.php")
        .then((response) => response.json())
        .then((data) => {
            let table = document.getElementById("expensetable");
            table.innerHTML = "";
            let total = 0;

            data.forEach((expense) => {
                total += parseFloat(expense.amount);
                table.innerHTML += `
                    <tr>
                        <td>${expense.category}</td>
                        <td>${expense.amount}</td>
                        <td>${expense.date}</td>
                        <td>${expense.description}</td>
                        <td><button class="btn btn-danger" onclick="deleteExpense(${expense.id})">Delete</button></td>
                    </tr>
                `;
            });
            document.getElementById("TotalExpense").innerText = total;
        });
}

function deleteExpense(id) {
    fetch(`process.php?delete=${id}`)
        .then((response) => response.text())
        .then((data) => {
            alert(data);
            location.reload();
        });
}

loadExpenses();