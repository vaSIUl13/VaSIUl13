/*BURGER MENU*/
const burger_btn = document.querySelector('.burger-menu');
const header_list = document.querySelector('.header__list');
const header_links = document.querySelectorAll('.header__list a');

burger_btn.addEventListener('click', () => {
    burger_btn.classList.toggle('active');
    header_list.classList.toggle('open');
    document.body.classList.toggle('lock');
});

header_links.forEach(link => {
    link.addEventListener('click', () => {
        burger_btn.classList.remove('active');
        header_list.classList.remove('open');
        document.body.classList.remove('lock');
    });
});

/*CART MODAL*/
const cartLink = document.querySelector('.cart-link');
const cartModal = document.querySelector('.cart-modal');
const cartClose = cartModal?.querySelector('.close');

function openCart() {
    cartModal?.classList.add('open');
    document.body.classList.add('lock');
}

function closeCart() {
    cartModal?.classList.remove('open');
    document.body.classList.remove('lock');
}

cartLink?.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
});

cartClose?.addEventListener('click', () => {
    closeCart();
});

cartModal?.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        closeCart();
    }
});

/*PROFILE MODAL*/
const profileLink = document.querySelector('.header__list-profile');
const profileModal = document.querySelector('.profile-modal');
const profileClose = profileModal?.querySelector('.close');

function openProfile() {
    profileModal?.classList.add('open');
    document.body.classList.add('lock');
}

function closeProfile() {
    profileModal?.classList.remove('open');
    document.body.classList.remove('lock');
}

profileLink?.addEventListener('click', (e) => {
    e.preventDefault();
    openProfile();
});

profileClose?.addEventListener('click', () => {
    closeProfile();
});

profileModal?.addEventListener('click', (e) => {
    if (e.target === profileModal) {
        closeProfile();
    }
});


/* MAIN MENU */
const menuData = {
    burgers: [
        { name: 'Класичний бургер',  price: 150, desc: 'Соковита котлета, свіжі овочі та соус на вибір.', img: '../lab1/img/sub_menu/burgers/classic_burger.jpg' },
        { name: 'Бургер з сиром', price: 170, desc: 'Сир, соковита котлета та соус на вибір.', img: '../lab1/img/sub_menu/burgers/cheese_burger.png' }, 
        { name: 'Бургер з беконом', price: 190, desc: 'Бекон, соковита котлета та соус на вибір.', img: '../lab1/img/sub_menu/burgers/becon_burger.jpeg' }
    ],
    pizza: [   
        { name: 'Маргарита', price: 200, desc: 'Томатний соус, моцарела та базилік.', img: '../lab1/img/sub_menu/pizza/margaritta.webp' },
        { name: 'Пепероні', price: 220, desc: 'Пепероні, томатний соус та моцарела.', img: '../lab1/img/sub_menu/pizza/pepperoni.jpg' },
        { name: 'Гавайська', price: 240, desc: 'Курка, ананаси, томатний соус та моцарела.', img: '../lab1/img/sub_menu/pizza/hawaiian.avif' }
    ],
    rolls: [
        { name: 'Рол Філадельфія', price: 120, desc: 'Класичний рол з рибою та овочами.', img: '../lab1/img/sub_menu/rolls/philadelphia.jpg' },  
        { name: 'Рол з лососем', price: 140, desc: 'Рол з лососем та авокадо.', img: '../lab1/img/sub_menu/rolls/salmon-roll.webp' },
        { name: 'Рол з тунцем', price: 160, desc: 'Рол з тунцем та овочами.', img: '../lab1/img/sub_menu/rolls/tuna-roll.webp' }
    ],
    kebabs: [
        { name: 'Кебаб з куркою', price: 130, desc: 'Соковитий кебаб з куркою та спеціями.', img: '../lab1/img/sub_menu/kebabs/chicken-kebab.jpg' },
        { name: 'Кебаб з яловичиною', price: 150, desc: 'Соковитий кебаб з яловичиною та спеціями.', img: '../lab1/img/sub_menu/kebabs/beef-kebab.webp' },
        { name: 'Кебаб з овочами', price: 110, desc: 'Кебаб з овочами та спеціями.', img: '../lab1/img/sub_menu/kebabs/vegetarian-kebab.webp' }
    ],
    bowls: [
        { name: 'Боул з кіноа', price: 180, desc: 'Боул з кіноа, овочами та соусом на вибір.', img: '../lab1/img/sub_menu/bowls/kinoa-bowl.webp' },
        { name: 'Боул з куркою', price: 200, desc: 'Боул з куркою та овочами.', img: '../lab1/img/sub_menu/bowls/chicken-bowl.jpg' },
        { name: 'Боул з лососем', price: 220, desc: 'Боул з лососем та овочами.', img: '../lab1/img/sub_menu/bowls/salmon-bowl.jpg' }
    ],
    cakes: [
        { name: 'Шоколадний торт', price: 250, desc: 'Солодкий шоколадний торт з кремом.', img: '../lab1/img/sub_menu/cakes/chocolate-cake.avif' },
        { name: 'Ванільний торт', price: 230, desc: 'Солодкий ванільний торт з кремом.', img: '../lab1/img/sub_menu/cakes/vanilla-cake.jpg' },
        { name: 'Фруктовий торт', price: 270, desc: 'Солодкий фруктовий торт з кремом.', img: '../lab1/img/sub_menu/cakes/fruit-cake.jpg' }
    ]
};

const productModal = document.querySelector('.product-modal');
const modalTitle = document.querySelector('.modal-title');
const productGrid = document.querySelector('.product-grid');
const closeProductBtn = productModal.querySelector('.close');

document.querySelectorAll('.card__menu-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        const category = button.getAttribute('data-category');
        modalTitle.innerText = button.parentElement.querySelector('.menu__card-title').innerText;

        productGrid.innerHTML = '';
        menuData[category].forEach(item => {
            productGrid.innerHTML += `
                <div class="product-item">
                    <img src="${item.img}" alt="${item.name}" class="product-img">
                    <h3 class="product-item-title">${item.name}</h3>
                    <p class="product-item-desc">${item.desc}</p>
                    
                    <div class="quantity-selector">
                        <button class="qty-btn minus" onclick="this.nextElementSibling.stepDown()">-</button>
                        <input type="number" class="product-qty" value="1" min="1" max="99">
                        <button class="qty-btn plus" onclick="this.previousElementSibling.stepUp()">+</button>
                    </div>

                    <span class="product-item-price">${item.price} ₴</span>
                    <button class="btn product-item-btn">Додати в кошик</button>
                </div>
            `;
        });

        productModal.classList.add('open');
        document.body.classList.add('lock');
    });
});

closeProductBtn.addEventListener('click', () => {
    productModal.classList.remove('open');
    document.body.classList.remove('lock');
});

productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
        productModal.classList.remove('open');
        document.body.classList.remove('lock');
    }   
});


/* CART */
let cart = [];

const cartBadge = document.querySelector('.cart-count');
const cartItemsList = document.querySelector('.cart-items');

// функція додавання
function addToCart(productName, price, quantity) {
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.count += quantity;
        existingItem.total = existingItem.count * existingItem.price;
    } else {
        const newItem = {
            id: Date.now(),
            name: productName,
            price: price,
            count: quantity,
            total: price * quantity
        };
        cart.push(newItem);
    }

    updateCartBadge();
    updateCartUI();
}

// обробник кліку по кнопці додати
productGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('product-item-btn')) {
        const productCard = e.target.closest('.product-item');
        const productName = productCard.querySelector('.product-item-title').innerText;
        const productPrice = parseInt(productCard.querySelector('.product-item-price').innerText);
        const quantity = parseInt(productCard.querySelector('.product-qty').value);

        addToCart(productName, productPrice, quantity);
        
        // Скидаю назад на 1
        productCard.querySelector('.product-qty').value = 1;
    }
});

// оновлення кружечка з цифрою
function updateCartBadge() {
    const totalCount = cart.reduce((sum, item) => sum + item.count, 0);
    if (cartBadge) {
        cartBadge.innerText = totalCount;
    }
}

// малювання списку всередині модалки кошика
function updateCartUI() {
    if (!cartItemsList) return;
    
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li style="text-align:center; padding:20px;">Кошик порожній</li>';
        return;
    }

    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item-row';
        li.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-details">${item.count} шт. x ${item.price} ₴</span>
            </div>
            <span class="cart-item-total">${item.total} ₴</span>
            <button class="remove-item" onclick="removeFromCart(${item.id})">&times;</button>
        `;
        cartItemsList.appendChild(li);
    });

    const finalSum = cart.reduce((sum, item) => sum + item.total, 0);
    const footer = document.createElement('div');
    footer.className = 'cart-footer';
    footer.innerHTML = `
        <div class="cart-total">
            <span>Разом до сплати:</span>
            <span>${finalSum} ₴</span>
        </div>
        <button class="btn checkout-btn" onclick="checkoutOrder()">Завершити замовлення</button>
    `;
    cartItemsList.appendChild(footer);
}

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);

    updateCartBadge();
    updateCartUI();
};

window.checkoutOrder = function() {
    if (cart.length === 0) return;

    const orderData = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        total: cart.reduce((sum, item) => sum + item.total, 0)
    };

    const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    history.push(orderData);
    localStorage.setItem('orderHistory', JSON.stringify(history));

    cart = [];
    updateCartBadge();

    const cartItemsList = document.querySelector('.cart-items');
    cartItemsList.innerHTML = `
        <div class="checkout-success">
            <div class="success-icon">✓</div>
            <h2>Замовлення прийнято!</h2>
            <p>Наш менеджер зв'яжеться з вами найближчим часом.</p>
            <button class="btn" onclick="closeCart()">Зрозуміло</button>
        </div>
    `;
};

/* REGISTRATION FORM */
// Функція для відображення форми реєстрації
window.showRegisterForm = function() {
    const profileContent = document.querySelector('.profile-modal__content');
    
    profileContent.innerHTML = `
        <button class="close" onclick="closeProfile()">&times;</button>
        <h2>Реєстрація</h2>
        <input type="text" placeholder="Ваше ім'я" class="profile-input">
        <input type="email" placeholder="Ваш email" class="profile-input">
        <input type="password" placeholder="Придумайте пароль" class="profile-input">
        <button class="btn">Зареєструватися</button>
        <p class="choose-text">Або зареєструйтеся через:</p>
        <div class="profile-modal__img">
            <img src="img/icons/google.png" alt="Google" class="profile-img">
            <img src="img/icons/facebook.png" alt="Facebook" class="profile-img">
        </div>
        <p class="has-account">Маєте акаунт? <a class="register-link" href="#" onclick="showLoginForm()">Увійти</a></p>
    `;
};

// Функція для повернення до форми входу
window.showLoginForm = function() {
    const profileContent = document.querySelector('.profile-modal__content');
    
    profileContent.innerHTML = `
        <button class="close" onclick="closeProfile()">&times;</button>
        <h2>Профіль</h2>
        <input type="text" placeholder="Ваше ім'я" class="profile-input">
        <input type="email" placeholder="Ваш email" class="profile-input">
        <button class="btn">Увійти</button>
        <p class="choose-text">Або увійдіть через:</p>
        <div class="profile-modal__img">
            <img src="img/icons/google.png" alt="Google" class="profile-img">
            <img src="img/icons/facebook.png" alt="Facebook" class="profile-img">
        </div>
        <p class="has-account">Немає акаунту? <a class="register-link" href="#" onclick="showRegisterForm()">Реєстрація</a></p>
    `;
};