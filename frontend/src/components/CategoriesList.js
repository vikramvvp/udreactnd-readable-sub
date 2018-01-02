import _ from 'lodash';
import React, { Component } from 'react'
import { loadCategories } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CategoriesList extends Component {
  componentDidMount() {
    this.props.loadCategories();
  }

  render() {
    return (
      <div className="card my-4">
        <h5 className="card-header">Categories</h5>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6">
              <ul className="list-unstyled mb-0">
                {_.map(this.props.categories, category => (
                  <li key={category.name}>
                    <Link to={`/posts?category=${category.path}/`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { categories: state.blogPost.categories };
}

export default connect(mapStateToProps, { loadCategories })(CategoriesList);
