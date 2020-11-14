import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${process.env.SECRET_KEY}`);

function CheckoutButton({ productName, priceId }) {
  const handleClick = async () => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: priceId, // Replace with the ID of your price
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: `https://localhost:3000/success?productName=${productName}`,
      cancelUrl: 'https://localhost:3000/cancel',
    });

    if (error) console.log(error.message);
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };
  return (
    <button role="link" onClick={handleClick} type="submit">
      Comprar
    </button>
  );
}

export default CheckoutButton;
