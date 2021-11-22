import React from 'react';
import Select from 'react-select';

import { ReactFormGenerator, ElementStore } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import axios from "axios";

const getUrl = (cid) => `http://localhost:8080/formdetails/${cid}`;

class ApplyLeave extends React.Component {

    constructor(props) {
        super(props);
        this.state = { formData: [], applicationid: 0, taskid: 0 ,formname:""}

        const update = this._onChange.bind(this);
        ElementStore.subscribe(state => update(state.data));

    }
    _onChange(formData) {
        this.setState({
            formData,
        });
    }
    async componentDidMount() {

        axios
            .get(
                "http://localhost:8080/ApplyLeave", { headers: { "Content-Type": "application/json" } }
            )
            .then((r) => {
                if (r.data.length == 0) {
                    axios
                        .post(
                            "http://localhost:8080/ApplyLeave", { headers: { "Content-Type": "application/json" } }
                        ).then((r) => {
                            this.setState({ applicationid: r.data.id });

                            axios
                            .get(
                                "http://localhost:8080/ApplyLeave/"+this.state.applicationid+"/tasks", { headers: { "Content-Type": "application/json" } }
                            ).then((r) => {
                                this.setState({ taskid: r.data[0].id });
                                this.setState({ formname: r.data[0].name });
                                axios
                                .get(
                                    "http://localhost:8080/formdetails/"+this.state.formname, { headers: { "Content-Type": "application/json" } }
                                )
                                .then((r) => {
                                    console.log("r.data", r);
                                    if (r.data == "") {
                                        this.setState({ formData: r.data.task_data });
                        
                                    } else {
                                        this.setState({ formData: r.data.task_data });
                                    }
                                })
                            })    




                        })
                } else {
                    this.setState({ applicationid: r.data[0].id });

                    axios
                    .get(
                        "http://localhost:8080/ApplyLeave/"+this.state.applicationid+"/tasks", { headers: { "Content-Type": "application/json" } }
                    ).then((r) => {
                        this.setState({ taskid: r.data[0].id });
                        this.setState({ formname: r.data[0].name });
                        
        axios
        .get(
            "http://localhost:8080/formdetails/"+this.state.formname, { headers: { "Content-Type": "application/json" } }
        )
        .then((r) => {
            console.log("r.data", r);
            if (r.data == "") {
                this.setState({ formData: r.data.task_data });

            } else {
                this.setState({ formData: r.data.task_data });
            }
        })
                    })    






                }
            })



    }

    handleChange(event) { }
    getQueryVariable = (variable) => {
        var query = window.location.search.substring(1);
        console.log(query)//"app=article&act=news_content&aid=160990"
        var vars = query.split("&");
        console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ] 
            if (pair[0] == variable) { return pair[1]; }
        }
        return (false);
    }
    onLoad = async () => {

        const url = getUrl(this.formId);
        console.log('onLoad', url);
        var dataResponse = await axios
            .get(
                "http://localhost:8080/formdetails/Apply%20Leave"
            )
        console.log("dataResponse", dataResponse.data);
        return dataResponse.data.task_data
        // return get(url);

    };

    onPost = (data) => {
        console.log(data);

        const postData = { leavetype: data[0].value,noofdays:data[1].value };

        axios
        .post(
            "http://localhost:8080/ApplyLeave/"+this.state.applicationid+"/"+this.state.formname+"/"+this.state.taskid,postData, { headers: { "Content-Type": "application/json" } }
        ).then((r) => {
         
        })
    };
    renderList() {
        return (this.state.formElem.map(data => ({ label: data, value: data })))
    }
    render() {
        return (
            <div className="App">

                <hr></hr>
                {/* details: {JSON.stringify(this.state.formname)} */}

                <ReactFormGenerator
                //  answer_data={[{name:"text_input_5E61103B-97C5-49F4-838F-D5177EB1C3F7",value:"123"}]}
    onSubmit={this.onPost}
    data=  {this.state.formData}
  />
            </div>
        );
    }
}

export default ApplyLeave;
