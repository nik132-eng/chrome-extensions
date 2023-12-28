fetch('https://icanhazdadjoke.com/slack')
    .then(data => data.json())
    .then(joke => {
        document.querySelector('p').innerHTML = joke.attachments[0].text;
    })


    // console.log(data)
