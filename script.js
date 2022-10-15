let postsWraper = document.getElementById("posts-wraper");
let overlayBlock = document.getElementById("overlay");
let overlayClose = document.getElementById("closeButton");


fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "GET"
})
.then(function(response) {
    if (response.status !=200) {
        throw response.status
    }
    return response.json();
}) 
.then (function(responseData) {
    responseData.forEach(post => {
        let divWrapper = document.createElement("div");
        divWrapper.classList.add("post-block");
        divWrapper.setAttribute("data-id", post.id);

        let h3 = document.createElement("h3");
        h3.innerText = post.id;

        let h2 = document.createElement("h2");
        h2.innerText = post.title;

        divWrapper.appendChild(h3);
        divWrapper.appendChild(h2);
        postsWraper.appendChild(divWrapper);


        divWrapper.addEventListener("click", (event) => {
            overlayBlock.classList.add("active");
        })
        
        overlayClose.addEventListener("click", () => {
            overlayBlock.classList.remove("active");
        })
    })

})
.catch(function(error) {
    let p = document.createElement("p");
    p.innerText = "Error";
    p.style.color = "red";
    document.getElementById("posts-wraper").appendChild(p);
})