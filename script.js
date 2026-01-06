const planList = document.getElementById("planList");
const timeInput = document.getElementById("time");
const taskInput = document.getElementById("task");

let plans = JSON.parse(localStorage.getItem("plans")) || [];

function savePlans() {
  localStorage.setItem("plans", JSON.stringify(plans));
}

function renderPlans() {
  planList.innerHTML = "";
  plans
    .sort((a, b) => a.time.localeCompare(b.time))
    .forEach((plan, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="time">${plan.time}</span>
        <span>${plan.task}</span>
        <button onclick="deletePlan(${index})">X</button>
      `;
      planList.appendChild(li);
    });
}

function addPlan() {
  const time = timeInput.value;
  const task = taskInput.value.trim();
  if (!time || !task) return;

  plans.push({ time, task });
  timeInput.value = "";
  taskInput.value = "";

  savePlans();
  renderPlans();
}

function deletePlan(index) {
  plans.splice(index, 1);
  savePlans();
  renderPlans();
}

renderPlans();
