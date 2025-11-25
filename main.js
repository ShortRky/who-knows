// MINIMA E-commerce JavaScript
// Main functionality for cart, products, filtering, and interactions

// Global state management
const AppState = {
    cart: JSON.parse(localStorage.getItem('minima-cart')) || [],
    products: [],
    filteredProducts: [],
    currentFilters: {
        category: 'all',
        priceRange: 200,
        color: null,
        size: null,
        search: ''
    },
    currentSort: 'featured'
};

// Product data
const PRODUCTS_DATA = [
    // Shirts
    {
        id: 1,
        name: 'Classic White T-Shirt',
        category: 'shirts',
        price: 29.99,
        originalPrice: 39.99,
        image: 'https://kimi-web-img.moonshot.cn/img/image.uniqlo.com/019288db54a8d8611baed370d755ab45b9d197af.jpg',
        colors: ['white', 'black', 'gray'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        rating: 4.8,
        reviews: 234,
        description: 'The perfect everyday essential. Made from premium organic cotton with a comfortable, flattering fit.',
        featured: true
    },
    {
        id: 2,
        name: 'Modern Button-Down Shirt',
        category: 'shirts',
        price: 59.99,
        originalPrice: 79.99,
        image: 'https://kimi-web-img.moonshot.cn/img/www.lorenzouomo.com/3165f245ceaf053f4420086bcdf10366ed6df829.jpg',
        colors: ['white', 'blue'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.6,
        reviews: 156,
        description: 'A sophisticated button-down shirt crafted from premium cotton. Perfect for both casual and professional settings.',
        featured: true
    },
    {
        id: 3,
        name: 'Casual Cotton Shirt',
        category: 'shirts',
        price: 45.99,
        originalPrice: null,
        image: 'https://kimi-web-img.moonshot.cn/img/sanvt.com/fb984f960e2523b9e9491f355ec373074e1f89d9.jpg',
        colors: ['white', 'blue', 'gray'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        rating: 4.7,
        reviews: 189,
        description: 'Relaxed fit cotton shirt perfect for weekend wear. Breathable fabric and timeless design.',
        featured: false
    },
    {
        id: 4,
        name: 'Essential Crew Neck',
        category: 'shirts',
        price: 24.99,
        originalPrice: null,
        image: 'https://kimi-web-img.moonshot.cn/img/www.shoploooh.com.sg/d60dec8698229a1b1cb4ba3f21b26a458031323f.jpg',
        colors: ['white', 'black', 'gray', 'red'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.5,
        reviews: 298,
        description: 'Your go-to crew neck tee. Soft, durable, and available in multiple colors.',
        featured: false
    },
    {
        id: 5,
        name: 'Premium Polo Shirt',
        category: 'shirts',
        price: 49.99,
        originalPrice: 69.99,
        image: 'https://kimi-web-img.moonshot.cn/img/res.mockuplabs.ai/c6f1315e1db32468902f207b39e25515ac1d1beb.jpg',
        colors: ['white', 'black', 'blue'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.9,
        reviews: 167,
        description: 'Classic polo shirt with modern fit. Perfect for smart-casual occasions.',
        featured: true
    },
    {
        id: 6,
        name: 'Minimalist Tank Top',
        category: 'shirts',
        price: 19.99,
        originalPrice: null,
        image: 'https://kimi-web-img.moonshot.cn/img/cdnp.sanmar.com/39967ae8fc657543c5b479c831fb4e0215d866ec.jpg',
        colors: ['white', 'black', 'gray'],
        sizes: ['XS', 'S', 'M', 'L'],
        rating: 4.4,
        reviews: 134,
        description: 'Clean, minimalist tank top perfect for layering or wearing alone.',
        featured: false
    },
    
    // Pants
    {
        id: 7,
        name: 'Slim Fit Jeans',
        category: 'pants',
        price: 79.99,
        originalPrice: 99.99,
        image: 'https://kimi-web-img.moonshot.cn/img/finesse.us/b74aaf2ec4ed6f7854a67a2567ed518c0d5af3c0.jpg',
        colors: ['blue', 'black'],
        sizes: ['28', '30', '32', '34', '36'],
        rating: 4.7,
        reviews: 203,
        description: 'Premium denim with the perfect amount of stretch. Comfortable and stylish slim fit.',
        featured: true
    },
    {
        id: 8,
        name: 'Classic Chino Pants',
        category: 'pants',
        price: 64.99,
        originalPrice: null,
        image: 'https://kimi-web-img.moonshot.cn/img/cdn11.bigcommerce.com/f3bc4f4912d22265f1f490a6f5764e25078c8504.jpg',
        colors: ['khaki', 'navy', 'gray'],
        sizes: ['28', '30', '32', '34', '36'],
        rating: 4.6,
        reviews: 178,
        description: 'Versatile chino pants that work for both casual and semi-formal occasions.',
        featured: true
    },
    {
        id: 9,
        name: 'Comfort Fit Trousers',
        category: 'pants',
        price: 89.99,
        originalPrice: null,
        image: 'https://kimi-web-img.moonshot.cn/img/collarsandco.com/ce92cc768e3c8413225e2dfab8c3c60aadd73cf1.jpg',
        colors: ['black', 'gray', 'navy'],
        sizes: ['30', '32', '34', '36', '38'],
        rating: 4.8,
        reviews: 145,
        description: 'Professional trousers with comfort fit. Perfect for the modern workplace.',
        featured: false
    },
    {
        id: 10,
        name: 'Casual Jogger Pants',
        category: 'pants',
        price: 54.99,
        originalPrice: null,
        image: 'https://kimi-web-img.moonshot.cn/img/mugsyjeans.com/0b27b748ff18bad480bce4d49d356fdc49d3ae48.jpg',
        colors: ['gray', 'black', 'navy'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.5,
        reviews: 167,
        description: 'Comfortable jogger pants perfect for casual wear and lounging.',
        featured: false
    },
    {
        id: 11,
        name: 'Straight Leg Jeans',
        category: 'pants',
        price: 74.99,
        originalPrice: null,
        image: 'https://kimi-web-img.moonshot.cn/img/s7d2.scene7.com/53370c8a2368c0eec9b4c32ee7574a5471fe61ce',
        colors: ['blue', 'black', 'gray'],
        sizes: ['28', '30', '32', '34', '36'],
        rating: 4.6,
        reviews: 189,
        description: 'Classic straight leg jeans with timeless appeal and modern comfort.',
        featured: false
    },
    {
        id: 12,
        name: 'Linen Summer Pants',
        category: 'pants',
        price: 69.99,
        originalPrice: 89.99,
        image: 'https://kimi-web-img.moonshot.cn/img/coastalcottonclothing.com/c4da7fe33b31869138260aeca952c82a9cc6ca78.jpg',
        colors: ['beige', 'white', 'navy'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.9,
        reviews: 123,
        description: 'Breathable linen pants perfect for warm weather. Lightweight and stylish.',
        featured: true
    },
    
    // Outerwear
    {
        id: 13,
        name: 'Minimalist Wool Coat',
        category: 'outerwear',
        price: 199.99,
        originalPrice: 249.99,
        image: 'https://kimi-web-img.moonshot.cn/img/cdn.shopify.com/0e3c1c84db43ae53f20f233380f1677c29a9d056.jpg',
        colors: ['black', 'gray', 'camel'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.8,
        reviews: 89,
        description: 'Elegant wool coat with clean lines and exceptional warmth. A winter essential.',
        featured: true
    },
    {
        id: 14,
        name: 'Lightweight Bomber Jacket',
        category: 'outerwear',
        price: 89.99,
        originalPrice: null,
        image: 'https://kimi-web-img.moonshot.cn/img/contents.sixshop.com/f66ff3b3f57245b5e473d7cbcbd53528df2abae1.jpg',
        colors: ['black', 'navy', 'olive'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.7,
        reviews: 156,
        description: 'Modern bomber jacket with sleek design. Perfect for transitional weather.',
        featured: true
    },
    {
        id: 15,
        name: 'Classic Denim Jacket',
        category: 'outerwear',
        price: 94.99,
        originalPrice: null,
        image: 'https://kimi-web-img.moonshot.cn/img/marmotau.com/b9bbab595078d886c2fb4cb4c2a4e88e96c78fdb.jpg',
        colors: ['blue', 'black'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.6,
        reviews: 234,
        description: 'Timeless denim jacket with perfect fit. A wardrobe staple for every season.',
        featured: false
    },
    {
        id: 16,
        name: 'Waterproof Rain Jacket',
        category: 'outerwear',
        price: 129.99,
        originalPrice: null,
        image: 'https://kimi-web-img.moonshot.cn/img/i5.walmartimages.com/400b1bcb7afd7a328c56a29662ee1d9c9d75de3a.jpeg',
        colors: ['black', 'navy', 'gray'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.9,
        reviews: 178,
        description: 'Fully waterproof jacket with breathable fabric. Stay dry in any weather.',
        featured: false
    },
    {
        id: 17,
        name: 'Quilted Vest',
        category: 'outerwear',
        price: 74.99,
        originalPrice: null,
        image: 'https://kimi-web-img.moonshot.cn/img/images.squarespace-cdn.com/9ea91e2eb9a8a5fe619042bf608ab2eb09cc74fb.png',
        colors: ['black', 'navy', 'olive'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.5,
        reviews: 145,
        description: 'Lightweight quilted vest perfect for layering. Adds warmth without bulk.',
        featured: false
    },
    {
        id: 18,
        name: 'Casual Blazer',
        category: 'outerwear',
        price: 149.99,
        originalPrice: 199.99,
        image: 'https://kimi-web-img.moonshot.cn/img/media.columbia.com/10df18e17b6b2883194399e9ac95bba88a285237',
        colors: ['navy', 'gray', 'black'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.8,
        reviews: 167,
        description: 'Unstructured blazer perfect for smart-casual looks. Comfortable and versatile.',
        featured: true
    },
    
    // Additional products for variety
    {
        id: 19,
        name: 'Merino Wool Sweater',
        category: 'outerwear',
        price: 119.99,
        originalPrice: null,
        image: 'https://kimi-web-img.moonshot.cn/img/m.media-amazon.com/9a4da312b81623825e6a96d671b30a724502bba6.jpg',
        colors: ['navy', 'gray', 'burgundy'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.9,
        reviews: 134,
        description: 'Luxurious merino wool sweater with exceptional softness and warmth.',
        featured: false
    },
    {
        id: 20,
        name: 'Hoodie Sweatshirt',
        category: 'outerwear',
        price: 64.99,
        originalPrice: null,
        image: 'https://kimi-web-img.moonshot.cn/img/www.mountaintopsoutfitters.com/b2b2f3f82ddbcf87102c7805d5b063df5b181e95.jpg',
        colors: ['gray', 'black', 'navy'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.6,
        reviews: 201,
        description: 'Comfortable hoodie made from soft cotton blend. Perfect for casual wear.',
        featured: false
    },
    {
        id: 21,
        name: 'Windbreaker Jacket',
        category: 'outerwear',
        price: 79.99,
        originalPrice: null,
        image: 'https://kimi-web-img.moonshot.cn/img/i.ebayimg.com/37786db86409d3da8bcc0ea9b174000397a038f7.jpg',
        colors: ['black', 'navy', 'red'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.7,
        reviews: 156,
        description: 'Lightweight windbreaker perfect for outdoor activities and travel.',
        featured: false
    },
    {
        id: 22,
        name: 'Cardigan Sweater',
        category: 'outerwear',
        price: 89.99,
        originalPrice: null,
        image: 'https://kimi-web-img.moonshot.cn/img/www.familyhandyman.com/c5d0cad9d2e74cdfa91566f51d8bd5e94f775cff.jpg',
        colors: ['beige', 'gray', 'navy'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.8,
        reviews: 123,
        description: 'Classic cardigan sweater with button closure. Perfect for layering.',
        featured: false
    },
    {
        id: 23,
        name: 'Field Jacket',
        category: 'outerwear',
        price: 159.99,
        originalPrice: null,
        image: 'https://kimi-web-img.moonshot.cn/img/uploads-ssl.webflow.com/4feac41e00bcab726946a7fe746c9498cf81f8e1.jpeg',
        colors: ['olive', 'navy', 'brown'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.6,
        reviews: 189,
        description: 'Rugged field jacket with multiple pockets. Perfect for outdoor adventures.',
        featured: false
    },
    {
        id: 24,
        name: 'Peacoat',
        category: 'outerwear',
        price: 189.99,
        originalPrice: 239.99,
        image: 'https://kimi-web-img.moonshot.cn/img/assets.timberland.com/506e5fc9245b324b9913071675f2bf052d698d32.png',
        colors: ['navy', 'black'],
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.9,
        reviews: 167,
        description: 'Classic double-breasted peacoat. Timeless style with modern comfort.',
        featured: true
    }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    AppState.products = PRODUCTS_DATA;
    AppState.filteredProducts = [...PRODUCTS_DATA];
    
    updateCartUI();
    initializeEventListeners();
    
    // Load products based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            loadFeaturedProducts();
            break;
        case 'products.html':
            loadAllProducts();
            initializeFilters();
            break;
        case 'cart.html':
            loadCartItems();
            break;
    }
    
    // Initialize animations
    initializeAnimations();
}

function initializeEventListeners() {
    // Cart functionality
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.getElementById('close-cart');
    
    if (cartBtn && cartSidebar) {
        cartBtn.addEventListener('click', () => toggleCartSidebar());
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', () => toggleCartSidebar());
    }
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            AppState.currentFilters.search = e.target.value.toLowerCase();
            filterProducts();
        });
    }
    
    // Checkout functionality (cart page)
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckout = document.getElementById('close-checkout');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => showCheckoutModal());
    }
    
    if (closeCheckout && checkoutModal) {
        closeCheckout.addEventListener('click', () => {
            checkoutModal.classList.add('hidden');
            checkoutModal.classList.remove('flex');
        });
    }
    
    // Checkout form
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }
    
    // Success modal
    const continueShopping = document.getElementById('continue-shopping');
    const successModal = document.getElementById('success-modal');
    
    if (continueShopping && successModal) {
        continueShopping.addEventListener('click', () => {
            successModal.classList.add('hidden');
            successModal.classList.remove('flex');
            window.location.href = 'index.html';
        });
    }
    
    // Quick view modal
    const quickViewModal = document.getElementById('quick-view-modal');
    const closeModal = document.getElementById('close-modal');
    
    if (closeModal && quickViewModal) {
        closeModal.addEventListener('click', () => {
            quickViewModal.classList.add('hidden');
            quickViewModal.classList.remove('flex');
        });
    }
}

function initializeFilters() {
    // Category filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('filter-active'));
            e.target.classList.add('filter-active');
            
            AppState.currentFilters.category = e.target.dataset.category;
            filterProducts();
        });
    });
    
    // Price range
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', (e) => {
            const value = e.target.value;
            priceValue.textContent = `$${value}`;
            AppState.currentFilters.priceRange = parseInt(value);
            filterProducts();
        });
    }
    
    // Color swatches
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', (e) => {
            // Toggle active state
            colorSwatches.forEach(s => s.classList.remove('active'));
            e.target.classList.add('active');
            
            AppState.currentFilters.color = e.target.dataset.color;
            filterProducts();
        });
    });
    
    // Size options
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            // Toggle active state
            sizeOptions.forEach(s => s.classList.remove('active'));
            e.target.classList.add('active');
            
            AppState.currentFilters.size = e.target.dataset.size;
            filterProducts();
        });
    });
    
    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            AppState.currentSort = e.target.value;
            sortProducts();
        });
    }
    
    // Clear filters
    const clearFilters = document.getElementById('clear-filters');
    if (clearFilters) {
        clearFilters.addEventListener('click', () => {
            clearAllFilters();
        });
    }
    
    // Load more button
    const loadMore = document.getElementById('load-more');
    if (loadMore) {
        loadMore.addEventListener('click', () => {
            // Simulate loading more products
            alert('More products loaded! (Demo functionality)');
        });
    }
}

function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featuredProducts = AppState.products.filter(p => p.featured).slice(0, 8);
    
    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
    
    // Add event listeners to product cards
    addProductCardListeners(container);
}

function loadAllProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    container.innerHTML = AppState.filteredProducts.map(product => createProductCard(product)).join('');
    updateProductCount();
    
    // Add event listeners to product cards
    addProductCardListeners(container);
}

function createProductCard(product) {
    const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    
    return `
        <div class="product-card bg-white rounded-lg shadow-sm overflow-hidden group">
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
                ${discount > 0 ? `<div class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">-${discount}%</div>` : ''}
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button class="quick-view-btn bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors" data-product-id="${product.id}">
                        Quick View
                    </button>
                </div>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
                <div class="flex items-center mb-2">
                    <div class="flex text-yellow-400">
                        ${Array(5).fill().map((_, i) => 
                            `<svg class="w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>`
                        ).join('')}
                    </div>
                    <span class="text-sm text-gray-600 ml-2">(${product.reviews})</span>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <span class="text-xl font-bold text-red-500">$${product.price}</span>
                        ${product.originalPrice ? `<span class="text-sm text-gray-500 line-through">$${product.originalPrice}</span>` : ''}
                    </div>
                    <button class="add-to-cart-btn bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-colors" data-product-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

function addProductCardListeners(container) {
    // Add to cart buttons
    const addToCartBtns = container.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            addToCart(productId);
        });
    });
    
    // Quick view buttons
    const quickViewBtns = container.querySelectorAll('.quick-view-btn');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            showQuickView(productId);
        });
    });
}

function addToCart(productId, quantity = 1) {
    const product = AppState.products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = AppState.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        AppState.cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    saveCartToStorage();
    updateCartUI();
    
    // Show success feedback
    showNotification('Added to cart!', 'success');
}

function removeFromCart(productId) {
    AppState.cart = AppState.cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
    loadCartItems(); // Refresh cart page if we're on it
}

function updateCartQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = AppState.cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCartToStorage();
        updateCartUI();
        loadCartItems(); // Refresh cart page if we're on it
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.classList.toggle('hidden', totalItems === 0);
    }
    
    if (cartItems) {
        cartItems.innerHTML = AppState.cart.map(item => `
            <div class="flex items-center space-x-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-semibold text-sm">${item.name}</h4>
                    <p class="text-red-500 font-bold">$${item.price}</p>
                    <div class="flex items-center space-x-2 mt-2">
                        <button class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="text-sm font-medium">${item.quantity}</span>
                        <button class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        `).join('');
    }
    
    if (cartTotal) {
        cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

function toggleCartSidebar() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('translate-x-full');
    }
}

function loadCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');
    if (!cartItemsList) return;
    
    if (AppState.cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="p-12 text-center">
                <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9"></path>
                </svg>
                <h3 class="text-xl font-semibold mb-2">Your cart is empty</h3>
                <p class="text-gray-600 mb-6">Add some products to get started!</p>
                <a href="products.html" class="bg-red-500 text-white px-6 py-3 rounded-full font-medium hover:bg-red-600 transition-colors">
                    Shop Products
                </a>
            </div>
        `;
        return;
    }
    
    cartItemsList.innerHTML = AppState.cart.map(item => `
        <div class="cart-item p-6 flex items-center space-x-6">
            <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg">
            <div class="flex-1">
                <h3 class="text-lg font-semibold mb-2">${item.name}</h3>
                <p class="text-gray-600 mb-2">${item.colors ? item.colors.join(', ') : 'Various colors'}</p>
                <p class="text-2xl font-bold text-red-500">$${item.price}</p>
            </div>
            <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                    <button class="quantity-btn w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="w-12 text-center font-semibold">${item.quantity}</span>
                    <button class="quantity-btn w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 p-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
    
    updateOrderSummary();
}

function updateOrderSummary() {
    const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 9.99 : 0;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `$${shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    
    // Update checkout modal
    const modalSubtotal = document.getElementById('modal-subtotal');
    const modalTax = document.getElementById('modal-tax');
    const modalTotal = document.getElementById('modal-total');
    
    if (modalSubtotal) modalSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (modalTax) modalTax.textContent = `$${tax.toFixed(2)}`;
    if (modalTotal) modalTotal.textContent = `$${total.toFixed(2)}`;
}

function showQuickView(productId) {
    const product = AppState.products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('quick-view-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    
    if (modal && modalImage && modalTitle && modalPrice && modalDescription) {
        modalImage.src = product.image;
        modalImage.alt = product.name;
        modalTitle.textContent = product.name;
        modalPrice.textContent = `$${product.price}`;
        modalDescription.textContent = product.description;
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function showCheckoutModal() {
    if (AppState.cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Update checkout steps
        const steps = document.querySelectorAll('.checkout-step');
        steps.forEach((step, index) => {
            if (index === 0) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
}

function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    // Simulate order processing
    const orderNumber = 'ORD-' + Date.now().toString().slice(-6);
    
    // Clear cart
    AppState.cart = [];
    saveCartToStorage();
    updateCartUI();
    
    // Hide checkout modal
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
        checkoutModal.classList.add('hidden');
        checkoutModal.classList.remove('flex');
    }
    
    // Show success modal
    const successModal = document.getElementById('success-modal');
    const orderNumberEl = document.getElementById('order-number');
    
    if (successModal && orderNumberEl) {
        orderNumberEl.textContent = orderNumber;
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
    }
}

function filterProducts() {
    let filtered = [...AppState.products];
    
    // Category filter
    if (AppState.currentFilters.category !== 'all') {
        filtered = filtered.filter(p => p.category === AppState.currentFilters.category);
    }
    
    // Price filter
    filtered = filtered.filter(p => p.price <= AppState.currentFilters.priceRange);
    
    // Color filter
    if (AppState.currentFilters.color) {
        filtered = filtered.filter(p => p.colors && p.colors.includes(AppState.currentFilters.color));
    }
    
    // Size filter
    if (AppState.currentFilters.size) {
        filtered = filtered.filter(p => p.sizes && p.sizes.includes(AppState.currentFilters.size));
    }
    
    // Search filter
    if (AppState.currentFilters.search) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(AppState.currentFilters.search) ||
            p.description.toLowerCase().includes(AppState.currentFilters.search)
        );
    }
    
    AppState.filteredProducts = filtered;
    sortProducts();
}

function sortProducts() {
    let sorted = [...AppState.filteredProducts];
    
    switch (AppState.currentSort) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            sorted.sort((a, b) => b.id - a.id);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'featured':
        default:
            sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            break;
    }
    
    AppState.filteredProducts = sorted;
    loadAllProducts();
}

function clearAllFilters() {
    AppState.currentFilters = {
        category: 'all',
        priceRange: 200,
        color: null,
        size: null,
        search: ''
    };
    
    // Reset UI
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('filter-active'));
    document.querySelector('.filter-btn[data-category="all"]')?.classList.add('filter-active');
    
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    if (priceRange) priceRange.value = 200;
    if (priceValue) priceValue.textContent = '$200';
    
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.size-option').forEach(s => s.classList.remove('active'));
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    
    filterProducts();
}

function updateProductCount() {
    const productCount = document.getElementById('product-count');
    if (productCount) {
        productCount.textContent = AppState.filteredProducts.length;
    }
}

function saveCartToStorage() {
    localStorage.setItem('minima-cart', JSON.stringify(AppState.cart));
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function initializeAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        observer.observe(el);
    });
}

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.showQuickView = showQuickView;