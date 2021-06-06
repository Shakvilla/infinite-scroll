const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let isReady = false;
let imagesLoaded = 0;


let photosArray = []


const count = 3;
const apiKey = 'S3bXzSHZxJ5bNdd2q2i1GiyshxxeMCk0BAkD3wbC538'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`


function imageLoaded() {

    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        isReady = true;
        loader.hidden = true;
        count = 30;
    }
}

//helper function for setAttributes()

function setAttributes(el, attr) {
    for (const key in attr) {
        el.setAttribute(key, attr[key])
    }
}

//Create elements and links to add to add to DOM
function displayPhoto() {

    imagesLoaded = 0;
    totalImages = photosArray.length;

    //Run function for each object in photosArray
    photosArray.forEach((photo) => {

        //create an <a> to link to unsplash
        const item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        //create <img> for image
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        img.addEventListener('load', imageLoaded);

        //put image into img and put both in imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    })


}




//get photos function
async function getPhotos() {

    try {

        const response = await fetch(apiUrl)
        photosArray = await response.json();
        displayPhoto();

    } catch {

    }
}



window.addEventListener('scroll', () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isReady) {

        isReady = false;
        getPhotos();
    }

})
//on load
getPhotos()