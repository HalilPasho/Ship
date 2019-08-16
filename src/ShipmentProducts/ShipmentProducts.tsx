import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';
import { Shipment } from '../types';
import Pagination from './Pagination';
import './ShipmentProducts.css'

type ShipmentProductsProps = {
}

type SortType = 'asc' | 'desc';
type ShipmentField = keyof Shipment;

type ShipmentProductsState = {
  searchText: string;
  limit: number;
  page: number;
  pageShipments: Shipment[],
  filteredShipments: Shipment[];
  shipments: Shipment[];
  sortField: keyof Shipment | '';
  sortType: SortType;
}

export default class ShipmentProducts extends React.Component<ShipmentProductsProps> {

  state: ShipmentProductsState = {
      searchText: '',
      page: 1,
      limit: 20,
      pageShipments: [],
      filteredShipments: [],
      shipments: [],
      sortField: '',
      sortType: 'asc',
  }

  filterShipments = (shipments: Shipment[], searchText: string) => {
    if (!searchText) {
      return shipments;
    }
    return shipments.filter((shipment) => {
      return shipment.id.toLowerCase().search(searchText.toLowerCase()) !== -1;
    });
  }

  sortShipments = (shipments: Shipment[], sortField: ShipmentField | '', sortType: SortType) => {
    if (sortField === '') {
      return shipments;
    } else {
      return shipments.slice().sort((a: Shipment, b: Shipment): number => {
        return a[sortField].toString().localeCompare(b[sortField].toString()) * (sortType === 'asc' ? 1 : -1);
      });
    }
  }

  getPageShipments = (shipments: Shipment[], page: number, limit: number) => {
    const startFrom = (page - 1) * limit;
    return shipments.slice(startFrom, startFrom + limit);
  }

  gotoPage = (page: number) => {
    this.setState({ page });
  }

  // TODO: find event type and replace
  onSearchTextChange = (event: any) => {
    this.setState({ searchText: event.target.value });
  }

  onSortFieldChange = (event: any) => {
    this.setState({ sortField: event.target.value as ShipmentField | '' });
  }

  onSortTypeChange = (event: any) => {
    this.setState({ sortType: event.target.value as SortType });
  }

  componentDidMount = async () => {
    const { data } = await axios.get('shipments');
    this.setState({ shipments: data });
  }

  render() {

    const {shipments, limit, page, searchText, sortType, sortField } = this.state;

    const filteredShipments = this.filterShipments(shipments, searchText);
    const sortedShipments = this.sortShipments(filteredShipments, sortField, sortType);
    const pageShipments = this.getPageShipments(sortedShipments, page, limit);

    return (
      <div>
        <form>
          <input className={'filters'} type="text" placeholder="Search" value={searchText} onChange={this.onSearchTextChange}/>
          <select className={'filters'} onChange={this.onSortFieldChange}>
            <option value="">No Sort</option>
            <option value="id">Id</option>
            <option value="name">Name</option>
            <option value="mode">Mode</option>
            <option value="type">type</option>
            <option value="destination">Destination</option>
            <option value="origin">Origin</option>
            <option value="total">Total</option>
            <option value="status">Status</option>
            <option value="userId">User Id</option>
          </select>
          <select className={'filters'} onChange={this.onSortTypeChange}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </form>
        <div>
          <table cellPadding={10}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {
                pageShipments.map(function(shipment) {
                  return (
                    <tr key={shipment.id}>
                      <td>{shipment.id}</td>
                      <td>{shipment.name}</td>
                      <td><Link to={"/shipments/" + shipment.id + "/details"} className={'listelStyles'}>Details</Link></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        <Pagination limit={limit} length={filteredShipments.length} page={page} gotoPage={this.gotoPage}/>
      </div>
    );
  }
};
