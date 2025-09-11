 const image = document.querySelector('img')
    fetch('https://api.giphy.com/v1/gifs/translate?api_key=Ak5tiNQ1k7pQgPKCcTmmn4kvrxJ0t9oM&s=cat')
        .then(function(response) {
           return (response.json())
        })
        .then(function(response) {
            image.src = response.data.images.original.url
        })