function checkAndChangeClass() {
  if (window.innerHeight > window.innerWidth) {
      // Call the changeClass function if the condition is true
      changeClass();
  } else {
      // Remove the class if the condition is not true
      document.body.classList.remove('wide');
  }
}

// Call the function initially
checkAndChangeClass();


/* if (window.innerHeight > window.innerWidth) {
  changeClass();
} */

function changeClass() {
  var element = document.querySelector("#no-pixel");
  element.classList.replace("nublu", "nublu-crop");
}
function changeClassBack() {
  var element = document.querySelector("#no-pixel");
  element.classList.replace("nublu-crop", "nublu");
}


/* pin kooooood */

function pincode() {
  return {
    length: 4,
    input: [],
    correctPin: "1234",
    // this will only check when inputing the last number
    // usefull if you're going to limit number of checks
    onlyCheckOnLastFieldInput: true,
    paste(event) {
      // raw pasted input
      let pasted = event.clipboardData.getData("text");
      // only get numbers
      pasted = pasted.replace(/\D/g, "");
      // don't get more than the PIN length
      pasted = pasted.substring(0, this.length);
      // if after all that sanitazation the string is not empty
      if (pasted) {
        // split the pasted string into an array and load it
        this.input = pasted.split("");
        // check if the PIN is correct
        this.check();
      }
    },
    type(event, index) {
      if (event.ctrlKey && event.key == 'v') {
        console.log('ctrl-v');
      } else if (event.keyCode == 8) {
        event.stopPropagation();
        event.preventDefault();
        this.input[index - 1] = 0;
      } else {
        // only allow numbers
        let key = event.key.replace(/\D/g, "");
        if (key != "") {
          console.log(key);
          this.input[index - 1] = key;
        }
      }
      // check if the PIN is correct
      if (
        (this.onlyCheckOnLastFieldInput && index == this.length) ||
        !this.onlyCheckOnLastFieldInput
      ) {
        this.check();
      }
      // go to the next field
      // must happen on nextTick cause the field can be disabled.
      this.$nextTick(() => {
        this.goto(index + 1);
      });
    },
    goto(n) {
      if (!n || n > this.length) {
        n = 1;
      }
      let el = document.querySelector(`input[name=pin${n}]`);
      el.focus();
    },
    check() {
      if (this.input.join("") == this.correctPin) {
        feedback.innerHTML = "Correct!";
      } else {
        feedback.innerHTML = "Wrong password!";
      }
    }
  };
}