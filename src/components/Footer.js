import React from 'react';
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <div>
      <div class="container">
  <footer class="py-3 my-4">
    <ul class="nav text-center border-bottom pb-3 mb-3">
      <li class="nav-item"><Link to="/" class="nav-link px-2 text-muted">Home</Link></li>
      <li class="nav-item"><Link to="home" class="nav-link px-2 text-muted">Products</Link></li>
      <li class="nav-item"><Link to="signup" class="nav-link px-2 text-muted">Sign up</Link></li>
    </ul>
    <p class="text-center text-muted">© 2021 LittleHearts, All rights are reserved, Inc</p>
  </footer>
</div>
    </div>
  )
}
