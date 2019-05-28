import React from 'react';
import Content from '../Content/Content';
import ItemForm from '../ItemForm/ItemForm';

//palauttaa ItemForm-komponentin, jolle vyöryttää
//props.onFormSubmit:n eteen päin
function AddItem(props) {
    return (
        <Content>
            <h1 className="otsikko">Lisää uusi suoritus</h1>
            <ItemForm onFormSubmit={props.onFormSubmit} />
        </Content>
    );
}

export default AddItem;