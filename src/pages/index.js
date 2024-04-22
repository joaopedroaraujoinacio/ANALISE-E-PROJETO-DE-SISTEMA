import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Box, Button, Flex, Input, SimpleGrid, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Produtos = () => {
    const [name, setName] = useState("");
    const [listProducts, setListProducts] = useState([]);
  
    useEffect(() => {
      const db_products = localStorage.getItem("db_products")
        ? JSON.parse(localStorage.getItem("db_products"))
        : [];
  
      setListProducts(db_products);
    }, []);
  
    const handleNewProduct = () => {
      if (!name) return;
      if (verifyProductName()) {
        alert("O produto já se encontra cadastrado.");
        return;
      }
  
      const id = Math.random().toString(36).substring(2);
  
      if (listProducts && listProducts.length) {
        localStorage.setItem(
          "db_products",
          JSON.stringify([...listProducts, { id, name }])
        );
  
        setListProducts([...listProducts, { id, name }]);
      } else {
        localStorage.setItem("db_products", JSON.stringify([{ id, name }]));
  
        setListProducts([{ id, name }]);
      }
  
      setName("");
    };
  
    const verifyProductName = () => {
      return !!listProducts.find((prod) => prod.name === name);
    };
  
    const removeProduct = (id) => {
      const db_stock_outputs = localStorage.getItem("db_stock_outputs")
        ? JSON.parse(localStorage.getItem("db_stock_outputs"))
        : [];
  
      const db_stock_entries = localStorage.getItem("db_stock_entries")
        ? JSON.parse(localStorage.getItem("db_stock_entries"))
        : [];
  
      const hasOutputs = db_stock_outputs.filter(
        (item) => item.product_id === id
      ).length;
      const hasEntries = db_stock_entries.filter(
        (item) => item.product_id === id
      ).length;
  
      if (hasEntries || hasOutputs) {
        alert("Esse produto foi movimentado.");
        return;
      }
  
      const newArray = listProducts.filter((prod) => prod.id !== id);
  
      localStorage.setItem("db_products", JSON.stringify(newArray));
  
      setListProducts(newArray);
    };
  
    return (
      <Flex background="#1A365D" h="100vh" flexDirection="column">
        <Header />
  
        <Flex color="white" width="100%" height="10vh" my="10" maxW={1120} mx="auto" px="10">
          <Sidebar />  
          <Box w="100%" color="black">
            <SimpleGrid  h="fit-content" spacing="8">
              <Input fontWeight="semibold" color="white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Insira aqui o nome do produto que deseja cadastrar."/>
              <Button w="45" borderRadius="full" color="green" onClick={handleNewProduct}>
                CADASTRAR PRODUTO
              </Button>
            </SimpleGrid>
  
            <Box overflowY="auto" height="80vh">
              <Table mt="5">
                <Thead>
                  <Tr>
                    <Th fontWeight="bold" color="white" fontSize="20px">
                      PRODUTOS CADASTRADOS
                    </Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {listProducts.map((item, i) => (
                    <Tr key={i}>
                      <Td color="white" fontWeight="semibold" fontSize="17"> {item.name}</Td>
                      <Td textAlign="end">
                        <Button p="3" h="100%" fontSize="15"  color="red" fontWeight="bold" borderRadius="full" onClick={() => removeProduct(item.id)}
                        >
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


  export default Produtos;