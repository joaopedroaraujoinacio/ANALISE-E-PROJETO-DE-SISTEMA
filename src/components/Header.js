import React from "react";
import { Icon, iconButton, HStack, Text, Avatar, Flex, useBreakpointValue, IconButton } from "@chakra-ui/react";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { FiMenu } from "react-icons/fi";

const Header = () => {
    const isMobile = useBreakpointValue({
        base: true,
        lg: false,
    });

    const { onOpen } = useSidebarContext();

    return (
        <Flex as="header" w="100%" maxW="{1120}" h="20" mx="auto" px="2" py="2" align="center" boxShadow="0 7px 0 #FFFFFF" color="#63171B" fontWeight="bold" background="red"> 
        {isMobile && (
            <IconButton
                icon={<Icon as={FiMenu} />}
                onClick={onOpen}
                variant="unstyled"
                fontSize="35"
                mr="2"
                ></IconButton>
        )}
    <Text flex="1" textAlign="center" color="white" fontSize="xl">MARVELETRÔNICOS</Text>
</Flex>
    );
};

export default Header;
