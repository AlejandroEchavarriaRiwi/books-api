


function renderBooks(title: string, author: string, description: string): void {
    const cardsContainer = document.querySelector('.cardsContainer') as HTMLDivElement;

    const card = document.createElement('div') as HTMLDivElement;
    card.classList.add('cardBook');
    const imageCard = document.createElement('div') as HTMLDivElement;
    imageCard.classList.add('bookPhoto')
    card.appendChild(imageCard);
    const infoCard = document.createElement('div') as HTMLDivElement;
    infoCard.classList.add('bookInfo')
    card.appendChild(infoCard);
    
    const bookTitle = document.createElement('h3') as HTMLHeadingElement;
    bookTitle.textContent = title;
    const bookAuthor = document.createElement('h5') as HTMLHeadingElement;
    bookAuthor.textContent = author;
    const bookDescription = document.createElement('p') as HTMLParagraphElement;
    bookDescription.textContent = description;

    infoCard.appendChild(bookTitle);
    infoCard.appendChild(bookAuthor);
    infoCard.appendChild(bookDescription);

    cardsContainer.appendChild(card);
}