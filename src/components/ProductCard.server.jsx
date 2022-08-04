import { Image, useShopQuery, gql } from "@shopify/hydrogen";

function ProductCard({ handle }) {
  const {
    data: { productByHandle },
  } = useShopQuery({
    query: PRODUCT_CARD_QUERY,
    cache: CacheLong(),
    variables: {
      handle: handle,
    },
  });

  return (
    <div>
      {/* <div>{productByHandle.featuredImage.url}</div> */}
    </div>
  );
}

export default ProductCard;

const PRODUCT_CARD_QUERY = gql`
  query ProductCardQuery($handle: String!) {
    productByHandle(handle: $handle) {
      featuredImage {
        url
      }
      description
      handle
      title
    }
  }
`;
