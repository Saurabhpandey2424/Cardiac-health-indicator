document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn-recognize").addEventListener("click", () => {
    let ref = [];
    let rf = [130, 70, 100, 40, 150]; // standard values

    var file = document.querySelector("#img").files[0];
    let cardiac_score = 0;
    Tesseract.recognize(
      file,
      "eng", // language
      { logger: (m) => console.log(m) } // logger function to display progress
    )
      .then(({ data: { text } }) => {
        const numbers = text.match(/\d+(\.\d+)?/g);
        // document.querySelector('#output').textContent = numbers;
        ref = numbers.slice();
        for (let i = 0; i < rf.length; i++) {
          if (i & 1) cardiac_score += Math.abs(-ref[i] + rf[i]) / 5;
          else cardiac_score += Math.abs(ref[i] - rf[i]) / 5;
        }
        document.querySelector("#output").textContent = cardiac_score;
        console.log(text);
        console.log(numbers);
        console.log(cardiac_score);
      })
      .catch((err) => {
        console.error(err);
      });
  });
});
