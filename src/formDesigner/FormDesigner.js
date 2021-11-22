import React from 'react';
import Select from 'react-select';

import { ReactFormBuilder, ElementStore } from 'react-form-builder2';
import axios from "axios";

import 'react-form-builder2/dist/app.css';
const getUrl = (cid) => `http://localhost:8080/formdetails/${cid}`;

class FormDesigner extends React.Component {
  constructor(props) {
    super(props);

    const items = [{
      key: 'Header',
    }, {
      key: 'TextInput',
    }, {
      key: 'TextArea',
    }, {
      key: 'RadioButtons',
    }, {
      key: 'Checkboxes',
    }, {
      key: 'Image',
    }];
    this.state={formElem:[],formId:0}
    this.formId=this.state.formId;

    
    var elements=  axios.get('http://localhost:8080/BPMNprocess/formElements/'+this.getQueryVariable('id') )    .then((r) => {
      console.log("r.data",r);
      var data= JSON.parse(JSON.stringify(r.data))
      console.log("elements",data.formElements);
      this.setState({ formElem: data.formElements});
      console.log("this.state.formElem",this.state.formElem);
    })


    // this.formId = this.state.formId;
    this.handleChange = this.handleChange.bind(this);
  }
  loadData=async()=>{
    
  }

  formId;

  handleChange(event) {
    console.log("event",event);
    this.formId = event.value;
    const url = getUrl(this.formId);
    console.log('handleChange', url);
    ElementStore.dispatch('load', { loadUrl: url });
    this.setState({ formId: this.formId });
  }
  getQueryVariable= (variable) =>
  {
          var query = window.location.search.substring(1);
          console.log(query)//"app=article&act=news_content&aid=160990"
          var vars = query.split("&");
          console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
          for (var i=0;i<vars.length;i++) {
                      var pair = vars[i].split("=");
                      console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ] 
          if(pair[0] == variable){return pair[1];}
           }
           return(false);
  }
  onLoad = async () => {
    const url = getUrl(this.formId);
    console.log('onLoad', url);
     var dataResponse = await axios
        .get(
          url
        )
        console.log("dataResponse",dataResponse.data);
        return dataResponse.data.task_data
        // return get(url);
  };

  onPost = (data) => {
    const postData = { xml: JSON.stringify(data),fileName:this.formId };
    axios.post('http://localhost:8080/formdetails', postData)
    .then(response =>{
      console.log("Done");
    });
  };
  renderList() {
    return (this.state.formElem.map(data =>({label:data,value:data})))
   }
   
  render() {
    return (
      <div className="App">
        <label>
          Select your form:          
        </label>
        <Select className="form-control" 
            value={this.state.formId} 
            onChange={this.handleChange} 
            options={this.renderList()}

             />
        
        <hr></hr>
        <ReactFormBuilder
          // data={content}
          onLoad={this.onLoad}
          onPost={this.onPost}
          toolbarItems={this.items}

        />,
      </div>
    );
  }
}

export default FormDesigner;
