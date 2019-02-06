'use strict';
import React from 'react';
import renderer from 'react-test-renderer';
import MobileCompany from '../components/MobileCompany/MobileCompany';

import { collection } from '../utils/ClientCollection';
import data from '../data.json';

collection.addClients(data);
describe('Проверка отображения компонента MobileCompany', () => {
  it('Проверка отображения 4 клиентов', () => {
    const wrapper = renderer.create(<MobileCompany />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('Проверка добавления клиента', () => {
    let client = {
      id: '1',
      firstName: 'Test Name',
      lastName: 'Test Last Name',
      patronymic: 'Test Patronomic',
      balance: '-10'
    };

    collection.addClients(client);
    const wrapper = renderer.create(<MobileCompany />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('Проверка изменения баланса клиента', () => {
    const wrapper = renderer.create(<MobileCompany />);
    expect(wrapper.toJSON()).toMatchSnapshot();

    let client = {
      id: '1',
      firstName: '1',
      lastName: '1',
      patronymic: '1',
      balance: '1',
    };
    collection.saveClient(client);

    const wrapper1 = renderer.create(<MobileCompany />)
    expect(wrapper1.toJSON()).toMatchSnapshot();

    expect(JSON.stringify(wrapper.toJSON())).not.toBe(JSON.stringify(wrapper1.toJSON()));
  });

  it('Проверка удаления клиента', () => {
    const wrapper = renderer.create(<MobileCompany />);

    var initState = JSON.stringify(wrapper.toJSON());

    collection.removeClient("1");

    const wrapper1 = renderer.create(<MobileCompany />);

    expect(wrapper1.toJSON()).toMatchSnapshot();

    expect(JSON.stringify(wrapper1.toJSON())).not.toBe(initState);
  });
});

describe('Проверка фильтров <MobileCompany />', () => {
  it('Проверка фильтра: Активные', () => {

    const wrapper = renderer.create(<MobileCompany />);

    const filterButton = wrapper.root.find(el => el.props.name == 'ActiveClients');

    filterButton.props.onClick();

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('Проверка фильтра: Заблокированные', () => {

    const wrapper = renderer.create(<MobileCompany />);

    const filterButton = wrapper.root.find(el => el.props.name == 'BlockedClients');

    filterButton.props.onClick();

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('Проверка фильтра: Все', () => {

    const wrapper = renderer.create(<MobileCompany />);

    var initState = JSON.stringify(wrapper.toJSON());

    let filterButton = wrapper.root.find(el => el.props.name == 'BlockedClients');

    filterButton.props.onClick();

    filterButton = wrapper.root.find(el => el.props.name == 'AllClients');

    filterButton.props.onClick();

    expect(wrapper.toJSON()).toMatchSnapshot();

    expect(initState).toBe(JSON.stringify(wrapper.toJSON()));
  });
});

