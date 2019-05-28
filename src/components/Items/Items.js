import React from 'react';
import Exercise from '../Exercise/Exercise';
import Content from '../Content/Content';

function Items(props) {

    /**
     * käydään data-taulukon jokainen elementti läpi ja
     * palautetaan Exercise-komponentin kautta tiedot yksi elementti kerrallaan ja
     * lisätään rows-muuttujaan.
     * avaimena käytetään elementin id:tä
     */
    let rows = props.data.map(exercise => {
            return (
                <Exercise data={exercise} key={exercise.id} />
            );
        }
    );

    return (
        <Content>
            <h1 className="otsikko">Suoritukset</h1>
            {rows}
        </Content>
    );
}

export default Items;