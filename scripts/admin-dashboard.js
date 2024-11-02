// admin-dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    // Load posts and users
    loadPosts();
    loadUsers();

    // Event listener for creating a new post
    document.getElementById('createPostBtn').addEventListener('click', function() {
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;

        if (title && content) {
            createPost(title, content);
        } else {
            alert('Please provide both title and content.');
        }
    });

    // Event listener for creating a new user
    document.getElementById('createUserBtn').addEventListener('click', function() {
        const username = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;

        if (username && email && password) {
            createUser(username, email, password);
        } else {
            alert('Please provide username, email, and password.');
        }
    });
});

function loadPosts() {
    fetch('/posts')
        .then(response => response.json())
        .then(data => {
            const postsList = document.getElementById('postsList');
            postsList.innerHTML = data.map(post => `
                <div>
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <button onclick="editPost(${post.id})">Edit</button>
                    <button onclick="deletePost(${post.id})">Delete</button>
                </div>
            `).join('');
        });
}

function loadUsers() {
    fetch('/users') // Assuming there's an endpoint to get users
        .then(response => response.json())
        .then(data => {
            const usersList = document.getElementById('usersList');
            usersList.innerHTML = data.map(user => `
                <div>
                    <p>Username: ${user.username}</p>
                    <button onclick="editUser(${user.id})">Edit</button>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                </div>
            `).join('');
        });
}

function createPost(title, content) {
    fetch('/create-post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadPosts(); // Refresh posts list
            alert('Post created successfully.');
        } else {
            alert('Error creating post.');
        }
    });
}

function createUser(username, email, password) {
    fetch('/create-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadUsers(); // Refresh users list
            alert('User created successfully.');
        } else {
            alert('Error creating user.');
        }
    });
}

function editPost(postId) {
    // Logic for editing a post
}

function deletePost(postId) {
    fetch(`/delete-post/${postId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadPosts(); // Refresh posts list
            alert('Post deleted successfully.');
        } else {
            alert('Error deleting post.');
        }
    });
}

function editUser(userId) {
    // Logic for editing a user
}

function deleteUser(userId) {
    fetch(`/delete-user/${userId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadUsers(); // Refresh users list
            alert('User deleted successfully.');
        } else {
            alert('Error deleting user.');
        }
    });
}
