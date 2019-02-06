import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { events, SaveClient, RemoveClient } from '../../utils/events';
import { collection } from '../../utils/ClientCollection';

import './MobileCompany.css';
import MobileClient from '../MobileClient/MobileClient';

const Companies = {
  Velcom: 'Velcom',
  MTC: 'MTC'
};
export default class MobileCompany extends PureComponent {
  state = {
    companyName: Companies.MTC,
    clients: collection.getClients(),
    original: collection.getClients()
  };

  componentDidMount() {
    events.on(SaveClient, this.handlerSaveClient);
    events.on(RemoveClient, this.handlerRemoveClient);
  }

  componentWillUnmount() {
    events.off(SaveClient, this.handlerSaveClient);
    events.off(RemoveClient, this.handlerRemoveClient);
  }

  handlerClickButtonCompany = EO => {
    this.setState({ companyName: EO.target.value });
  };

  handlerSaveClient = client => {
    collection.saveClient(client);
    this.setState({ clients: collection.getClients(), original: collection.getClients() });
  };

  handlerRemoveClient = id => {
    collection.removeClient(id);
    this.setState({
      clients: collection.getClients(),
      original: collection.getClients()
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
    let client = {
      id: this.guidGenerator(),
      firstName: '',
      lastName: '',
      patronymic: '',
      balance: '',
      edit: true
    };
    collection.addClients(client);
    this.setState({ clients: collection.getClients() });
  };

  render() {
    const { companyName, clients } = this.state;

    // console.log('Mobile company: rendered');

    return (
      <div className="mobile-company__content">
        <div>
          <input
            type="button"
            name="mts"
            value={Companies.MTC}
            onClick={this.handlerClickButtonCompany}
          />
          <input
            type="button"
            name="velcom"
            value={Companies.Velcom}
            onClick={this.handlerClickButtonCompany}
          />
        </div>
        <div className="mobile-company__title">Компания: {companyName}</div>
        <div className="mobile-company__filter-buttons">
          <input
            type="button"
            name="AddClient"
            value="Добавить"
            onClick={this.handlerAddClientClick}
          />
          <input
            type="button"
            name="AllClients"
            value="Все"
            onClick={this.handlerAllFilterClick}
          />
          <input
            type="button"
            name="ActiveClients"
            value="Активные"
            onClick={this.handlerActiveFilterClick}
          />
          <input
            type="button"
            name="BlockedClients"
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
