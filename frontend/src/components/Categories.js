import _ from 'lodash';
import React from 'react'

const Categories = ({ categories, category, onSelectCategory }) => (
  <div className="card my-4">
    <h5 className="card-header">Categories</h5>
    <div className="card-body">
      <div className="row">
        <div className="col-lg-6">
          <ul className="list-unstyled mb-0">
            {category === 'all' ? <li><span>all</span></li> : 
            <li><a href='' key='all'
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
              }}>
              all
            </a></li>}
            {_.map(categories, ({name, path}) => (
              category === name ? <span>{name}</span> : 
              <li><a href='' key={name}
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

export default Categories;