import { Image, useShopQuery, gql, CacheLong, Link } from "@shopify/hydrogen";

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
    <div className="w-max">
      <Link to={`/products/${handle}`}>
        <div className="w-fit">
          <Image
            className="w-full object-cover"
            data={productByHandle.featuredImage}
            alt={`Picture of ${productByHandle.title}`}
          />
        </div>
        <div className="flex flex-row justify-between">
          <h3>{productByHandle.title}</h3>
          <h5>{productByHandle.priceRange.minVariantPrice.amount}</h5>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;

const PRODUCT_CARD_QUERY = gql`
  query ProductCardQuery($handle: String!) {
    productByHandle(handle: $handle) {
      featuredImage {
        url
        width
        height
        altText
      }
      description
      handle
      title
      priceRange {
        minVariantPrice {
          amount
        }
      }
    }
  }
`;
