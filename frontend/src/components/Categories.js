import _ from 'lodash';
import React, { Component } from 'react'
import { loadCategories, loadPosts } from "../actions";
import { connect } from "react-redux";

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
                <li>
                  <a href='' key='all'
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.loadPosts('all');
                    }}
                    className="list-item">
                    all
                  </a>
                </li>
                {_.map(this.props.categories, category => (
                  <li><a href='' key={category.name}
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.loadPosts(category.path);
                    }}
                    className="list-item">
                    {category.name}
                  </a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: () => dispatch(loadCategories()),
    loadPosts: (data) => dispatch(loadPosts(data)),
  }
}

function mapStateToProps(state) {
  return { categories: state.blog.categories };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
