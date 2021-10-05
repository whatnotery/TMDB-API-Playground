
const title = document.querySelector('#title')
const poster = document.querySelector('#poster')
const tagline = document.querySelector('#tagline')


fetch('https://api.themoviedb.org/3/movie/26914?api_key=b07d3efad9e75e49c88e831539462c48')
.then(res => {
return res.json()
})
.then(data => {
    console.log(data)
    title.textContent = `${data.title}`
    poster.src = `https://image.tmdb.org/t/p/original/${data.poster_path}` 
    tagline.textContent = `${data.tagline}`
})
.catch(err => {
    console.log(err)
})


