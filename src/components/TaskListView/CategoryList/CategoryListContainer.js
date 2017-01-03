import React, { Component } from 'react';
import { Container } from 'flux/utils';

import CategoryList from './CategoryList';
import CategoryStore from '../../../data/categories/CategoryStore';
// import CategoryActions from '../../../data/categories/CategoryActions';

class CategoryListContainer extends Component {
  static getStores() {
    return [CategoryStore];
  }

  static calculateState(prevState) {
    return {
      items: getNestedCategories()
    };
  }

  render() {
    return <CategoryList items={this.state.items} />;
  }
}

function getNestedCategories(parentId) {
  return CategoryStore.getListByParentId(parentId).map((category) => {
    return {
      ...category,
      children: getNestedCategories(category.id)
    };
  });
}

export default Container.create(CategoryListContainer);