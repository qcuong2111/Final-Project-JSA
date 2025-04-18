const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (!productId) {
    document.body.innerHTML = '<h2>Không tìm thấy sản phẩm!</h2>';
  } else {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(res => res.json())
      .then(product => {
        // Hiển thị sản phẩm chính
        const detailHTML = `
          <div class="product-detail">
            <img src="${product.image}" alt="${product.title}" class="product-image-large" />
            <h2>${product.title}</h2>
            <p><strong>Giá:</strong> $${product.price} USD</p>
            <p><strong>Mô tả:</strong> ${product.description}</p>
            <p><strong>Danh mục:</strong> ${product.category}</p>
            <p><strong>Đánh giá:</strong> ${product.rating.rate} ⭐ (${product.rating.count} lượt)</p>
          </div>
        `;
        document.getElementById('product-detail').innerHTML = detailHTML;

      
        fetch('https://fakestoreapi.com/products')
          .then(res => res.json())
          .then(allProducts => {
            const related = allProducts.filter(p => p.category === product.category && p.id != product.id);
            const relatedHTML = related.map(p => `
              <div class="product-card">
                <a href="info.html?id=${p.id}">
                  <img src="${p.image}" alt="${p.title}" />
                  <div class="title">${p.title}</div>
                  <div class="price">$${p.price}</div>
                </a>
              </div>
            `).join('');
            document.getElementById('related-products').innerHTML = relatedHTML;
          });
      })
      .catch(err => {
        document.getElementById('product-detail').innerHTML = '<p>Lỗi khi tải sản phẩm.</p>';
      });
  }