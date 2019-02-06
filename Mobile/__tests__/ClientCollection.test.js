'use strict';
import { collection } from '../utils/ClientCollection';
import data from '../data.json';

collection.addClients(data);
describe('Проверка иммутабельности коллекции клиентов при добавлении клиента', () => {
  it('Проверка добавления коллекции', () => {
    let client = {
      id: '1',
      firstName: '',
      lastName: '',
      patronymic: '',
      balance: '',
      edit: true
    };
    let original = collection.getClients();
    collection.addClients(client);
    expect(original).not.toBe(collection.getClients());
  });

  it('Проверка иммутабельности коллекции клиентов при изменении клиента', () => {
    let client = {
      id: 'a7c5f09b-79e4-5ca3-8036-02c6555b3b2d',
      firstName: '1',
      lastName: '1',
      patronymic: '1',
      balance: '1',
      edit: true
    };
    let original = collection.getClients();
    collection.saveClient(client);
    expect(original).not.toBe(collection.getClients());
    expect(original.length).toBe(collection.getClients().length);
  });

  it('Проверка иммутабельности коллекции клиентов при удалении клиента', () => {
    let id = 'a7c5f09b-79e4-5ca3-8036-02c6555b3b2d';
    let original = collection.getClients();
    collection.removeClient(id);
    expect(original).not.toBe(collection.getClients());
    expect(original.length).toBeGreaterThan(collection.getClients().length);
  });
});
