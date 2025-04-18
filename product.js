const apiURL = 'https://fakestoreapi.com/products';

const productGrid = document.querySelector('.product-grid');

productGrid.innerHTML = ''; // Clear grid first

fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    data.forEach(product => {
      // Optional: Filter only sneakers
    //   if (product.category.toLowerCase().includes('shoe')) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
        <a href="info.html?id=${product.id}" class="product-link">
          <img src="${product.image}" alt="${product.title}" />
          <h2>${product.title}</h2>
          <p>$${product.price}</p>
        </a>
      `;
        productGrid.appendChild(productDiv);
    //   }
    });
  })
  .catch(err => console.log('Error:', err));
