import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Box, Button, Flex, Input, SimpleGrid, Table, Tbody, Td, Th, Thead, Tr, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const stockOutputs = () => {
    const [amount, setAmount] = useState("");
    const [product_id, setProduct_id] = useState("0");
    const [listStockOutputs, setStockOutputs] = useState([]);
    const [listProducts, setListProducts] = useState([]);

    useEffect(() => {
        const db_stock_outputs = localStorage.getItem("db_stock_outputs")
            ? JSON.parse(localStorage.getItem("db_stock_outputs"))
            : [];

        setStockOutputs(db_stock_outputs);

        const db_products = localStorage.getItem("db_products")
            ? JSON.parse(localStorage.getItem("db_products"))
            : [];

        setListProducts(db_products);

    }, []);

    const handleNewOutput = () => {
        if (!amount | (product_id === "0")) {
            return alert("Selecione o produto e a quantidade.");
        }

        const id = Math.random().toString(36).substring(2);

        if (listStockOutputs && listStockOutputs.length) {
            localStorage.setItem(
                "db_stock_outputs",
                JSON.stringify([...listStockOutputs, { id, amount, product_id }])
            );

            setStockOutputs([...listStockOutputs, { id, amount, product_id }]);
        } else {
            localStorage.setItem(
                "db_stock_outputs",
                JSON.stringify([{ id, amount, product_id }])
        );

        setStockOutputs([{ id, amount, product_id }]);
    }
        
    setAmount("");
    setProduct_id("0");
};

    const removeOutput = (id) => {
        const newArray = listStockOutputs.filter((item) => item.id !== id);

        localStorage.setItem("db_stock_outputs", JSON.stringify(newArray));

        setStockOutputs(newArray);
    };

    const getProductById = (id) => {
        return listProducts.filter((item) => item.id === id)[0]?.name;
    };

    return (
        <Flex background="#1A365D" h="100vh" flexDirection="column">
      <Header />

      <Flex color="white" width="100%" height="10vh" my="10" maxW={1120} mx="auto" px="10">
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
                            <Button Button w="45" borderRadius="full" color="green" onClick={handleNewOutput}>
                                SALVAR SAÍDA
                            </Button>
                    </SimpleGrid>
                <Box overflowY="auto" height="80vh">
                <Table mt="6">
                    <Thead>
                        <Tr>
                            <Th fontWeight="bold" color="white" fontSize="20px">
                              PRODUTO (SAÍDA)
                            </Th>
                            <Th fontWeight="bold" color="white" fontSize="20px">
                              QUANTIDADE
                            </Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                        <Tbody>
                            {listStockOutputs.map((item, i) => (
                            <Tr key={i}>
                                <Td color="white">{getProductById(item.product_id)}</Td>
                                <Td color="white">{item.amount}</Td>
                                <Td textAlign="end">
                                <Button p="3" h="100%" fontSize="15" color="red" fontWeight="bold" borderRadius="full" onClick={() => removeOutput(item.id)}>
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

export default stockOutputs;