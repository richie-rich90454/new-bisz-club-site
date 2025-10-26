import {listClubs} from "./listClubs.js";
/**
*Render club cards on the page for a given category.
*@param{string} pageName - "academic", "arts", "cs", "sports"
*@param{string} containerSelector - selector for main container, default ".main-section"
 */
export async function renderClubs(pageName="", containerSelector=".main-section"){
    let clubData=await listClubs();
    let mainSection=document.querySelector(containerSelector);
    if (!mainSection) return console.warn("Container not found:", containerSelector);
    let filteredClubs=clubData.filter(club=>club.clubID.split(".")[0]===pageName);
    filteredClubs.forEach((club, i)=>{
        let div=document.createElement("div");
        div.className="club-card";
        let imagesContainer=document.createElement("div");
        imagesContainer.className="club-images";
        club.images.forEach(file=>{
            let img=new Image();
            img.src=`${club.fullImagePath}${file}`;
            img.loading="lazy";
            img.alt=`${club.clubName} image`;
            img.onload=()=>{
                let ratio=img.naturalWidth/img.naturalHeight;
                if (ratio>0.9&&ratio<1.1){
                    img.classList.add("img-1-1");
                } else{
                    img.classList.add("img-4-3");
                }
            };
            imagesContainer.appendChild(img);
        });
        div.innerHTML=`<h2>${club.clubName}</h2><p><strong>Advisor:</strong> ${club.clubAdvisor}</p><p><strong>Student Leaders:</strong> ${club.clubStudentLeader}</p><p><strong>Grades:</strong> ${club.grades}</p><p><strong>Time:</strong> ${club.time}</p><p><strong>Cost:</strong> ${club.cost}</p><p><strong>Description:</strong> ${club.description}</p>
        `;
        div.appendChild(imagesContainer);
        mainSection.appendChild(div);
        setTimeout(()=>div.classList.add("visible"), 100*i);
    });
}