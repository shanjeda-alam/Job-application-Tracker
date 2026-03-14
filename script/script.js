let currentTab = "all";
const tabActive = ["bg-navy","border-navy", "text-white"];
const tabInactive = ["bg-transparent", "text-slate-700", "border-state-200", "text-black"]

const allContainer = document.getElementById("all-container");
const interviewContainer = document.getElementById("interview-container");
const rejectedContainer = document.getElementById("reject-container");
const emptyStat = document.getElementById("empty-state");
//console.log(allContainer, interviewContainer,rejectedContainer)


function switchTab(tab){
currentTab = tab;
//console.log(tab);
const tabs = ["all", "interview", "rejected"];

for (const t of tabs){
    const tabName = document.getElementById("tab-"+ t);
if (t===tab) {
    tabName.classList.remove(...tabInactive);
    tabName.classList.add(...tabActive);
}
else{
tabName.classList.remove(...tabActive)
tabName.classList.add(...tabInactive);
}
}

const pages = [allContainer, interviewContainer, rejectedContainer];
for( const section of pages){
    section.classList.add("hidden")
}

emptyStat.classList.add("hidden");

if (tab ==="all") {
    allContainer.classList.remove("hidden");
    if (allContainer.children.length < 1) {
        emptyStat.classList.remove("hidden");
    }
}
else if(tab ==="interview"){
interviewContainer.classList.remove("hidden") 
if(interviewContainer.children.length <1){
     emptyStat.classList.remove("hidden");
}   
}
else{
    rejectedContainer.classList.remove("hidden")
    if(rejectedContainer.children.length < 1){
         emptyStat.classList.remove("hidden");
    }
}
updateStat();
}
//stat update
const totalStat = document.getElementById("stat-total");
const interviewStat = document.getElementById("stat-interview");
const rejectStat = document.getElementById("stat-reject");
const availableStat =document.getElementById("available")
//totalStat.innerText = allContainer.children.length;

switchTab(currentTab);

document.getElementById("jobs-container").addEventListener("click", function(event) {
  const clickedEliment = event.target;
  const card = clickedEliment.closest(".card");
  const parent = card.parentNode;
  const status = card.querySelector(".status");

  if (clickedEliment.classList.contains("interview")){
    status.innerText = "Interviewed";
   interviewContainer.appendChild(card);
   updateStat();
  }
if (clickedEliment.classList.contains("rejected")){
    status.innerText = "Rejected";
    rejectedContainer.appendChild(card);
    updateStat();
  }
if (clickedEliment.classList.contains("delete")){
    parent.removeChild(card);
    updateStat();
  }
})

function updateStat() {
    //totalStat.innerText = allContainer.children.length;
    //interviewStat.innerText = interviewContainer.children.length;
    //rejectStat.innerText = rejectedContainer.children.length;
    const counts = {
        all: allContainer.children.length,
        interview: interviewContainer.children.length,
        rejected: rejectedContainer.children.length,
    }
    totalStat.innerText = counts.all;
    interviewStat.innerText = counts.interview;
    rejectStat.innerText = counts.rejected;
    availableStat.innerText = counts[currentTab];
    if(counts[currentTab] <1){
        emptyStat.classList.remove("hidden");
    }
    else{
        emptyStat.classList.add("hidden");
    }
}
updateStat();