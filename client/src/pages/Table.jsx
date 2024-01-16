import React from "react";
import {
  Wrapper,
  Header,
  SearchBar,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "../assets/wrappers/Table";

const customers = [
  {
    name: "Text 14px",
    phone: "Text 14px",
    email: "Text 14px",
    address: "Text 14px",
    status: "Text 14px",
  },
  {
    name: "Text 14px",
    phone: "Text 14px",
    email: "Text 140x",
    address: "Text 14px",
    status: "Text 14px",
  },
  {
    name: "Text 14px",
    phone: "Text 14px",
    email: "Text 140x",
    address: "Text 14px",
    status: "Text 14px",
  },
  {
    name: "Text 14px",
    phone: "Text 14px",
    email: "Text 140x",
    address: "Text 14px",
    status: "Text 14px",
  },
  {
    name: "Text 14px",
    phone: "Text 14px",
    email: "Text 140x",
    address: "Text 14px",
    status: "Text 14px",
  },
  {
    name: "Text 14px",
    phone: "Text 14px",
    email: "Text 140x",
    address: "Text 14px",
    status: "Text 14px",
  },
  {
    name: "Text 14px",
    phone: "Text 14px",
    email: "Text 140x",
    address: "Text 14px",
    status: "Text 14px",
  },
  {
    name: "Text 14px",
    phone: "Text 14px",
    email: "Text 140x",
    address: "Text 14px",
    status: "Text 14px",
  },
  {
    name: "Text 14px",
    phone: "Text 14px",
    email: "Text 140x",
    address: "Text 14px",
    status: "Text 14px",
  },
  // ... add more customer data
];

const TableComponent = () => (
  <Wrapper>
    <Header>
      <div>All Contacts</div>
      <div>Customers</div>
      <button>Add New</button>
      <SearchBar placeholder="Search..." />
    </Header>
    <Table>
      <Thead>
        <Tr>
          <Th>Customer</Th>
          <Th>Phone</Th>
          <Th>Email</Th>
          <Th>Address</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {customers.map((customer) => (
          <Tr key={customer.name}>
            <Td>{customer.name}</Td>
            <Td>{customer.phone}</Td>
            <Td>{customer.email}</Td>
            <Td>{customer.address}</Td>
            <Td>{customer.status}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Wrapper>
);

export default TableComponent;
