document.addEventListener("DOMContentLoaded", ()=>{
    let mobileControl=document.getElementById("mobile-side-control");
    let sidebar=document.getElementById("sidebar");
    if (mobileControl&&sidebar){
        mobileControl.addEventListener("click", ()=>{
            mobileControl.classList.toggle("active");
            sidebar.classList.toggle("active");
        });
    }
});