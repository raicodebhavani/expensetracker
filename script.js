document.getElementById("forms").addEventListener("submit", addExpense);

const expenseArray = JSON.parse(localStorage.getItem("expenseArray")) || [];

function addExpense(e) {
  e.preventDefault();

  //get type,name,date,amount
  let typeEle = document.getElementById("type").value;
  let nameEle = document.getElementById("name").value;
  let dateEle = document.getElementById("dates").value;
  let amountEle = document.getElementById("amount").value;

  if (
    typeEle != "Choose One" &&
    nameEle.length > 0 &&
    dateEle != 0 &&
    amountEle > 0
  ) {
    const expenseEle = {
      typeEle,
      nameEle,
      dateEle,
      amountEle,
      id:
        expenseArray.length > 0
          ? expenseArray[expenseArray.length - 1].id + 1
          : 1,
    };
    expenseArray.push(expenseEle);
    localStorage.setItem("expenseArray", JSON.stringify(expenseArray));
  } else {
    alert("Enter valid type  ");
  }
  document.getElementById("forms").reset();
  showTableData();
}

const showTableData = () => {
  const dataTable = document.getElementById("tableData");
  dataTable.innerHTML = "";
  for (let i = 0; i < expenseArray.length; i++) {
    dataTable.innerHTML += `
    <tr>
        <td class="data">${expenseArray[i].typeEle}</td>
        <td class="data">${expenseArray[i].nameEle}</td>
        <td class="data">${expenseArray[i].dateEle}</td>
        <td class="data">${expenseArray[i].amountEle}</td>
        <td class="data"><a class="deleteOne" onclick=deleteExpenses(${expenseArray[i].id})>Delete</td>
    </tr>`;
  }
};

const deleteExpenses = (id) => {
  for (let i = 0; i < expenseArray.length; i++) {
    if (expenseArray[i].id == id) {
      expenseArray.splice(i, 1);
    }
  }

  localStorage.setItem("expenseArray", JSON.stringify(expenseArray));
  showTableData();
};

showTableData();
