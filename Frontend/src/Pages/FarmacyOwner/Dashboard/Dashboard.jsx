import { useState } from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import Requests from "./Requests";
import History from "./History";

  export function Dashboard_Owner() {
    const [activeTab, setActiveTab] = useState("History");
    const data = [
      {
        label: "HISTORY",
        value: "History",
        desc: <History/>,
      },
      {
        label: "REQUEST",
        value: "Req",
        desc: <Requests/>,
      },
    ];
    return (
      <Tabs value={activeTab}>
       <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
      </Tabs>
    );
  }