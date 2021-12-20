function getId() {
    return 100;
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.7) {
                // moving to the resolved state
                resolve("user" + id);
            } else {
                // moving to the rejected state
                reject("wrong id");
            }
        }, 1000);
    });
}

function getProduct(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.5) {
                resolve("Product of " + user);
            } else {
                reject(new Error(`The user ${user} has no products`));
            }            
        }, 1000);
    });
}

// function displayProduct() {
//     const id = getId();
//     getUser(id).then(user => getProduct(user)).then(product => console.log(product))
//         .catch(err => {
//             if (typeof err == 'object') {
//                 console.log(err.message);
//             } else {
//                 console.log(err);
//             }
//         })
//         .finally(() => console.log("bye"));
// }
// async function displayProduct() {
//     const id = getId();
//     try {
//         const user = await getUser(id);
//         const product = await getProduct(user);
//         console.log(product);
//     } catch (err) {
//         if (typeof err == 'object') {
//             console.log(err.message);
//         } else {
//             console.log(err);
//         }
//     } finally {
//         console.log("bye");
//     }
// }

// displayProduct();

// function sleep(timeout) {
//     let flRunning = true;
//     setTimeout(() => {
//         flRunning = false;
//     }, timeout);
//     while (flRunning) {
//         // infinite cicle
//     }
// }

function sleep(timeout) {
    return new Promise(resolve => {
        setTimeout(() => resolve('Time is over'), 
            timeout);
    });
}

sleep(3000).then(res => console.log(res));