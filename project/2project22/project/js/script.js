import {movies} from '../modules/db.js'
let promoImg = document.querySelectorAll('.promo__adv img')
let promo__genre = document.querySelector('.promo__genre')
let promo__bg = document.querySelector('.promo__bg')
let promo__title = document.querySelector('.promo__title')
let promo__descr = document.querySelector('.promo__descr')
let promo__ratings = document.querySelectorAll(".promo__ratings span")
let search = document.querySelector('#search')

let ul = document.querySelector('.promo__interactive-list')
let text = document.querySelector('.text')
let text1 = document.querySelector('.text1')
let text2 = document.querySelector('.text2')
let text3 = document.querySelector('.text3')
let text4 = document.querySelector('.text4')
let rating = document.querySelector('.rating')
let ratingValue = document.querySelector('.rating_value')
let ratingActive = rating.querySelector('.rating_active')
let ratingMetascore = rating.querySelector('.ratingMetascore')
let itemName = document.querySelector('.itemName')
let imgBox = document.querySelector('.imgBox')
let header__search = document.querySelector('.header__search')



promoImg.forEach((img) => {
    img.remove(img)
})

promo__genre.innerHTML = "Драма"

header__search.onclick = () => {
    let {value} = search
    value = value.toLowerCase().trim()
    
    let filtered = movies.filter(item => {
        let {Title} = item
        Title = Title.toLowerCase().trim()

        if(Title.includes(value)) {
            return item
        }
    })


    reload(filtered)
}


const reload = (arr) => {
    ul.innerHTML = ""
    showMovie(arr[0])

    arr.forEach((item, index) =>{
        let li = document.createElement('li')
        let delet = document.createElement('div')
    
        li.classList.add('promo__interactive-item')
        
        li.innerHTML = `${index + 1}.${item.Title}`
        
        delet.classList.add('delete')
        
        ul.append(li)
        li.append(delet)
        
        // functions
        li.onclick = () => {
            showMovie(item)
        }
        li.onclick = () => {
            imgBox.style.background = `url(${item.Img}) cover/round`
            // rating.innerHTML =  `IMDb: ${item.imdbRating}`
            text.innerHTML = `${item.Title}`
            text4.innerHTML = `${item.Genre}`
            text1.innerHTML = `${item.Released}`
            text2.innerHTML = `${item.Runtime}`
            text3.innerHTML = `${item.Actors}`
            itemName.innerHTML = `${item.Plot}`
            ratingValue.innerHTML = `IMDb: ${item.imdbRating}`
            ratingMetascore.innerHTML =  `Кинопоиск: ${item.Metascore}`


            modal.style.display = "block"
            modal_bg.style.display = "block"

            setRating(item.imdbRating)
            console.log(setRating(item.imdbRating));
            
            setTimeout(() => {
                modal_bg.style.opacity = "1"
                modal.style.opacity = "1"
                modal.style.transform = "translate(-50%, -50%) scale(1)"
            }, 200);
        }
    })
}


const showMovie = (movie) => {
    promo__bg.style.background = `url(${movie.Poster}) center center/cover`
    promo__genre.innerHTML = movie.Genre
    promo__title.innerHTML = movie.Title
    promo__descr.innerHTML = movie.Plot

    promo__ratings[0].innerHTML =  `IMDb: ${movie.imdbRating}`
    promo__ratings[1].innerHTML =  `Кинопоиск: ${movie.Metascore}`
}

reload(movies)

let x = document.querySelector('.imgIcon')
let modal = document.querySelector('.modal')
let modal_bg = document.querySelector('.modal_bg')



x.onclick = () => {
    modal_bg.style.opacity = "0"
    modal.style.opacity = "0"
    modal.style.transform = "translate(-50%, -50%) scale(.2)"
    setTimeout(() => {
        modal.style.display = "none"
        modal_bg.style.display = "none"    
    }, 200);
}
modal_bg.onclick = () => {
    modal_bg.style.opacity = "0"
    modal.style.opacity = "0"
    modal.style.transform = "translate(-50%, -50%) scale(.2)"
    setTimeout(() => {
        modal.style.display = "none"
        modal_bg.style.display = "none"    
    }, 200);
}

function setRating(ratingValue) {
    let percent = (ratingValue / 10 * 100).toFixed(0); 
    ratingActive.style.width = `${percent}%`
    console.log(percent);
}



