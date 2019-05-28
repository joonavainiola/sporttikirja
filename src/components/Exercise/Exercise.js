import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Exercise.css';

function Exercise(props) {

    //käytetään Moment-pakettia muuttamaan päivämäärä haluttuun muotoon
    //..joka määritellään alempana format():lla 
    let paivamaara = moment(props.data.paivamaara);

    //palauttaa data-taulukon elementin tietoineen
    return (
      <div className="exercise">
        <div className="exercise__image">
          <i className={props.data.koodi}></i>
        </div>
        <div className="exercise__data">
          <div className="exercise__row">
            <div className="exercise__desc">
              {(props.data.laji === "" || props.data.laji === "Muu") ? props.data.kuvaus : props.data.laji}
            </div>
            <div className="exercise__date">{paivamaara.format("DD.MM.YY")}</div>
          </div>
          <div className="exercise__row">
            <div className="exercise__duration">{props.data.tunnit}h {props.data.minuutit}min</div>
            <div className="exercise__edit"><Link to={"/muokkaa/" + props.data.id}><i className="fas fa-edit"></i></Link></div>
          </div>
        </div>
      </div>
    );
}

export default Exercise;