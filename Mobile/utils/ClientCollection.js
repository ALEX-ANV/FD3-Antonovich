class ClientCollection {
  constructor() {
    this.collection = [];
  }

  addClients = clients => {
    if (clients instanceof Array) {
      this.collection = [...this.collection, ...clients];
    } else {
      this.collection = [...this.collection, clients];
    }
  };

  saveClient = client => {
    client.edit = false;
    this.collection = this.collection.map(t =>
      t.id == client.id ? client : t
    );
  };

  removeClient = id => {
    this.collection = this.collection.filter(t => t.id != id);
  };

  getClients = () => {
    return this.collection;
  };
}

export const collection = new ClientCollection();
