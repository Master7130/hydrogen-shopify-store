import {
  ProductOptionsProvider,
  ProductPrice,
  Image,
  useProductOptions,
  BuyNowButton,
} from "@shopify/hydrogen";

function Details({ product }) {
  console.log(product);
  return (
    <ProductOptionsProvider data={product}>
      <section className="w-full mt-10 overflow-x-hidden gap-4 md:gap-4 flex flex-row justify-between px-6 md:px-8 lg:px-12">
        <div className="w-auto">
          <h1 className="text-4xl font-bold leading-10">{product.title}</h1>
          <div className="w-8/12">
            <Image
              className="w-max object-cover aspect-auto"
              widths={[320]}
              loaderOptions={{
                crop: "center",
                width: 320,
                height: 400,
              }}
              data={product.featuredImage}
              alt={`Picture of ${product.title}`}
            />
          </div>
        </div>
        <div className="h-fit w-[50%]">
          <ProductForm product={product} />
        </div>
      </section>
    </ProductOptionsProvider>
  );
}

function ProductForm({ product }) {
  const { options, selectedVariant } = useProductOptions();

  const isOutOfStock = !selectedVariant?.availableForSale || false;
  return (
    <form className="grid gap-10 w-6/12">
      {
        <div className="grid gap-4 w-[100%]">
          {options.map(({ name, values }) => {
            if (values.length === 1) {
              return null;
            }
            return (
              <div
                key={name}
                className="flex flex-wrap items-baseline justify-start gap-6"
              >
                <legend className="whitespace-pre-wrap max-w-prose font-bold text-lead min-w-[4rem]">
                  {name}
                </legend>
                <div className="flex flex-row items-baseline gap-4">
                  <OptionRadio name={name} values={values} />
                </div>
              </div>
            );
          })}
        </div>
      }
      <div>
        <ProductPrice
          className="text-gray-500 line-through text-lg font-semibold"
          priceType="compareAt"
          variantId={selectedVariant.id}
          data={product}
        />
        <ProductPrice
          className="text-gray-900 text-lg font-semibold"
          variantId={selectedVariant.id}
          data={product}
        />
      </div>
      <div className="grid items-stretch gap-4">
        {isOutOfStock ? (
          <span className="text-black text-center py-3 px-6 border rounded-sm leading-none ">
            Available in 2-3 weeks
          </span>
        ) : (
          <BuyNowButton variantId={selectedVariant.id}>
            <span className="bg-black text-white inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none w-full border">
              Buy it now
            </span>
          </BuyNowButton>
        )}
      </div>
    </form>
  );
}
function OptionRadio({ values, name }) {
  const { selectedOptions, setSelectedOption } = useProductOptions();

  return (
    <>
      {values.map((value) => {
        const checked = selectedOptions[name] === value;
        const id = `option-${name}-${value}`;

        return (
          <label key={id} htmlFor={id}>
            <input
              className="sr-only"
              type="radio"
              id={id}
              name={`option[${name}]`}
              value={value}
              checked={checked}
              onChange={() => setSelectedOption(name, value)}
            />
            <div
              className={`leading-none border-b-[2px] py-1 cursor-pointer transition-all duration-200 ${
                checked ? "border-gray-500" : "border-neutral-50"
              }`}
            >
              {value}
            </div>
          </label>
        );
      })}
    </>
  );
}

export default Details;
