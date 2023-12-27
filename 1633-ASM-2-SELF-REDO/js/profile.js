// const mysql = require('mysql');
// import firebase from 'firebase/app';
// import 'firebase/database';
// // Account information
// const account = {
//     username: "example_user",
//     email: "example@example.com",
//     balance: 1000,
// };

// // Display account information
// console.log("Username:", account.username);
// console.log("Email:", account.email);
// console.log("Balance:", account.balance);
// // Create a connection to the database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'your_username',
//     password: 'your_password',
//     database: 'your_database',
// });

// // Connect to the database
// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         return;
//     }
//     console.log('Connected to the database');
    
//     // Query the database to retrieve account information
//     const query = 'SELECT * FROM accounts WHERE id = ?';
//     const accountId = 1; // Replace with the actual account ID
//     connection.query(query, [accountId], (err, results) => {
//         if (err) {
//             console.error('Error retrieving account information:', err);
//             return;
//         }
        
//         // Display account information
//         const account = results[0];
//         console.log('Username:', account.username);
//         console.log('Email:', account.email);
//         console.log('Balance:', account.balance);
        
//         // Close the database connection
//         connection.end();
//     });
// });

// // Display account information
// console.log('Username:', account.username);
// console.log('Email:', account.email);
// console.log('Balance:', account.balance);

// // Retrieve account information from Firebase database
// const accountId = 'YOUR_ACCOUNT_ID'; // Replace with the actual account ID
// const database = firebase.database();
// const accountRef = database.ref('accounts/' + accountId);

// accountRef.once('value', (snapshot) => {
//     const accountData = snapshot.val();
//     if (accountData) {
//         console.log('Username:', accountData.username);
//         console.log('Email:', accountData.email);
//         console.log('Balance:', accountData.balance);
//     } else {
//         console.log('Account not found');
//     }
// });

// // displaying product for consumers
// function displayProfiles(element, products) {
//     if (products.length === 0) {
//         element.innerHTML = '<div>No product.</div>'
//         return;
//     }

//     for (const product of products)
//         element.innerHTML += displayProfileCard(product);
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