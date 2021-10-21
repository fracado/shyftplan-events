import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

type PaginationProps = {
    count: number,
    limit: number,
    currentPage: number,
    handlePageChange: (pageNum: number) => void
};

const PaginationComponent = ({count, limit,currentPage ,handlePageChange}: PaginationProps): JSX.Element => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(count / limit); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((pageNum: number) => {
        return (
            <Pagination.Item
                key={pageNum}
                active={pageNum === currentPage}
                onClick={() => handlePageChange(pageNum)}
            >
                {pageNum}
            </Pagination.Item>
        );
    });

    return (
        <Pagination>
            {renderPageNumbers}
        </Pagination>
    );
};

export default PaginationComponent;
