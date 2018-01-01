import React from 'react'

export default function CategoriesList () {
  return (
    <div class="card my-4">
    <h5 class="card-header">Categories</h5>
    <div class="card-body">
      <div class="row">
        <div class="col-lg-6">
          <ul class="list-unstyled mb-0">
            <li>
              <a href="self">Web Design</a>
            </li>
            <li>
              <a href="self">HTML</a>
            </li>
            <li>
              <a href="self">Freebies</a>
            </li>
          </ul>
        </div>
        <div class="col-lg-6">
          <ul class="list-unstyled mb-0">
            <li>
              <a href="self">JavaScript</a>
            </li>
            <li>
              <a href="self">CSS</a>
            </li>
            <li>
              <a href="self">Tutorials</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
}