// min～maxの範囲で、count数分の乱数を生成するgetUniqueRandomNumbers関数.
function getUniqueRandomNumbers(min, max, count) {
  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < count) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    uniqueNumbers.add(randomNum);
  }

  return Array.from(uniqueNumbers);
}

// 答えをチェックする関数
function checkAnswer(selectedIndex) {
  if (selectedIndex == ansIndex) {
      document.getElementById("result").innerHTML = "Correct!";
  } else {
      document.getElementById("result").innerHTML = "Incorrect!";
  }
  detail = document.getElementById("detail");
  detail.innerHTML = "";
  detail.innerHTML = `
  <img src="${pokemons[ansIndex].sprites.front_default}" alt="Pokemon">
  <p>Name：${pokemons[ansIndex].name}</p>  
  <p>Weight: ${pokemons[ansIndex].weight / 10} kg</p>
  <p>Height: ${pokemons[ansIndex].height / 10} m</p>
  <p>Type: ${pokemons[ansIndex].types.map(t => t.type.name).join(", ")}</p>
  <p>Description：${parameter.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text}</p>
`;
  detail.classList.remove("hidden");

}

async function generateQuiz() {
  const apiUrl1 = "https://pokeapi.co/api/v2/pokemon/";   // ポケモンの基本情報(高さ・重さ・タイプなど)を取得するためのURL.
  const apiUrl2 = "https://pokeapi.co/api/v2/pokemon-species/";   // 上記のURLでは取得できない情報(図鑑の説明など)を取得するためのURL.
  
  const array_id = getUniqueRandomNumbers(1, 493, 4);   // 第三世代までのポケモンの中から、ランダムで4匹のポケモンを選択.
  ansIndex = Math.floor(Math.random() * 4);   // 答えとするポケモンをランダムに決定.
  
  // ランダムに選んだ4匹のポケモンの基本情報を取得.
  const responses = await Promise.all(array_id.map(id => fetch(apiUrl1 + id)));
  pokemons = await Promise.all(responses.map(response => response.json()));
  
  // 答えとなるポケモンの基本情報以外の情報を取得.
  const response = await fetch(apiUrl2 + array_id[ansIndex]);
  parameter = await response.json();

  // id="result", "detail"部分を初期化.
  document.getElementById("result").innerHTML = "";
  document.getElementById("detail").innerHTML = "";
  document.getElementById("detail").classList.add("hidden");
  
  // 問題文を表示.
  document.getElementById("question").innerHTML = "What is this Pokemon?";
  
  // シルエット画像を表示.
  silhouette_pokemon = document.getElementById("silhouette_pokemon");
  silhouette_pokemon.innerHTML = `
    <img src="${pokemons[ansIndex].sprites.front_default}" style="filter: brightness(0%); " alt="Pokemon Silhouette">    
  `;
  silhouette_pokemon.classList.remove("hidden");
  
  // ボタンを表示するためのコンテナを取得
  const choice = document.getElementById("choice");
  choice.innerHTML = "";

  // 4つのボタンを生成
  pokemons.forEach((pokemon, index) => {
    const button = document.createElement("button");
    button.textContent = pokemon.name;  // ボタンのテキストにポケモンの名前を設定
    button.addEventListener("click", () => checkAnswer(index));  // ボタンがクリックされたときにcheckAnswer関数を呼び出す
    choice.appendChild(button);  // ボタンをコンテナに追加
  });

  }