import React from 'react';
import axios from 'axios';
class Form extends React.Component{
    state = {description:"",author:""};
    onSubmitChange =(event)=>
    {
console.log(this.state.description);
event.preventDefault();
axios.post('https://jsonplaceholder.typicode.com/todos',this.state)
.then(res=>console.log(res));
}
    render()
    {
        return(
            <div>
                <form onSubmit={this.onSubmitChange}>
                    <label>Description of Event/Notice:</label>
                    <input type="text" placeholder="description"
                     onChange={(event)=>this.setState({description:event.target.value})}>
                    </input>
                    <br></br>
                    <label>Author</label>
                    <input type="text" placeholder="author"
                    onChange={(event)=>this.setState({author:event.target.value})}
                    ></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    };
}
export default Form;