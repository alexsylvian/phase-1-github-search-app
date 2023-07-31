document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const searchTerm = searchContent.trim();
      if (searchTerm === '') {
        return;
      }
  
      searchUsers(searchTerm)
        .then(function (users) {
          displayUsers(users);
        })
        .catch(function (error) {
          console.error('Error searching users:', error);
        });
    });
  
    function searchUsers(query) {
      const apiUrl = `https://api.github.com/search/users?q=${query}`;
      return fetch(apiUrl)
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(function (data) {
          return data.items;
        })
        .catch(function (error) {
          console.error('Error searching users:', error);
          throw error;
        });
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
      reposList.innerHTML = '';
  
      users.forEach(function (user) {
        const userCard = createUserCard(user);
        userList.appendChild(userCard);
  
        userCard.addEventListener('click', function () {
          getUserRepos(user.login)
            .then(function (repos) {
              displayRepos(repos);
            })
            .catch(function (error) {
              console.error('Error getting user repositories:', error);
            });
        });
      });
    }
  
    function getUserRepos(username) {
      const apiUrl = `https://api.github.com/users/${username}/repos`;
      return fetch(apiUrl)
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .catch(function (error) {
          console.error('Error getting user repositories:', error);
          throw error;
        });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
  
      repos.forEach(function (repo) {
        const repoItem = document.createElement('li');
        const repoLink = document.createElement('a');
        repoLink.href = repo.html_url;
        repoLink.textContent = repo.name;
        repoItem.appendChild(repoLink);
        reposList.appendChild(repoItem);
      });
    }
  
    function createUserCard(user) {
      const userCard = document.createElement('li');
      userCard.classList.add('user-card');
  
      const avatar = document.createElement('img');
      avatar.src = user.avatar_url;
      avatar.alt = `${user.login}'s avatar`;
      userCard.appendChild(avatar);
  
      const usernameLink = document.createElement('a');
      usernameLink.href = user.html_url;
      usernameLink.textContent = user.login;
      userCard.appendChild(usernameLink);
  
      return userCard;
    }
  });
  