import React, { Component } from 'react';
import { withRouter } from 'react-router';
import uuid from 'uuid';
import './ItemForm.css';
import Button from '../button';

class ItemForm extends Component {

    constructor(props) {
        super(props);
        //katsotaan, onko data tullut propsien kautta
        const data = props.data ? props.data : {
            koodi: "",
            laji: "",
            kuvaus: "",
            paivamaara: "",
            tunnit: 0,
            minuutit: 0
        }
        this.state = {
            data: data
        }
        //bindaukset konstruktorissa
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    //kun käyttäjä muuttaa syötteen tietoa
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        });
    }

    //käyttäjän painaessa Peruuta-nappia lomakkeella
    handleCancel(event) {
        event.preventDefault();
        this.props.history.goBack();
    }

    //käyttäjän lähettäessä tai tallentaessa tiedot
    handleSubmit(event) {
        event.preventDefault();
        let data = Object.assign({}, this.state.data);
        data.tunnit = parseFloat(data.tunnit);
        data.minuutit = parseFloat(data.minuutit);
        if (data.laji === "Jalkapallo") {
            data.koodi = "far fa-futbol";
        } else if (data.laji === "Jääkiekko") {
            data.koodi = "fas fa-hockey-puck";
        } else if (data.laji === "Koripallo") {
            data.koodi = "fas fa-basketball-ball";
        } else if (data.laji === "Kuntosali") {
            data.koodi = "fas fa-dumbbell";
        } else if (data.laji === "Lenkkeily") {
            data.koodi = "fas fa-running";
        } else if (data.laji === "Pyöräily") {
            data.koodi = "fas fa-bicycle";
        } else if (data.laji === "Uinti") {
            data.koodi = "fas fa-swimmer";
        } else {
            data.koodi = "fas fa-walking";
        }
        //mikäli id:tä ei vielä ole, luodaan sellainen
        data.id = data.id ? data.id : uuid.v4();
        this.props.onFormSubmit(data);
        this.props.history.push("/suoritukset");
    }

    //käyttäjän painaessa Poista-nappia EditItem-komponentilla
    handleDeleteItem(event) {
        event.preventDefault();
        this.props.onDeleteItem(this.state.data.id);
        this.props.history.push("/suoritukset");
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="itemform">

                    <div className="itemform__row">
                        <div>
                            <label htmlFor="laji">Laji:</label>
                            <select name="laji" value={this.state.data.laji} onChange={this.handleInputChange} >
                                <option value="" defaultValue disabled hidden></option>
                                <option value="Jalkapallo">Jalkapallo</option>
                                <option value="Jääkiekko">Jääkiekko</option>
                                <option value="Koripallo">Koripallo</option>
                                <option value="Kuntosali">Kuntosali</option>
                                <option value="Lenkkeily">Lenkkeily</option>
                                <option value="Pyöräily">Pyöräily</option>
                                <option value="Uinti">Uinti</option>
                                <option value="Muu">Muu</option>
                            </select>
                        </div>
                    </div>

                    <div className="itemform__row">
                        <div>
                            <label htmlFor="kuvaus">Muu, mikä?</label>
                            <input type="text" name="kuvaus" maxLength="25" value={this.state.data.kuvaus} onChange={this.handleInputChange} />
                        </div>
                    </div>

                    <div className="itemform__row">
                        <div>
                            <label htmlFor="paivamaara">* Päivämäärä:</label>
                            <input type="date" name="paivamaara" required value={this.state.data.paivamaara} onChange={this.handleInputChange} />
                        </div>
                    </div>

                    <div className="itemform__row itemform__duration">
                        <div>
                            <label htmlFor="tunnit">* Tunnit:</label>
                            <input type="number" name="tunnit" min="0" required value={this.state.data.tunnit} onChange={this.handleInputChange} />
                        </div>
                        <div>
                            <label htmlFor="minuutit">* Minuutit:</label>
                            <input type="number" name="minuutit" min="0" max="59" required value={this.state.data.minuutit} onChange={this.handleInputChange} />
                        </div>
                    </div>

                    <div className="itemform__row">
                        <Button type="submit">{this.state.data.id ? "TALLENNA" : "LISÄÄ"}</Button>
                    </div>

                    <div className="itemform__row">
                        <Button white onClick={this.handleCancel}>PERUUTA</Button>
                        { this.props.onDeleteItem ? <Button black onClick={this.handleDeleteItem}>POISTA</Button> : "" }
                    </div>

                </div>
            </form>
        );
    }

}

export default withRouter(ItemForm);