document.addEventListener("DOMContentLoaded", () => {
    // Define constants for HTML elements
    const cardTitle = document.getElementById("card-title");
    const cardImage = document.getElementById("card-image");
    const likeCount = document.getElementById("like-count");
    const likeButton = document.getElementById("like-button");
    const commentsList = document.getElementById("comments-list");
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment");
  
    // Function to update the image and related information
    function updateImage(imageData) {
      cardTitle.textContent = imageData.title;
      cardImage.src = imageData.image;
      cardImage.alt = imageData.title;
      likeCount.textContent = `${imageData.likes} likes`;
      commentsList.innerHTML = ""; // Clear existing comments
      imageData.comments.forEach((comment) => {
        const li = document.createElement("li");
        li.textContent = comment.content;
        commentsList.appendChild(li);
      });
    }
  
    // Function to handle liking an image (no persistence)
    function likeImage() {
      const currentLikes = parseInt(likeCount.textContent);
      likeCount.textContent = `${currentLikes + 1} likes`;
    }
  
    // Function to handle adding a comment (no persistence)
    function addComment(event) {
      event.preventDefault();
      const newComment = commentInput.value;
      if (newComment.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = newComment;
        commentsList.appendChild(li);
        commentInput.value = ""; // Clear the input field
      }
    }
  
    // Attach event listeners
    likeButton.addEventListener("click", likeImage);
    commentForm.addEventListener("submit", addComment);
  
    // Fetch image data from the server
    fetch("http://localhost:3000/images/1")
      .then((response) => response.json())
      .then((data) => {
        updateImage(data);
      })
      .catch((error) => {
        console.error("Error fetching image data:", error);
      });
  });
  