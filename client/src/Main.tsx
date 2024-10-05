import React, {useState} from 'react';
import './Main.css';
import Search from './Search';
import Welcome from './Welcome';

function Main() {
    const [loggedIn, setLoggedIn] = useState(false
    );

    return (
        <div className="Main-header">
                {loggedIn ? <Search /> : <Welcome />}


                {/*<Search></Search>*/}



        </div>

    )
}

export default Main;