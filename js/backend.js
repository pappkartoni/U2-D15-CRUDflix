const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzBmNmU3MzczODAwMTUzNzQzNzMiLCJpYXQiOjE2NzQxMjk2NTQsImV4cCI6MTY3NTMzOTI1NH0.uvMVnP_iIKi1Whyr9El3BIGBSqO_016vYWPscfX92u8"
const params = new URLSearchParams(location.search)
const id = params.get("id")
const genre = params.get("genre")
const url = "https://striveschool-api.herokuapp.com/api/movies/"
const method = id ? "PUT" : "POST"

const addEditMovie = async (event) => {
    try {
        event.preventDefault()
        const movie = {
            name: document.querySelector("#name").value,
            description: document.querySelector("#description").value,
            category: document.querySelector("#category").value,
            imageUrl: document.querySelector("#image").value,
        }
        console.log(movie)
        const options = {
            headers: new Headers({
                "Content-type": "application/json",
                "Authorization": "Bearer " + apiKey,
            }),
            method: method,
            body: JSON.stringify(movie)
        }
        const isValid = movie.name && movie.description && movie.category && movie.imageUrl
        if (isValid) {
            let urlToPass
            if (id) {
                urlToPass = url + id
            } else {
                urlToPass = url
            }
            const res = await fetch(urlToPass, options)
            if (res.ok) {
                if (!id) {
                    //location.reload()
                }
            } else {
                throw res.status + " " + res.statusText
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteMovie = async () => {
    try {
        const res = await fetch(url + id,  {
            headers: new Headers({
                "Content-type": "application/json",
                "Authorization": "Bearer " + apiKey,
            }),
            method: "DELETE"})

        console.log(res)
        if (!res.ok) {
            throw res.status + " " + res.statusText
        }
    } catch (error) {
        console.log(error)
    }
}

const handleError = (errorText) => {
    const alert = document.querySelector(".alert span.alert-text")
    console.log(alert)
    alert.innerText = errorText
    alert.parentElement.classList.replace("d-none", "d-block")
}

window.onload = async() => {
    try {
        if (id && genre) {
            document.querySelector(".btn-success").remove();
            document.querySelector(".btn-danger").addEventListener("click", () => {
                deleteMovie()
            })
            const res = await fetch(url + genre, {
                headers: new Headers({
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + apiKey,
                })
            })
            if (res.ok) {
                const movies = await res.json();
                const {name, description, category, imageUrl } = movies.find(movie => movie._id === id)
                document.querySelector("#name").value = name
                document.querySelector("#description").value = description
                document.querySelector("#category").value = category
                document.querySelector("#image").value = imageUrl
            } else {
                throw res.status + " " + res.statusText
            }
            
        } else {
            document.querySelector(".btn-info").remove();
            document.querySelector(".btn-danger").remove();
        }
    } catch(error) {
        console.log(error)
    }
}