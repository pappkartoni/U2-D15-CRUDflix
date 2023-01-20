const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzBmNmU3MzczODAwMTUzNzQzNzMiLCJpYXQiOjE2NzQxMjk2NTQsImV4cCI6MTY3NTMzOTI1NH0.uvMVnP_iIKi1Whyr9El3BIGBSqO_016vYWPscfX92u8"
const url = "https://striveschool-api.herokuapp.com/api/movies/"

const getGenres = async () => {
    try {
        const res = await fetch(url, {
            headers: {
                Authorization: "Bearer " + apiKey
            }
        })
        if (res.ok) {
            const genres = await res.json();
            renderCategories(genres)
        } else {
            throw res.status + " " + res.statusText
        }
    } catch (error) {
        console.log(error)
    }
}

const renderCategories = (genres) => {
    genres.forEach(renderSingleCategory)
    renderCategoryMenu(genres)
}

const renderSingleCategory = async (genre) => {
    const main = document.querySelector("main")
    main.innerHTML +=  `<div class="container-fluid px-5 pt-5 pb-2">
                            <h2>${capitalize(genre)}</h2>
                            <div id="${genre}Carousel-lg" class="carousel slide d-none d-lg-block" data-interval="false">
                                <a class="carousel-control-prev" href="#${genre}Carousel-lg" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#${genre}Carousel-lg" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                                <div class="carousel-inner">
                                </div>
                            </div>
                            <div id="${genre}Carousel-md" class="carousel slide d-none d-md-block d-lg-none" data-interval="false">
                                <div class="carousel-inner">
                                </div>
                                <a class="carousel-control-prev" href="#${genre}Carousel-md" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#${genre}Carousel-md" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                            <div id="${genre}Carousel-sm" class="carousel slide d-block d-md-none" data-interval="false">
                                <div class="carousel-inner">
                                </div>
                                <a class="carousel-control-prev" href="#${genre}Carousel-sm" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#${genre}Carousel-sm" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>`
    await getMovies(genre)
}

const renderCategoryMenu = (genres) => {
    const menu = document.querySelector(".dropdown-menu ")
    genres.forEach((genre) => {
        menu.innerHTML += `
                                <a class="dropdown-item" href="#">${capitalize(genre)}</a>
                            `
    })
}

const getMovies = async (genre) => {
    try {
        const res = await fetch(url + genre, {
            headers: {
                Authorization: "Bearer " + apiKey
            }
        })
        if (res.ok) {
            const movies = await res.json();   
            renderMovies(movies, genre) 
        } else {
            throw res.status + " " +res.statusText
        }
    } catch (error) {
        console.log(error)
    }
}

const renderMovies = (movies, genre) => {
    console.log(movies, genre)
    const mNum = movies.length
    const rowsLg = Math.ceil(mNum / 6)
    const rowsMd = Math.ceil(mNum / 4)
    const rowsSm = Math.ceil(mNum / 2)
    const innerLg = document.querySelector(`#${genre}Carousel-lg .carousel-inner`)
    const innerMd = document.querySelector(`#${genre}Carousel-md .carousel-inner`)
    const innerSm = document.querySelector(`#${genre}Carousel-sm .carousel-inner`)

    let i = 1
    while (i <= rowsSm) {
        
        const rowHtml = `<div class="carousel-item ${i === 1 ? "active" : ""}">
                            <div class="row py-2 mx-n1 no-wrap">
                            </div>
                        </div>`
        
        innerSm.innerHTML += rowHtml

        if (i <= rowsMd) {
            innerMd.innerHTML += rowHtml
            if (i <= rowsLg) {
                innerLg.innerHTML += rowHtml
            }
        }
        i++
    }
    console.log(movies.length)
    for (let j = 0; j < movies.length; j++) {
        const rowLg = document.querySelector(`#${genre}Carousel-lg .carousel-inner .carousel-item:nth-of-type(${Math.floor(j / 6) + 1}) .row`)
        console.log(rowLg)
        renderSingleMovie(movies[j], rowLg)
        const rowMd = document.querySelector(`#${genre}Carousel-md .carousel-inner .carousel-item:nth-of-type(${Math.floor(j / 4) + 1}) .row`)
        renderSingleMovie(movies[j], rowMd)
        const rowSm = document.querySelector(`#${genre}Carousel-sm .carousel-inner .carousel-item:nth-of-type(${Math.floor(j / 2) + 1}) .row`)
        renderSingleMovie(movies[j], rowSm)
    }
}

const renderSingleMovie = (movie, row) => {
    console.log(row)
    const {name, description, category, imageUrl, _id} = movie
    const movieCard = `<div class="col-6 col-md-3 col-lg-2 px-1">
                            <div class="card">
                                <a href="./backend.html?id=${_id}&genre=${category}"><img class="card-img-top" src="${imageUrl}"></a>
                                <div class="card-body">
                                    <div class="d-flex flex-column">
                                        <h6 class="card-title">${name}</h6>
                                        <p class="card-text">${description}</p>
                                        <div class="d-flex"><span class="badge badge-pill badge-secondary">${capitalize(category)}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>`
    row.innerHTML += movieCard
}


window.onload = async () => {
    await getGenres()
}

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}