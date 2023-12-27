// displaying product for consumers
function displayProducts(element, products) {
    if (products.length === 0) {
        element.innerHTML = '<div>No product.</div>'
        return;
    }

    for (const product of products)
        element.innerHTML += displayProductCard(product);
}

function displayProductCard(product) {
    return `
    <div class='col-6 col-lg-4 col-xl-3 mt-3'>
        <div class='card'>
            <img src='${product.image}' class='card-img-top' alt='${product.name} Image' height='200px' style='object-fit: cover;'>
            
            <div class='card-body'>
                <h5 class='card-title'>Product name: ${product.name}</h5>
                <p class='card-text text-muted'>Product price: ${formatCurrency(product.price)}</p>
                
                <div class='text-center'>
                    <a class='btn btn-dark' onclick='addCart("${product.id}");'>Add to cart</a>
                </div>
            </div>
        </div>
    </div>`;
    // <p class='card-text text-muted'>Product description: ${(product.description)}</p>
}


// // Displaying profile
// function displayProfiles(element, profiles) {
//     if (profiles.length === 0) {
//         element.innerHTML = '<div>No product.</div>'
//         return;
//     }

//     for (const profile of profiles)
//         element.innerHTML += displayProfileCard(profile);
// }

// function displayProfileCard(profile) {
//     return `
//     <div class='col-6 col-lg-4 col-xl-3 mt-3'>
//         <div class='card'>
//             <img src='${profile.image}' class='card-img-top' alt='${profile.name} Image' height='200px' style='object-fit: cover;'>
            
//             <div class='card-body'>
//                 <h5 class='card-title'>Product name: ${profile.name}</h5>
//                 <p class='card-text text-muted'>Product price: ${formatCurrency(profile.price)}</p>
//                 <p class='card-text text-muted'>Product description: ${(profile.description)}</p>
//                 <div class='text-center'>
//                     <a class='btn btn-dark' onclick='addCart("${profile.id}");'>Add to cart</a>
//                 </div>
//             </div>
//         </div>
//     </div>`;
// }

// displaying product for management
function displayProductForManagement(element, products) {
    if (products.length === 0) {
        element.innerHTML = '<div>No product.</div>'
        return;
    }

    for (const product of products)
        element.innerHTML += frontEndProductManagement(product);
}

function frontEndProductManagement(product) {
    return `
    <div class='col-6 col-lg-4 col-xl-3 mt-3'>
        <div class='card'>
            <img src='${product.image}' class='card-img-top' alt='${product.name} Image' height='200px' style='object-fit: cover;'>
            
            <div class='card-body'>
                <h5 class='card-title'>Product name: ${product.name}</h5>
                <p class='card-text text-muted'>Product price: ${formatCurrency(product.price)}</p>
                <p class='card-text text-muted'>Product description: ${(product.description)}</p>
                <div class='text-center'>
                    <a class='btn btn-dark' onclick='deleteProduct("${product.id}");'>Delete Product</a>
                </div>
                <br>
                <div class='text-center'>
                    <a class='btn btn-dark' href='#' onclick='navigateToEditPage.ps:Function is not completed("${product.id}");'>Edit Product</a>
                </div>
            </div>
            </div>
        </div>
    </div>`;
}