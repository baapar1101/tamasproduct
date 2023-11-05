function displayProducts() {
    const apiKey = 'AIzaSyD4ii8-sa2UJWWqi2CqrK312L7c7__DvAQ';
    const sheetId = '1ENYJZeXJBODXJsYKTvz7R1qQwNaVGi4OBQe6jlgUCKc';
    const range = 'site!A1:D100';

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const products = data.values;

            if (products && products.length > 0) {
                let output = "<div id='products' class='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>"; // Adjust grid columns based on screen size

                let currentCategory = null;

                for (let i = 1; i < products.length; i++) {
                    const product = products[i];

                    if (currentCategory !== product[0]) {
                        output += `<div class='category text-center font-bold my-4 col-span-4 text-xl sm:text-2xl lg:text-3xl'>${product[0]}</div>`; // Responsive font size for category
                        currentCategory = product[0];
                    }

                    output += `
                        <div class='product w-full sm:w-1/2 md:w-1/4 p-4'> <!-- Adjust width for columns -->
                            <img src='${product[2]}' alt='Product Image' class='w-full h-40 object-cover rounded-md mb-2'>
                            <h2 class='text-lg sm:text-xl md:text-lg lg:text-xl font-bold mb-1'>${product[1]}</h2>
                            <p class='text-gray-600 text-sm sm:text-base md:text-sm lg:text-base'>${product[3]}</p>
                        </div>
                    `;
                }

                output += "</div>";
                document.getElementById('content').innerHTML = output;
            } else {
                console.log('No data found.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

document.addEventListener("DOMContentLoaded", displayProducts);
