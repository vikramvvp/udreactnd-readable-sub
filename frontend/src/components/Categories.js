import _ from 'lodash';
import React from 'react';
import {PropTypes} from 'prop-types';

const Categories = ({ categories, category, onSelectCategory }) => (
  <div className="card my-4">
    <h5 className="card-header">Categories</h5>
    <div className="card-body">
      <div className="row">
        <div className="col-lg-6">
          <ul className="list-unstyled mb-0">
            <li key='all'>
              {category === 'all' ? <span>all</span> : 
                <a href=''
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectCategory('all');
                  }}>
                  all
                </a>}
            </li>
            {_.map(categories, ({name, path}) => (
              category === name ? <span key={name}>{name}</span> : 
              <li key={name}><a href=''
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory(path);
                }}>
                {name}
              </a></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
)

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired
}

export default Categories;
