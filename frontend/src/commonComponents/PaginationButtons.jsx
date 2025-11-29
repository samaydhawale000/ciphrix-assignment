import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export const PaginationButtons = ({ currentPage, totalPages, onPageChange }) => {
  return (
 <Pagination.Root
  count={totalPages*10}
  page={currentPage}
  onPageChange={(e) => onPageChange(e.page)}
>
  <ButtonGroup gap="4" size="sm" variant="ghost">
    <Pagination.PrevTrigger asChild>
      <IconButton bgColor={'gray.500'}>
        <HiChevronLeft color="#fff"/>
      </IconButton>
    </Pagination.PrevTrigger >

    <Pagination.PageText color="#848484ff"/>

    <Pagination.NextTrigger asChild>
      <IconButton bgColor={'gray.500'}>
        <HiChevronRight color="#fff"/>
      </IconButton>
    </Pagination.NextTrigger>
  </ButtonGroup>
</Pagination.Root>
  );
};
