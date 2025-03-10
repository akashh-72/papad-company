/**
 * Vaishali Sandage Papad Kendra - Main JavaScript
 * Author: Author
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initMobileMenu();
    initCartSidebar();
    initTestimonialSlider();
    initAddToCart();
    initQuantityControls();
    
    // Handle sticky header
    window.addEventListener('scroll', handleStickyHeader);
});

// Product Data (In a real app, this would come from a database)
const products = [
    {
        id: 1,
        name: "Rice Papad",
        price: 120,
        image: "images/products/rice-papad.jpg",
        description: "Traditional rice papad with a crispy texture"
    },
    {
        id: 2,
        name: "Udad Papad",
        price: 150,
        image: "images/products/udad-papad.jpg",
        description: "Made with black gram for rich taste"
    },
    {
        id: 3,
        name: "Garlic Papad",
        price: 135,
        image: "images/products/garlic-papad.jpg",
        description: "Flavored with fresh garlic for extra taste"
    },
    {
        id: 4,
        name: "Red Chilli Sandage",
        price: 180,
        image: "images/products/chilli-sandage.jpg",
        description: "Spicy and flavorful traditional sandage"
    },
    {
        id: 5,
        name: "Methi Papad",
        price: 140,
        image: "images/products/methi-papad.jpg",
        description: "Infused with fenugreek for unique flavor"
    },
    {
        id: 6,
        name: "Moong Dal Papad",
        price: 130,
        image: "images/products/moong-papad.jpg",
        description: "Light and crispy papad made from moong dal"
    },
    {
        id: 7,
        name: "Cumin Sandage",
        price: 160,
        image: "images/products/cumin-sandage.jpg",
        description: "Sandage with aromatic cumin seeds"
    },
    {
        id: 8,
        name: "Plain Sandage",
        price: 150,
        image: "images/products/plain-sandage.jpg",
        description: "Traditional plain sandage with authentic taste"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in the UI
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    let totalItems = 0;
    
    cart.forEach(item => {
        totalItems += item.quantity;
    });
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const overlay = document.querySelector('.overlay');
    
    // Check if mobile menu exists, if not create it
    let mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
            <div class="mobile-menu-header">
                <h3>Menu</h3>
                <button class="close-menu"><i class="fas fa-times"></i></button>
            </div>
            <div class="mobile-search">
                <input type="text" placeholder="Search products...">
            </div>
            <ul>
                <li><a href="index.html" class="active">Home</a></li>
                <li><a href="products.html">Products</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="cart.html">Cart</a></li>
                <li><a href="checkout.html">Checkout</a></li>
            </ul>
        `;
        document.body.appendChild(mobileMenu);
    }
    
    const closeMenu = document.querySelector('.close-menu');
    
    // Toggle mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close mobile menu
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            document.querySelector('.cart-sidebar').classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// Initialize cart sidebar functionality
function initCartSidebar() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const overlay = document.querySelector('.overlay');
    
    // Toggle cart sidebar
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            cartSidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            renderCartItems();
        });
    }
    
    // Close cart sidebar
    if (closeCart) {
        closeCart.addEventListener('click', function() {
            cartSidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Update cart count initially
    updateCartCount();
}

// Render cart items in the cart sidebar
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span');
    
    if (!cartItemsContainer) return;
    
    // Clear existing items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '₹0.00';
        return;
    }
    
    let total = 0;
    
    // Add each cart item to the sidebar
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="cart-item-details">
                <p class="cart-item-title">${product.name}</p>
                <p class="cart-item-price">₹${product.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${product.id}">+</button>
                </div>
                <button class="cart-item-remove" data-id="${product.id}">Remove</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Update total
    cartTotal.textContent = `₹${total.toFixed(2)}`;
    
    // Initialize quantity controls for cart items
    initCartItemControls();
}

// Initialize quantity controls in the cart
function initCartItemControls() {
    const decreaseButtons = document.querySelectorAll('.cart-item .decrease');
    const increaseButtons = document.querySelectorAll('.cart-item .increase');
    const removeButtons = document.querySelectorAll('.cart-item-remove');
    
    // Decrease quantity
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            updateCartItemQuantity(id, -1);
        });
    });
    
    // Increase quantity
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            updateCartItemQuantity(id, 1);
        });
    });
    
    // Remove item
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

// Update cart item quantity
function updateCartItemQuantity(id, change) {
    const cartItem = cart.find(item => item.id === id);
    
    if (cartItem) {
        cartItem.quantity += change;
        
        if (cartItem.quantity <= 0) {
            removeFromCart(id);
        } else {
            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update UI
            updateCartCount();
            renderCartItems();
        }
    }
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    renderCartItems();
}

// Initialize Add to Cart buttons
function initAddToCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            addToCart(id, 1);
            
            // Show notification
            showNotification('Product added to cart!');
            
            // Open cart sidebar
            document.querySelector('.cart-sidebar').classList.add('open');
            document.querySelector('.overlay').classList.add('active');
            document.body.style.overflow = 'hidden';
            renderCartItems();
        });
    });
}

// Add item to cart
function addToCart(id, quantity) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id,
            quantity
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
}

// Show notification
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    // Set message and show notification
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(function() {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize quantity controls on product pages
function initQuantityControls() {
    const quantityContainer = document.querySelector('.quantity-control');
    
    if (quantityContainer) {
        const decreaseBtn = quantityContainer.querySelector('.decrease');
        const increaseBtn = quantityContainer.querySelector('.increase');
        const quantityInput = quantityContainer.querySelector('input');
        
        decreaseBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
    }
}

// Initialize testimonial slider
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!testimonialSlider || testimonials.length === 0) return;
    
    let currentIndex = 0;
    const totalSlides = testimonials.length;
    
    // Function to update slider position
    function updateSlider() {
        testimonialSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    }
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        });
    }
    
    // Auto slide every 5 seconds
    setInterval(function() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }, 5000);
}

// Handle sticky header
function handleStickyHeader() {
    const header = document.getElementById('site-header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}

// Additional styles for notifications and sticky header
document.head.insertAdjacentHTML('beforeend', `
<style>
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 15px 25px;
        border-radius: var(--border-radius-sm);
        box-shadow: var(--box-shadow-md);
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
        z-index: 2000;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    #site-header.sticky {
        box-shadow: var(--box-shadow-md);
        animation: slideDown 0.3s ease;
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0);
        }
    }
    
    .empty-cart {
        text-align: center;
        padding: 2rem 0;
        color: var(--gray-color);
    }
</style>
`); 