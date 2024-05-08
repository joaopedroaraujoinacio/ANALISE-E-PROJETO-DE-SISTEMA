import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Box, Button, Flex, Input, SimpleGrid, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Balance = () => {
    const [listProducts, setListProducts] = useState([]);
    const [productFiltered, setProductFiltered] = useState("");
    const [cmbProducts, setCmbProducts] = useState([]);

    const BuildBalanceArray = () => {
        const db_stock_outputs = localStorage.getItem("db_stock_outputs")
        ? JSON.parse(localStorage.getItem("db_stock_outputs"))
        : [];

        const db_stock_entries = localStorage.getItem("db_stock_entries")
        ? JSON.parse(localStorage.getItem("db_stock_entries"))
        : [];

        const db_products = localStorage.getItem("db_products")
        ? JSON.parse(localStorage.getItem("db_products"))
        : [];

        const newArray = [];

        db_products.map((prod) => {
            const entries = db_stock_entries
                .filter((item) => item.product_id === prod.id)
                .map ((entry) => Number(entry.amount))
                .reduce((acc, cur) => acc + cur, 0);

            const outputs = db_stock_outputs
                .filter((item) => item.product_id === prod.id)
                .map ((entry) => Number(entry.amount))
                .reduce((acc, cur) => acc + cur, 0);

        const total = Number(entries) - Number(outputs);

        newArray.push({
            product_id: prod.id,
            product_name: prod.name,
            amount: total,
        });

        setListProducts(newArray);
        setCmbProducts(newArray);
        });

};


    useEffect (() => {
        BuildBalanceArray();
    }, []);

    const handleFilterProducts = () => {
        if (!productFiltered) {
            setListProducts(cmbProducts);
            return;
        }

        const newArray = cmbProducts.filter(
            (item) => item.product_id === productFiltered
        );

        setListProducts(newArray);
    };


    return (
        <Flex background="#1A365D" h="100vh" flexDirection="column">
      <Header />

      <Flex color="white" width="100%" height="10vh" my="10" maxW={1120} mx="auto" px="10">
                <Sidebar/>

                <Box w="100%">
                    <Box overflowY="auto" height="80vh">
                        <Table mt="6">
                            <Thead>
                                <Tr>
                                    <Th fontWeight="bold" color="white" fontSize="20px">
                                        NOME, ANO E EAN DO PRODUTO
                                    </Th>
                                    <Th fontWeight="bold" color="white" fontSize="20px">
                                        SALDO
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {listProducts.map((item, i) => (
                                    <Tr key={i}>
                                        <Td color="white">{item.product_name}</Td>
                                        <Td color="white">{item.amount}</Td>
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


export default Balance;