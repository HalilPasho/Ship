import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from '../axios';
import './ShipmentDetails.css';
import { Shipment } from '../types';
import { debounce } from '../utils';

type ShipmentDetailsState = {
  shipment?: Shipment;
}

type RouteParams = {
  id: string;
}
interface ShipmentDetailsProps extends RouteComponentProps<RouteParams> {
}

class ShipmentDetails extends Component<ShipmentDetailsProps> {

  state: ShipmentDetailsState = {
    shipment: undefined,
  }

  onNameChange = (event: any) => {
    this.setState({ shipment: Object.assign({}, this.state.shipment, { name: event.target.value }) });
    this.updateShipmentName(event.target.value);
  }

  updateShipmentName = debounce(async (name: string) => {
    await axios.patch(`shipments/${this.props.match.params.id}`, { name });
  }, 200)

  componentDidMount = async () => {
    const { data } = await axios.get(`shipments/${this.props.match.params.id}`);
    this.setState({ shipment: data });
  }

  renderShipmentRow = () => {
    const { shipment } = this.state;
    if (shipment) {
      return (
        <>
          <td>{shipment.id}</td>
          <td><input type="text" value={shipment.name} onChange={this.onNameChange}/></td>
          <td>{
            shipment.cargo.map((cargo, index) => {
              return (
                <div key={index}>
                  <div>{cargo.type}</div>
                  <div>{cargo.description}</div>
                  <div>{cargo.volume}</div>
                </div>
              )
            })
          }</td>
          <td>{shipment.mode}</td>
          <td>{shipment.type}</td>
          <td>{shipment.destination}</td>
          <td>{shipment.origin}</td>
          <td>{
            shipment.services.map((service, index) => {
              return (
                <div key={index}>{service.type}</div>
              )
            })
            }</td>
          <td>{shipment.total}</td>
          <td>{shipment.status}</td>
          <td>{shipment.userId}</td>
        </>
      )
    }
  }

  render() {
    return (
      <div>
        <table cellPadding={10}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Cargo</th>
              <th>Mode</th>
              <th>Type</th>
              <th>Destination</th>
              <th>Origin</th>
              <th>Services</th>
              <th>Total</th>
              <th>Status</th>
              <th>User Id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {this.renderShipmentRow()}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}


export default ShipmentDetails;