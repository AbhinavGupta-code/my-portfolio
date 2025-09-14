const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// DOM references
const fromSelect = document.querySelector("#from-currency");
const toSelect = document.querySelector("#to-currency");
const fromFlag = document.querySelector("#from-flag");
const toFlag = document.querySelector("#to-flag");
const msg = document.querySelector(".conversion-msg");
const form = document.querySelector("#converter-form");
const amountInput = document.querySelector("#amount");
const switchIcon = document.querySelector(".switch-icon");

// Populate dropdowns
for (const code in countryList) {
  const opt1 = new Option(code, code);
  const opt2 = new Option(code, code);
  if (code === "USD") opt1.selected = true;
  if (code === "INR") opt2.selected = true;
  fromSelect.add(opt1);
  toSelect.add(opt2);
}

// Update flags based on selection
function updateFlag(selectEl, imgEl) {
  imgEl.src = `https://flagsapi.com/${countryList[selectEl.value]}/flat/64.png`;
}
fromSelect.addEventListener("change", () => updateFlag(fromSelect, fromFlag));
toSelect.addEventListener("change", () => updateFlag(toSelect, toFlag));

// Swap functionality
switchIcon.addEventListener("click", () => {
  [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
  updateFlag(fromSelect, fromFlag);
  updateFlag(toSelect, toFlag);
});

// Fetch rate and display result
async function fetchExchangeRate() {
  const from = fromSelect.value.toLowerCase();
  const to = toSelect.value.toLowerCase();
  const amount = parseFloat(amountInput.value) || 1;
  const url = `${BASE_URL}/${from}.json`;

  msg.textContent = "Fetching exchange rate...";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const rate = data[from][to]; // Grab rate from nested JSON
    if (typeof rate !== "number") throw new Error("Rate not found");

    msg.innerText = `${amount} ${fromSelect.value} = ${(amount * rate).toFixed(2)} ${toSelect.value}`;
  } catch (err) {
    console.error("Fetch error:", err);
    msg.innerText = "Failed to fetch exchange rate. Please try again later.";
  }
}

// Prevent default form behavior & trigger conversion
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchExchangeRate();
});

// Initialize on page load
window.addEventListener("load", () => {
  updateFlag(fromSelect, fromFlag);
  updateFlag(toSelect, toFlag);
  fetchExchangeRate();
});
