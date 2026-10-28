<script lang="ts">
	import { onMount } from 'svelte';
	import { plans, categoryLabels, type Category, type Plan } from '$lib/plans';
	type View = 'home' | 'results' | 'detail' | 'favorites';
	type Weather = 'mild' | 'rain' | 'storm' | 'wind' | 'unknown';
	type Diagnosis = 'consider' | 'avoid' | 'unknown';
	let view = $state<View>('home');
	let activeNav = $state<'plan' | 'favorites'>('plan');
	let destination = $state('御在所岳');
	let date = $state(new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10));
	let origin = $state('名古屋市');
	let transport = $state('車');
	let durationPref = $state('半日');
	let difficultyPref = $state('初心者向け');
	let weather = $state<Weather>('rain');
	let error = $state('');
	let category = $state<Category | 'all'>('all');
	let maxTravel = $state(240);
	let filterDifficulty = $state('すべて');
	let selected = $state<Plan | null>(null);
	let favorites = $state<string[]>([]);
	let saved = $state(false);
	let loaded = $state(false);
	const weatherInfo: Record<Weather, { title: string; rain: string; wind: string; lightning: string; alert: string; trail: string; icon: string }> = {
		mild: { title:'大きな注意情報なし（参考サンプル）', rain:'1時間あたり 0〜1mm（サンプル）', wind:'風速 3m/s（サンプル）', lightning:'雷情報：注意情報なし（サンプル）', alert:'気象警報：なし（サンプル）', trail:'登山道：未確認', icon:'☁' },
		rain: { title:'雨予報（サンプル）', rain:'1時間あたり 2〜5mm ／ 降水確率 70%', wind:'風速 4m/s（サンプル）', lightning:'雷情報：未確認', alert:'気象警報：未確認', trail:'登山道：未確認', icon:'☂' },
		storm: { title:'雷・大雨注意（危険サンプル）', rain:'1時間あたり 15mm以上（サンプル）', wind:'風速 9m/s（サンプル）', lightning:'雷の可能性あり（危険サンプル）', alert:'大雨警報の可能性（危険サンプル）', trail:'登山道・増水状況：未確認', icon:'⛈' },
		wind: { title:'強風（危険サンプル）', rain:'1時間あたり 1mm未満（サンプル）', wind:'風速 15m/s（危険サンプル）', lightning:'雷情報：未確認', alert:'気象警報：未確認', trail:'登山道：未確認', icon:'≋' },
		unknown: { title:'天候データなし（サンプル）', rain:'降水量：取得できません', wind:'風の状況：取得できません', lightning:'雷情報：未確認', alert:'気象警報：未確認', trail:'登山道：未確認', icon:'?' }
	};
	let diagnosis = $derived<Diagnosis>(weather === 'storm' || weather === 'wind' ? 'avoid' : weather === 'mild' ? 'consider' : 'unknown');
	let diagnosisTitle = $derived(diagnosis === 'consider' ? '条件付きで候補を検討できます' : diagnosis === 'avoid' ? '登山は避け、別の体験を検討しましょう' : '情報不足のため判断できません');
	let diagnosisCopy = $derived(diagnosis === 'avoid' ? '雷・強風などの危険情報がある想定です。代替登山は表示せず、屋内の自然体験や延期を優先してください。' : diagnosis === 'consider' ? '必要な情報を確認したうえで候補を検討してください。安全を保証するものではありません。' : '雨だけで登山の可否は決められません。雷・風・警報・登山道情報が未確認のため、安全とは判定できません。');
	let filteredPlans = $derived(plans.filter((p) => {
		if (diagnosis === 'avoid' && p.category === 'hike') return false;
		if (p.category === 'hike' && (diagnosis !== 'consider' || p.safetyStatus !== '確認済み')) return false;
		if (category !== 'all' && p.category !== category) return false;
		if (p.travel > maxTravel) return false;
		if (filterDifficulty !== 'すべて' && p.difficulty !== filterDifficulty) return false;
		return true;
	}).sort((a,b) => Number(b.indoor) - Number(a.indoor) || Number(b.prefecture.includes(origin)) - Number(a.prefecture.includes(origin)) || a.travel - b.travel));
	let favoritePlans = $derived(plans.filter((p) => favorites.includes(p.id)));
	onMount(() => {
		try { favorites = JSON.parse(localStorage.getItem('yama-switch-favorites') ?? '[]') as string[]; } catch { favorites = []; }
		loaded = true;
	});
	$effect(() => { if (loaded) { localStorage.setItem('yama-switch-favorites', JSON.stringify(favorites)); } });
	function toggleFavorite(id: string) {
		favorites = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
	}
	function search() {
		if (!destination.trim() || !origin.trim() || !date) { error = '行きたい山・予定日・出発地を入力してください。'; return; }
		if (new Date(`${date}T00:00:00`) < new Date(new Date().toDateString())) { error = '予定日は今日以降の日付を選んでください。'; return; }
		error = ''; view = 'results'; activeNav = 'plan'; category = 'all';
	}
	function showDetail(plan: Plan) { selected = plan; saved = false; view = 'detail'; }
	function goHome() { view = 'home'; activeNav = 'plan'; }
</script>

<svelte:head>
	<title>YAMA SWITCH — 雨の日も、山との出会いを。</title>
	<meta name="description" content="天気や安全情報を確認しながら、山の日の過ごし方を考えるプロトタイプ。" />
</svelte:head>

<header class="topbar">
	<a class="brand" href="/" onclick={(e) => { e.preventDefault(); goHome(); }} aria-label="YAMA SWITCH ホーム"><span class="brand-mark">Y</span><span>YAMA <b>SWITCH</b><small>雨の日も、山との出会いを。</small></span></a>
	<nav aria-label="メインナビゲーション">
		<button class:current={activeNav === 'plan'} onclick={goHome}><span>⌂</span> 計画を立てる</button>
		<button class:current={activeNav === 'favorites'} onclick={() => { view = 'favorites'; activeNav = 'favorites'; }}><span>♡</span> お気に入り <em>{favorites.length}</em></button>
	</nav>
	<div class="profile"><span>山</span> はじめての山歩き</div>
</header>

<main>
	{#if view === 'home'}
		<section class="hero">
			<div class="hero-copy"><div class="eyebrow"><span></span> THE MOUNTAIN CAN WAIT — OR CHANGE</div><h1>雨の日も、<br />山との出会いを。</h1><p>予定していた山に雨予報。そんな日も、自然を楽しむ選択肢を一緒に探します。</p><div class="hero-note"><span>✳</span><span><b>安全を第一に考えた提案</b><small>天候と確認状況を見ながら、次の一歩を。</small></span></div></div>
			<div class="hero-art" aria-label="雨雲のかかる山のイラスト" role="img"><div class="sun"></div><div class="cloud">☁</div><div class="rain-lines">╱　╱　╱　╱　╱</div><svg viewBox="0 0 640 360" aria-hidden="true"><path d="M0 290 120 115l80 110L340 65l155 240 85-90v145H0z" fill="#b7c8a9"/><path d="m120 115 26 37-29-8-21 15zm220-50 38 67-37-18-31 24z" fill="#f8f7f2"/><path d="M0 315 175 165l108 132 98-100 161 121 98-71v113H0z" fill="#7d987e"/><path d="M0 340h640v20H0z" fill="#395c4b"/><path d="M396 240c-33 38-49 57-57 100m88-60c-10 25-14 39-16 60m-73-42-18 42" fill="none" stroke="#f4f4e9" stroke-width="4" stroke-linecap="round"/></svg><span class="art-label">MOUNTAINS, IN EVERY WEATHER</span></div>
		</section>
		<section class="form-section"><div class="section-kicker">YOUR PLAN <span>01 — 02</span></div><h2>山の予定を教えてください</h2><p class="section-sub">今の計画と希望に合わせて、その日の過ごし方を考えます。</p>
			<div class="form-card">
				<div class="field-grid"><label class="field wide"><span>行きたい山・目的地 <i>必須</i></span><input bind:value={destination} placeholder="例：御在所岳" /></label><label class="field"><span>登山予定日 <i>必須</i></span><input type="date" bind:value={date} /></label><label class="field"><span>出発地 <i>必須</i></span><input bind:value={origin} placeholder="例：名古屋市" /></label>
				<label class="field"><span>移動手段</span><select bind:value={transport}><option>車</option><option>公共交通機関</option></select></label><label class="field"><span>希望する歩行時間</span><select bind:value={durationPref}><option>半日</option><option>2時間以内</option><option>1日</option><option>指定なし</option></select></label><label class="field"><span>希望する難易度</span><select bind:value={difficultyPref}><option>初心者向け</option><option>初級</option><option>指定なし</option></select></label>
				</div>
				<div class="sample-weather"><div><span class="weather-icon">☂</span><span><b>天候シナリオ</b><small>実データではありません。診断を試すためのサンプルです。</small></span></div><select bind:value={weather} aria-label="サンプル天候を選択"><option value="rain">雨予報（情報不足）</option><option value="mild">大きな注意情報なし（参考条件）</option><option value="storm">雷・大雨（危険ケース）</option><option value="wind">強風（危険ケース）</option><option value="unknown">天候情報なし</option></select></div>
				{#if error}<p class="error" role="alert">{error}</p>{/if}
				<button class="primary-btn" onclick={search}>今日のおすすめを探す <span>→</span></button><p class="privacy-note">入力情報はこのブラウザ内でのみ使われます。</p>
			</div>
		</section>
	{:else if view === 'results'}
		<div class="results-head"><button class="back-link" onclick={goHome}>← 計画を編集</button><div class="section-kicker">YOUR DAY, REIMAGINED <span>02 — 02</span></div><h1>{destination} の予定を見直しましょう</h1><p>{date} ・ {origin}から ・ {transport} ・ {durationPref}</p></div>
		<section class="diagnosis" class:danger={diagnosis === 'avoid'}><div class="diagnosis-icon">{weatherInfo[weather].icon}</div><div class="diagnosis-main"><div class="tag">{weatherInfo[weather].title}</div><h2>{diagnosisTitle}</h2><p>{diagnosisCopy}</p><div class="weather-grid"><span>☂ 降水 <b>{weatherInfo[weather].rain}</b></span><span>≋ 風 <b>{weatherInfo[weather].wind}</b></span><span>⚡ 雷 <b>{weatherInfo[weather].lightning}</b></span><span>▤ 警報 <b>{weatherInfo[weather].alert}</b></span><span>⌁ 登山道 <b>{weatherInfo[weather].trail}</b></span></div><div class="safety-callout">⚠ この診断はサンプル条件による簡易判定です。実際の登山可否を示すものではありません。出発前に気象庁や登山道管理者の最新情報を確認してください。</div></div></section>
		<div class="next-actions"><div><span class="action-no">NEXT STEP</span><h3>{diagnosis === 'avoid' ? '今日は山麓で自然を楽しむか、延期を。' : 'まずは状況を確かめましょう。'}</h3><p>安全情報の未確認な山を「安全」としておすすめすることはありません。</p></div><button class="outline-btn" onclick={() => { category = diagnosis === 'avoid' ? 'nature' : 'all'; document.getElementById('suggestions')?.scrollIntoView({behavior:'smooth'}); }}>過ごし方を見てみる ↓</button></div>
		<section class="suggestions" id="suggestions"><div class="suggestion-title"><div><div class="section-kicker">IDEAS FOR YOUR DAY</div><h2>こんな過ごし方はいかが？</h2><p>サンプル候補です。営業・交通・安全情報は各管理者にご確認ください。</p></div><span class="results-count">{filteredPlans.length} 件</span></div>
			<div class="filters"><div class="tabs">{#each [['all','すべて'],['hike','代替登山'],['nature','自然体験'],['refresh','山麓観光']] as tab}<button class:active={category === tab[0]} onclick={() => category = tab[0] as Category | 'all'}>{tab[1]}</button>{/each}</div><label>移動時間 <select bind:value={maxTravel}><option value={60}>1時間以内</option><option value={120}>2時間以内</option><option value={240}>4時間以内</option><option value={600}>指定なし</option></select></label><label>難易度 <select bind:value={filterDifficulty}><option>すべて</option><option>初心者向け</option><option>初級</option></select></label></div>
			{#if filteredPlans.length}<div class="plan-grid">{#each filteredPlans as plan}<article class="plan-card"><div class="plan-visual" class:forest={plan.category === 'hike'} class:lake={plan.category === 'nature'} class:onsen={plan.category === 'refresh'}><span>{plan.category === 'hike' ? '△' : plan.category === 'nature' ? (plan.indoor ? '⌂' : '✳') : '♨'}</span><small>{categoryLabels[plan.category]}</small><button class="heart" aria-label="お気に入りに{favorites.includes(plan.id) ? '登録済み' : '登録'}" onclick={() => toggleFavorite(plan.id)}>{favorites.includes(plan.id) ? '♥' : '♡'}</button></div><div class="plan-body"><div class="location">{plan.prefecture} ・ {plan.area}</div><h3>{plan.name}</h3><p>{plan.description}</p><div class="plan-facts"><span>◷ {plan.duration}分</span><span>↗ 約{plan.travel}分</span><span>♧ {plan.difficulty}</span></div><div class="plan-status"><span class="status-dot"></span>安全情報：{plan.safetyStatus} <small>目安はサンプル</small></div><p class="rain-note">☂ {plan.weatherNotes}</p><button class="detail-link" onclick={() => showDetail(plan)}>詳細を見る <span>→</span></button></div></article>{/each}</div>{:else}<div class="empty"><span>⌁</span><h3>条件に合う候補はありません</h3><p>移動時間やカテゴリを広げて、もう一度見てみましょう。</p><button class="outline-btn" onclick={() => { category = 'all'; maxTravel = 600; filterDifficulty = 'すべて'; }}>条件をリセット</button></div>{/if}
		</section>
	{:else if view === 'detail' && selected}
		<button class="back-link" onclick={() => view = 'results'}>← 候補一覧へ戻る</button><div class="detail-layout"><div class="detail-banner" class:forest={selected.category === 'hike'} class:lake={selected.category === 'nature'} class:onsen={selected.category === 'refresh'}><div class="section-kicker">{categoryLabels[selected.category]} ・ {selected.prefecture}</div><h1>{selected.name}</h1><p>{selected.area} — {selected.type}</p></div><article class="detail-content"><div class="detail-overview"><div><div class="section-kicker">ABOUT THIS PLACE</div><h2>この場所について</h2><p>{selected.description}</p></div><div class="detail-time"><span>想定所要時間</span><b>{selected.duration}<small>分</small></b><span>移動目安 約{selected.travel}分</span></div></div><div class="detail-columns"><section><h3>おすすめポイント</h3><p>{selected.category === 'hike' ? '自然の中を歩き、山の空気を感じるプランです。' : selected.indoor ? '天候に左右されにくく、自然について知る時間を過ごせます。' : '景色や自然にふれながら、自分のペースで過ごせます。'}</p><h3>アクセス</h3><p>{selected.access}<br />{transport}でのアクセス・所要時間は出発前に再確認してください。</p><h3>雨天時の注意</h3><p>{selected.weatherNotes}</p><div class="status-box">安全情報の状態：<b>{selected.safetyStatus}</b> — 現地の営業、通行、運行状況は確認できていません。</div></section><section><h3>持ち物の目安</h3><ul>{#each selected.requiredItems as item}<li>{item}</li>{/each}</ul><h3>出発前に確認すること</h3><ul><li>気象庁の天気・警報・雷情報</li><li>施設・登山道管理者の営業、通行情報</li><li>交通機関の運行状況</li></ul></section></div><div class="detail-actions"><button class="primary-btn" onclick={() => toggleFavorite(selected!.id)}>{favorites.includes(selected.id) ? '♥ お気に入りから解除' : '♡ お気に入りに登録'}</button><button class="outline-btn" onclick={() => view = 'results'}>候補一覧へ戻る</button></div><p class="detail-disclaimer">掲載内容は体験検証用のサンプルです。最新情報を公式情報で確認し、診断結果を登山判断に使用しないでください。</p></article></div>
	{:else}
		<div class="results-head"><div class="section-kicker">YOUR SAVED IDEAS</div><h1>お気に入り</h1><p>気になった過ごし方を保存できます。</p></div>
		{#if favoritePlans.length}<div class="plan-grid favorites-grid">{#each favoritePlans as plan}<article class="plan-card"><div class="plan-visual" class:forest={plan.category === 'hike'} class:lake={plan.category === 'nature'} class:onsen={plan.category === 'refresh'}><span>{plan.category === 'hike' ? '△' : plan.category === 'nature' ? '✳' : '♨'}</span><small>{categoryLabels[plan.category]}</small><button class="heart" aria-label="お気に入りを解除" onclick={() => toggleFavorite(plan.id)}>♥</button></div><div class="plan-body"><div class="location">{plan.prefecture} ・ {plan.area}</div><h3>{plan.name}</h3><p>{plan.description}</p><div class="plan-status"><span class="status-dot"></span>安全情報：{plan.safetyStatus}</div><button class="detail-link" onclick={() => showDetail(plan)}>詳細を見る <span>→</span></button></div></article>{/each}</div>{:else}<div class="empty"><span>♡</span><h3>お気に入りはまだありません</h3><p>気になるプランを見つけたら、♡をタップして保存。</p><button class="primary-btn" onclick={goHome}>プランを探す →</button></div>{/if}
	{/if}
</main>
<footer><div class="footer-brand">YAMA SWITCH</div><p>雨の日も、山との出会いをあきらめない。</p><span>このプロトタイプの情報はサンプルです。実際の安全を保証するものではありません。</span><small>© YAMA SWITCH Prototype</small></footer>
