import { useState } from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import Requests from "./Requests";

  export function Dashboard_Customer() {
    const [activeTab, setActiveTab] = useState("History");
    const data = [
      {
        label: "HISTORY",
        value: "History",
        desc: `It really matters and then like it really doesn't matter.
        What matters is the people who are sparked by it. And the people 
        who are like offended by it, it doesn't matter.`,
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