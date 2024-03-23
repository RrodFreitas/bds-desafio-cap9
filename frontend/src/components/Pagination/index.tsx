import ReactPaginate from "react-paginate";
import { ReactComponent as ArrowIcon } from 'assets/images/Arrow.svg';
import './styles.css';
type Props = {
  pageCount: number;
  range: number;
  onChange?: (pageNumber: number) => void;
 forcePage?: number;
};

const Pagination = ({ forcePage, pageCount, range,onChange }: Props) => {
  return (
    <ReactPaginate
      forcePage={forcePage}
      pageCount={pageCount}
      pageRangeDisplayed={range}
      marginPagesDisplayed={1}
      containerClassName="pagination-container"
      pageLinkClassName="pagination-item"
      breakClassName="pagination-item"
      previousClassName="arrow-previous"
      nextClassName="arrow-next"
      activeLinkClassName="pagination-link-active"
      previousLabel={
        <div className="pagination-arrow-container">
          <ArrowIcon />
        </div>
      }
      nextLabel={
        <div className="pagination-arrow-container">
          <ArrowIcon />
        </div>
      }
      disabledClassName="arrow-inative"
     onPageChange={(items) => (onChange) ? onChange(items.selected) : {}}
    />
  );
};
export default Pagination;
