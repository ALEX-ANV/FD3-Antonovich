import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { events, SaveClient, RemoveClient } from '../../utils/events';

import './MobileCompany.css';
import MobileClient from '../MobileClient/MobileClient';

export default class MobileCompany extends PureComponent {
  state = {
    companyName: 'МТС',
    clients: this.props.clients,
    original: this.props.clients
  };

  componentDidMount() {
    events.on(SaveClient, this.handlerSaveClient);
    events.on(RemoveClient, this.handlerRemoveClient);
  }

  componentWillUnmount() {
    events.off(SaveClient, this.handlerSaveClient);
    events.off(RemoveClient, this.handlerRemoveClient);
  }

  static propTypes = {
    clients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        patronymic: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired
      })
    ).isRequired
  };

  handlerClickButtonCompany = EO => {
    this.setState({ companyName: EO.target.value });
  };

  handlerSaveClient = client => {
    client.edit = false;
    let newClients = this.state.clients.map(t =>
      t.id == client.id ? client : t
    );
    this.setState({ clients: newClients, original: newClients });
  };

  handlerRemoveClient = id => {
    this.setState({
      clients: this.state.clients.filter(t => t.id != id),
      original: this.state.clients.filter(t => t.id != id)
    });
  };

  handlerAllFilterClick = () => {
      this.setState({
        clients: this.state.original
      });
  };

  handlerActiveFilterClick = () => {
    this.setState({
      clients: this.state.original.filter(t => parseFloat(t.balance) > 0)
    });
  };

  handlerBlockedFilterClick = () => {
    this.setState({
      clients: this.state.original.filter(t => parseFloat(t.balance) <= 0)
    });
  };

  guidGenerator = () => {
    let S4 = () =>
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
  };

  handlerAddClientClick = () => {
    this.setState({
      clients: [
        ...this.state.clients,
        {
          id: this.guidGenerator(),
          firstName: '',
          lastName: '',
          patronymic: '',
          balance: '',
          edit: true
        }
      ]
    });
  };

  render() {
    const { companyName, clients } = this.state;

    console.log('Mobile company: rendered');

    return (
      <div className="mobile-company__content">
        <div>
          <input
            type="button"
            name="mts"
            value="МТС"
            onClick={this.handlerClickButtonCompany}
          />
          <input
            type="button"
            name="velcom"
            value="Velcom"
            onClick={this.handlerClickButtonCompany}
          />
        </div>
        <div className="mobile-company__title">Компания: {companyName}</div>
        <div className="mobile-company__filter-buttons">
          <input
            type="button"
            value="Добавить"
            onClick={this.handlerAddClientClick}
          />
          <input
            type="button"
            value="Все"
            onClick={this.handlerAllFilterClick}
          />
          <input
            type="button"
            value="Активные"
            onClick={this.handlerActiveFilterClick}
          />
          <input
            type="button"
            value="Заблокированные"
            onClick={this.handlerBlockedFilterClick}
          />
        </div>
        <div className="mobile-company__mobile-clients">
          {clients.map(t => (
            <MobileClient key={JSON.stringify(t)} client={t} />
          ))}
        </div>
      </div>
    );
  }
}
