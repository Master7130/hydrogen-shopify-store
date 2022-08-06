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

  return (
    <Layout>
      <Details product={productByHandle} />
    </Layout>
  );
}

export default Product;

const PRODUCT_QUERY = gql`
  query query($handle: String!) {
    productByHandle(handle: $handle) {
      title
      description
    }
  }
`;
