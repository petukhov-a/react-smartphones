import React, { FC } from 'react'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/pagination/slice';
import { selectPagination } from '../../redux/pagination/selectors';
import styles from './Pagination.module.scss'

const Pagination: FC = () => {
    const dispatch = useDispatch();

    const { pageCount, currentPage } = useSelector(selectPagination);

    const onPageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    }

    return (
        <>
          <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => onPageChange(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1}
          />
        </>
      );
}

export default Pagination