const timesInput = document.getElementById("times");
const runButton = document.getElementById("run");
const resultArea = document.getElementById("result");


// --- ボタン表示を入力値と同期 ---
function updateButtonLabel() {
  const value = timesInput.value;

  if (value === "") {
    runButton.textContent = "←回数を入力";
  } else {
    runButton.textContent = `${value}回シミュレーション`;
  }
}

timesInput.addEventListener("input", updateButtonLabel);
updateButtonLabel();

// --- 実行処理 ---
runButton.addEventListener("click", () => {
  const times = Number(timesInput.value);

  if (!timesInput.value || times <= 0 || times > 10000) {
    alert("試行回数は1〜10000の間で入力してください。");
    return;
  }

  const resultObj = simulate(times);

  const result = `
試行回数: ${times}回

【変更した場合】

勝ち: ${resultObj.win}
負け: ${resultObj.lose}

勝率: ${(resultObj.win / times * 100).toFixed(2)}%
負率: ${(resultObj.lose / times * 100).toFixed(2)}%
`;

  resultArea.textContent = result;
});

// --- モンティホール1回（必ず変更する） ---
function playMonty() {
  const doors = [0, 1, 2];

  const car = Math.floor(Math.random() * 3);
  const choice = Math.floor(Math.random() * 3);

  // 司会者が開けるドア（必ずハズレ）
  const opened = doors.filter(d => d !== car && d !== choice)[0];

  // 必ず変更
  const finalChoice = doors.filter(d => d !== choice && d !== opened)[0];

  return finalChoice === car;
}

// --- 繰り返し実行 ---
function simulate(times) {
  let win = 0;
  let lose = 0;

  for (let i = 0; i < times; i++) {
    if (playMonty()) {
      win++;
    } else {
      lose++;
    }
  }

  return { win, lose };
}