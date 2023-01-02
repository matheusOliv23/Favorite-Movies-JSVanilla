const addMovieModal = document.getElementById('add-modal')
const startAddMovieButton = document.querySelector('header button')
const backdrop = document.getElementById('backdrop')
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive')
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling
const userInputs = addMovieModal.querySelectorAll('input')
const entryTextSection = document.getElementById('entry-text')
const deleteMovieModal = document.getElementById('delete-modal')

const movies = []

const updateUi = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block'
    } else {
        entryTextSection.style.display = 'none'
    }
}

const deleteMovie = (movieId) => {
    let movieIndex = 0
    for (const movie of movies) {
        if (movie.id === movieId) {
            break
        }
        movieIndex++
    }
    movies.splice(movieIndex, 1)
    const listRoot = document.getElementById('movie-list')
    listRoot.children[movieIndex].remove()
    closeMovieModal()
}

const cancelMovieDeletion = () => {
    toggleBackdrop()
    deleteMovieModal.classList.remove('visible')
}

function toggleBackdrop() {
    backdrop.classList.toggle('visible')
}

function closeMovieModal() {
    toggleBackdrop()
    addMovieModal.classList.remove('visible')
}

const deleteMoveHandler = (movieId) => {
    deleteMovieModal.classList.add('visible')
    toggleBackdrop()
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive')
    const confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger')

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true))

    confirmDeletionButton.removeEventListener('click', deleteMovie.bind(null, movieId))
        //cancelDeletionButton.removeEventListener('click', cancelMovieDeletion)

    cancelDeletionButton.addEventListener('click', cancelMovieDeletion)
    confirmDeletionButton.addEventListener('click', deleteMovie.bind(null, movieId))
}


const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li')
    newMovieElement.className = 'movie-element'
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}" />
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `
    newMovieElement.addEventListener('click', deleteMoveHandler.bind(null, id))
    const listRoot = document.getElementById('movie-list')
    listRoot.append(newMovieElement)
}

const clearMovieInput = () => {
    for (const usrInput of userInputs) {
        usrInput.value = ''
    }
}

const cancelAddMovie = () => {
    closeMovieModal()
    toggleBackdrop()
    clearMovieInput()
}

const showMovieModal = () => {
    addMovieModal.classList.add('visible')
    toggleBackdrop()
}

const backdropClickHandler = () => {
    closeMovieModal()
    cancelMovieDeletion()
}

const addMovieHandler = () => {
    const titleValue = userInputs[0].value
    const imageUrlValue = userInputs[1].value
    const ratingValue = userInputs[2].value

    if (titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 || +ratingValue > 5
    ) {
        alert('Please enter valid values')
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    }

    movies.push(newMovie)
    closeMovieModal()
    toggleBackdrop()
    clearMovieInput()
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.imageUrl, newMovie.rating)
    updateUi()
}



startAddMovieButton.addEventListener('click', showMovieModal)
backdrop.addEventListener('click', backdropClickHandler)
cancelAddMovieButton.addEventListener('click', cancelAddMovie)
confirmAddMovieButton.addEventListener('click', addMovieHandler)