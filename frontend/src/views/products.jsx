import { Container, Table, Button, Form } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaEye, FaBoxOpen } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axiosClient";
import Top from "../components/Top";
import Paginate from "../components/Paginate";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { token } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [column, setColumn] = useState("created_at");
  const [sort, setSort] = useState("asc");
  const [showInactive, setShowInactive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getProducts();
  }, [column, sort, showInactive]);

  const onDeleteClick = (product) => {
    if (!window.confirm(`Deseja excluir o produto ${product.name}?`)) {
      return;
    }

    axiosClient.delete(`/products/${product.id}`).then(() => {
      getProducts();
    });
  };

  const getProducts = (page = 1) => {
    setLoading(true);
    axiosClient
      .get(
        `/products?sort=${column}:${sort}&filters[active][$eq]=${
          showInactive ? "0,1" : "1"
        }&per_page=5&page=${page}`
      )
      .then(({ data }) => {
        setLoading(false);
        setProducts(data.data);
        setCurrentPage(data.meta.current_page);
        setTotalPages(data.meta.last_page);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handlePageChange = (selectedItem) => {
    const newPage = selectedItem.selected + 1;
    setCurrentPage(newPage);
    getProducts(newPage);
  };

  const sortProducts = (e, columnName) => {
    e.preventDefault();

    if (column === columnName) {
      setSort(sort === "asc" || "" ? "desc" : "asc");
    } else {
      setColumn(columnName);
      setSort(sort === "asc" || "" ? "desc" : "asc");
    }
  };

  return (
    <Container className="mt-5">
      {token ? (
        <Top
          title="Produtos"
          link="/products/create"
          text="Adicionar"
          variant="success"
          icon={<FaPlus className="me-2" />}
        />
      ) : (
        <div className="d-flex justify-content-between align-items-center">
          <h1>Produtos</h1>
        </div>
      )}

      <Form.Check
        type="switch"
        id="show-inactive"
        label="Mostrar inativos"
        checked={showInactive}
        onChange={(e) => setShowInactive(e.target.checked)}
        className="mt-3"
      />

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="h5 text-primary mt-3">Carregando...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center my-5">
          <FaBoxOpen size={50} className="text-muted mb-3" />
          <h3 className="text-muted">Nenhum produto encontrado</h3>
          <p className="text-muted">
            Clique em &apos;Adicionar&apos; para cadastrar um novo produto
          </p>
        </div>
      ) : (
        <Table className="mt-3" responsive>
          <thead>
            <tr>
              <th>
                <a href="#" onClick={(e) => sortProducts(e, "name")}>
                  Nome
                </a>
              </th>
              <th>
                <a href="#" onClick={(e) => sortProducts(e, "price")}>
                  Preço
                </a>
              </th>
              <th>
                <a href="#" onClick={(e) => sortProducts(e, "quantity")}>
                  Quantidade
                </a>
              </th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className={product.active ? "" : "table-danger"}
              >
                <td>{product.name}</td>
                <td>
                  {" "}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price)}
                </td>
                <td>{product.quantity} unidades</td>
                <td>
                  <Button
                    as={Link}
                    to={`/products/show/${product.id}`}
                    variant="primary"
                    size="sm"
                    className="me-2 mt-1 mb-1"
                  >
                    <FaEye />
                  </Button>
                  {token && (
                    <>
                      <Button
                        as={Link}
                        to={`/products/edit/${product.id}`}
                        variant="warning"
                        size="sm"
                        className="me-2 mt-1 mb-1"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="mt-1 mb-1"
                        onClick={() => onDeleteClick(product)}
                      >
                        <FaTrash />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}
