// Define constants for API endpoints
const API_BASE_URL = "https://openapi.programming-hero.com/api/videos";
const CATEGORY_ENDPOINT = `${API_BASE_URL}/categories`;

// Initialize selectedCategory
let selectedCategory = 0;

// Function to display video data
const displayData = (loadData) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = '';

  if (!loadData.length) {
    const cardData = document.createElement('div');
    cardData.innerHTML = `<div><p>Ops sorry, its an empty</p>
    <img src="icon.png">
    <p>No vedio avilable here</p>
    </div>`;
    cardContainer.appendChild(cardData);
    return;
  }

  loadData.forEach((data) => {
    const cardData = document.createElement('div');
    cardData.classList = `card p-2 bg-gray-100`;
    cardData.innerHTML = `
      <figure><img src="${data.thumbnail}"/></figure>
      <div class="card-body">
        <img class="card-title w-10 h-10 rounded-full" src="${data.authors[0].profile_picture}" />  
        <h2>${data.authors[0].profile_name} ${data.authors[0].verified}</h2>
        <p>${data.others.views} views</p>
      </div>
    `;
    cardContainer.appendChild(cardData);
  });
};

// Function to fetch and display videos by category
const displayCategoryVideos = async (categoryId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/category/${categoryId}`);
    const data = await response.json();
    const categoryData = data.data;
    displayData(categoryData);
  } catch (error) {
    console.error("Error fetching category videos:", error);
  }
};

// Function to update button styles
const updateButtonStyles = (selectedButtonId) => {
  const buttons = document.querySelectorAll(".category-button");
  buttons.forEach((button) => {
    button.classList.remove("selected");
    if (button.id === selectedButtonId) {
      button.classList.add("selected");
    }
  });
};

// Function to fetch and display categories
const displayCategories = async () => {
  try {
    const response = await fetch(CATEGORY_ENDPOINT);
    const data = await response.json();
    const categories = data.data;
    const buttonContainer = document.getElementById('category-button-section');

    categories.forEach((category, index) => {
      if (index === 0) {
        selectedCategory = category.category_id;
      }

      const buttonData = document.createElement('div');
      buttonData.innerHTML = `
        <button onclick="displayCategoryVideos(${category.category_id})" id="${category.category_id}" class="category-button bg-gray-400 text-white px-6 py-3 rounded-lg">
        ${category.category}</button>
      `;
      buttonContainer.appendChild(buttonData);
    });

    updateButtonStyles(selectedCategory);
    await displayCategoryVideos(selectedCategory);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Call displayCategories to initialize the page
displayCategories();
