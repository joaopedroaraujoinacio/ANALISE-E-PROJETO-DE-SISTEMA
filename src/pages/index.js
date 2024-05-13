import Header from "../components/Header";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
    return (
        <Flex background="#1A365D" minHeight="100vh" flexDirection="column">
            <Header />
            <Flex color="white" width="100%" my="10" maxW={1120} mx="auto" px="10">
                <Box w="100%">
                    <Text fontSize="20px" textAlign="center" fontWeight="black" color="white">
                        LOGIN
                    </Text>
                    <Flex flexDirection="column" alignItems="center" mt="4">
                        <Input border="2px solid white" borderRadius="full" width="200px" fontWeight="semibold" color="white" placeholder="Digite seu login." type="name" />
                        <Input border="2px solid white" borderRadius="full" width="200px" fontWeight="semibold" color="white" placeholder="Digite sua senha." type="password" mt="4" />
                    </Flex>
                    <Flex justifyContent="center" mt="4">
                        <Button border="3px solid white" bg="red" _hover={{ bg: "red" }} px="4" py="2" width="200px" borderRadius="full">
                            <Link href="/estoque">
                                <Text textAlign="center" fontSize="lg" fontWeight="medium" color="white">
                                    ENTRAR
                                </Text>
                            </Link>
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Login;
