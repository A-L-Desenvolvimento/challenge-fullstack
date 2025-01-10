import { Link, useNavigate } from "react-router-dom";
import Message from "../shared/Alert/Message";

const ProductGrid = ({ products }) => {
  return products.length > 0 ? (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <Link to={`/products/${product.id}`}>
          <div
            key={product.id}
            className="group rounded-md gap-2 flex flex-col border-2 border-transparent  hover:border-indigo-400 p-4 hover:shadow-lg bg-white"
          >
            <img
              className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              src={
                product.image ||
                "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg"
              }
              alt={product.name}
            />

            <div>
              <p className="text-md font-semibold text-gray-700 uppercase">
                {product.name}
              </p>
              <div className="flex justify-end">
                <span className="text-sm text-gray-900">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <Message type="warning" text="Nenhum Produto Disponível" />
  );
};

export default ProductGrid;
