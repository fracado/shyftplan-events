import React from 'react';

type PaginationProps = {
    count: number,
    limit: number,
    handlePageChange: (pageNum: number) => void
};

const PaginationComponent = ({count, limit, handlePageChange}: PaginationProps): JSX.Element => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(count / limit); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((pageNum: number) => {
        return (
            <button
                type="button"
                onClick={() => handlePageChange(pageNum)}
            >
                {pageNum}
            </button>
        );
    });

    return (
        <>
            {renderPageNumbers}
        </>
    );
};

export default PaginationComponent;
