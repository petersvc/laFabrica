import Link from 'next/link';

import Stripe from 'stripe';
import stripeConfig from '../../stripeConfig';
import CheckoutButton from '../components/CheckoutButtom';

export async function getStaticPaths() {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27',
  });

  const products = await stripe.products.list();

  const paths = products.data.map((product) => ({
    params: {
      productId: product.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-08-27',
  });

  const { productId } = params;

  const product = await stripe.products.retrieve(productId);

  const { data } = await stripe.prices.list();
  const priceRaw = data.filter((price) => price.product === product.id);
  // const price2 = priceRaw[0];

  return {
    props: {
      product,
      price: priceRaw[0],
    },
  };
}

function Product({ product, price }) {
  const priceValue = price.unit_amount;
  /* const sku = async () => {
    await stripe.skus.create({
      attributes: { size: 'Medium', gender: 'Unisex' },
      price: 1500,
      currency: 'brl',
      inventory: { type: 'finite', quantity: 500 },
      product: product.id,
    });
  }; */

  /*  */

  /* const productNew = stripe.products.create({
    name: 'Gold Special',
    type: 'good',
  }); */

  return (
    <>
      <h1>{product.name} </h1>
      {product.images && (
        <img
          alt=""
          src={product.images}
          style={{
            width: '100px',
          }}
        />
      )}
      <h1>R$ {Number(priceValue / 100).toFixed(2)}</h1>
      <br /> <br />
      <CheckoutButton productName={product.id} priceId={price.id} />
      <br /> <br />
      <Link href="/">voltar</Link>
    </>
  );
}

export default Product;
