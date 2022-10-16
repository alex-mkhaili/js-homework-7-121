// let postsWraper = document.getElementById("posts-wraper");
// let overlayBlock = document.getElementById("overlay");
// let overlayClose = document.getElementById("closeButton");


// function ajax(url) {
//     // https://jsonplaceholder.typicode.com/posts
//     fetch(url, {
//         method: "GET"
//     })
//     .then(function(response) {
//         if (response.status !=200) {
//             throw response.status
//         }
//         return response.json();
//     }) 
//     .then (function(responseData) {
//         responseData.forEach(post => {
//             PostRenderLogic(post);
//         })
    
//         function PostRenderLogic (post) {
//             let divWrapper = document.createElement("div");
//             divWrapper.classList.add("post-block");
//             divWrapper.setAttribute("data-id", post.id);
    
//             let h3 = document.createElement("h3");
//             h3.innerText = post.id;
    
//             let h2 = document.createElement("h2");
//             h2.innerText = post.title;
    
//             divWrapper.appendChild(h3);
//             divWrapper.appendChild(h2);
//             postsWraper.appendChild(divWrapper);
    
    
//             divWrapper.addEventListener("click", function(event) {
//                 overlayBlock.classList.add("active");
//                 let id = event.target.getAttribute("data-id");
//                 let post_url = `https://jsonplaceholder.typicode.com/posts/${id}`
//                 ajax(post_url, );
//             })
    
    
//             overlayClose.addEventListener("click", () => {
//                 overlayBlock.classList.remove("active");
//             })
//         }
    
//     })
//     .catch(function(error) {
//         let p = document.createElement("p");
//         p.innerText = "Error";
//         p.style.color = "red";
//         document.getElementById("posts-wraper").appendChild(p);
//     })
// }
// ajax("https://jsonplaceholder.typicode.com/posts");










let postsWraper = document.getElementById("posts-wraper");
let overlayBlock = document.getElementById("overlay");
let ovelayText = document.getElementById("overlay-text")
let overlayClose = document.getElementById("closeButton");


function ajax(url, callback) {
    let requestPost = new XMLHttpRequest();
    requestPost.open("GET", url);
    requestPost.addEventListener("load", function () {
      let dataResponse = JSON.parse(requestPost.responseText);
      callback(dataResponse);
    });
    requestPost.send();
};

function PostRenderLogic(post) {
    const divWraper = document.createElement("div");
    divWraper.classList.add("post-block");
    divWraper.setAttribute("data-id", post.id);
  
    const h3Post = document.createElement("h3");
    h3Post.innerText = post.id;
  
    const h2Post = document.createElement("h2");
    h2Post.innerText = post.title;
  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Post";
    deleteButton.setAttribute("data-id", post.id);
  
    divWraper.appendChild(h3Post);
    divWraper.appendChild(h2Post);
    divWraper.appendChild(deleteButton);
  
    deleteButton.addEventListener("click", function(event) {
      event.stopPropagation();
      const id = event.target.getAttribute("data-id");
      let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
      fetch(url, {
        method: "DELETE",
      });
      console.log(id);
    });
  
    divWraper.addEventListener("click", function(event) {
      const id = event.target.getAttribute("data-id");
      overlayBlock.classList.add("active");
      let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
      ajax(url, function () {
        let p = document.createElement("p");
        p.innerText = post.body;
        ovelayText.appendChild(p);
      });
    });
  
    postsWraper.appendChild(divWraper);
};


overlayClose.addEventListener("click", function () {
    overlayBlock.classList.remove("active");
    ovelayText.innerHTML = " ";
});



ajax("https://jsonplaceholder.typicode.com/posts", function (dataResponse) {
  dataResponse.forEach((item) => {
    PostRenderLogic(item);
  });
});