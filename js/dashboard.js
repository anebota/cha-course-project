let courses = ["B-CH01", "B-OS01", "B-NB01", "B-SA01", "B-CS01"];
let count = courses.length;
let cidlist = [];

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + "; SameSite=None; Secure; expires=1 Jan 2030 12:00:00 UTC; path=/;";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function startUp() {
    courses.forEach(course => {
        cidlist.push(getCookie(course))
    });    
}

startUp();

document.querySelectorAll(".start-course").forEach(button => {
    let id = button.id;
    let cid = getCookie(id);
    button.addEventListener("click", () => {
        window.location.href = "courses/"+ id + "/index.htm";
        if (cid != "completed") { setCookie(id, "enrolled"); }
    })
    
    console.log(cid);
    if (cid == "enrolled") {
        button.innerHTML = "In Progress";
        button.classList.remove("btn-primary");
        button.classList.add("btn-warning");
        button.disabled = false;
    } else if (cid == "completed") {
        button.innerHTML = "Completed";
        button.classList.remove("btn-primary");
        button.classList.remove("btn-warning");
        button.classList.add("btn-success");
        button.disabled = false;
    } else {
        if (checkCourse(id, cid)) {
            button.innerHTML = "Start Learning";
            button.classList.add("btn-primary");
            button.classList.remove("btn-secondary");
            button.disabled = false;
        } else {
            button.innerHTML = "Not Enrolled";
            button.classList.remove("btn-primary");
            button.classList.add("btn-secondary");
            button.disabled = true;
        }
    }
})

function checkCourse(id, cid) {
    index = courses.findIndex((element) => element == id);

    if(index == 0) {
        return true;
    }
    if((cidlist[index] == "") && cidlist[index-1] == "completed") {
        return true;
    } else {
        return false;
    }

    /*
    switch (true) {
        case (id == "B-CH01"):
            //begin program path
            return true;
        case (id == "B-OS01" && cidlist[0] == "completed"):
            //do something
            return true;
        case (id == "B-NB01" && cidlist[0] == "completed" && cidlist[1] == "completed"):
            //do something
            return true;
        case (id == "B-SA01" && cidlist[0] == "completed" && cidlist[1] == "completed" && cidlist[2] == "completed"):
            //do something
            return true;
        case (id == "B-CS01" && cidlist[0] == "completed" && cidlist[1] == "completed" && cidlist[2] == "completed" && cidlist[3] == "completed"):
                //do something
                return true;
    
        default:
            return false;
    }
    */
}