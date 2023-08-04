const fetchProfilesData = () => {
  const url = `https://2023.projektbigfoot.de/api/v1/projects`;
  return fetch(url).then((res) => res.json());
};

const displayProfiles = (profiles) => {
  const tableContainer = document.getElementById("table-container");

  // Check if tableContainer exists before proceeding
  if (!tableContainer) {
    return;
  }
  tableContainer.innerHTML = ""; // Clear the table container before displaying new data

  profiles.map((profile) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <table>
      <tbody>
        <tr>
          <td>${profile?.rank + "."}</td>
          <td>${profile?.voteCount}</td>
          <td onclick="getProfileData('${profile?._id}')">
            <h4>${profile?.contestantName}</h4>
            <p>${profile?.projectTitle}</p>
          </td>      
        </tr>
      </tbody>     
    </table>     
    `;
    tableContainer.appendChild(div);
  });
};

const getProfileData = (profileId) => {
  window.location.href = `./details.html?profileId=${profileId}`;
};

const params = new URLSearchParams(window.location.search);
const profileId = params.get("profileId");

if (profileId) {
  const url = `https://2023.projektbigfoot.de/api/v1/projects/${profileId}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => showProfileDetails(result));
}

const showProfileDetails = (result) => {
  const detailsContainer = document.getElementById("details-container");

  const div = document.createElement("div");
  div.innerHTML = `
   <div class="profile-details">
     <div>
        <h3 class="project-name">${
          result?.contestantName
            ? result.contestantName
            : "Projektname Nicht gefunden"
        }</h3>
        <h6 class="project-title">${
          result?.projectTitle
            ? result.projectTitle
            : "Projekttitel Nicht gefunden"
        }</h6>
        <p class="vote-count">${
          result?.voteCount ? result.voteCount : "Nicht gefunden"
        } Stimmen</p>
        <button>Jetzt abstimmen!</button>
        <p class="recaptcha-text">
          Diese Seite wird durch reCAPTCHA geschützt. Es gelten die
          <span>Datenschutzerklärung</span> und die
          <span>Nutzungsbedingungen</span> von Google.
        </p>
     </div>
     <div>
        <div class="answer-container">
           <div>
              <h3>Contestant Answer1:</h3>
              <p>${
                result?.contestantAnswer1
                  ? result.contestantAnswer1
                  : "Antworten Nicht gefunden"
              }</p>
           </div>
           <div>
              <h3>Contestant Answer2:</h3>
              <p>${
                result?.contestantAnswer2
                  ? result.contestantAnswer2
                  : "Antworten Nicht gefunden"
              }</p>
           </div>
        </div>
        <div class="media-gallery">
            <img class="img1" src="${result?.projectGallery[0]}" alt="">
            <img class="img2" src="${result?.projectGallery[1]}" alt="">
            <img class="img3" src="${result?.projectGallery[2]}" alt="">
            <img class="img4" src="${result?.projectGallery[3]}" alt="">
            <img class="img5" src="${result?.projectGallery[4]}" alt="">
            <img class="img6" src="${result?.projectGallery[5]}" alt="">
            <img class="img7" src="${result?.projectGallery[6]}" alt="">
            <img class="img8" src="${result?.projectGallery[7]}" alt="">
        </div>
     </div>
     <div class="customer-logo">
          <img src="./assets/customer-logo.png" alt="" />
     </div>
   </div>
  `;
  detailsContainer.appendChild(div);
};

// Call the fetchProfilesData function to get all profiles data and display them when the page is loaded or reloaded
fetchProfilesData().then((data) => displayProfiles(data));
