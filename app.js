//Requirements: https://lessons.springboard.com/AJAX-Giphy-Party-c72b165a313145f6a2d679d37ec785db#d9aa7bb1dc3f43a6b4639e7ae640e36e
// ## **The Application**

// Your application should do the following:

// - Allow the user to search for a GIF and when the form is submitted, make an AJAX request to the Giphy API and return a single GIF
// - Once the Giphy API has responded with data, append the GIF to the page
// - Allow the user to search for as many GIFs as they would like and keep appending them to the page
// - Allow the user to remove all of the GIFs by clicking a button
// - Here is an example of what the application might look like

console.log("Let's get this party started!");
const input = document.querySelector('#query'); // get search field
const form = document.querySelector('#searchForm') 
// const apiKey = '2ziqEsGzUIztaWWIgKEQ1gw6M0uandZk' //API key I created
const apiKey = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym' //API key from springboard example


let results = document.querySelector('#results')
const removeButton = document.querySelector('#removeBtn')

//TODO: button click handlers
form.addEventListener('submit',function(e){
    e.preventDefault();
    searchGiphy(input)});

    removeButton.addEventListener('click',clear);
//DONE


//TODO: search giphy for a gif
async function searchGiphy(query) {
    let offset = Math.floor(Math.random()*100)//randomize the result
    const q = input.value; // set query to q, for use in api request
    try {
        const res = await axios.get('https://api.giphy.com/v1/gifs/search', {
            params:{
            api_key:apiKey,
            q:q,
            limit:1,
            offset:offset
        }   
    })
    let gifURL = res.data.data[0].images.downsized_medium.url
    appendGif(gifURL); // call append function with gif url
    } catch (e) {
        alert('Could not search for a gif. Please make sure ad blockers are disabled.')
    }     
}

//add gif to the dom
function appendGif(gifURL) {
    let newGif = document.createElement('img'); //create empty img tag
    newGif.setAttribute('src',gifURL) // set the src of image tag to gifURL
    // console.log('newGif ',newGif) // remove later
    results.appendChild(newGif) // add the newly created image tag to results section
}

//Clear all results from dom
function clear() {
    results.innerHTML = ''
    console.log('clear called')
}