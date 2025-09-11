const quotePara = document.querySelector('.quote-para')
const quoteAuthor = document.querySelector('.quote-author')

function getQuote() {
  fetch('https://random-quotes-freeapi.vercel.app/api/random')
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      quotePara.textContent = response.quote
      quoteAuthor.textContent = response.author
    })
}

setInterval(getQuote, 15*60*1000)
getQuote()