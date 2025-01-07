import ReactPaginate from "react-paginate";

export default function Paginate({ currentPage, totalPages, onPageChange }) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageCount={Math.max(totalPages, 1)}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      onPageChange={onPageChange}
      forcePage={Math.max(currentPage - 1, 0)}
      containerClassName="pagination justify-content-left mt-3 mb-5"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      activeClassName="active"
    />
  );
}
