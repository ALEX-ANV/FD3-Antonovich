import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { events, SaveClient, RemoveClient } from '../../utils/events';
import deepEqual from 'deep-equal';
import './MobileClient.css';

const ViewMode = {
  show: 'show',
  edit: 'edit'
};

export default class MobileClient extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      client: props.client,
      viewMode: props.client.edit ? ViewMode.edit : ViewMode.show
    };

    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
    this.patronymicRef = React.createRef();
    this.balanceRef = React.createRef();
  }

  static propTypes = {
    client: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      patronymic: PropTypes.string.isRequired,
      balance: PropTypes.string.isRequired,
      edit: PropTypes.bool
    }).isRequired
  };

  handlerEditClient = () => {
    this.setState({ viewMode: ViewMode.edit });
  };

  handlerSaveClient = () => {
    let client = {
      ...this.state.client,
      firstName: this.firstNameRef.current.value,
      lastName: this.lastNameRef.current.value,
      patronymic: this.patronymicRef.current.value,
      balance: this.balanceRef.current.value
    };
    if (!deepEqual(this.state.client, client)) {
      events.emit(SaveClient, client);
    } else {
      this.setState({ viewMode: ViewMode.show });
    }
  };

  handlerRemoveClient = () => {
    events.emit(RemoveClient, this.state.client.id);
  };

  render() {
    const {
      viewMode,
      client: { id, firstName, lastName, patronymic, balance }
    } = this.state;
    console.log(`Mobile cliend id: ${id}: rendered`);
    const balanceProperty =
      parseFloat(balance) > 0 ? (
        <div className="green center-text">active</div>
      ) : (
        <div className="red center-text">blocked</div>
      );

    const properties =
      viewMode == ViewMode.edit ? (
        <div className="mobile-client__properties">
          <input
            type="text"
            name="firstName"
            ref={this.firstNameRef}
            defaultValue={firstName}
          />
          <input
            type="text"
            name="lastName"
            ref={this.lastNameRef}
            defaultValue={lastName}
          />
          <input
            type="text"
            name="patronymic"
            ref={this.patronymicRef}
            defaultValue={patronymic}
          />
          <input
            type="number"
            name="balance"
            ref={this.balanceRef}
            defaultValue={balance}
          />
          {balanceProperty}
        </div>
      ) : (
        <div className="mobile-client__properties">
          <label>{firstName}</label>
          <label>{lastName}</label>
          <label>{patronymic}</label>
          <label>{balance}</label>
          {balanceProperty}
        </div>
      );
    return (
      <div className="mobile-client__container">
        {properties}
        <div className="mobile-client__buttons">
          {viewMode == ViewMode.show ? (
            <input
              type="button"
              value="Редактировать"
              onClick={this.handlerEditClient}
            />
          ) : (
            <input
              type="button"
              value="Сохранить"
              onClick={this.handlerSaveClient}
            />
          )}
          <input
            type="button"
            value="Удалить"
            onClick={this.handlerRemoveClient}
          />
        </div>
      </div>
    );
  }
}
