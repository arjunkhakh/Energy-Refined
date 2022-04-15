const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#product-name').value.trim();
    const price = document.querySelector('#product-price').value.trim();
    const installationCost = document.querySelector('#product-inst').value.trim();
    const paybackAmount = document.querySelector('#yearly-savings').value.trim();
    const description = document.querySelector('#product-desc').value.trim();
    const category = document.querySelector('#product-category').value.trim(); 

  
    if (name && price && installationCost && paybackAmount && description && category) {
      const response = await fetch(`/api/products/create`, {
        method: 'POST',
        body: JSON.stringify({ name, price, installationCost, paybackAmount, 
        description, category }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create product');
      }
    }
  };
  
//   const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');
  
//       const response = await fetch(`/api/products/${id}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert('Failed to delete the product');
//       }
//     }
//   };
  
  document
    .querySelector('.new-product-form')
    .addEventListener('submit', newFormHandler);
  
//   document
//     .querySelector('.project-list')
//     .addEventListener('click', delButtonHandler);
  