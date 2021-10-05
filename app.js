
const title = document.querySelector('#title')
const poster = document.querySelector('#poster')
const tagline = document.querySelector('#tagline')
const id = document.querySelector('#id')

fetch('https://api.themoviedb.org/3/movie/latest?api_key=b07d3efad9e75e49c88e831539462c48')
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data)
        return data.id
    })
    .then(data => {
        let movieID = Math.floor(Math.random() * `${data.id}`);
        fetch('https://api.themoviedb.org/3/movie/`${movieID}`?api_key=b07d3efad9e75e49c88e831539462c48')
            .then(res => {
                return res.json()
            })
            .then(data =>{
                title.textContent = `${data.title}`
                poster.src = `https://image.tmdb.org/t/p/w300/${data.poster_path}`
                tagline.textContent = `${data.tagline}`
            } )
    })
.catch (err => {
    console.log(err)
});




