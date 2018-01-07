import React from 'react'
import { connect } from 'react-redux'
import { loadCategories, selectCategory } from '../actions'
import Categories from '../components/Categories'

class ShowCategories extends React.Component {
  componentDidMount() {
    this.props.onCatLoad();
  }

  render() {
    return ( 
      <Categories categories={this.props.categories} category={this.props.category} onSelectCategory={this.props.onSelectCateogry} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.blog.category,
    categories: state.blog.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCatLoad: () => {dispatch(loadCategories())},
    onSelectCateogry: (category) => {dispatch(selectCategory(category))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCategories)