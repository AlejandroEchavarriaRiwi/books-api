"use strict";
function renderBooks(title, author, description) {
    const cardsContainer = document.querySelector('.cardsContainer');
    const card = document.createElement('div');
    card.classList.add('cardBook');
    const imageCard = document.createElement('div');
    imageCard.classList.add('bookPhoto');
    card.appendChild(imageCard);
    const infoCard = document.createElement('div');
    infoCard.classList.add('bookInfo');
    card.appendChild(infoCard);
    const bookTitle = document.createElement('h3');
    bookTitle.textContent = title;
    const bookAuthor = document.createElement('h5');
    bookAuthor.textContent = author;
    const bookDescription = document.createElement('p');
    bookDescription.textContent = description;
    infoCard.appendChild(bookTitle);
    infoCard.appendChild(bookAuthor);
    infoCard.appendChild(bookDescription);
    cardsContainer.appendChild(card);
}
