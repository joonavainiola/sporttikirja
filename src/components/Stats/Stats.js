import React from 'react';
import Content from '../Content/Content';
import moment from 'moment';
import './Stats.css';

function Stats(props) {

    //haetaan kuluva viikko, kuukausi sekä vuosi
    let currentWeek = moment(new Date()).isoWeek();
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    //filteröidään suoritukset, joiden päivämäärä on kuluvalla viikolla
    let viikkoSuoritukset = props.data.filter(item => 
        moment(item.paivamaara).isoWeek() === currentWeek
    );

    //filteröidään suoritukset, joiden päivämäärä on kuluvalla kuulla
    let kkSuoritukset = props.data.filter(item => 
        new Date(item.paivamaara).getMonth() === currentMonth
    );

    //filteröidään suoritukset, joiden päivämäärä on kuluvana vuonna
    let vSuoritukset = props.data.filter(item => 
        new Date(item.paivamaara).getFullYear() === currentYear
    );

    //lasketaan taulukon elementtien tunnit yhteen
    let tunnit = props.data.reduce(function(total, amount) {
        return total + amount.tunnit
    }, 0);

    //lasketaan taulukon elementtien minuutit yhteen
    let minuutit = props.data.reduce(function(total, amount) {
        return total + amount.minuutit
    }, 0);

    /**
     * funktio, joka ottaa parametrina syötetyt minuutit ja
     * laskee niistä kokonaiset tunnit ja jäljellejäävät minuutit
     */
    let kesto = function(luku) {
        let tunnit = (luku / 60);
        let rtunnit = Math.floor(tunnit);
        let minuutit = (tunnit - rtunnit) * 60;
        let rminuutit = Math.round(minuutit);
        return rtunnit + "h " + rminuutit + "min";
    }

    /**
     * käytetään ylläolevaa funktiota laskemaan
     * suoritusten keskiarvokesto
     */
    let kestoKeskiarvo = kesto((tunnit * 60 + minuutit) / props.data.length);

    return (
        <Content>
            <h1 className="otsikko">Tilastot</h1>
            <div className="stats">
                <div className="stats__row">
                    <div className="stats__box">
                        <div className="stats__count">
                            {viikkoSuoritukset.length}
                        </div>
                        <div className="stats__text">
                            suoritusta<br/>tällä<br/>viikolla
                        </div>
                    </div>
                    <div className="stats__box">
                        <div className="stats__count">
                            {kkSuoritukset.length}
                        </div>
                        <div className="stats__text">
                            suoritusta<br/>tässä<br/>kuussa
                        </div>
                    </div>
                    <div className="stats__box">
                        <div className="stats__count">
                            {vSuoritukset.length}
                        </div>
                        <div className="stats__text">
                            suoritusta<br/>tänä<br/>vuonna
                        </div>
                    </div>
                </div>
                <div className="stats__row2">
                    <div className="stats__text">
                        Suoritusten keskiarvokesto:
                    </div>
                    <div className="stats__count2">
                        {kestoKeskiarvo}
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default Stats;