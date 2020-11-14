import Link from 'next/link';
import Stripe from 'stripe';
// import dotenv from 'dotenv';

// import stripeConfig from '../../stripeConfig';

// dotenv.config();

export const getStaticProps = async () => {
  const stripe = new Stripe(process.env.SECRET_KEY, {
    apiVersion: '2020-08-27',
  });

  const products = await stripe.products.list();
  const prices = await stripe.prices.list();

  return {
    props: {
      products: products.data,
      prices: prices.data,
    },
  };
};

const HomePage = ({ products, prices }) => {
  return (
    <>
      <h1>La Fábrica</h1>

      <hr />

      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
          <h1>{product.id}</h1>

          {product.images && (
            <img
              alt=""
              src={product.images}
              style={{
                width: '100px',
              }}
            />
          )}

          <h2>
            R$
            {prices.map((price) => {
              return price.product === product.id
                ? Number(price.unit_amount / 100).toFixed(2)
                : null;
            })}
          </h2>

          <Link href={`/${product.id}`}>Visit Page</Link>

          <hr />
        </div>
      ))}
    </>
  );
};

export default HomePage;
