import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import UserTypeSwitch from "../switch/UserTypeSwitch";
import BrandLogo from "../logo/BrandLogo";
import HeaderMenu from "./HeaderMenu";
import HeaderButton from "./HeaderButton";
import { useCurrentUser, useLanding } from "../../front-provider/src";
import DashboardMenuContent from "../dashboard/menu/DashboardMenuContent";
import { UserTypeEnum } from "@utility/src";


const HeaderMobile: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, fetchingUser } = useCurrentUser();
  const { activeAccountUser, type } = useLanding()

  return (
    <Box>
      <Flex align="center" justify="flex-end">
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Open menu"
          variant="ghost"
          onClick={onOpen}
        />
      </Flex>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton top=".75rem"/>
            <DrawerBody mt={".5rem"} height="100%" display="flex" flexDir="column">
            <BrandLogo />
              <Flex flexDir="column" flexGrow="1">
                  <Box my={8}><HeaderButton onCloseMenu={onClose}/></Box>
                  {!user && !fetchingUser && <Box my="auto"><HeaderMenu onCloseMenu={onClose}/></Box>}
                  {user && !fetchingUser && <DashboardMenuContent onCloseMenu={onClose}/>}
                  {!activeAccountUser && (<UserTypeSwitch mt="auto" mx="auto" mb={2} onCloseMenu={onClose}/>)}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
}

export default HeaderMobile;