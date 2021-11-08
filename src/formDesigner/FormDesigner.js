import React from 'react';
import { ReactFormBuilder, ElementStore } from 'react-form-builder2';
import axios from "axios";

import 'react-form-builder2/dist/app.css';
const getUrl = (cid) => `http://localhost:8080/formdetails/${cid}`;

class FormDesigner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formId: 'test' };
    this.formId = this.state.formId;
    this.handleChange = this.handleChange.bind(this);
  }

  formId;

  handleChange(event) {
    this.formId = event.target.value;
    const url = getUrl(this.formId);
    console.log('handleChange', url);
    ElementStore.dispatch('load', { loadUrl: url });
    this.setState({ formId: this.formId });
  }

  onLoad = async () => {
    const url = getUrl(this.formId);
    console.log('onLoad', url);
     var dataResponse = await axios
        .get(
            "http://localhost:8080/formdetails/test"
        )
        console.log("dataResponse",dataResponse.data);
        return dataResponse.data.task_data
        // return get(url);
  };

  onPost = (data) => {
    const postData = { xml: JSON.stringify(data),fileName:"test" };
    axios.post('http://localhost:8080/formdetails', postData)
    .then(response =>{
      console.log("Done");
    });
  };

  render() {
    return (
      <div className="App">
        <label>
          Select your form:          
        </label>
        <select className="form-control" 
            value={this.state.formId} 
            onChange={this.handleChange} >
          <option value="test">Form 1</option>
          <option value="2">Form 2</option>
        </select>
        <hr></hr>
        <ReactFormBuilder
          // data={content}
          onLoad={this.onLoad}
          onPost={this.onPost}
        />,
      </div>
    );
  }
}

export default FormDesigner;
