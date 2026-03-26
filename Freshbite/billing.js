const qtyInputs = document.querySelectorAll('.qty');
const totalAmount = document.getElementById('totalAmount');

function updateBill() {
    let total = 0;

    qtyInputs.forEach(input => {
        const row = input.parentElement.parentElement;
        const price = parseInt(row.querySelector('[data-price]').dataset.price);
        const quantity = parseInt(input.value);
        const subtotalCell = row.querySelector('.subtotal');

        const subtotal = price * quantity;
        subtotalCell.textContent = `₱${subtotal}`;
        total += subtotal;
    });

    totalAmount.textContent = `₱${total}`;
}

qtyInputs.forEach(input => {
    input.addEventListener('input', updateBill);
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
    alert(`Thank you! Your total bill is ${totalAmount.textContent}`);
});