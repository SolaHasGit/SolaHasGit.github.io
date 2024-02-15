const container = document.querySelectorAll('.multi-column');

for (let i = 0; i < container.length; i++) {
    const item = container[i];
    const image = item.querySelector('img');
    const description = item.querySelector('aside');

    image.addEventListener('click', function () {
        expand(image, description);
    });
}

function expand(image, description) {
    for (let i = 0; i < container.length; i++) {
        const item = container[i];
        const img = item.querySelector('img');
        const desc = item.querySelector('aside');
        img.classList.remove('big');
        img.classList.add('small');
        desc.classList.add('hide');
    }
    image.classList.remove('small');
    image.classList.add('big');
    description.classList.remove('hide');
    description.classList.add('shown');
}