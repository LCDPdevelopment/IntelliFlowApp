import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation
} from 'react-router-dom'
// import * as BpmnEditor from "@kogito-tooling/kie-editors-standalone/dist/bpmn"
import * as BpmnEditor from "@kogito-tooling/kie-editors-standalone/dist/dmn"


import BpmnJS from 'bpmn-js/dist/bpmn-navigated-viewer.production.min.js';


import axios from "axios";

function DesignerDMN(props) {
  const useQuery= () => {
    return new URLSearchParams(useLocation().search);
}
  const params = useQuery();
  console.log("params",params.get('id'))

    var editor;
  var [diagram, diagramSet] = useState("");
  const container = document.getElementById("dmncontainer");
  console.log("container",container);
  useEffect(() => {
    if (diagram.length === 0) {
      try {
        axios
        .get(
          "http://localhost:8080/BPMNprocess/readDMN/"+params.get('id'), { headers: { "Content-Type": "application/json" } }
        )
        .then((r) => {
          console.log("r.data",r);
          if(r.data=="")
          {
            diagramSet("NoData");

          }else
          {
            diagramSet(r.data);

          }
        })
        .catch((e) => {
          console.log("error",e);
        });
      } catch (error) {
        console.log();
      }
    }
  }, [diagram]);
  if (diagram.length > 0) {
if(diagram=="NoData")diagram="";
    editor= BpmnEditor.open({
        container: container,
        initialContent: Promise.resolve(diagram),
        readOnly: false
      });
      editor.subscribeToContentChanges(changeincontent);

  }
 
  async function changeincontent(e){
      var viewer = new BpmnJS({});
      var xml = await editor.getContent()

      viewer.importXML(xml, function(err) {

        if (err) {
        } else {
          // <<====== ***** HERE *****
          var elementRegistry = viewer.get('elementRegistry');
          elementRegistry.forEach(function(elem, gfx) {
            if (elem.businessObject.$instanceOf('bpmn:UserTask')){
              // console.log("userTask",elem.businessObject.$parent.id)
              // do something with the task 
            }
          });
        }
      });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    var data = await editor.getContent()
    var viewer = new BpmnJS({});
    var formElements=[];
    await viewer.importXML(data, async function(err) {

      if (err) {
      } else {
        // <<====== ***** HERE *****
        // var elementRegistry = viewer.get('elementRegistry');
        // elementRegistry.forEach(async function(elem, gfx) {
        //   if (elem.businessObject.$instanceOf('bpmn:UserTask')){
        //     console.log("userTask",elem)
        //     formElements.push(elem.businessObject.name)
        //     // do something with the task
        //   }
        // });
        // const postData = { appName: params.get('id'),forElements:formElements };
        // axios.post('http://localhost:8080/BPMNprocess/formElements', postData)

        console.log("formElements",formElements);
      }
    });
    // console.log(formElements);
    const postData = { xml: data,fileName:params.get('id') };
    axios.post('http://localhost:8080/BPMNprocess/createDMN', postData)
    .then(response =>{
      console.log("Done");
    });


    
  }
  // console.log("props.location",props.location)//123

  // const query = new URLSearchParams(props.location.search);
  // const token = query.get('id') 
  // console.log(token)//123

  return (
    <div className="App">
      <div
        id="dmncontainer"
        style={{
          border: "1px solid #000000",
          height: "90vh",
          width: "90vw",
          margin: "auto"
        }}
      ></div>
      <button  onClick={handleSubmit}>Save</button>
    </div>
  );
}
export default DesignerDMN;
