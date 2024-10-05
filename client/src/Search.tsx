import React, {ChangeEvent, FormEvent, useState} from 'react';
import './Search.css'

function Search() {
    const [formData, setFormData] = useState(''
    );

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormData(e.target.value);
        // console.log(formData);
    }

    // Function to handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); // Prevent page reload

        // Sending data to the Node.js server
        const response = await fetch('http://localhost:8080/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: formData }), // Sending the input data
        });

        const result = await response.json(); // Parsing the response
        console.log('Response from server:', result);


    };

    return (
        <form className='Main-form' onSubmit={handleSubmit}>
            <input
                className="query"
                value={formData}
                onChange={handleChange} />
            <button type="submit">Search</button>
        </form>
    );
}

export default Search;
