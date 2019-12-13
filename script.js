const flash = document.querySelector('#flash')
const clippy = document.querySelector('#clippy')

const move = () => {
    flash.className = 'drop'
    clippy.className = 'lift'
}

start.addEventListener('click', move)