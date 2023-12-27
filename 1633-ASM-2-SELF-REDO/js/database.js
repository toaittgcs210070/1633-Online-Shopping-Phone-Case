const dbCartName = 'carts';
const dbUserName = 'users';
const dbProductName = 'products';
const sessionLoginUser = 'loginUser';

const firebaseConfig = {
    apiKey: "AIzaSyCrRJ85itO3hzpQdgJSWxPemLMqKQT7iGQ",
    authDomain: "asm-2-1633-phone-case-website.firebaseapp.com",
    projectId: "asm-2-1633-phone-case-website",
    storageBucket: "asm-2-1633-phone-case-website.appspot.com",
    messagingSenderId: "376764235106",
    appId: "1:376764235106:web:d1eff7a41403f516e8003b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function getSessionLoginUser() {
    return JSON.parse(sessionStorage.getItem(sessionLoginUser));
}

function getSessionLoginUserId() {
    const user = getSessionLoginUser();
    return user ? user.uid : null;
}

function setSessionLoginUser(user) {
    sessionStorage.setItem(sessionLoginUser, JSON.stringify(user));
}

function removeSessionLoginUser() {
    sessionStorage.removeItem(sessionLoginUser);
}

function dbGetProducts() {
    const products = [];

    return new Promise((resolve, reject) => {
        db.collection(dbProductName)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((document) => {
                    const productData = document.data();

                    const product = {
                        id: document.id,
                        name: productData.name,
                        price: productData.price,
                        image: productData.image,
                        description: productData.description,
                    };

                    products.push(product);
                });

                resolve(products);
            })
            .catch((error) => {
                console.error('Error getting products:', error);
                resolve(products);
            });
    });
}

// function dbGetUsers() {
//     const users = [];

//     return new Promise((resolve, reject) => {
//         db.collection(dbProductName)
//             .get()
//             .then((querySnapshot) => {
//                 querySnapshot.forEach((document) => {
//                     const userData = document.data();

//                     const user = {
//                         id: document.id,
//                         name: userData.name,
//                         price: userData.price,
//                         image: userData.image,
//                         description: userData.description,
//                     };

//                     users.push(user);
//                 });

//                 resolve(users);
//             })
//             .catch((error) => {
//                 console.error('Error getting products:', error);
//                 resolve(products);
//             });
//     });
// }

function dbGetProduct(productId) {
    let product = null;

    return new Promise((resolve, reject) => {
        db.collection(dbProductName)
            .doc(productId)
            .get()
            .then((document) => {
                if (document.exists) {
                    const productData = document.data();

                    product = {
                        id: document.id,
                        name: productData.name,
                        price: productData.price,
                        image: productData.image,
                        description: productData.description,
                    };
                }

                resolve(product);
            })
            .catch((error) => {
                console.error('Error getting product:', error);
                resolve(product);
            });
    });
}


function dbAddProduct(product) {
    return new Promise((resolve, reject) => {
        db.collection(dbProductName)
            .add(product)
            .then(() => { resolve(true); })
            .catch((error) => {
                console.error('Error adding product:', error);
                resolve(false);
            });
    });
}

function dbAddUser(user) {
    return new Promise((resolve, reject) => {
        firebase.auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                userCredential.user.updateProfile({
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                });

                dbInitializeCart(userCredential.user.uid);

                resolve(userCredential.user);
            })
            .catch((error) => {
                console.error('Error creating user account:', error);
                reject(error);
            });
    });
}

function dbAuthenticate(email, password) {
    return new Promise((resolve, reject) => {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => { resolve(userCredential.user); })
            .catch((error) => {
                console.error('Authentication failed:', error);
                reject(error);
            });
    });
}

function dbSignOut() {
    return new Promise((resolve, reject) => {
        firebase.auth()
            .signOut()
            .then(() => { resolve(true); })
            .catch((error) => {
                console.error('Sign out failed:', error);
                resolve(false);
            });
    });
}

function dbInitializeCart(userId) {
    return new Promise((resolve, reject) => {
        db.collection(dbCartName)
            .doc(userId)
            .set({
                totalQuantity: 0,
                products: [],
            })
            .then(() => { resolve(true); })
            .catch((error) => {
                console.error('Error initializing cart:', error);
                resolve(false);
            });
    });
}

function dbGetCartItems(userId) {
    let cartItems = [];

    return new Promise((resolve, reject) => {
        db.collection(dbCartName)
            .doc(userId)
            .get()
            .then((document) => {
                if (document.exists)
                    cartItems = document.data().products;

                resolve(cartItems);
            })
            .catch((error) => {
                console.error('Error getting cart items:', error);
                resolve(cartItems);
            });
    });
}

function dbGetCartItem(userId, productId) {
    let cartItem = null;

    return new Promise((resolve, reject) => {
        db.collection(dbCartName)
            .doc(userId)
            .get()
            .then((cart) => {
                if (cart.exists)
                    cartItem = cart.data().products.find((item) => item.productId === productId);

                resolve(cartItem);
            })
            .catch((error) => {
                console.error('Error getting cart item:', error);
                resolve(cartItem);
            });
    });
}

function dbAddCartItem(userId, cartItem) {
    return new Promise((resolve, reject) => {
        db.collection(dbCartName)
            .doc(userId)
            .update({
                totalQuantity: firebase.firestore.FieldValue.increment(cartItem.quantity),
                products: firebase.firestore.FieldValue.arrayUnion(cartItem),
            })
            .then(() => { resolve(true); })
            .catch((error) => {
                console.error('Error adding cart item:', error);
                resolve(false);
            });
    });
}

function dbRemoveCartItem(userId, cartItem) {
    return new Promise((resolve, reject) => {
        db.collection(dbCartName)
            .doc(userId)
            .update({
                totalQuantity: firebase.firestore.FieldValue.increment(-cartItem.quantity),
                products: firebase.firestore.FieldValue.arrayRemove(cartItem),
            })
            .then(() => { resolve(true); })
            .catch((error) => {
                console.error('Error removing cart item:', error);
                resolve(false);
            });
    });
}

function dbChangeCartItemQuantity(userId, oldCartItem, newCartItem) {
    const isRemoved = dbRemoveCartItem(userId, oldCartItem);

    if (isRemoved)
        return dbAddCartItem(userId, newCartItem);

    return Promise.resolve(false);
}

function dbGetCartQuantity(userId) {
    let totalQuantity = 0;

    return new Promise((resolve, reject) => {
        db.collection(dbCartName)
            .doc(userId)
            .get()
            .then((cart) => {
                if (cart.exists)
                    totalQuantity = cart.data().totalQuantity;

                resolve(totalQuantity);
            })
            .catch((error) => {
                console.error('Error getting cart quantity:', error);
                resolve(totalQuantity);
            });
    });
}


// Function to delete a product by ID
function deleteProduct(productId) {
    // Get a reference to the product document
    var productRef = db.collection("products").doc(productId);

    // Delete the document
    productRef.delete().then(function () {
        // Display success message
        displayNotification("Product successfully deleted!", true);
        // Refresh the page after deletion
        setTimeout(function () {
            location.reload();
        }, 3000);
    }).catch(function (error) {
        // Display error message
        displayNotification("Error deleting product: " + error.message, false);
    });
}

// Function to display a notification
function displayNotification(message, isSuccess) {
    var notificationDiv = document.getElementById("notification");

    // Set the notification message and style
    notificationDiv.textContent = message;
    notificationDiv.style.color = isSuccess ? "green" : "red";

    // Clear the notification after a few seconds (optional)
    setTimeout(function() {
      notificationDiv.textContent = "";
    }, 2000);
}


// // Function to update a product's information
// function dbEditProduct(productId) {
//     // Get a reference to the product document
//     var productRef = db.collection("products").doc(productId);

//     // Get the product data
//     productRef.get().then(function (doc) {
//         if (doc.exists) {
//             // Display the product data in the form
//             document.getElementById("product-name").value = doc.data().name;
//             document.getElementById("product-price").value = doc.data().price;
//             document.getElementById("product-image").value = doc.data().image;
//             document.getElementById("product-description").value = doc.data().description;
//             document.getElementById("product-id").value = doc.id;
//         } else {
//             // Display error message
//             displayNotification("No such product!", false);
//         }
//     }).catch(function (error) {
//         // Display error message
//         displayNotification("Error getting product: " + error.message, false);
//     });
// }



//Function to navigate the management page to the edit page
function navigateToEditPage(productId) {
    // Navigate to the edit page
    window.location.href = "/html/admin-edit-product.html?productId=" + productId;
}


// Function to update a product's information
function dbEditProduct(product) {
    return new Promise((resolve, reject) => {
        db.collection(dbProductName)
            .edit(product)
            .then(() => { resolve(true); })
            .catch((error) => {
                console.error('Error editing product:', error);
                resolve(false);
            });
    });

    
}


