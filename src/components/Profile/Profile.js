import React from 'react';
import Content from '../Content/Content';
import Button from '../button';
import './Profile.css';

function Profile(props) {

    //Käytetään staten user-muuttujan tietoja,
    //eli tässä tapauksessa käyttäjän Google-tilin tietoja.
    //Profile-komponentissa käyttäjä voi kirjautua ulos
    return (
        <Content>
            <h1 className="otsikko">Profiili</h1>
            <div className="profile">
                <div><img src={props.user.photoURL} alt="" /></div>
                <p className="profile__name">{props.user.displayName}</p>
                <p className="profile__email">{props.user.email}</p>
                <Button special onClick={props.onLogout}>KIRJAUDU ULOS</Button>
            </div>
        </Content>
    );

}

export default Profile;