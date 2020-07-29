let startBtn = document.getElementById("start"),
    budgetValue = document.getElementsByClassName("budget-value")[0],
    dayBudgetValue = document.getElementsByClassName("daybudget-value")[0],
    levelValue = document.getElementsByClassName("level-value")[0],
    expensesValue = document.getElementsByClassName("expenses-value")[0],
    optionalExpensesValue = document.getElementsByClassName("optionalexpenses-value")[0],
    incomeValue = document.getElementsByClassName("income-value")[0],
    monthSavingsValue = document.getElementsByClassName("monthsavings-value")[0],
    yearSavingsValue = document.getElementsByClassName("yearsavings-value")[0],

    expensesItem = document.getElementsByClassName("expenses-item"),

    expensesBtn = document.getElementsByTagName("button")[0],
    optionalexpensesBtn = document.getElementsByTagName("button")[1],
    countBtn = document.getElementsByTagName("button")[2],

    optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item"),
    incomeItem = document.querySelector(".choose-income"),
    checkSavings = document.querySelector("#savings"),
    sumValue = document.querySelector(".choose-sum"),
    percentValue = document.querySelector(".choose-percent"),
    yearValue = document.querySelector(".year-value"),
    monthValue = document.querySelector(".month-value"),
    dayValue = document.querySelector(".day-value");


let money, time;

//mainFunction
startBtn.addEventListener('click', function() {
    time = prompt("Введите дату в формате YYYY-MM-DD", '');
    money = +prompt("Ваш бюджет на месяц?", '');

    while(isNaN(money) || money == '' || money == null) {
        money = +prompt("Ваш бюджет на месяц?", '');
    }
    //money
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    //Date
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener("click", function(){
    let sum = 0;
    for ( let i = 0; i < expensesItem.length; i++ ) {
        let Named = expensesItem[i].value,
            Price = expensesItem[++i].value;

        if ( typeof(Named) === 'string' && typeof(Named) != null 
            && typeof(Price) != null && Named != '' 
            && Price != '' && Named.length < 50 ) {
            console.log('done');
            appData.expenses[Named] = Price;
            sum += +Price;
        } else {
            i = i - 1;
        }
    }
    expensesValue.textContent = sum;
});

optionalexpensesBtn.addEventListener("click", function(){
    for ( let i = 0; i < optionalExpensesItem.length; i++ ) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});
countBtn.addEventListener("click", function() {
    if (appData.budget != undefined) {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
    
        if ( appData.moneyPerDay < 100 ) {
            levelValue.textContent = 'Минимальный достаток';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000 ) {
            levelValue.textContent = 'Средний достаток';
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = 'Высокий достаток';
        } else {
            levelValue.textContent = 'ошибка';
        }
    } else {
        dayBudgetValue.textContent = 'Начните расчёт!';
    }
});

incomeItem.addEventListener("input", function() {
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener("click", function(){
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener("input", function() {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;
        
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener("input", function() {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;
        
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: false,
};