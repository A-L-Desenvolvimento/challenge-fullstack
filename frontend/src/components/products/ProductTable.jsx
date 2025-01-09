import React from "react";
import { useNavigate } from "react-router-dom";
import Message from "../shared/Alert/Message";
import CustomButton from "../shared/buttons/CustomButton";

const ProductTable = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 border-b">
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Nome</th>
            <th className="px-6 py-4">Preço</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {product.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {product.price}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`${
                      product.active ? "text-green-500" : "text-red-500"
                    } font-semibold`}
                  >
                    {product.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <CustomButton
                    onClick={() => navigate(`/products/${product.id}`)}
                    label="Ver Detalhes"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center">
                <Message type="warning" text="Nenhum Produto Disponível" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
