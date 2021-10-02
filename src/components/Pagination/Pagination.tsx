import {
  Pagination as PaginationComponent,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
  PaginationSeparator,
} from "@ajna/pagination";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Pagination = ({ data, page, setPage }: any) => {
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: data?.pages,
    initialState: { currentPage: page },
    total: data?.totalFiltered,
    limits: {
      outer: 2,
      inner: 1,
    },
  });
  return (
    <PaginationComponent
      pagesCount={pagesCount}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      <PaginationContainer p="2">
        <PaginationPrevious
          mr="2"
          size="sm"
          iconSpacing="0"
          leftIcon={<ChevronLeftIcon />}
          onClick={() => setPage((prev: number) => prev - 1)}
        />

        <PaginationPageGroup
          separator={
            <PaginationSeparator
              size="sm"
              _hover={{ bg: "gray.500" }}
              bg={useColorModeValue("white", "gray.600")}
            />
          }
        >
          {pages.map((pages: number) => (
            <PaginationPage
              key={`pagination_page_${pages}`}
              size="sm"
              page={pages}
              mx="1"
              width="1.5rem"
              colorScheme={page === pages ? "teal" : "gray"}
              onClick={() => setPage(pages)}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext
          ml="2"
          size="sm"
          iconSpacing="0"
          rightIcon={<ChevronRightIcon />}
          onClick={() => setPage((prev: number) => prev + 1)}
        />
      </PaginationContainer>
    </PaginationComponent>
  );
};

export default Pagination;
