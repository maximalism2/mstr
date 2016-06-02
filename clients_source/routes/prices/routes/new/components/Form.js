import React, { Component, PropTypes } from 'react';
import Input from '../../../../../common/components/InputForPriceEditing';

class Form extends Component {
    renderPriceTitle() {
    let { data, view, editMode, actions } = this.props;
    console.log(this.props.data);

    return (
      <h1 className="title price-title">
        <Input
          data={data}
          type="name"
          isMainField
          notRequired
          placeholder="Назва каталогу..."
          ch={actions.changeMainField}
          onCreate={actions.createNewProduct}
          onBlur={actions.removeInput}
          showNotification={actions.showNotification}
          onError={actions.inputInsertError}
          hasError={editMode.hasError}
        />
      </h1>
    );
  }


  render() {
    let { data, view, actions } = this.props;
    let { products } = data;
    return (
      <div className="container">
        <div className="price-content container new-price">
          <div className="main-info content-container">
            {this.renderPriceTitle()}
            <div className="sub-main">
              {/*this.renderDiscount()*/}
              {/*this.renderCurrency()*/}
            </div>
          </div>
        </div>

        <div className="products-list content-container">
          <table className="table content-container">
            <thead className="table-header">
              <tr>
                <th className="number-column">
                  {view.editMode &&
                    <div className="controls">
                      <div
                        className="add-button"
                        onClick={() => actions.createNewProduct()}
                      >
                        <i className="fa fa-plus" title="Додати пункт (Ctrl + Enter)"></i>
                      </div>
                    </div>
                  }
                  №
                </th>
                <th className="name-column">Назва</th>
                <th>Одиниці вим.</th>
                <th className="cost-column">Ціна</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {/*(() => {
                if (view.editMode) {
                  let copy = JSON.parse(JSON.stringify(editMode.data.products));
                  return copy.reverse().map((product, index, origin) =>
                    this.renderProduct(product, index, origin)
                  );
                } else {
                  let copy = JSON.parse(JSON.stringify(data.products));
                  return copy.reverse().map((product, index, origin) =>
                    this.renderProduct(product, index, origin)
                  );
                }
              })()*/}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  data: PropTypes.object.isRequired,
  view: PropTypes.object.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
}

export default Form;
