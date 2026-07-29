import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 9,
}) => {
  if (totalPages <= 1) return null;

  /*Calculates the frist job number on the current page Like on 3rd page 
    startItem = (3-1)*9+1 = 18+1 =19 
    Page 3rd starts with job 19 and end item
    endItem = Math.min(3*9, 21) = 21 Job*/
  //Use of Math.min is if there are only 21 jobs then it shows the 19-21
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  /*get the page numbers to show and disable the prev button if on page 1
    use 5 pages visible if there are more than 5 pages*/
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    /*use Math.max to get the first page number and Math.min to get the last page number*/
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    /*if there are less than 5 pages then start from the last page*/
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-border/80">
      {/* Item summary */}
      <div className="text-xs font-semibold text-text-secondary">
        Showing <span className="text-text font-bold">{startItem}</span> -{" "}
        <span className="text-text font-bold">{endItem}</span> of{" "}
        <span className="text-text font-bold">{totalItems}</span> jobs
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-10 w-10 p-0 rounded-xl"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4 text-text" />
        </Button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-10 w-10 rounded-xl text-xs font-bold transition-all duration-200 ${currentPage === page
              ? "bg-primary text-white shadow-sm"
              : "bg-surface border border-border text-text hover:bg-section hover:border-primary/40"
              }`}
          >
            {page}
          </button>
        ))}

        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-10 w-10 p-0 rounded-xl"
          aria-label="Next Page"
        >
          <ChevronRight className="w-4 h-4 text-text" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
