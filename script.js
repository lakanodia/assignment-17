
let mainPost = document.getElementById('main-block');
let overlay = document.getElementById('overlay');
let content = document.getElementById('content');
let closeIcon = document.getElementById('close');
let addPost = document.getElementById('add-post');
let addPostOverlay = document.getElementById('addPostOverlay');


// https://jsonplaceholder.typicode.com/posts
function ajax(url, callback){
    let request = new XMLHttpRequest();
    request.addEventListener('load', function(){
        let data = JSON.parse(request.responseText);
        callback(data);
    })
    request.open('GET', url);
    request.send();
}

let urlPosts = 'https://jsonplaceholder.typicode.com/posts';

ajax(urlPosts, renderPostElements);


function renderPostElements(posts){
    posts.forEach(post => {
        renderPost(post);
    });
}

function renderPost(post){
    let divWraper = document.createElement('div');
    divWraper.classList.add('post-div');
    divWraper.setAttribute('data-id', post.id);

    let h2Tag = document.createElement('h2');
    h2Tag.innerText = post.id;

    let h3Tag = document.createElement('h3');
    h3Tag.innerText = post.title;

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete Post';
    deleteButton.classList.add('deleteButton');
        
    deleteButton.addEventListener('click', function(event){
        event.stopPropagation();
        let id = event.target.parentElement.getAttribute('data-id');
        console.log(`button ${id}`);
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
          })
        .then((_) => divWraper.remove());
    })

    divWraper.appendChild(h2Tag);
    divWraper.appendChild(h3Tag);
    divWraper.appendChild(deleteButton);
    mainPost.appendChild(divWraper);

    divWraper.addEventListener('click', function(event){
        content.innerHTML = ' ';
        let id = event.target.getAttribute('data-id');
        openOverlay(id);
        
    });
    h3Tag.addEventListener('click', onTextClick)
  
    h2Tag.addEventListener('click', onTextClick)

    
    function onTextClick(event) {
        event.stopPropagation();
        content.innerHTML = ' ';
        let id = event.target.parentElement.getAttribute('data-id');
        openOverlay(id);
    }
}   

function openOverlay(id){
    overlay.classList.add('active');
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(url, function(data){
        renderOverlay(data);
    });
}

function renderOverlay(item){
    let title = document.createElement('h2');
    title.classList.add('title');
    title.innerText = item.title;
    
    let description = document.createElement('p');
    description.innerText = item.body;
    description.classList.add('description');

    content.appendChild(title);
    content.appendChild(description);
}

closeIcon.addEventListener('click' , function(){
    overlay.classList.remove('active');
    content.innerHTML = ' ';
})


addPost.addEventListener('click', function(){
    addPostOverlay.classList.add('act');
})




