    import React, {Component} from 'react'
    import {Link} from 'react-router-dom'
    import './Read.css'

    class Read extends Component {
        state = {
            data: [],
            error: ""
        }

        componentDidMount() {
            this.getData()
            
        }

        handleDelete = async (id) => {
            const response = await fetch(`https://mern-backend-ytca.onrender.com/${id}`, {
                method: "DELETE",
            })
            const result = await response.json()

            if (response.ok) {
                this.setState({error: "Deleted Successfully"})
                this.setState({data: result})
                this.getData()
            }
        }

        getData = async () => {
            const response = await fetch("https://mern-backend-ytca.onrender.com");
            const result = await response.json()

            if (!response.ok) {
                console.log(result.error)
                this.setState({error: result.error})
            }
            if (response.ok) {
                console.log("Fetched Data: ", result)
                this.setState({data: result})
            }
        }

        render() {
            const {data} = this.state
            console.log(data)
            return (
                <div>
                    <h1>All Data</h1>
                    <div className='row'>
                        {Array.isArray(data) && data.map((ele) => (
                            <div key={ele._id} className='col-3'>
                                <div className='card'>
                                    <h5>{ele.name}</h5>
                                    <h6 className='emailHead'>{ele.email}</h6>
                                    <p>{ele.age}</p>
                                    <div className='rows'>
                                        <a href="#" className='me-2' onClick={() => this.handleDelete(ele._id)}>Delete</a>
                                        <Link to={`/${ele._id}`}>Edit</Link>
                                    </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            )
        }
    }

    export default Read
