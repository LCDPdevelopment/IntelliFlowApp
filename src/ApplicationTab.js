import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Designer from './bpmnDesigner/Designer';
import FormDesigner from './formDesigner/FormDesigner';
import DesignerDMN from "./bpmnDesigner/DesignerDMN";

function ApplicationTab() {
    return (
        <>
 <Tabs>
    <TabList>
      <Tab>Business Process</Tab>
      <Tab>Forms</Tab>
      <Tab>DMN</Tab>
    </TabList>

    <TabPanel>
    <Designer />
    </TabPanel>
    <TabPanel>
    <FormDesigner />
    </TabPanel>
    <TabPanel>
    <DesignerDMN />
    </TabPanel>
  </Tabs>
           
        </>
    );
}


export default ApplicationTab;
