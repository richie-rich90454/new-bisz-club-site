import {populateClubs} from "./populate.js";
(async (pageName="")=>{
    let clubData=await populateClubs();
    let mainSection=document.querySelector(".main-section");
    let filteredClubs=clubData.filter(club=>{
        let prefix=club.clubID.split(".")[0];
        return prefix==pageName;
    });
    filteredClubs.forEach(club=>{
        let div=document.createElement("div");
        div.className="club-card";
        let categoryKey=club.clubID.split(".")[0];
        let imageHTML=club.images.map(file=> `<img loading="lazy" src="${club.fullImagePath}${file}" alt="${club.clubName} image">`).join("");
        div.innerHTML=`<h2>${club.clubName}</h2><p><strong>Advisor:</strong> ${club.clubAdvisor}</p><p><strong>Student Leaders:</strong> ${club.clubStudentLeader}</p><p><strong>Grades:</strong> ${club.grades}</p><p><strong>Time:</strong> ${club.time}</p><p><strong>Cost:</strong> ${club.cost}</p><p>${club.description}</p><div class="club-images">${imageHTML}</div>`;
        mainSection.appendChild(div);
    });
})("arts");