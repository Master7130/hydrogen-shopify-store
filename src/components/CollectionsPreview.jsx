import { useShopQuery, CacheLong, gql, Seo } from "@shopify/hydrogen";
import { Suspense } from "react";

// import ProductCard from "./ProductCard.server";

function CollectionsPreview() {
  const {
    data: { collections },
  } = useShopQuery({
    query: COLLECTIONS_PREVIEW_QUERY,
    cache: CacheLong(),
  });

  return (
    <>
      <Suspense>
        <div>
          {collections.nodes.map((collection, key) => {
            return (
              <div key={key}>
                <h1 className="text-2xl">{collection.title}</h1>
                {/* {collection.products.nodes.map((product, key) => {
                  <ProductCard handle={product.handle} key={key} />;
                })} */}
              </div>
            );
          })}
        </div>
      </Suspense>
    </>
  );
}

export default CollectionsPreview;

const COLLECTIONS_PREVIEW_QUERY = gql`
  query {
    collections(first: 2) {
      nodes {
        title
        products(first: 3) {
          nodes {
            handle
          }
        }
      }
    }
  }
`;
