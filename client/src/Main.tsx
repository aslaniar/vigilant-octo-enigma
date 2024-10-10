import React, {useState} from 'react';
import './Main.css';
import Search from './Search';
import Welcome from './Welcome';

function Main() {
    const [loggedIn, setLoggedIn] = useState(false
    );

    let authCode: string;
    function authConfirmed(code: string) {
        setLoggedIn(true)
        authCode = code
    }



    return (
        <div className="Main-header">
                {loggedIn ? <Search /> : <Welcome authConfirmed={authConfirmed} />}

                {/*<Search></Search>*/}



        </div>

    )
}

export default Main;