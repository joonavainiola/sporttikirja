import React from 'react';
import Content from '../Content/Content';
import ItemForm from '../ItemForm/ItemForm';

function EditItem(props) {

    //haetaan data-taulukosta haluttu index-luku,
    //eli sen elementin index, jonka tietoja halutaan muokata
    const index = props.data.findIndex(item => item.id === props.match.params.id);

    //käytetään haettua index-lukua tietojen hakemiseen
    let itemData = props.data[index];

    //välitetään haettu data ItemForm-komponentille, jossa sitä voidaan muokata
    return (
        <Content>
            <h1 className="otsikko">Muokkaa suoritusta</h1>
            <ItemForm onFormSubmit={props.onFormSubmit} data={itemData} onDeleteItem={props.onDeleteItem} />
        </Content>
    );
}

export default EditItem;