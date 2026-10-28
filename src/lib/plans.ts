export type Category = 'hike' | 'nature' | 'refresh';
export type SafetyStatus = '確認済み' | '未確認' | '利用不可';
export type Difficulty = '初心者向け' | '初級' | '指定なし';

export type Plan = {
	id: string;
	name: string;
	prefecture: string;
	area: string;
	category: Category;
	type: string;
	description: string;
	duration: number;
	travel: number;
	difficulty: Difficulty;
	rainSuitability: string;
	safetyStatus: SafetyStatus;
	weatherNotes: string;
	requiredItems: string[];
	access: string;
	officialUrl?: string;
	indoor: boolean;
};

export const plans: Plan[] = [
	{ id:'takao', name:'高尾山', prefecture:'東京都', area:'八王子', category:'hike', type:'低山ハイキング', description:'ケーブルカーや複数の登山道が整備された、都心から訪れやすい山。', duration:180, travel:55, difficulty:'初心者向け', rainSuitability:'雨天時の登山可否は未確認。滑りやすい道や運行状況に注意。', safetyStatus:'未確認', weatherNotes:'雨天時の登山道・ケーブルカー運行状況を事前に確認してください。', requiredItems:['防水の靴','レインウェア','飲み物'], access:'新宿から電車で高尾山口駅へ（所要時間は目安）。', indoor:false },
	{ id:'mitake', name:'御岳山', prefecture:'東京都', area:'青梅', category:'hike', type:'山歩き・神社参拝', description:'ケーブルカーで山上へ行ける自然豊かな山域。', duration:240, travel:100, difficulty:'初級', rainSuitability:'雨天時の登山可否は未確認。', safetyStatus:'未確認', weatherNotes:'雨天時の登山道やケーブルカー運行を確認してください。', requiredItems:['防水の靴','レインウェア','飲み物'], access:'JR青梅線で御嶽駅、バスとケーブルカーを利用（目安）。', indoor:false },
	{ id:'forest-kiso', name:'赤沢自然休養林', prefecture:'長野県', area:'木曽', category:'nature', type:'森林散策', description:'木曽の森をゆっくり味わう森林散策のエリア。', duration:150, travel:180, difficulty:'初心者向け', rainSuitability:'散策路や施設の営業情報は未確認。', safetyStatus:'未確認', weatherNotes:'雨具と足元の対策を。施設の営業期間・遊歩道の状況は要確認。', requiredItems:['歩きやすい靴','雨具','飲み物'], access:'木曽地域から車で移動（所要時間は目安）。', indoor:false },
	{ id:'ooyama', name:'大山阿夫利神社周辺', prefecture:'神奈川県', area:'伊勢原', category:'hike', type:'山麓散策', description:'山の景色と参道の雰囲気を楽しめる大山エリア。', duration:180, travel:90, difficulty:'初級', rainSuitability:'雨天時の登山可否は未確認。', safetyStatus:'未確認', weatherNotes:'雨で石段や山道が滑りやすくなる場合があります。', requiredItems:['滑りにくい靴','雨具','飲み物'], access:'伊勢原駅からバス（所要時間は目安）。', indoor:false },
	{ id:'lake-biwa', name:'滋賀県立琵琶湖博物館', prefecture:'滋賀県', area:'草津', category:'nature', type:'自然観察施設', description:'琵琶湖の自然や生きものについて学べる屋内施設。', duration:150, travel:40, difficulty:'初心者向け', rainSuitability:'屋内中心。開館日・予約状況は要確認。', safetyStatus:'未確認', weatherNotes:'屋内中心ですが、営業日・展示状況は公式情報で確認してください。', requiredItems:['入館に必要なもの','飲み物'], access:'草津駅から路線バス（所要時間は目安）。', indoor:true },
	{ id:'hakuba-center', name:'白馬ビジターセンター', prefecture:'長野県', area:'白馬', category:'nature', type:'ビジターセンター', description:'白馬の自然や山岳環境を知るための立ち寄りスポット。', duration:90, travel:30, difficulty:'初心者向け', rainSuitability:'開館状況は未確認。', safetyStatus:'未確認', weatherNotes:'開館日・展示内容を事前に確認してください。', requiredItems:['雨具','飲み物'], access:'白馬村内から車またはバス（所要時間は目安）。', indoor:true },
	{ id:'ropeway-kurodake', name:'大雪山層雲峡・黒岳ロープウェイ', prefecture:'北海道', area:'層雲峡', category:'nature', type:'ロープウェイ・自然景観', description:'ロープウェイで大雪山の景観にふれる体験。', duration:120, travel:25, difficulty:'初心者向け', rainSuitability:'天候による運休あり。運行情報は未確認。', safetyStatus:'未確認', weatherNotes:'強風や荒天で運休することがあります。当日の運行確認が必要です。', requiredItems:['防寒着','雨具','飲み物'], access:'層雲峡温泉街から徒歩圏（目安）。', indoor:false },
	{ id:'kusatsu-onsen', name:'草津温泉街', prefecture:'群馬県', area:'草津', category:'refresh', type:'温泉・山麓観光', description:'温泉街の散策や休憩を楽しむリフレッシュ案。', duration:180, travel:45, difficulty:'初心者向け', rainSuitability:'屋内施設を含む。営業状況は要確認。', safetyStatus:'未確認', weatherNotes:'屋外散策は雨具を。入浴施設の営業状況を確認してください。', requiredItems:['着替え','タオル','雨具'], access:'草津温泉バスターミナル周辺（目安）。', indoor:true },
	{ id:'yamanakako', name:'山中湖交流プラザ きらら周辺', prefecture:'山梨県', area:'山中湖', category:'nature', type:'湖畔の自然観察', description:'湖と富士山の眺めに親しめる湖畔エリア。', duration:90, travel:35, difficulty:'初心者向け', rainSuitability:'施設・屋外エリアの営業状況は要確認。', safetyStatus:'未確認', weatherNotes:'天候によって眺望が変わり、湖畔は風が強まることがあります。', requiredItems:['雨具','防寒着','飲み物'], access:'山中湖エリア内からバスまたは車（目安）。', indoor:false },
	{ id:'arashiyama', name:'嵐山・竹林の小径', prefecture:'京都府', area:'京都市', category:'refresh', type:'森と歴史の散策', description:'竹林や川沿いを歩き、京都の自然と景観を楽しむ散策案。', duration:120, travel:30, difficulty:'初心者向け', rainSuitability:'屋外散策。足元に注意。', safetyStatus:'未確認', weatherNotes:'雨で道が滑りやすくなる場合があります。混雑状況も要確認。', requiredItems:['歩きやすい靴','雨具'], access:'嵐山駅周辺から徒歩（目安）。', indoor:false },
	{ id:'miyajima', name:'宮島ビジターセンター', prefecture:'広島県', area:'宮島', category:'nature', type:'ビジターセンター', description:'島の自然や文化を知り、天候に合わせて過ごし方を考える拠点。', duration:90, travel:60, difficulty:'初心者向け', rainSuitability:'開館状況は未確認。', safetyStatus:'未確認', weatherNotes:'船の運航や施設の開館情報を確認してください。', requiredItems:['雨具','飲み物'], access:'宮島口からフェリー、島内移動（目安）。', indoor:true },
	{ id:'aso-museum', name:'阿蘇火山博物館', prefecture:'熊本県', area:'阿蘇', category:'nature', type:'自然・火山の学習施設', description:'阿蘇の火山や自然を屋内で学ぶ体験。', duration:120, travel:35, difficulty:'初心者向け', rainSuitability:'開館状況は未確認。', safetyStatus:'未確認', weatherNotes:'開館日と周辺道路・火山に関する最新情報を確認してください。', requiredItems:['入館に必要なもの','上着'], access:'阿蘇地域からバスまたは車（目安）。', indoor:true },
	{ id:'kamikochi', name:'上高地ビジターセンター周辺', prefecture:'長野県', area:'松本', category:'nature', type:'自然観察・学習', description:'山岳景観や自然環境を知る拠点。入山期間や交通規制に注意。', duration:90, travel:150, difficulty:'初心者向け', rainSuitability:'季節・交通・開館状況は要確認。', safetyStatus:'未確認', weatherNotes:'入山期間、交通規制、増水や遊歩道の状況を必ず確認してください。', requiredItems:['雨具','防寒着','飲み物'], access:'沢渡または平湯からバスへ乗り換え（目安）。', indoor:true }
];

export const categoryLabels: Record<Category, string> = { hike: '代替登山', nature: '自然体験', refresh: '山麓観光・リフレッシュ' };
