import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
`;

const SearchBar = styled.input`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
  outline: none;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: #f5f5f5;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const Th = styled.th`
  padding: 8px;
  text-align: left;
  font-size: 14px;
`;

const Tbody = styled.tbody``;

const Td = styled.td`
  padding: 8px;
  text-align: left;
  font-size: 14px;
`;

export { Wrapper, Header, SearchBar, Table, Thead, Tr, Th, Tbody, Td };
