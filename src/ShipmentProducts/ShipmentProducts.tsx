import React from 'react';
import axios from '../axios';
import { Shipment } from '../types';


type ShipmentProductsProps = {
}

type ShipmentProductsState = {
  searchText: string;
  limit: number;
  page: number;
  pages: number;
  pageShipments: Shipment[],
  filteredShipments: Shipment[];
  shipments: Shipment[];
  sortField: keyof Shipment | '';
  sortType: 'asc' | 'desc';
}

export default class ShipmentProducts extends React.Component<ShipmentProductsProps> {

  state: ShipmentProductsState = {
      searchText: '',
      page: 1,
      pages: 0,
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

  sortShipments = (shipments: Shipment[], sortField: keyof Shipment | '', sortType: 'asc' | 'desc') => {
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

  computeNumberOfPages = (itemsLength: number, limit: number) => {
    const left = itemsLength % limit;
    const pages = (itemsLength - left) / limit + ( left ? 1 : 0);
    return pages;
  }

  gotoPrevious = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    }
  }

  gotoNext = (pages: number) => {
    if (this.state.page < pages) {
      this.setState({ page: this.state.page + 1 });
    }
  }

  setSortField = (field: keyof Shipment | '' = '') => {
    this.setState({ sortField: field });
  }

  setSortType = (type: 'asc' | 'desc') => {
    this.setState({ sortType: type });
  }

  // TODO: find event type and replace
  onSearchTextChange = (event: any) => {
    this.setState({ searchText: event.target.value });
  }

  componentDidMount = async () => {
    const { data } = await axios.get('shipments');
    this.setState({ shipments: data });
  }

  render() {

    const {shipments, limit, page, searchText, sortType, sortField } = this.state;

    const filteredShipments = this.filterShipments(shipments, searchText);
    const sortedShipments = this.sortShipments(filteredShipments, sortField, sortType);
    const numberOfPages = this.computeNumberOfPages(sortedShipments.length, limit);
    const pageShipments = this.getPageShipments(sortedShipments, page, limit);

    return (
      <div>
        <form>
          <input type="text" placeholder="Search" value={searchText} onChange={this.onSearchTextChange}/>
          <select onChange={event => this.setSortField(event.target.value as (keyof Shipment | ''))}>
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
          <select onChange={event => this.setSortType(event.target.value as 'asc' | 'desc')}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </form>
        <div>
          {
            pageShipments.map(function(shipment) {
                return <div key={shipment.id}>{shipment.id}:{shipment.name}</div>
            })
          }
        </div>
        <div>
          <button onClick={this.gotoPrevious}>Previous</button>
          {page} / {numberOfPages}
          <button onClick={() => this.gotoNext(numberOfPages)}>Next</button>
        </div>
      </div>
    );
  }
};
