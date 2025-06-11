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

// Stripe integration
const stripe = Stripe('your-publishable-key-here'); // Replace with your Stripe publishable key

const checkoutButtons = document.querySelectorAll('.subscribe-btn');

checkoutButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();

        let priceId;
        const buttonText = button.textContent.trim();

        // Map button text to Stripe price IDs (replace with your actual Price IDs from Stripe Dashboard)
        if (buttonText === 'Start Your Green Growth') {
            priceId = 'price_1YourPriceIDForSprout'; // Example Price ID for Sprout ($25)
        } else if (buttonText === 'Boost Your Sustainable Yield') {
            priceId = 'price_1YourPriceIDForThrive'; // Example Price ID for Thrive ($50)
        } else if (buttonText === 'Unleash Full Potential') {
            priceId = 'price_1YourPriceIDForBloom'; // Example Price ID for Bloom ($75)
        }

        if (priceId) {
            try {
                const { error } = await stripe.redirectToCheckout({
                    lineItems: [{ price: priceId, quantity: 1 }],
                    mode: 'subscription',
                    successUrl: window.location.origin + '/success.html',
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