import { useState } from "react";
import { useBreakpoint } from "../hooks/useWindowSize";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage?: boolean;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage = true,
}: PaginationProps) {
  const [jumpToPage, setJumpToPage] = useState("");
  const { isMobile } = useBreakpoint();

  const canGoPrevious = currentPage > 1;
  const canGoNext = hasNextPage && currentPage < totalPages;

  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  const handleJumpToPage = () => {
    const pageNum = parseInt(jumpToPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setJumpToPage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleJumpToPage();
    }
  };

  const pageNumbers = getPageNumbers();

  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-3 pagination-wrapper">
        <div className="flex items-center gap-2">
          <button
            className="btn btn-sm"
            disabled={!canGoPrevious}
            onClick={handlePrevious}
          >
            ← Prev
          </button>

          <span className="px-3 py-1 text-sm font-medium">
            {currentPage} / {totalPages}
          </span>

          <button
            className="btn btn-sm"
            disabled={!canGoNext}
            onClick={handleNext}
          >
            Next →
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs whitespace-nowrap">Go to page:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            placeholder="Page"
            className="input input-xs input-bordered w-14"
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className="btn btn-xs" onClick={handleJumpToPage}>
            Go
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 pagination-wrapper">
      <div className="flex items-center gap-1">
        <button
          className="btn btn-sm"
          disabled={!canGoPrevious}
          onClick={handlePrevious}
        >
          Previous
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`btn btn-sm ${
              currentPage === page ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={!canGoNext}
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      {/* Jump to Page */}
      <div className="flex items-center gap-2">
        <span className="text-sm whitespace-nowrap">Go to:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          placeholder="Page"
          className="input input-sm input-bordered w-16"
          value={jumpToPage}
          onChange={(e) => setJumpToPage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="btn btn-sm" onClick={handleJumpToPage}>
          Go
        </button>
      </div>
    </div>
  );
}

export default Pagination;
