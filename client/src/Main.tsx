import React from 'react';
import './Main.css';
import Search from './Search';

function Main() {
    return (
        <div className="Main">
            <header className='Main-header'>
                <p>This is it.</p>
            {/*<form className="Main-form">*/}
            {/*    <input name="Main-input"/>*/}
            {/*    <button type="submit">Search</button>*/}
            {/*</form>*/}
                <Search></Search>



        </header>



        </div>

    )
}

export default Main;