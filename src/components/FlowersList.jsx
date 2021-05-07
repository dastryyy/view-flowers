import React, { Component } from 'react';
import './FlowersList.css';
class FlowersList extends Component {
    render() {
        const {data, filterText, selectedUpdate, togglePopup} = this.props;
        const flowersList = data
        .filter(flower => {
            return flower.COMNAME.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
        })
        .map(flower => {
            return (
                <tr key = {flower.COMNAME}>
                    <td>{flower.COMNAME}</td>
                    <td>{flower.GENUS}</td>
                    <td>{flower.SPECIES}</td>
                    <button onClick={() => {selectedUpdate(flower.COMNAME); togglePopup()}}>View More</button>
                </tr>
            )
        })
        return <tbody>{flowersList}</tbody>
    }
}

export default FlowersList;
