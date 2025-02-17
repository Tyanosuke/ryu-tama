/**
 * 初期化
 */
window.onload = function() {
    // --------------------------------------------------
    // 増減ボタン
    // --------------------------------------------------

    // 肉体
    setNumberButton("status_vit", ".button_up", 2, 12, 2);
    setNumberButton("status_vit", ".button_down", -2, 12, 2);

    // 敏捷
    setNumberButton("status_agi", ".button_up", 2, 12, 2);
    setNumberButton("status_agi", ".button_down", -2, 12, 2);

    // 知力
    setNumberButton("status_int", ".button_up", 2, 12, 2);
    setNumberButton("status_int", ".button_down", -2, 12, 2);

    // 精神
    setNumberButton("status_mnd", ".button_up", 2, 12, 2);
    setNumberButton("status_mnd", ".button_down", -2, 12, 2);

    // --------------------------------------------------
    // チェック・ボタン
    // --------------------------------------------------

    setCheckButton("check_1");
    setCheckButton("check_2");
}

// 数字チェック
function numberCheck($this)
{
    let str = $this.value;

    // 文頭から文末まで全て0-9かチェック
    if(!str.match(/^\d+$/)){
        // そうでなければ入力文字を空白に変換
        str = "0";
    }

    $this.value = str;
}

// 数字チェック（マイナスあり）
function numberCheckMinus($this)
{
    let str = $this.value;

    // 文頭から文末まで全て0-9かチェック
    if(!str.match(/^-?\d+$/)){
        // そうでなければ入力文字を空白に変換
        str = "0";
    }

    $this.value = str;
}

// 増減ボタン
function setNumberButton(targetId, selectorButton, value, max = null, min = null) {
    const targetButton = document.querySelector("#" + targetId + " " + selectorButton);

    targetButton.addEventListener("click", () => {
        // 数値増減
        const targetInput = document.querySelector("#" + targetId + " input");
        targetInput.value = parseInt(targetInput.value || "0", 10) + value;

        // 活性切り替え
        document.querySelectorAll("#" + targetId + " button").forEach(element => {
            element.disabled = false;
        });
        if (
            (
                // 上限
                max != null
                && value > 0
                && targetInput.value >= max
            ) || (
                // 下限
                min != null
                && value < 0
                && targetInput.value <= min
            )
        ) {
            targetButton.disabled = true;
        }
    });
}

// チェック・ボタン
function setCheckButton(targetId) {
    const buttons = document.querySelectorAll("#" + targetId + " button");

    buttons.forEach(target => {
        target.addEventListener("click", () => {
            // 活性切り替え
            buttons.forEach(element => {
                element.disabled = false;
            });
            target.disabled = true;
        });
    });
}

// プリセット適用
function setPreset(presetName, dice1, dice2 = null, modify = 0) {
    const buttons = document.querySelectorAll(".vert_button > button");
    buttons.forEach(element => {
        element.disabled = false;
    });

    document.querySelector("#check_1 .button_" + dice1).disabled = true;

    if (dice2 != null) {
        document.querySelector("#check_2 .button_" + dice2).disabled = true;
    } else {
        document.querySelector("#check_2 .button_blk").disabled = true;
    }

    document.querySelector("#input_modify1 input").value = modify;

    // ナビテキスト
    let text;
    if (presetName == null) {
        text = "リセットしました。"
    } else {
        text = "『" + presetName + "』を適用しました。";
    }
    setNaviText(text);
}

// チェックボックス切り替え
function checkCheck($this, targetId) {
    document.querySelectorAll("#" + targetId + " > input").forEach(element => {
        if ($this.checked) {
            element.classList.remove("unChecked");
        } else {
            element.classList.add("unChecked");
        }
    });

    document.querySelectorAll("#" + targetId + " > button").forEach(element => {
        if ($this.checked) {
            element.classList.remove("unChecked");
        } else {
            element.classList.add("unChecked");
        }
    });

    if (targetId == "input_target") {
        const inequalitySign = document.querySelector("td.inequalitySign");

        if ($this.checked) {
            inequalitySign.classList.remove("unChecked");
        } else {
            inequalitySign.classList.add("unChecked");
        }
    }
}

// コマンドをコピー
function onButtonCopy() {
    let text = "R";
    let textDesc = " ▶";

    // ダイス1
    let textDice1 = "";
    if (document.querySelector("#check_1 .button_vit").disabled) {
        textDice1 += document.querySelector("#status_vit input").value;
        textDesc += "【体力】";
    }
    if (document.querySelector("#check_1 .button_agi").disabled) {
        textDice1 += document.querySelector("#status_agi input").value;
        textDesc += "【敏捷】";
    }
    if (document.querySelector("#check_1 .button_int").disabled) {
        textDice1 += document.querySelector("#status_int input").value;
        textDesc += "【知力】";
    }
    if (document.querySelector("#check_1 .button_mnd").disabled) {
        textDice1 += document.querySelector("#status_mnd input").value;
        textDesc += "【精神】";
    }
    text += textDice1;

    // ダイス2
    let textDice2 = "";
    if (document.querySelector("#check_2 .button_vit").disabled) {
        textDice2 += document.querySelector("#status_vit input").value;
        textDesc += "+【体力】";
    }
    if (document.querySelector("#check_2 .button_agi").disabled) {
        textDice2 += document.querySelector("#status_agi input").value;
        textDesc += "+【敏捷】";
    }
    if (document.querySelector("#check_2 .button_int").disabled) {
        textDice2 += document.querySelector("#status_int input").value;
        textDesc += "+【知力】";
    }
    if (document.querySelector("#check_2 .button_mnd").disabled) {
        textDice2 += document.querySelector("#status_mnd input").value;
        textDesc += "+【精神】";
    }
    if (textDice2 != "") {
        text += "," + textDice2;
    }

    // 修正1
    let textMod1 = document.querySelector("#input_modify1 input").value;
    if (textMod1 != "") {
        if (textMod1 > 0) {
            text += "+" + textMod1;
        } else if (textMod1 < 0) {
            text += "-" + textMod1;
        }
    }

    // 修正2
    let textMod2 = "";
    if (!document.querySelector("#input_modify2 input").classList.contains("unChecked")) {
        textMod2 += document.querySelector("#input_modify2 input").value;
    }
    if (textMod2 != "") {
        if (textMod2 > 0) {
            text += "+" + textMod2;
        } else if (textMod2 < 0) {
            text += "-" + textMod2;
        }
    }

    // 目標値
    let textTarget= "";
    if (!document.querySelector("#input_target input").classList.contains("unChecked")) {
        textTarget += document.querySelector("#input_target input").value;
    }
    if (textTarget != "") {
        text += ">=" + textTarget;
    }

    // クリップボードにコピー
    text += textDesc + "チェック";
    if (textTarget != "") {
        text += "（" + textTarget +"）";
    }
    navigator.clipboard.writeText(text);

    // ナビテキスト
    setNaviText("クリップボードにチャットコマンドをコピーしました。");
}

// プリセットボタン
function onClickButtonPreset($this) {
    document.querySelector(".area_preset").classList.toggle("display");
}

// リセットボタン
function onButtonReset() {
    setPreset(null, "vit", "vit", "0")

    document.querySelector("#input_modify2 input").value = 0;

    document.querySelector("#input_target input").value = 4;
}

// ナビテキストのセット
function setNaviText(text, scroll = true) {
    const naviText = document.querySelector(".navi_text");
    naviText.textContent = text;
    naviText.classList.remove("hidden");
    window.setTimeout(function(){
        naviText.classList.add("hidden");
    }, 1000);

    if (scroll) {
        var element = document.documentElement;
        var bottom = element.scrollHeight - element.clientHeight;
        window.scroll(0, bottom);
    }
}