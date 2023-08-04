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
          <td>${profile?.rank ? profile.rank : "Rang nicht gefunden"}.</td>
          <td>${profile?.voteCount ? profile.voteCount : "0"}</td>
          <td onclick="getProfileData('${profile?._id}')">
            <h4>${
              profile?.contestantName
                ? profile.contestantName
                : "Projektname Nicht gefunden"
            }</h4>
            <p>${
              profile?.projectTitle
                ? profile.projectTitle
                : "Projekttitel Nicht gefunden"
            }</p>
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
          result?.voteCount ? result.voteCount : "0"
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
          ${
            result?.projectGallery?.length > 0
              ? result.projectGallery
                  .slice(0, 8) // Display at most 8 images
                  .map(
                    (image, index) =>
                      `<img class="img${index + 1}" src="${image}" alt="">`
                  )
                  .join("")
              : "<p>No images found.</p>" /* Display a message when no images are available */
          }
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
