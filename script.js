// Smooth scroll functionality
document.querySelector('.nav-links li:first-child a').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#footer').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav-links li:nth-child(2) a').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#features').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav-links li:nth-child(3) a').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#pricing').scrollIntoView({ behavior: 'smooth' });
});

// New: Smooth scroll, toggle plant theme, and show overlay for "Marketplace" link (fourth link)
document.querySelector('.nav-links li:nth-child(4) a').addEventListener('click', function(e) {
    e.preventDefault();
    const pricingSection = document.querySelector('#pricing');
    pricingSection.scrollIntoView({ behavior: 'smooth' });
    const pricingColumns = document.querySelectorAll('.pricing-column');
    pricingColumns.forEach(column => column.classList.add('plant-themed'));
    document.getElementById('marketplace-insights').classList.add('active');
});

// Close overlay when button is clicked
document.querySelector('.close-insights').addEventListener('click', function() {
    document.getElementById('marketplace-insights').classList.remove('active');
    const pricingColumns = document.querySelectorAll('.pricing-column');
    pricingColumns.forEach(column => column.classList.remove('plant-themed'));
});

// Points dropdown toggle
document.querySelector('.points-trigger').addEventListener('click', function(e) {
    e.preventDefault();
    const menu = document.querySelector('.points-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

// Static redemption logic (to be replaced with backend)
document.querySelectorAll('.redeem-option').forEach(option => {
    option.addEventListener('click', function(e) {
        e.preventDefault();
        const action = this.getAttribute('data-redeem');
        let points = 0; // Static for now, update manually or via backend later
        if (action === 'free-month' && points >= 500) {
            alert('Congratulations! You’ve redeemed 500 points for 1 free month.');
            // Update points display manually for now
        } else if (action === 'upgrade-tier' && points >= 1000) {
            alert('Great! You’ve stacked 1000 points to upgrade your tier.');
            // Update points display manually for now
        } else {
            alert(`Not enough points! Need 500 for a free month or 1000 to upgrade. Current: ${points}`);
        }
        document.querySelector('.points-menu').style.display = 'none';
    });
});

// Stripe integration
const stripe = Stripe('your-publishable-key-here'); // Replace with your Stripe publishable key

const checkoutButtons = document.querySelectorAll('.subscribe-btn');

checkoutButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();

        let priceId;
        const buttonText = button.textContent.trim();

        if (buttonText === 'Start Your Green Growth') priceId = 'price_1YourPriceIDForSprout';
        else if (buttonText === 'Boost Your Sustainable Yield') priceId = 'price_1YourPriceIDForThrive';
        else if (buttonText === 'Unleash Full Potential') priceId = 'price_1YourPriceIDForBloom';

        if (priceId) {
            try {
                const { error } = await stripe.redirectToCheckout({
                    lineItems: [{ price: priceId, quantity: 1 }],
                    mode: 'subscription',
                    successUrl: window.location.origin + '/marketplace.html',
                    cancelUrl: window.location.origin + '/cancel.html',
                });

                if (error) {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                }
            } catch (err) {
                console.error('Checkout error:', err);
                alert('An error occurred during checkout. Please try again.');
            }
        }
    });
});

// Newsletter form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.querySelector('input[type="email"]').value;
    console.log(`Waitlist: ${email}`);
    alert(`Thanks for joining, ${email}! We'll notify you soon.`);
    document.querySelector('input[type="email"]').value = '';
});