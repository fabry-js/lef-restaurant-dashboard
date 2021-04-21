import React, { useContext } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Settings from "./Settings";
import { UserContext } from "../../providers/AuthProvider";
import Dashboard from "./Dashboard";
import AlreadyCompletedOrders from "./AlreadyCompletedOrders";

const Landing = () => {
  const history = useHistory();
  const { actualUser } = useContext(UserContext);
  return (
    <Box p="10">
      <Text textAlign="center" fontSize="2xl">
        Salve👋, {actualUser.restaurantName}{" "}
      </Text>
      <Box p="10">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab onClick={() => history.push("/")}>Home</Tab>
            <Tab>Ordini Già Completati</Tab>
            <Tab>Impostazioni</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Dashboard />
            </TabPanel>
            <TabPanel>
              <AlreadyCompletedOrders />
            </TabPanel>
            <TabPanel>
              <Settings />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Landing;
