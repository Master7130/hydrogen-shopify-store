import { useShopQuery, CacheLong, gql, Link, Seo } from "@shopify/hydrogen";
import { Suspense } from "react";

function Nav({ name }) {
  const {
    data: { collections },
  } = useShopQuery({
    query: COLLECTION_QUERY,
    cache: CacheLong(),
  });

  return (
    <nav className="flex flex-col justify-start text-center py-6 space-y-3">
      <Link to="/">
        <h1>{name}</h1>
      </Link>
      <div className="flex flex-row justify-between mx-[20%]">
        {collections.nodes.map((collection, key) => {
          return (
            <Link to={`/collections/${collection.handle}`} key={key}>
              <h4>{collection.title}</h4>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Nav;

const COLLECTION_QUERY = gql`
  query {
    collections(first: 4) {
      nodes {
        title
        handle
      }
    }
  }
`;
