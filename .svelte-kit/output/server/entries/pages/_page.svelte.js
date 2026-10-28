import { a6 as head, a7 as attr_class, e as escape_html, a8 as attr } from "../../chunks/index.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let activeNav = "plan";
    let destination = "御在所岳";
    let date = new Date(Date.now() + 864e5 * 3).toISOString().slice(0, 10);
    let origin = "名古屋市";
    let transport = "車";
    let durationPref = "半日";
    let difficultyPref = "初心者向け";
    let weather = "rain";
    let favorites = [];
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>YAMA SWITCH — 雨の日も、山との出会いを。</title>`);
      });
      $$renderer3.push(`<meta name="description" content="天気や安全情報を確認しながら、山の日の過ごし方を考えるプロトタイプ。"/>`);
    });
    $$renderer2.push(`<header class="topbar"><a class="brand" href="/" aria-label="YAMA SWITCH ホーム"><span class="brand-mark">Y</span><span>YAMA <b>SWITCH</b><small>雨の日も、山との出会いを。</small></span></a> <nav aria-label="メインナビゲーション"><button${attr_class("", void 0, { "current": activeNav === "plan" })}><span>⌂</span> 計画を立てる</button> <button${attr_class("", void 0, { "current": activeNav === "favorites" })}><span>♡</span> お気に入り <em>${escape_html(favorites.length)}</em></button></nav> <div class="profile"><span>山</span> はじめての山歩き</div></header> <main>`);
    {
      $$renderer2.push(`<!--[0--><section class="hero"><div class="hero-copy"><div class="eyebrow"><span></span> THE MOUNTAIN CAN WAIT — OR CHANGE</div><h1>雨の日も、<br/>山との出会いを。</h1><p>予定していた山に雨予報。そんな日も、自然を楽しむ選択肢を一緒に探します。</p><div class="hero-note"><span>✳</span><span><b>安全を第一に考えた提案</b><small>天候と確認状況を見ながら、次の一歩を。</small></span></div></div> <div class="hero-art" aria-label="雨雲のかかる山のイラスト" role="img"><div class="sun"></div><div class="cloud">☁</div><div class="rain-lines">╱　╱　╱　╱　╱</div><svg viewBox="0 0 640 360" aria-hidden="true"><path d="M0 290 120 115l80 110L340 65l155 240 85-90v145H0z" fill="#b7c8a9"></path><path d="m120 115 26 37-29-8-21 15zm220-50 38 67-37-18-31 24z" fill="#f8f7f2"></path><path d="M0 315 175 165l108 132 98-100 161 121 98-71v113H0z" fill="#7d987e"></path><path d="M0 340h640v20H0z" fill="#395c4b"></path><path d="M396 240c-33 38-49 57-57 100m88-60c-10 25-14 39-16 60m-73-42-18 42" fill="none" stroke="#f4f4e9" stroke-width="4" stroke-linecap="round"></path></svg><span class="art-label">MOUNTAINS, IN EVERY WEATHER</span></div></section> <section class="form-section"><div class="section-kicker">YOUR PLAN <span>01 — 02</span></div><h2>山の予定を教えてください</h2><p class="section-sub">今の計画と希望に合わせて、その日の過ごし方を考えます。</p> <div class="form-card"><div class="field-grid"><label class="field wide"><span>行きたい山・目的地 <i>必須</i></span><input${attr("value", destination)} placeholder="例：御在所岳"/></label><label class="field"><span>登山予定日 <i>必須</i></span><input type="date"${attr("value", date)}/></label><label class="field"><span>出発地 <i>必須</i></span><input${attr("value", origin)} placeholder="例：名古屋市"/></label> <label class="field"><span>移動手段</span>`);
      $$renderer2.select({ value: transport }, ($$renderer3) => {
        $$renderer3.option({}, ($$renderer4) => {
          $$renderer4.push(`車`);
        });
        $$renderer3.option({}, ($$renderer4) => {
          $$renderer4.push(`公共交通機関`);
        });
      });
      $$renderer2.push(`</label><label class="field"><span>希望する歩行時間</span>`);
      $$renderer2.select({ value: durationPref }, ($$renderer3) => {
        $$renderer3.option({}, ($$renderer4) => {
          $$renderer4.push(`半日`);
        });
        $$renderer3.option({}, ($$renderer4) => {
          $$renderer4.push(`2時間以内`);
        });
        $$renderer3.option({}, ($$renderer4) => {
          $$renderer4.push(`1日`);
        });
        $$renderer3.option({}, ($$renderer4) => {
          $$renderer4.push(`指定なし`);
        });
      });
      $$renderer2.push(`</label><label class="field"><span>希望する難易度</span>`);
      $$renderer2.select({ value: difficultyPref }, ($$renderer3) => {
        $$renderer3.option({}, ($$renderer4) => {
          $$renderer4.push(`初心者向け`);
        });
        $$renderer3.option({}, ($$renderer4) => {
          $$renderer4.push(`初級`);
        });
        $$renderer3.option({}, ($$renderer4) => {
          $$renderer4.push(`指定なし`);
        });
      });
      $$renderer2.push(`</label></div> <div class="sample-weather"><div><span class="weather-icon">☂</span><span><b>天候シナリオ</b><small>実データではありません。診断を試すためのサンプルです。</small></span></div>`);
      $$renderer2.select({ value: weather, "aria-label": "サンプル天候を選択" }, ($$renderer3) => {
        $$renderer3.option({ value: "rain" }, ($$renderer4) => {
          $$renderer4.push(`雨予報（情報不足）`);
        });
        $$renderer3.option({ value: "mild" }, ($$renderer4) => {
          $$renderer4.push(`大きな注意情報なし（参考条件）`);
        });
        $$renderer3.option({ value: "storm" }, ($$renderer4) => {
          $$renderer4.push(`雷・大雨（危険ケース）`);
        });
        $$renderer3.option({ value: "wind" }, ($$renderer4) => {
          $$renderer4.push(`強風（危険ケース）`);
        });
        $$renderer3.option({ value: "unknown" }, ($$renderer4) => {
          $$renderer4.push(`天候情報なし`);
        });
      });
      $$renderer2.push(`</div> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <button class="primary-btn">今日のおすすめを探す <span>→</span></button><p class="privacy-note">入力情報はこのブラウザ内でのみ使われます。</p></div></section>`);
    }
    $$renderer2.push(`<!--]--></main> <footer><div class="footer-brand">YAMA SWITCH</div><p>雨の日も、山との出会いをあきらめない。</p><span>このプロトタイプの情報はサンプルです。実際の安全を保証するものではありません。</span><small>© YAMA SWITCH Prototype</small></footer>`);
  });
}
export {
  _page as default
};
