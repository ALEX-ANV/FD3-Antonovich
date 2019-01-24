import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './ProductEdit.css';
import ProductEditItem from '../ProductEditItem/ProductEditItem';

export default class ProductEdit extends Component {
  /**
   * type - 1 - Add new item, 2 - edit current item
   */
  static propTypes = {
    type: PropTypes.number.isRequired,
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired
    }),
    cbCancelChanges: PropTypes.func.isRequired,
    cbApplyChanges: PropTypes.func.isRequired
  };

  state = {
    id: '',
    name: '',
    price: 0,
    description: '',
    image: '',
    total: 0,
    formValid: false,
    fieldValidation: {}
  };

  componentWillMount() {
    if (this.props.type != 1) {
      this.setState({ ...this.props.product }, this.validateFields);
    } else {
      this.setState(
        { ...this.state, id: this.guidGenerator() },
        this.validateFields
      );
    }
  }

  guidGenerator = () => {
    let S4 = () =>
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
  };

  handlerCancel = () => {
    this.props.cbCancelChanges();
  };

  handlerApply = () => {
    this.props.cbApplyChanges(this.state, this.props.type);
  };

  handlerInputChanges = EO => {
    let { name, value, type } = EO.target;
    if (type == 'number') {
     let tmpValue = parseFloat(value);
     if (!isNaN(tmpValue)){
       value = tmpValue;
     }
    }
    this.setState({ [name]: value }, this.validateFields);
  };

  validateFields = () => {
    let fieldValidation = this.state.fieldValidation;
    for (const fieldName of Object.keys(this.state)) {
      let value = this.state[fieldName];
      switch (fieldName) {
        case 'name':
        case 'description':
          fieldValidation[fieldName] = value.length >= 1;
          break;
        case 'image':
          let reg = /(^http(s?):)([/|.|\w|\s|-])*\.(?:jpe?g|gif|png)/g;
          fieldValidation[fieldName] = reg.test(value);
          break;
        case 'price':
        case 'total':
          let num = parseFloat(value);
          fieldValidation[fieldName] = num >= 0;
          break;
      }
    }
    this.setState({ fieldValidation: fieldValidation }, this.validateForm);
  };

  validateForm = () => {
    this.setState({
      formValid: Object.values(this.state.fieldValidation).filter(t => !t) == 0
    });
  };

  render() {
    const {
      id,
      name,
      price,
      description,
      image,
      total,
      fieldValidation,
      formValid
    } = this.state;
    return (
      <div className="ProductEdit_container">
        <div className="ProductItemEdit">
          <ProductEditItem
            label="ID"
            type="text"
            name="id"
            value={id}
            hidden={true}
          />

          <ProductEditItem
            label="Название товара"
            type="text"
            name="name"
            value={name}
            cbChangeValue={this.handlerInputChanges}
            hidden={fieldValidation.name}
            errorMessage="Length must be greater than 1"
          />

          <ProductEditItem
            label="Описание"
            type="text"
            name="description"
            value={description}
            cbChangeValue={this.handlerInputChanges}
            hidden={fieldValidation.description}
            errorMessage="Length must be greater than 1"
          />

          <ProductEditItem
            label="Картинка"
            type="url"
            name="image"
            value={image}
            cbChangeValue={this.handlerInputChanges}
            hidden={fieldValidation.image}
            errorMessage="Incorrect Image URL"
          />

          <ProductEditItem
            label="Цена"
            type="number"
            name="price"
            value={price}
            cbChangeValue={this.handlerInputChanges}
            hidden={fieldValidation.price}
            errorMessage="Price must be greater or equal than 0"
          />

          <ProductEditItem
            label="Количество"
            type="number"
            name="total"
            value={total}
            cbChangeValue={this.handlerInputChanges}
            hidden={fieldValidation.total}
            errorMessage="Total must be greater or equal than 0"
          />
        </div>
        <div className="ProductItemEdit_buttons">
          <input
            type="button"
            disabled={!formValid}
            value="Сохранить"
            onClick={this.handlerApply}
          />
          <input type="button" value="Отменить" onClick={this.handlerCancel} />
        </div>
      </div>
    );
  }
}
