import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Create = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState(0)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    console.log(name, email, age)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const addUser = {name, email, age}
        const url = "http://localhost:5000"
        const options = {
            method: "POST",
            body: JSON.stringify(addUser),
            headers: {
                "Content-Type": "application/json",
            },
        }

        const response = await fetch(url, options)

        const result = await response.json()
        
        if (!response.ok) {
            console.log(result.error)
            setError(result.error)
        }
        if (response.ok) {
            console.log(result)
            setError("")
            setEmail("")
            setName("")
            setAge(0)
            navigate('/all')
        }
    }

  return (
    <div>
        {error && <div className="alert alert-danger">{error}</div>}
        <h1>Enter the data</h1>
        <form onSubmit={handleSubmit}>
                <div>
                <p>Name</p>
                <input type="text" placeholder='Type your name' className='w-50 m-2 text-center' value={name} onChange={(event) => setName(event.target.value)}/>
                <p>Email</p>
                <input type="text" className='w-50 m-2 text-center' placeholder='Type your Email' value={email} onChange={(event) => setEmail(event.target.value)}/>
                <p>Age</p>
                <input className='inputEl w-50 m-2 text-center' type="number" placeholder='Type your age' value={age} onChange={(event) => setAge(event.target.value)}/>
            </div>
            <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default Create