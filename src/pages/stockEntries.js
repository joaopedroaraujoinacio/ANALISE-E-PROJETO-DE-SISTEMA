import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Box, Button, Flex, Input, SimpleGrid, Table, Tbody, Td, Th, Thead, Tr, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const StockEntries = () => {
    const [amount, setAmount] = useState("");
    const [product_id, setProduct_id] = useState("0");
    const [listStockEntries, setStockEntries] = useState([]);
    const [listProducts, setListProducts] = useState([]);

    useEffect(() => {
        const db_stock_entries = localStorage.getItem("db_stock_entries")
            ? JSON.parse(localStorage.getItem("db_stock_entries"))
            : [];

        setStockEntries(db_stock_entries);

        const db_products = localStorage.getItem("db_products")
            ? JSON.parse(localStorage.getItem("db_products"))
            : [];

        setListProducts(db_products);

    }, []);

    const handleNewEntry = () => {
        if (!amount || (product_id === "0")) {
            return alert("Selecione o produto e a quantidade.");
        }

        const id = Math.random().toString(36).substring(2);

        if (listStockEntries && listStockEntries.length) {
            localStorage.setItem(
                "db_stock_entries",
                JSON.stringify([...listStockEntries, { id, amount, product_id }])
            );

            setStockEntries([...listStockEntries, { id, amount, product_id }]);
        } else {
            localStorage.setItem(
                "db_stock_entries",
                JSON.stringify([{ id, amount, product_id }])
            );

            setStockEntries([{ id, amount, product_id }]);
        }

        setAmount("");
        setProduct_id("0");
    };

    const removeEntries = (id) => {
        const newArray = listStockEntries.filter((item) => item.id !== id);

        localStorage.setItem("db_stock_entries", JSON.stringify(newArray));

        setStockEntries(newArray);
    };

    const getProductById = (id) => {
        return listProducts.filter((item) => item.id === id)[0]?.name;
    };

    return (
      <Flex background="#1A365D" minHeight="100vh" flexDirection="column">
        <Header />
        <Flex color="white" width="100%" my="10" maxW={1120} mx="auto" px="10">
          <Sidebar/>
          <Box w="100%">
            <SimpleGrid h="fit-content" spacing="8">
              <Select border="2px solid white" borderRadius="full" fontWeight="semibold" color="grey"
                  value={product_id}
                  onChange={(e) => setProduct_id(e.target.value)}>
                  <option value="0">Selecione o produto desejado.</option>
                  {listProducts &&
                      listProducts.length > 0 &&
                      listProducts.map((item, i) => (
                          <option key={i} value={item.id}>
                              {item.name}
                          </option>
                      ))}
              </Select>
              <Input border="2px solid white" borderRadius="full" fontWeight="semibold" color="white"
                  placeholder="Digite a quantidade." type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              />
              <Button Button w="45" borderRadius="full" color="green" onClick={handleNewEntry}>
                  SALVAR ENTRADA
              </Button>
            </SimpleGrid>
            <Box flex="1" marginBottom="20px">
              <Table mt="6">
                  <Thead>
                      <Tr>
                          <Th fontWeight="bold" color="white" fontSize="20px">
                            PRODUTO (ENTRADA)
                          </Th>
                          <Th fontWeight="bold" color="white" fontSize="20px">
                            QUANTIDADE
                          </Th>
                          <Th></Th>
                      </Tr>
                  </Thead>
                      <Tbody>
                          {listStockEntries.map((item, i) => (
                          <Tr key={i}>
                              <Td color="white">{getProductById(item.product_id)}</Td>
                              <Td color="white">{item.amount}</Td>
                              <Td textAlign="end">
                              <Button p="3" h="100%" fontSize="15" color="red" fontWeight="bold" borderRadius="full" onClick={() => removeEntries(item.id)}>
                                  EXCLUIR
                              </Button>
                              </Td>
                          </Tr>
                          ))}
                      </Tbody>
                  </Table>
              </Box>
          </Box>
      </Flex>
    </Flex>
  );
};

export default StockEntries;
