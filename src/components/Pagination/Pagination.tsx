import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { getTotalPages } from "../../utils/paging";
import styles from "./Pagination.module.css";

interface PaginationProps {
  usersLength: number;
}

const Pagination = ({ usersLength }: PaginationProps) => {
  const { pageLimit, setPageLimit, deleteSelected }: any = useContext(AppContext);
  const totalPages = getTotalPages(usersLength);
  const changePage = (index: number) => {
    setPageLimit(index);
  };

  const navigatePage = (index: number) => {
    if (index < 1) {
      index = 1;
    } else if (index > totalPages) {
      index = totalPages;
    }
    setPageLimit(index);
  };

  let pages: any = [];
  pages.push(
    <div
      key={-3}
      className={`${styles.page} ${pageLimit === 1 ? styles.disabled : ""}`}
      onClick={() => changePage(1)}
    >
      ⪻
    </div>
  );
  pages.push(
    <div
      key={-2}
      className={`${styles.page} ${pageLimit === 1 ? styles.disabled : ""}`}
      onClick={() => navigatePage(pageLimit - 1)}
    >
      ⇤
    </div>
  );
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <div
        key={i}
        onClick={() => changePage(i)}
        className={`${styles.page} ${pageLimit === i ? styles.selected : ""}`}
      >
        {i}
      </div>
    );
  }
  pages.push(
    <div
      key={-1}
      className={`${styles.page} ${pageLimit === totalPages ? styles.disabled : ""}`}
      onClick={() => navigatePage(pageLimit + 1)}
    >
      ⇥
    </div>
  );
  pages.push(
    <div
      key={0}
      className={`${styles.page} ${pageLimit === totalPages ? styles.disabled : ""}`}
      onClick={() => changePage(totalPages)}
    >
      ⪼
    </div>
  );

  return (
    <div className={styles.paginationContainer}>
      <button className={styles.delete} onClick={() => deleteSelected()}>
        Delete Selected
      </button>
      <div className={styles.pagination}>{pages}</div>
    </div>
  );
};

export default Pagination;
