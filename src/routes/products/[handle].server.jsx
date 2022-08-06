import {
  gql,
  useShopQuery,
  useServerAnalytics,
  useRouteParams,
  ShopifyAnalyticsConstants,
  Seo,
} from "@shopify/hydrogen";

import Layout from "../../components/Layout.server";
import Details from "../../components/Details.client";

function Product({ params }) {
  const { handle } = useRouteParams();

  const {
    data: { productByHandle },
  } = useShopQuery({
    query: PRODUCT_QUERY,
    variables: {
      handle,
    },
  });

  console.log(productByHandle.variants);

  return (
    <Layout>
      <div className="h-screen">
        <Details product={productByHandle} />
      </div>
    </Layout>
  );
}

export default Product;

const PRODUCT_QUERY = gql`
  query Product($handle: String!) {
    productByHandle(handle: $handle) {
      title
      description
      featuredImage {
        url
      }
      variants(first: 100) {
        nodes {
          id
          availableForSale
          compareAtPriceV2 {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
          priceV2 {
            amount
            currencyCode
          }
          sku
          title
          unitPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;
