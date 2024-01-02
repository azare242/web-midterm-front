const API_URL = "https://api.genderize.io/?name=";

window.addEventListener("DOMContentLoaded", () => {
  const formValues = {
    name: "",
    gender: undefined,
  };

  let lastName;
  // GET ELEMENTS FROM DOM
  const nameInput = document.querySelector("#name");
  const form = document.querySelector("#form");
  const saveButton = document.querySelector("#save");
  const genderTxt = document.querySelector("#gender-txt");
  const genderVal = document.querySelector("#gender-val");
  const saved = document.querySelector("#saved-answer");
  const clear = document.querySelector("#clear");
  const error = document.querySelector("#error");


  //DEFINE EVENT LISTNERS
  nameInput.addEventListener("change", (event) => {
    //InputName Changes
    formValues.name = event.target.value;
  });
  form.addEventListener("change", () => {
    //GENDER VALUE CHANGES
    formValues.gender = document.querySelector(
      'input[name="radio-group"]:checked'
    )?.value;
  });
  form.addEventListener("submit", (event) => {
    //SUBMIT FORM FOR SHOWING GENDER
    event.preventDefault();
    //FOR DELETE FROM LOCAL STORAGE
    lastName = formValues.name;


    if (formValues.name === "" || formValues.gender === undefined) {
      //SHOW ERROR TO USER FOR COMPLETING FORM
      error.style.display = "flex";
      error.innerHTML = "complete form"
    } else {
      
      error.style.display = "none";
    }

    //SHOW RESULT FROM LOCAL STORAGE
    if (localStorage.getItem(lastName))
      saved.innerHTML = localStorage.getItem(lastName);
    else saved.innerHTML = "NO DATA";


    //START FETCH DATA
    genderTxt.innerHTML = "loading...";
    genderVal.innerHTML = "loading...";


    //FETCH DATA
    fetch(`${API_URL}${formValues.name}`)
      .then((res) => res.json())
      .then((res) => {
        //SET DATA TO ELEMENTS
        genderTxt.innerHTML = res.gender;
        genderVal.innerHTML = `${res.probability}`;
      })


      //CATCH ERRORS
      .catch((err) => {
        error.style.display = "flex";
        error.innerHTML = err.message;
      });
  });

  //SAVE DATA TO LOCALSTORATE
  saveButton.addEventListener("click", () => {
    if (formValues.gender !== undefined && formValues.name !== '') {
      error.style.display = "none"; 
      localStorage.setItem(formValues.name, formValues.gender);
    }
      //SHOW ERROR TO USER FOR COMPLETING FORM
    else {
      error.style.display = "flex";
      error.innerHTML = "complete form";
    }
  });


  //CLEAR DATA FROM LOCALSTORAGE
  clear.addEventListener("click", () => {
    if (localStorage.getItem(lastName)) {
      localStorage.removeItem(lastName);
      lastName = ""
      saved.innerHTML = "CLEARD"
    }

  });
});
