const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'X21C3ja3fzGRSn3kb7hLUOyo_v3Q1xUNmSGiM-2zH54';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&YOUR_ACCESS_KEY&count=${count}`;

//check if images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
    }
}

//Helper Function
function setAttributes (element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links and Photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
        href: photo.links.html,
        target: '_blank'
    })
    //Create img for photo
    const img = document.createElement('img');
    setAttributes(img, {
        src: photo.urls.regular,
        alt:photo.alt_description,
        title: photo.alt_description
    });

    img.addEventListener('load', imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
    });
}


// get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error){
        // catch error here
    }
}

//Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
if (window.innerHeight + window.scrollY >= document.body.offsetHeight -
    1000 && ready) {
        ready = false;
        getPhotos();
    }
});

getPhotos();