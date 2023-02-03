const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");
const yourProfile = document.querySelector(".your-profile");
const section = document.querySelector("section .row");
const sect = document.querySelector("section .title");

const urlStart = "https://api.github.com/users/";

searchBtn.addEventListener("click", (e) => {
  section.innerHTML = "";
  sect.innerHTML = "";
  sect.innerHTML += `<h2 class="text-primary">Your Followings</h2>`;
  const userName = searchInput.value;
  let url = `${urlStart}${userName}`;
  e.preventDefault();
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      yourProfile.innerHTML = `
  <div class='row'>
    <div class='col'>
        <div class="card">
        <div class='bg-image'>
            <img src="${data.avatar_url}" class="card-img-top img-thumbnail" alt="profile photo" />
        </div>
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <div class="info">
                        <div class="repo">
                            <h3>${data.public_repos}</h3>
                            <h4>Repos</h4>
                        </div>
                        <div class="follower">
                            <h3>${data.followers}</h3>
                            <h4>Followers</h4>
                        </div>
                        <div class="following">
                            <h3>${data.following}</h3>
                            <h4>Following</h4>
                        </div>
                 </div>
                
                <a href="${data.html_url}" target='_blank' class="btn btn-primary">Profile</a>
            </div>
        </div>
    </div>
  </div>
  `;
    });

  let followingUrl = `${url}/following`;
  fetch(followingUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((item) => {
        console.log(item);
        fetch(`${urlStart}${item.login}`)
          .then((res) => res.json())
          .then((data) => {
            section.innerHTML += `
           
          <div class='col-4'>
              <div class="card">
              <div class='bg-image'>
                  <img src="${data.avatar_url}" class="card-img-top img-thumbnail" alt="profile photo" />
              </div>
                  <div class="card-body">
                      <h5 class="card-title">${data.name}</h5>
                      <div class="info">
                              <div class="repo">
                                  <h3>${data.public_repos}</h3>
                                  <h4>Repos</h4>
                              </div>
                              <div class="follower">
                                  <h3>${data.followers}</h3>
                                  <h4>Followers</h4>
                              </div>
                              <div class="following">
                                  <h3>${data.following}</h3>
                                  <h4>Following</h4>
                              </div>
                       </div>
                      
                      <a href="${data.html_url}" target='_blank' class="btn btn-primary">Profile</a>
                  </div>
              </div>
          </div>
       
        `;
          });
      });
    });
});
