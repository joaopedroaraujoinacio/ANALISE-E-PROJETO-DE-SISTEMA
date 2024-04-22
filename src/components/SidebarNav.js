import React from "react";
import { Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const SidebarNav = () => {
    const { asPath } = useRouter();

    return (
        <Stack spacing="10">
          <Stack>
            <Text fontSize="20px" fontWeight="black" px="15" color="white">
              NOSSO ESTOQUE
            </Text>
            <Stack>
              <ChakraLink
                bg="red"
                _hover={{ bg: "red" }}
                px="4" py="2" w="100%"
                borderRadius="full"
              >
                <Link href="/balance">
                  <Text fontSize="lg" fontWeight="medium" color="white">
                    ESTOQUE
                  </Text>
                </Link>
              </ChakraLink>
            </Stack>
          </Stack>
          <Stack>
            <Text fontSize="20px" fontWeight="black" px="15" color="white">
              MOVIMENTAÇÕES
            </Text>
            <Stack>
              <ChakraLink
                bg="red"
                _hover={{ bg: "red" }}
                px="4" py="2" w="100%"
                borderRadius="full"
              >
                <Link href="/stockEntries">
                  <Text fontSize="lg" fontWeight="medium" color="white">
                    ENTRADAS
                  </Text>
                </Link>
              </ChakraLink>
              <ChakraLink
                bg="red"
                _hover={{ bg: "red" }}
                px="4" py="2" w="100%"
                borderRadius="full"
              >
                <Link href="/stockOutputs">
                  <Text fontSize="md" fontWeight="medium" color="white">
                    SAÍDAS
                  </Text>
                </Link>
              </ChakraLink>
            </Stack>
          </Stack>
          <Stack>
            <Text fontSize="20px" fontWeight="black" px="15" color="white">
              CADASTRAR
            </Text>
            <Stack>
              <ChakraLink
                bg="red"
                _hover={{ bg: "red" }}
                px="4" py="2" w="100%"
                borderRadius="full"
              >
                <Link href="/">
                  <Text fontSize="lg" fontWeight="medium" color="white">
                    PRODUTOS
                  </Text>
                </Link>
              </ChakraLink>
            </Stack>
          </Stack>
        </Stack>
    );
};

export default SidebarNav;