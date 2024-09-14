import React, { useEffect, useState } from "react";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    if (data?.products) setProducts(data.products);
  };

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products?.length / 10)
      setPage(selectedPage);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      {products?.length > 0 && (
        <div className="products">
          {products?.slice(page * 10 - 10, page * 10)?.map((items) => {
            return (
              <span className="products__single" key={items.id}>
                <img src={items.thumbnail} alt={items.title} />
                <span>{items?.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products?.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disabled"}
          >
            ◀️
          </span>
          {[...Array(products?.length / 10)]?.map((_, index) => {
            return (
              <span
                className={page === index + 1 ? "pagination__selected" : ""}
                key={index}
                onClick={() => selectPageHandler(index + 1)}
              >
                {index + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={
              page < products?.length / 10 ? "" : "pagination__disabled"
            }
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
