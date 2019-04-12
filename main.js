// Adding event listenter for page load to show list of bookmarks
window.addEventListener("load", fetchBookmarks);


//Find the form and create event listener for it
document.querySelector("form").addEventListener("submit", saveBookmark);
// Save bookmarks
function saveBookmark(e) {
    // prevent from page from performing defualt of reloading 
    e.preventDefault(); 

    // Get site name and site url
    var siteName = document.querySelector("#siteName").value;
    var siteUrl = document.querySelector("#siteUrl").value;

    // Create bookmark object
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // Check if the local storage is empty 
    if(localStorage.getItem("bookmarks") === null) {
        // Init bookmarks array if this is true
        var bookmarks = [];
        // Adding first bookmark
        bookmarks.push(bookmark);
        // Set bookmarks to localsotrage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {
        // Get current bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        // Push new bookmark into bookmarks
        bookmarks.push(bookmark);
        // Set bookmarks to localstorage
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    // Reset the form
    document.querySelector("form").reset();    

    //  Fetch bookmarks
    fetchBookmarks();
}

    function fetchBookmarks() {
        // Get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        
        // Select the bookmarks div 
        var output = document.querySelector("#bookmarks");
        // Reset the bookmarks div
        output.innerHTML = "";
        
        // Loop over bookmarks 
        for(var i =0;i<bookmarks.length;i++) {
            // Create a div
            var div = document.createElement("div");
            // Create h3
            var h3 = document.createElement("h3");
            h3.textContent = bookmarks[i].name;

            // Create visit link
            var a = document.createElement("a");
            a.href = bookmarks[i].url;
            a.className = "btn btn-success";
            a.textContent = "Visit"

            // Create delete button
            var button = document.createElement("button");
            button.className = "btn btn-danger";
            button.textContent = "Delete";

            button.addEventListener("click", function(e) {
                var name = e.target.parentElement.children[0].textContent;
                deleteBookmarks(name);
            })


            // Append h3, a and button into div
            div.appendChild(h3);
            div.appendChild(a);
            div.appendChild(button);

            // Append div into output
            output.appendChild(div);
        }
    }

function deleteBookmarks(name) {
    // Get bookmarks from localStorage;
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    // Loop over bookmarks to locate intended deletion
    for (var i=0; i<bookmarks.length;i++) {
    // Looking for bookmark by given name
    if(bookmarks[i].name === name) {
        bookmarks.splice(i, 1);
        break;
    }
}

//Reset bookmarks into localStorage
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

// Re-fetch bookmarks output
fetchBookmarks();
}