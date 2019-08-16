import React from 'react';
import './Pagination.css';
import './Pagination.css'

type PaginationProps = {
  length: number;
  limit: number;
  page: number;
  gotoPage: (page: number) => void;
}

type PaginationState = {
  pages: number;
  length: number;
  limit: number;
}

export default class Pagination extends React.Component<PaginationProps> {

  state: PaginationState = {
    pages: 0,
    length: 0,
    limit: 0,
  }

  gotoPrevious = () => {
    if (this.props.page > 1) {
      this.props.gotoPage(this.props.page - 1);
    }
  }

  gotoNext = () => {
    if (this.props.page < this.state.pages) {
      this.props.gotoPage(this.props.page + 1);
    }
  }

  /*componentDidMount() {
    this.setState((state, props) => {
      return {
        pages: Math.ceil(props.length / props.limit),
      };
    });
  }*/

  static getDerivedStateFromProps = (props: PaginationProps, state: PaginationState) => {
    if (props.limit !== state.limit || props.length !== state.length) {
      return {
        pages: Math.ceil(props.length / props.limit),
      };
    }
  }

  render() {
    const { gotoNext, gotoPrevious, props: { page }, state: { pages } } = this;
    return (
      <div className={'bottom'}>
        <button className={'buttons'} onClick={gotoPrevious}>Previous</button>
        {page} / {pages}
        <button className={'buttons'} onClick={gotoNext}>Next</button>
      </div>
    );
  }
};
