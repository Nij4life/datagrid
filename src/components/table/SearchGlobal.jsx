import React from 'react';
import { connect } from 'react-redux';
import { searchGlobal } from '../../redux/reducer';

// I want to try using the class
class SearchGlobal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onKeydownHandler = this.onKeydownHandler.bind(this);
  }



  onKeydownHandler() {
    console.log('keydown');
  }

  onChangeHandler(e) {
    this.setState({value: e.target.value});
  }

  onClickHandler() {
    this.props.searchGlobal(this.state.value);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeydownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydownHandler);
  }

  render() {
    return (
      <div className="search-global">
        <input type='text' placeholder="Global search" value={this.state.value} onChange={this.onChangeHandler} />
        <button type="button" onClick={this.onClickHandler} >Search</button>
      </div>
    );
  }
}

const SearchGlobalContainer = connect(null, { searchGlobal })(SearchGlobal);

export default SearchGlobalContainer;
