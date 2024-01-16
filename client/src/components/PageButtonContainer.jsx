import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageButtonContainer = () => {
  // Collect and initialize page numbering data
  const {
    data: { totalPages, currentPage },
  } = useAllJobsContext();
  const pages = Array.from({ length: totalPages }, (_, index) => {
    return index + 1;
  });

  // Page change handling
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const handlePageChange = (chosenPage) => {
    const searchParameters = new URLSearchParams(search);
    // console.log(searchParameters);
    searchParameters.set("page", chosenPage);
    // console.log(searchParameters);
    navigate(`${pathname}?${searchParameters.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => (
    <button
      className={`btn page-btn ${activeClass && "active"}`}
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
    >
      {pageNumber}
    </button>
  );

  const renderPageButtons = () => {
    const pageButtons = [];

    // Button for First Page
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    // Button for Before Current Page
    if (currentPage !== 1 && currentPage !== 2) {
      if (currentPage !== 3) {
        pageButtons.push(
          <span className="page-btn dots" key="dots-1">
            ...
          </span>
        );
      }
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      );
    }

    // Button for Current Page
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }

    // Button for After Current Page
    if (currentPage !== totalPages - 1 && currentPage !== totalPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      );
      if (currentPage !== totalPages - 2) {
        pageButtons.push(
          <span className="page-btn dots" key="dots+1">
            ...
          </span>
        );
      }
    }

    // Button for Last Page
    pageButtons.push(
      addPageButton({
        pageNumber: totalPages,
        activeClass: currentPage === totalPages,
      })
    );

    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) {
            prevPage = totalPages;
          }
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > totalPages) {
            nextPage = 1;
          }
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageButtonContainer;
