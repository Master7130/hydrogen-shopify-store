import {
  useShopQuery,
  CacheLong,
  gql,
  Link,
  Seo,
  useRouteParams,
} from "@shopify/hydrogen";

import Layout from "../../components/Layout.server";

function Collection() {
  const { handle } = useRouteParams();

  const {
    data: { collections },
  } = useShopQuery({
    query: COLLECTIONS_PREVIEW_QUERY,
    cache: CacheLong(),
    variables: {
      handle: handle,
    },
  });

  return <Layout>{handle}</Layout>;
}

export default Collection;

const COLLECTIONS_PREVIEW_QUERY = gql`
  query CollectionQuery($handle: String!) {
    collectionByHandle(handle: $handle) {
      title
      products(first: 20) {
        nodes {
          title
          featuredImage {
            url
          }
        }
      }
    }
  }
`;
