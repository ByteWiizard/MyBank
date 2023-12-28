import { myBank } from "../../declarations/myBank";

window.addEventListener("load", async function () {
  const currentAmount = await myBank.checkBalance();
  document.getElementById("value").innerText = currentAmount;
})


document.querySelector("form").addEventListener("submit", async function (event) {

  event.preventDefault();

  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById('input-amount').value);
  const outputAmount = parseFloat(document.getElementById('withdrawal-amount').value);

  button.setAttribute("disabled", true);
  try {
    if (inputAmount > 0) {
      await myBank.topUp(inputAmount);
    }
    if (outputAmount > 0) {
      await myBank.withdrawl(outputAmount);
    }
    await myBank.compound();
  } catch (error) {
    console.error('An error occurred:', error);
  }

  update();

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  button.removeAttribute("disabled");
});

async function update() {

  const currentAmount = await myBank.checkBalance();
  console.log(currentAmount);
  document.getElementById("value").innerHTML = Math.round(currentAmount * 100) / 200;
}