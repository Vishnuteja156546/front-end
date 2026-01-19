/* ===============================
   HELPERS (MUST COME FIRST)
================================ */
const $ = id => document.getElementById(id);
const $$ = q => document.querySelectorAll(q);

/* ===============================
   STATE & STORAGE
================================ */
const KEY = "tripDashboardV2";

let state = JSON.parse(localStorage.getItem(KEY)) || {
  setup: {
    members: 4,
    distance: 520,
    mileage: 40,
    fuelPrice: 105,
    bikes: 2,
    stay: 900,
    food: 300,
    entry: 400,
    nights: 2
  },
  checks: {},
  expenses: [],
  notes: ""
};

/* ===============================
   SAVE
================================ */
function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

/* ===============================
   NAVIGATION (BOTTOM TABS)
================================ */
$$(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    $$(".tab").forEach(t => t.classList.remove("tab--active"));
    tab.classList.add("tab--active");

    $$(".screen").forEach(s => s.classList.remove("screen--active"));
    $(tab.dataset.target).classList.add("screen--active");
  });
});

/* ===============================
   SETUP MODAL
================================ */
function openSetup() {
  $("setupModal").classList.add("modal--open");
}
function closeSetup() {
  $("setupModal").classList.remove("modal--open");
}

$("btnOpenSetup").onclick = openSetup;
$("btnOpenSetup2").onclick = openSetup;
$("btnCloseSetup").onclick = closeSetup;

/* Members dropdown → auto bikes */
$("membersInput").addEventListener("change", () => {
  const m = +$("membersInput").value;
  $("bikesInput").value = Math.ceil(m / 2);
});

/* Save setup */
$("btnSaveSetup").onclick = () => {
  state.setup.members = +$("membersInput").value;
  state.setup.distance = +$("distanceInput").value;
  state.setup.mileage = +$("mileageInput").value;
  state.setup.fuelPrice = +$("fuelPriceInput").value;
  state.setup.bikes = +$("bikesInput").value;
  state.setup.stay = +$("stayPerRoomNightInput").value;
  state.setup.food = +$("foodPerPersonDayInput").value;
  state.setup.entry = +$("entryPerPersonInput").value;
  state.setup.nights = +$("nightsInput").value;

  save();
  renderBudget();
  renderExpenses();
  closeSetup();
};

/* ===============================
   BUDGET
================================ */
function renderBudget() {
  const s = state.setup;

  const fuel = (s.distance / s.mileage) * s.fuelPrice * s.bikes;
  const rooms = Math.ceil(s.members / 2);
  const stay = rooms * s.stay * s.nights;
  const food = s.members * s.food * 3;
  const entry = s.members * s.entry;
  const total = fuel + stay + food + entry;

  $("kMembers").textContent = s.members;
  $("kBikes").textContent = s.bikes;
  $("kRooms").textContent = rooms;

  $("kFuelTotal").textContent = Math.round(fuel);
  $("kStayTotal").textContent = Math.round(stay);
  $("kFoodTotal").textContent = Math.round(food);
  $("kEntryTotal").textContent = Math.round(entry);
  $("kGroupTotal").textContent = Math.round(total);
  $("kPerPerson").textContent = Math.round(total / s.members);
}

/* ===============================
   CHECKLIST & DISTANCE
================================ */
function checklistByDay() {
  return {
    1: ["d1_start", "d1_breakfast", "d1_harangi", "d1_temple", "d1_madikeri", "d1_stay"],
    2: ["d2_leave", "d2_mandalpatti", "d2_checkout", "d2_mysore_reach", "d2_palace", "d2_lake", "d2_stay"],
    3: ["d3_chamundi", "d3_return_start", "d3_reach_blr"]
  };
}

function dayDistances() {
  return { 1: 265, 2: 120, 3: 135 };
}

function renderChecklist() {
  const days = checklistByDay();
  let done = 0;
  let covered = 0;

  Object.entries(days).forEach(([day, ids]) => {
    let checkedCount = 0;

    ids.forEach(id => {
      const cb = document.querySelector(`[data-id="${id}"]`);
      if (!cb) return;

      cb.checked = !!state.checks[id];
      if (cb.checked) {
        done++;
        checkedCount++;
      }

      cb.onchange = () => {
        state.checks[id] = cb.checked;
        save();
        renderChecklist();
      };
    });

    const pct = Math.round((checkedCount / ids.length) * 100);
    $(`day${day}Bar`).style.width = pct + "%";
    $(`day${day}Pct`).textContent = pct + "%";

    if (checkedCount === ids.length) {
      covered += dayDistances()[day];
    }
  });

  $("doneCount").textContent = done;
  $("totalCount").textContent = Object.values(days).flat().length;
  $("overallBar").style.width =
    Math.round((done / $("totalCount").textContent) * 100) + "%";

  $("distCovered").textContent = covered;
  $("distRemain").textContent = state.setup.distance - covered;
}

/* ===============================
   EXPENSES & SPLIT
================================ */
function renderPaidBy() {
  $("expPaidBy").innerHTML = "";
  for (let i = 1; i <= state.setup.members; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = "Person " + i;
    $("expPaidBy").appendChild(opt);
  }
}

function renderExpenses() {
  let total = 0;
  $("expenseList").innerHTML = "";

  state.expenses.forEach(e => {
    total += e.amount;
    const div = document.createElement("div");
    div.textContent = `${e.category}: ₹${e.amount}`;
    $("expenseList").appendChild(div);
  });

  $("spentTotal").textContent = total;
  $("spentPerPerson").textContent = Math.round(total / state.setup.members);

  renderSettlement();
}

$("btnAddExpense").onclick = () => {
  const amt = +$("expAmount").value;
  if (!amt) return;

  state.expenses.push({
    category: $("expCategory").value,
    amount: amt,
    paidBy: +$("expPaidBy").value
  });

  $("expAmount").value = "";
  save();
  renderExpenses();
};

$("btnClearExpenses").onclick = () => {
  state.expenses = [];
  save();
  renderExpenses();
};

function renderSettlement() {
  const paid = Array(state.setup.members).fill(0);

  state.expenses.forEach(e => {
    paid[e.paidBy - 1] += e.amount;
  });

  const total = paid.reduce((a, b) => a + b, 0);
  const share = total / state.setup.members;

  $("settlementBox").innerHTML = "";
  paid.forEach((amt, i) => {
    const div = document.createElement("div");
    const diff = Math.round(amt - share);
    div.textContent =
      diff >= 0
        ? `Person ${i + 1} gets ₹${diff}`
        : `Person ${i + 1} pays ₹${Math.abs(diff)}`;
    $("settlementBox").appendChild(div);
  });
}

/* ===============================
   NOTES
================================ */
$("tripNotes").value = state.notes;
$("tripNotes").oninput = e => {
  state.notes = e.target.value;
  save();
};

/* ===============================
   RESET
================================ */
$("btnReset").onclick = () => {
  if (confirm("Reset entire trip?")) {
    localStorage.removeItem(KEY);
    location.reload();
  }
};

/* ===============================
   INIT
================================ */
renderBudget();
renderChecklist();
renderPaidBy();
renderExpenses();
$("bikesInput").value = state.setup.bikes;
$("membersInput").value = state.setup.members;
$("distanceInput").value = state.setup.distance;
$("mileageInput").value = state.setup.mileage;
$("fuelPriceInput").value = state.setup.fuelPrice;
$("stayPerRoomNightInput").value = state.setup.stay;
$("foodPerPersonDayInput").value = state.setup.food;
$("entryPerPersonInput").value = state.setup.entry;
$("nightsInput").value = state.setup.nights;

