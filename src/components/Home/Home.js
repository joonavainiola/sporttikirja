import React from 'react';
import Content from '../Content/Content';
import Button from '../button';
import { Link } from 'react-router-dom';
import './Home.css';

//etusivu, mikäli käyttäjä on kirjautunut sisään
function Home() {
    return (
        <Content>
            <div className="frontpage">
                <div className="frontpage__welcome">
                    <h2>Hei, </h2>
                </div>
                <div className="frontpage__headings">
                    <h1>oletko urheillut?</h1>
                    <h3>Lisää uusi suoritus!</h3>
                </div>
                <div className="frontpage__button">
                    <Link to="/lisaa">
                        <Button black round><i className="fas fa-plus"></i></Button>
                    </Link>
                </div>
            </div>
        </Content>
    );
}

export default Home;