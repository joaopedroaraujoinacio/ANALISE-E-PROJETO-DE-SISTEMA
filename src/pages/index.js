import Header from "../components/Header";
import { Link as ChakraLink, Stack, Text, Box, Button, Flex, Input, SimpleGrid, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
    const { asPath } = useRouter();

    return (
        <Flex background="#1A365D" h="100vh" flexDirection="column"> 
            <Header />
      
            <Text mt="10" fontSize="20px" textAlign="center" fontWeight="black" color="white">
                LOGIN
            </Text>

            <Flex flexDirection="column" alignItems="center" mt="4">
                <Input w="20%" gap="10px" fontWeight="semibold" color="white" placeholder="Digite seu login." type="name" />
                <Input w="20%" gap="10px" fontWeight="semibold" color="white" placeholder="Digite sua senha." type="name" mt="4" />
            </Flex>

            <Stack mt="4" align="center">
                
              <Button bg="red" _hover={{ bg: "red" }} px="4" py="2" w="20%" borderRadius="full">
                <Link href="/estoque">
                  <Text textAlign="center" fontSize="lg" fontWeight="medium" color="white">
                  ENTRAR
                  </Text>
                </Link>
              </Button>
                
            </Stack>
        </Flex>
    );
};

export default Login;