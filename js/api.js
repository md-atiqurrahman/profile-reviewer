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
  const detailsContainer = document.getElementById("details-container");

  const div = document.createElement("div");
  div.innerHTML = `
  <h1>Hello there</h1>
  `;
  detailsContainer.appendChild(div);
}

// Call the fetchProfilesData function to get all profiles data and display them when the page is loaded or reloaded
fetchProfilesData().then((data) => displayProfiles(data));
