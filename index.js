let darkMode = document.querySelector('.sun-image');
let lightMode = document.querySelector('.moon-image');
const adjustImgBrightness = document.querySelectorAll('.adjust-brightness');
const searchContainer = document.querySelector('.search-field-container');
const inputField = document.querySelector('.enter-username');
const searchButton = document.querySelector('.search-btn');
const mainInfoContainer = document.querySelector('.main-info-container');
const root = document.querySelector(':root');
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const spinner = document.querySelector('.spinner');
const container = document.querySelector('container');

let currMode = darkMode;

//dark mode by default
lightMode.style.display = 'none';

// initialise the page with my github profile
function init() {
    getUserProfile('miheersharma22');
}
init();

// change to light mode
function changeToLightMode() {
    // changing the values of the CSS global color variables
    root.style.setProperty('--main-text' , '#4b6a9b');
    root.style.setProperty('--dark-bg' , '#f6f8ff');
    root.style.setProperty('--container-color' , '#fefefe');
    root.style.setProperty('--second-text' , 'black');
    root.style.setProperty('--user-activity-bg' , '#f6f8ff');

    // increasing the brightness of the 4 images at the most bottom 
    adjustImgBrightness.forEach((image)=> {
        image.style.filter = 'brightness(100%)';
    });

    searchContainer.style.boxShadow = '2px 5px 22px 0px rgba(0,0,0,0.75)';
    mainInfoContainer.style.boxShadow = '2px 5px 22px 0px rgba(0,0,0,0.75)';
}

// change to dark mode
function changeToDarkMode() {
    // changing the values of the CSS global color variables
    root.style.setProperty('--main-text' , '#ffffff');
    root.style.setProperty('--dark-bg' , '#141d2f');
    root.style.setProperty('--container-color' , '#1e2a47');
    root.style.setProperty('--second-text' , '#ffffff');
    root.style.setProperty('--user-activity-bg' , '#141d2f');

    // increasing the brightness of the 4 images at the most bottom 
    adjustImgBrightness.forEach((image)=> {
        image.style.filter = 'brightness(1000%)';
    })
}

// handle what happens each time the theme change button is clicked
function handleThemeBtnClick() {
    if(currMode === lightMode ) {
        currMode = darkMode;
        lightMode.style.display = 'none';
        darkMode.style.display = 'block';
        changeToDarkMode();
    }
    else {
        currMode = lightMode;
        lightMode.style.display = 'block';
        darkMode.style.display = 'none';
        changeToLightMode();
    }
}


// function to render the fetched profile's data on the UI
function renderOnWebPage(data) {
    inputField.value = "";

    if(data?.message !== "Not Found") {
        const userImage = document.querySelector('.user-image');
        const name = document.querySelector('.name');
        const userName = document.querySelector('.github-name');
        const date = document.querySelector('.joining-date');
        const bio = document.querySelector('.bio');
        const repoCount = document.querySelector('.repo-number');
        const followerCount = document.querySelector('.followers-number');
        const followingCount = document.querySelector('.following-number');
        const location = document.querySelector('.location');
        const blogLink = document.querySelector('.github-link');
        const twitterLink = document.querySelector('.twitter-link');
        const company = document.querySelector('.company');

        userImage.src = data?.avatar_url;

        if(data?.name !== null) 
            name.innerHTML = data?.name; 
        else
            name.innerHTML = data?.login;

        userName.innerHTML = `@${data?.login}`;
        userName.href = `https://github.com/${data?.login}`;

        let strDate = data?.created_at.split('-');
        // console.log(strDate);
        date.innerHTML = `Joined ${strDate[2].substr(0,2)} ${months[strDate[1].substr(1,1) - 1]} ${strDate[0]}`;

        if(data.bio !== null)
            bio.innerHTML = data?.bio;
        else
            bio.innerHTML = "This profile has no bio";

        repoCount.innerHTML = data?.public_repos;
        followerCount.innerHTML = data?.followers;
        followingCount.innerHTML = data?.following;

        if(data?.location !== null)
            location.innerHTML = data?.location;
        else
        location.innerHTML = "Not Available";

        if(data?.blog !== "")
            blogLink.innerHTML = data?.blog;
        else
            blogLink.innerHTML = "Not Available";

        if(data?.twitter_username !== null) {
            twitterLink.innerHTML = `@${data?.twitter_username}`;
            twitterLink.href = `https://twitter.com/${data?.twitter_username}`;

        }
        else
            twitterLink.innerHTML = "Not Available";

        if(data?.company !== null)
            company.innerHTML = data?.company;
        else
            company.innerHTML = "Not Available";
    }
    // if the entered user doenst exist
    else {
        const noUserFound = document.querySelector('.no-user-found');
        noUserFound.textContent = "No such user Found";
        noUserFound.classList.add('active');
        setTimeout(() => {
            noUserFound.classList.remove('active');
        }, 3000);
    }
}


// function to get the github profile using API of entered user
async function getUserProfile(userName) {
    try {

        // displaying the loader
        spinner.classList.add('active');
        mainInfoContainer.classList.remove('active');

        let response = await fetch(`https://api.github.com/users/${userName}`);

        const data = await response.json();

        // hiding the loader and showing info
        spinner.classList.remove('active');
        mainInfoContainer.classList.add('active');

        renderOnWebPage(data);
    }
    catch(err) {
        console.log("An Error Occured : " , err);
    }
}

// adding event listeners for the dark and light theme buttons
darkMode.addEventListener('click' , ()=> {
    handleThemeBtnClick();
});
lightMode.addEventListener('click' , ()=> {
    handleThemeBtnClick();
});

// adding eventlistener for the input field that if enter is pressed , search for the entered user
inputField.addEventListener("keyup", (event) => {
    if (event.keyCode === 13 && inputField.value !== "") {
      getUserProfile(inputField.value);
    }
  });

// adding the event listener for the 'seacrh' button
searchButton.addEventListener('click' , ()=> {
    if (inputField.value !== "") {
        getUserProfile(inputField.value);
    }
})