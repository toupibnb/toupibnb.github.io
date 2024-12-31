let orderCode = 0;
function adjustQuantity(action, index) {
    const toupi = JSON.parse(localStorage.getItem('toupi')) || [];
    let quantity = toupi[index].quantity || 1;
    if (action === 'increase') {
        quantity++;
    } else if (action === 'decrease' && quantity > 1) {
        quantity--;
    }
    toupi[index].quantity = quantity; 
    localStorage.setItem('toupi', JSON.stringify(toupi)); 
    rendertoupi(); 
}

function updateSubtotal() {
    let subtotal = 0;
    const toupiItems = document.querySelectorAll('.cart-item');
    
    toupiItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity').textContent);
        const price = parseFloat(item.querySelector('.item-total-price').textContent.replace(' VND', '').replace(',', ''));
        subtotal += quantity * price;
    });
    
    document.getElementById('subtotal').textContent = subtotal.toLocaleString();
}

function toggleOtherAddress(select) {
    var otherAddressInput = document.getElementById('other-address');
    if (select.value === 'other') {
        otherAddressInput.style.display = 'block';
        otherAddressInput.required = true;
    } else {
        otherAddressInput.style.display = 'none';
        otherAddressInput.required = false;
    }
}

function rendertoupi() {
    const toupi = JSON.parse(localStorage.getItem('toupi')) || [];
    const toupiItemsContainer = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const cartGifts = document.getElementById('cartGifts');

    let subtotal = 0;
    let cookiesCount = 0;
    let braceletsCount = 0;
    let braceletsTotalPrice = 0;
    let spiderVerseCount = 0;
    toupi.forEach(item => {
        const quantity = item.quantity || 1;
        const itemPrice = parseInt(item.price.replace(/\D/g, ''));
        

        if (item.style) {
            cookiesCount += quantity;
        } else {
            braceletsCount += quantity;
            braceletsTotalPrice = braceletsTotalPrice + itemPrice * quantity;
        }
        if (item.name.includes('across the spider verse')) {
            spiderVerseCount += quantity;
        }
    });

    toupiItemsContainer.innerHTML = '';
    toupi.forEach((item, index) => {
        const quantity = item.quantity || 1;
        const itemPrice = parseInt(item.price.replace(/\D/g, ''));
        let totalItemPrice = itemPrice * quantity;

        let itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
        <div class="item-details">
            <span class="trash-icon" onclick="removeItem(${index})">&#128465;</span>
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div>
            <p class="item-name">${item.name}</p>
            <p class="item-price-quantity">
                <button class="btn btn-secondary btn-sm adjust-quantity" onclick="adjustQuantity('decrease', ${index})">-</button>
                <span class="quantity">${quantity}</span>
                <button class="btn btn-secondary btn-sm adjust-quantity" onclick="adjustQuantity('increase', ${index})">+</button>
            </p>
            </div>
        </div>
        `;
        if (item.name.includes('across the spider verse') && spiderVerseCount >= 2) {
            let discountedPrice = 32000 * quantity;
            itemDiv.innerHTML += `
            <div class="gift-price-tag">
                <p class="item-total-price" style="margin-bottom: 0"><a style="text-decoration: line-through;">${totalItemPrice.toLocaleString()}</a> VND</p>
                <p style="margin-bottom: none;"> <a>${discountedPrice.toLocaleString()}</a> VND </p>
            </div>
            `;
            totalItemPrice = discountedPrice;
        } else {
            itemDiv.innerHTML += `<p class="item-total-price">${totalItemPrice.toLocaleString()} VND</p>`;
        }
        toupiItemsContainer.appendChild(itemDiv);
        subtotal += totalItemPrice;
    });
    const total = subtotal;
    console.log('Total:', total);

    cartGifts.innerHTML = '';
    let giftDiv = document.createElement('div');
    let GiftText;
    if (braceletsTotalPrice < 50000) GiftText = document.createElement('p');
    else {
        GiftText = document.createElement('h2');
        GiftText.style.fontSize = '20px';
    }
    GiftText.textContent = braceletsTotalPrice >= 50000 ? `sốp tặng bạng nèe` : `chỉ cần thêm ${(50000 - braceletsTotalPrice)/1000}k nữa là bạn sẽ nhận được một sốp tặng bạng nèe`;
    if (braceletsTotalPrice >= 50000) {
        giftDiv.classList.add('cart-item');
        giftDiv.innerHTML = `
            <div class="item-details">
                <img src="images/gift/product01/1.jpg" alt="Dango Key" class="item-image">
                <div>
                    <p class="item-name">Dango Key</p>
                </div>
            </div>
            <div class = "gift-price-tag">
                <p class="item-total-price" style="margin-bottom: 0"><a style="text-decoration: line-through;"> 10,000 </a> VND</p>
                <p style="margin-bottom: none;"> <a> 0 </a>  VND </p>
            </div>
            
        `;
        cartGifts.appendChild(GiftText);
        cartGifts.appendChild(giftDiv);
    } else cartGifts.appendChild(GiftText);

    subtotalElement.textContent = `${total.toLocaleString()} VND`;
}

function generateUniqueOrderCode() {
    const now = new Date();
    //const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    //const minutes = String(now.getMinutes()).padStart(2, '0');
    //const seconds = String(now.getSeconds()).padStart(2, '0');
    const randomValue = String(Math.floor(Math.random() * 100)).padStart(2, '0');
    return `${month}${day}-${hours}${randomValue}`;
}

function toggleOtherAddress(select) {
    const otherAddress = document.getElementById('other-address');
    otherAddress.style.display = select.value === 'other' ? 'block' : 'none';
}

function showModal(elementId) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById(elementId).style.display = 'block';
}

function hideModal(elementId) {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById(elementId).style.display = 'none';
}

async function validateForm(event) {
    event.preventDefault();

    const form = document.getElementById('checkout-form');
    if (form.checkValidity()) {
        showModal('loading');
        await new Promise(resolve => setTimeout(resolve, 2000));

        hideModal('loading');
        showModal('success');
        await new Promise(resolve => setTimeout(resolve, 2000));

        hideModal('success');
        document.getElementById('orderCodeValue').textContent = orderCode;
        showModal('orderCodeModal');
    } else {
        form.reportValidity();
    }
}

document.getElementById('checkout-form').addEventListener('submit', validateForm);
document.getElementById('closeModal').addEventListener('click', () => hideModal('orderCodeModal'));

window.addEventListener('DOMContentLoaded', () => {
    rendertoupi();

    const checkoutForm = document.getElementById('checkout-form');

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        orderCode = generateUniqueOrderCode();

        const fullName = document.getElementById('billing-name').value;
        const address = document.getElementById('billing-address').value;
        const zip = document.getElementById('billing-number').value;
        const otheraddress = document.getElementById('other-address').value;

        const toupi = JSON.parse(localStorage.getItem('toupi')) || [];
        let subtotal = 0;
        let cookiesCount = 0;
        let braceletsCount = 0;
        toupi.forEach(item => {
            const quantity = item.quantity || 1;
            const itemPrice = parseInt(item.price.replace(/\D/g, ''));
            subtotal += itemPrice * quantity;
            if (item.style) {
                cookiesCount += quantity;
            } else {
                braceletsCount += quantity;
            }
        });
        let discount = 0;
        while (braceletsCount >= 2) {
            discount += 5000;
            braceletsCount -= 2;
        }
        while (cookiesCount >= 3) {
            discount += 5000;
            cookiesCount -= 3;
        }
        subtotal -= discount;

        const orderData = {
            fullName: orderCode,
            email: fullName,
            address: address + (otheraddress ? ` - ${otheraddress}` : ''),
            city: ' - ',
            zip: zip,
            cartItems: toupi.map((item, index) => `${item.name} - ${item.quantity}`).join(', '),
            subtotal: subtotal
        };

        console.log('Order data:', orderData);

        const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbxOxB3-Zdt8GKdcjMBs1A2IoPEClKI4vuCgJol8P6c8pKt9kfo7FYVCKiNk92RjhI4x0Q/exec';
        fetch(googleAppsScriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
            mode: 'no-cors'
        })
            .then(() => {
                console.log('Order submitted successfully');

                localStorage.removeItem('toupi');
                document.getElementById('cartItems').innerHTML = '';
                document.getElementById('subtotal').textContent = '0 VND';
                document.getElementById('discountCombos').innerHTML = '';
                checkoutForm.reset();
            })
            .catch(error => {
                console.error('Error submitting order:', error);
                alert('There was an error processing your order. Please try again.');
            });
    });

});

function removeItem(index) {
    const toupi = JSON.parse(localStorage.getItem('toupi')) || [];
    toupi.splice(index, 1);
    localStorage.setItem('toupi', JSON.stringify(toupi));
    rendertoupi();
}
