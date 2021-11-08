import React, { useEffect, useState } from "react";
import * as BpmnEditor from "@kogito-tooling/kie-editors-standalone/dist/bpmn"
import BpmnJS from 'bpmn-js/dist/bpmn-navigated-viewer.production.min.js';


import axios from "axios";

function Designer() {
    var editor;
  var [diagram, diagramSet] = useState("");
  const container = document.getElementById("container");
  console.log("container",container);
  useEffect(() => {
    if (diagram.length === 0) {
      try {
        axios
        .get(
          "http://localhost:8080/BPMNprocess/read", { headers: { "Content-Type": "application/json" } }
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
      const viewer = new BpmnJS({});
      var xml = await editor.getContent()

      viewer.importXML(xml, function(err) {

        if (err) {
        } else {
          // <<====== ***** HERE *****
          var elementRegistry = viewer.get('elementRegistry');
          elementRegistry.forEach(function(elem, gfx) {
            if (elem.businessObject.$instanceOf('bpmn:UserTask')){
              console.log("userTask",elem)
              // do something with the task
            }
          });
        }
      });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    var data = await editor.getContent()
    console.log(data);
    const postData = { xml: data,filename:"test" };
    axios.post('http://localhost:8080/BPMNprocess/create', postData)
    .then(response =>{
      console.log("Done");
    });
    
  }

  return (
    <div className="App">
      <div
        id="container"
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
export default Designer;
