/* ============================================================
 * 公司股权关系图谱 —— 数据文件
 * 以后股权变动只需修改本文件，无需改动 app.js / index.html
 * 数据核对来源：《公司记录详情.xlsx》+《公司关系图.drawio》+ 天眼查（2026-08-30）
 * ============================================================ */
window.ORGDATA = {

  updated: "2026-08-30",

  /* ---------- 公司 / 主体 ----------
   * nature: ltd=有限公司  lp=有限合伙
   * sys: 所属体系 A/B/C/D/E，X=其他
   * legal: 速查表"法人/执行事务合伙人"列显示（统一为自然人名）
   * cardLegal: 结构图卡片显示（默认同 legal，委派代表等细节在此覆盖）
   */
  companies: {
    /* ---- A 可信智能系 ---- */
    kexin:     { name:"可信智能（无锡）信息技术有限公司", nature:"ltd", sys:"A", region:"无锡", code:"91320205MAE8W38629", legal:"阎翼桥", cap:200, est:"2025-01-06", tax:"小规模", addr:"无锡市锡山区安镇街道春风南路2号智行科创园B1-5-171", role:"控股平台 · 无实际业务" },
    shenzhi:   { name:"深智引擎（无锡）信息技术有限公司", nature:"ltd", sys:"A", region:"无锡", code:"91320205MAK079TE54", legal:"阎翼桥", cap:5,   est:"2025-11-03", tax:"小规模", addr:"无锡市锡山经济技术开发区荟智企业中心锡沪东路588号8号楼112-124", role:"无锡人员管理（暂无员工）" },
    zhidaxin:  { name:"上海智达信科技有限公司",           nature:"ltd", sys:"A", region:"上海", code:"91310112MAENU9YLXT",  legal:"李志",   cap:700, est:"2025-07-11", tax:"一般纳税人", addr:"上海市闵行区剑川路940号B幢3层", role:"安全测评业务",
                extChips:["外部：上海人工智能研究院 14.29%","上交汇智（上海）技术转移 14.29%","上海逐久胜企业管理合伙 14.29%"] },
    modeng:    { name:"上海垂域模盾智能科技有限公司",       nature:"ltd", sys:"A", region:"上海", code:"91310115MAERN9FL4L",  legal:"李志",   cap:200, est:"2025-08-19", tax:"小规模", addr:"中国（上海）自由贸易试验区中科路1750号1幢十七层（产证楼层14层）1703-A室", role:"安全解决方案 · 测评业务开展公司",
                xnote:"另参股：北京灵深 3%（见 C 系）" },
    modengbj:  { name:"垂域模盾（北京）智能科技有限公司",   nature:"ltd", sys:"A", region:"北京", code:"91110105MAKL1TRA04",  legal:"李志",   cap:2,   est:"2026-07-28", tax:"—", addr:"北京市朝阳区豆各庄黄厂西路1号C7栋七层7116", role:"全资子公司" },
    lockx:     { name:"上海洛克思科技合伙企业（有限合伙）", nature:"lp",  sys:"A", region:"上海", code:"91310112MAE4X85D68",  legal:"孙士锋", cap:3,   est:"2024-11-07", tax:"小规模", addr:"上海市闵行区放鹤路1088号", role:"持股平台 · 无实际业务",
                partners:[["孙士锋","25%"],["王兰心","25%"],["王烁","25%"],["谷益冰","25%"]] },

    /* ---- B 深度垂域系 ---- */
    sdcy:      { name:"深度垂域（上海）智能科技有限公司",   nature:"ltd", sys:"B", region:"上海", code:"91310104MAETKAPUXB",  legal:"王媛媛", cap:200, est:"2025-08-20", tax:"小规模", addr:"上海市徐汇区漕宝路103号49幢203室", role:"通用智能平台" },
    lingdong:  { name:"上海灵动能知科技有限公司",           nature:"ltd", sys:"B", region:"上海", code:"91310104MAK3FEMF97",  legal:"王媛媛", cap:200, est:"2025-12-04", tax:"小规模", addr:"上海市徐汇区龙台路180号3层01部位3-1室", role:"全资子公司" },
    cscy:      { name:"长沙深度垂域智能科技有限公司",       nature:"ltd", sys:"B", region:"长沙", code:"91430104MAEWWE0P9D",  legal:"王媛媛", cap:100, est:"2025-09-15", tax:"小规模", addr:"湖南湘江新区雷锋街道汇智北路116号长沙智谷产业园AQ7栋105-001", role:"AI + 医疗业务",
                xnote:"另持股：长沙研恒域 20%（见 E 系）" },
    vert:      { name:"垂直智能（无锡）科技有限公司",       nature:"ltd", sys:"B", region:"无锡", code:"91320205MAK2TKMD44",  legal:"王媛媛", cap:900, est:"2025-11-26", tax:"小规模", addr:"无锡市锡山开发区凤威路9号长三角工业芯谷A栋901", role:"控股子公司",
                extChips:["外部：上海交大知识产权管理 11.11%","河南紫宸信息技术合伙 11.11%"] },
    nmg:       { name:"深度垂域（内蒙古）智能科技有限公司", nature:"ltd", sys:"B", region:"内蒙古", code:"91150102MAKGT7T50P", legal:"王媛媛", cap:300, est:"2026-06-23", tax:"—", addr:"内蒙古自治区呼和浩特市新城区数据标注基地C座11楼03", role:"控股子公司",
                extChips:["外部：云序嘉投（海南）投资 49%"] },
    lanzhi:    { name:"上海兰致矩阵科技中心（有限合伙）",   nature:"lp",  sys:"B", region:"上海", code:"91310113MAEL9E1F82",  legal:"李慧",   cap:100, est:"2025-05-19", tax:"小规模", addr:"上海市宝山区长逸路188号1幢10层", role:"持股平台 · 无实际业务",
                partners:[["岳国繁","25%"],["李慧","25%"],["谷益冰","25%"],["贺超翔","25%"]],
                xnote:"另持股：中工灵智 10%（见 D 系）",
                badge:{cls:"b",text:"B 系 · 10%"} },

    /* ---- C 北京灵深 ---- */
    lingshen:  { name:"北京灵深科技有限公司",               nature:"ltd", sys:"C", region:"北京", code:"91110101MAKG6MBC91",  legal:"丁乐崇", cap:100, est:"2026-06-18", tax:"—", addr:"北京市东城区南竹杆胡同2号1幢15层11805", role:"新设主体" },
    xinchuang:{ name:"海南新创致益企业管理合伙企业（有限合伙）", nature:"lp", sys:"C", region:"海南", code:"91460000MAA99NW76W", legal:"海南旺水泉科技有限公司", cap:1010, est:"2022-01-19", tax:"—", addr:"海南省三亚市天涯区三亚中央商务区凤凰岛1号楼A座1085号", role:"持股平台" },
    mingheyuan:{ name:"上海明合源科技合伙企业（有限合伙）", nature:"lp",  sys:"C", region:"上海", code:"91310117MAKC6QM91W",  legal:"王媛媛", cap:10,  est:"2026-05-12", tax:"—", addr:"上海市松江区洞泾镇周家浜路255号1幢一层A区", role:"持股平台" },

    /* ---- D 中工灵智 ---- */
    zhonggong: { name:"中工灵智（上海）科技有限公司",       nature:"ltd", sys:"D", region:"上海", code:"91310112MAKEEUGN4P",  legal:"陈嫣然", cap:100, est:"2026-06-09", tax:"—", addr:"上海市闵行区剑川路940号B幢3层（集中登记地）", role:"新设主体" },
    hexin:     { name:"上海合信方略科技合伙企业（有限合伙）", nature:"lp", sys:"D", region:"上海", code:"91310117MAKC72833U",  legal:"李慧",   cap:1,   est:"2026-05-12", tax:"—", addr:"上海市松江区洞泾镇周家浜路255号1幢一层A区", role:"持股平台",
                partners:[["李慧","41.25%"],["陈嫣然","32.5%"],["刘艳","26.25%"]] },
    yunxu:     { name:"云序启新（上海）科技合伙企业（有限合伙）", nature:"lp", sys:"D", region:"上海", code:"91310117MAKF70N1X3", legal:"陈嫣然", cardLegal:"合信方略（委派代表：陈嫣然）", cap:1, est:"2026-06-01", tax:"—", addr:"上海市松江区洞泾镇周家浜路255号1幢一层A区（集中登记地）", role:"持股平台",
                partners:[["合信方略","90%"],["李慧","10%"]] },

    /* ---- E 新设主体 ---- */
    yuanfu:    { name:"上海元复智生科技有限公司",           nature:"ltd", sys:"E", region:"上海", code:"91310112MAKLG44KXN",  legal:"代秀琴", cap:100, est:"2026-08-11", tax:"—", addr:"上海市闵行区元江路5500号第1幢（集中登记地）", role:"新设主体" },
    zhouxing:  { name:"舟行听澜（上海）科技合伙企业（有限合伙）", nature:"lp", sys:"E", region:"上海", code:"91310117MAKJT96P6K", legal:"代秀琴", cap:1, est:"2026-07-14", tax:"—", addr:"上海市松江区洞泾镇周家浜路255号1幢一层A区（集中登记地）", role:"持股平台",
                partners:[["代秀琴","99%"],["乔晓芳","1%"]] },
    yanheng:   { name:"长沙研恒域科技合伙企业（有限合伙）", nature:"lp",  sys:"F", region:"长沙", code:"91430104MAKKHTW15J",  legal:"代秀琴", cardLegal:"长沙深度垂域（委派代表：代秀琴）", cap:300, est:"2026-08-07", tax:"—", addr:"湖南省长沙市岳麓区洋湖街道潇湘南路一段368号中盈广场D、E座605-0150（集群注册）", role:"新设主体" },
    honglan:   { name:"长沙鸿澜智汇科技合伙企业（有限合伙）", nature:"lp", sys:"F", region:"长沙", code:"91430104MAKDPTJ1X3",  legal:"代晨鸿", cap:1,   est:"2026-05-19", tax:"—", addr:"湖南省长沙市岳麓区望岳街道杜鹃路858号奥克斯缤纷广场5号地块1栋2栋商业及地下室2406、2407、2408、2409-218（集群注册）", role:"持股平台",
                partners:[["代晨鸿","51%"],["赵海平","49%"]] },

    /* ---- 其他 ---- */
    siyuntu:   { name:"上海思云图科技合伙企业（有限合伙）", nature:"lp",  sys:"X", region:"上海", code:"91310117MAEM6M54X6",  legal:"李志",   cap:3,   est:"2025-05-28", tax:"小规模", addr:"上海市松江区洞泾镇周家浜路255号1幢一层A区", role:"股权归属待确认" }
  },

  /* ---------- 自然人股东 / 外部机构 ---------- */
  persons:   { wangshuo:{name:"王烁"}, lihui:{name:"李慧"}, liuyan:{name:"刘艳"} },
  externals: { chanyeyuan:{name:"无锡市产业创新研究院有限责任公司"}, sanqian:{name:"北京三千视界管理咨询有限公司"} },

  /* ---------- 体系与结构图 ----------
   * rows: 每行的节点（公司 id / 自然人 id / 外部 id / 跨体系引用对象）
   * 跨体系引用对象: { cross:公司id, home:"A|B", id:"实例id", info:[["所属","…"],["参股","…"]] }
   * edges: {f:源, t:目标, p:比例}，f/t 为节点实例 id
   */
  systems: [
    {
      key:"A", letter:"A", title:"可信智能系", tag:"测评业务", color:"blue",
      secId:"sysA", secClass:"sysA", boxClass:"sysA2", noBg:"var(--a)",
      desc:"控制链：洛克思（持股平台）59% + 王烁 40% + 无锡产研院 1% → <b>可信智能（无锡）</b>；可信智能全资设深智引擎、控股上海智达信 57.14%；智达信全资设上海垂域模盾，后者再全资设垂域模盾（北京），并参股北京灵深 3%。",
      rows:[ ["lockx","wangshuo","chanyeyuan"], ["kexin"], ["shenzhi","zhidaxin"], ["modeng"], ["modengbj"] ],
      edges:[ {f:"lockx",t:"kexin",p:"59%"},{f:"wangshuo",t:"kexin",p:"40%"},{f:"chanyeyuan",t:"kexin",p:"1%"},
              {f:"kexin",t:"shenzhi",p:"100%"},{f:"kexin",t:"zhidaxin",p:"57.14%"},{f:"zhidaxin",t:"modeng",p:"100%"},{f:"modeng",t:"modengbj",p:"100%"} ],
      core:"kexin"
    },
    {
      key:"B", letter:"B", title:"深度垂域系", tag:"AI 健康 / AI 医疗", color:"green",
      secId:"sysB", secClass:"sysB", boxClass:"sysB2", noBg:"var(--b)",
      desc:"控制链：李慧 40% + 兰致矩阵（持股平台）40% + 刘艳 20% → <b>深度垂域（上海）</b>；下设上海灵动能知、长沙深度垂域两家全资子公司，并控股垂直智能（无锡）77.78%、深度垂域（内蒙古）51%。",
      rows:[ ["lihui","lanzhi","liuyan"], ["sdcy"], ["lingdong","cscy","vert","nmg"] ],
      edges:[ {f:"lihui",t:"sdcy",p:"40%"},{f:"lanzhi",t:"sdcy",p:"40%"},{f:"liuyan",t:"sdcy",p:"20%"},
              {f:"sdcy",t:"lingdong",p:"100%"},{f:"sdcy",t:"cscy",p:"100%"},{f:"sdcy",t:"vert",p:"77.78%"},{f:"sdcy",t:"nmg",p:"51%"} ],
      core:"sdcy"
    },
    {
      key:"C", letter:"C", title:"北京灵深", tag:"新设主体", color:"rose",
      secId:"sysC", secClass:"sysC", boxClass:"sysC", noBg:"var(--c)",
      desc:"北京灵深由三方设立：海南新创致益 51%、上海明合源 46%、上海垂域模盾（A 系公司）3%。",
      rows:[ ["xinchuang","mingheyuan",{cross:"modeng",home:"A",id:"cx-modeng",info:[["所属","A 系 · 智达信 100% 子公司"],["参股","北京灵深 3%"]]}], ["lingshen"] ],
      edges:[ {f:"xinchuang",t:"lingshen",p:"51%"},{f:"mingheyuan",t:"lingshen",p:"46%"},{f:"cx-modeng",t:"lingshen",p:"3%"} ],
      core:"lingshen"
    },
    {
      key:"D", letter:"D", title:"中工灵智", tag:"新设主体", color:"violet",
      secId:"sysD", secClass:"sysD", boxClass:"sysD", noBg:"var(--d)",
      desc:"中工灵智由三方设立：合信方略 80%、云序启新 10%、上海兰致矩阵（B 系公司）10%。合信方略与云序启新互为关联（合信方略持有云序启新 90%）。",
      rows:[ ["hexin","yunxu",{cross:"lanzhi",home:"B",id:"dx-lanzhi",info:[["所属","B 系 · 深度垂域系持股平台"],["参股","中工灵智 10%"]]}], ["zhonggong"] ],
      edges:[ {f:"hexin",t:"zhonggong",p:"80%"},{f:"yunxu",t:"zhonggong",p:"10%"},{f:"dx-lanzhi",t:"zhonggong",p:"10%"} ],
      core:"zhonggong"
    },
    {
      key:"E", letter:"E", title:"上海元复智生", tag:"新设主体", color:"amber",
      secId:"sysE", secClass:"sysE1", boxClass:"sysE1", noBg:"var(--e)",
      desc:"上海元复智生由舟行听澜（执行事务合伙人：代秀琴）持股 51%，北京三千视界（外部机构）持股 49% 设立，法定代表人代秀琴。",
      rows:[ ["zhouxing","sanqian"], ["yuanfu"] ],
      edges:[ {f:"zhouxing",t:"yuanfu",p:"51%"},{f:"sanqian",t:"yuanfu",p:"49%"} ],
      core:"yuanfu"
    },
    {
      key:"F", letter:"F", title:"长沙研恒域", tag:"新设主体", color:"teal",
      secId:"sysF", secClass:"sysE2", boxClass:"sysE2", noBg:"var(--f)",
      desc:"长沙研恒域由长沙鸿澜智汇持股 80%、长沙深度垂域（B 系公司）持股 20% 设立；执行事务合伙人为长沙深度垂域（委派代表：代秀琴）。",
      rows:[ ["honglan",{cross:"cscy",home:"B",id:"ex-cscy",info:[["所属","B 系 · 深度垂域（上海）100% 子公司"],["参股","长沙研恒域 20%"]]}], ["yanheng"] ],
      edges:[ {f:"honglan",t:"yanheng",p:"80%"},{f:"ex-cscy",t:"yanheng",p:"20%"} ],
      core:"yanheng"
    }
  ],

  /* 速查表行顺序（体系分组） */
  tableOrder:["kexin","shenzhi","zhidaxin","modeng","modengbj","lockx",
              "sdcy","lingdong","cscy","vert","nmg","lanzhi",
              "lingshen","xinchuang","mingheyuan",
              "zhonggong","hexin","yunxu",
              "yuanfu","zhouxing","yanheng","honglan",
              "siyuntu"],

  /* 总览卡片 */
  overviewCards:[
    { href:"#sysA", acc:"var(--a)",  title:"A · 可信智能系", core:"核心：可信智能（无锡）信息技术有限公司",
      desc:"测评业务线。可信智能控股上海智达信 57.14%，智达信全资设立上海垂域模盾，再全资设垂域模盾（北京）；深智引擎为无锡全资子公司。",
      cnt:"6 家主体 · 洛克思为员工持股平台" },
    { href:"#sysB", acc:"var(--b)",  title:"B · 深度垂域系", core:"核心：深度垂域（上海）智能科技有限公司",
      desc:"AI 健康 / AI 医疗业务线。下设上海灵动能知、长沙深度垂域两家全资子公司，并控股垂直智能（无锡）77.78%、深度垂域（内蒙古）51%。",
      cnt:"6 家主体 · 兰致矩阵为员工持股平台" },
    { href:"#sysC", acc:"var(--c)",  title:"C · 北京灵深", core:"核心：北京灵深科技有限公司",
      desc:"北京新设主体。海南新创致益 51% + 上海明合源 46% + 上海垂域模盾（A 系）3% 三方持股。",
      cnt:"3 家主体 + 1 项跨体系入股" },
    { href:"#sysD", acc:"var(--d)",  title:"D · 中工灵智", core:"核心：中工灵智（上海）科技有限公司",
      desc:"上海新设主体。合信方略 80% + 云序启新 10% + 上海兰致矩阵（B 系）10% 三方持股。",
      cnt:"3 家主体 + 1 项跨体系入股" },
    { href:"#sysE", acc:"var(--e)",  title:"E · 上海元复智生", core:"核心：上海元复智生科技有限公司",
      desc:"上海新设主体。由舟行听澜 51% + 北京三千视界（外部机构）49% 设立；法定代表人代秀琴。",
      cnt:"2 家主体 · 法人代秀琴" },
    { href:"#sysF", acc:"var(--f)",  title:"F · 长沙研恒域", core:"核心：长沙研恒域科技合伙企业（有限合伙）",
      desc:"长沙新设主体。由鸿澜智汇 80% + 长沙深度垂域（B 系）20% 设立；执行事务合伙人为长沙深度垂域（委派代表：代秀琴）。",
      cnt:"2 家主体 · 与代秀琴、代晨鸿关联" },
    { href:"#table", acc:"#64748b",  title:"其他主体", core:"上海思云图科技合伙企业（有限合伙）",
      desc:"仅此 1 家尚未确认股权归属（法人李志，与 A 系的关联待核实），详见速查表。",
      cnt:"1 家主体 · 待补充" }
  ],

  /* 跨体系持股 */
  cross:[
    { fromSys:"A", from:"上海垂域模盾智能科技有限公司",     fromSub:"智达信 100% 子公司",        p:"3%",  toSys:"C", to:"北京灵深科技有限公司",        toSub:"新设北京主体" },
    { fromSys:"B", from:"上海兰致矩阵科技中心（有限合伙）", fromSub:"深度垂域系持股平台",        p:"10%", toSys:"D", to:"中工灵智（上海）科技有限公司", toSub:"新设上海主体" },
    { fromSys:"B", from:"长沙深度垂域智能科技有限公司",     fromSub:"深度垂域（上海）100% 子公司", p:"20%", toSys:"F", to:"长沙研恒域科技合伙企业（有限合伙）", toSub:"新设长沙主体" }
  ],

  /* 关键人物（sys 对应体系色点：A蓝 B绿 C粉 D紫 E琥珀 X灰） */
  keyPersons:[
    { name:"王媛媛", role:"6 家公司负责人", items:[
      ["深度垂域（上海）","法定代表人","B"],["上海灵动能知","法定代表人","B"],["长沙深度垂域","法定代表人","B"],
      ["垂直智能（无锡）","法定代表人","B"],["深度垂域（内蒙古）","法定代表人","B"],["上海明合源","执行事务合伙人","C"]]},
    { name:"李志", role:"4 家公司负责人", items:[
      ["上海智达信","法定代表人","A"],["上海垂域模盾","法定代表人","A"],["垂域模盾（北京）","法定代表人","A"],["上海思云图","执行事务合伙人","X"]]},
    { name:"阎翼桥", role:"2 家公司负责人", items:[
      ["可信智能（无锡）","法定代表人","A"],["深智引擎（无锡）","法定代表人","A"]]},
    { name:"李慧", role:"2 家公司负责人 · 核心股东", items:[
      ["上海兰致矩阵","执行事务合伙人","B"],["上海合信方略","执行事务合伙人","D"],["深度垂域（上海）","直接持股 40%","B"]]},
    { name:"代秀琴", role:"3 家公司负责人", items:[
      ["上海元复智生","法定代表人","E"],["舟行听澜","执行事务合伙人","E"],["长沙研恒域","委派代表","F"]]},
    { name:"陈嫣然", role:"2 家公司任职 · 股东", items:[
      ["中工灵智","法定代表人","D"],["云序启新","委派代表","D"],["上海合信方略","合伙人 32.5%","D"]]},
    { name:"孙士锋", role:"1 家公司负责人", items:[
      ["上海洛克思","执行事务合伙人","A"]]},
    { name:"丁乐崇", role:"1 家公司负责人", items:[
      ["北京灵深","法定代表人","C"]]},
    { name:"代晨鸿", role:"1 家公司负责人", items:[
      ["长沙鸿澜智汇","执行事务合伙人","F"]]},
    { name:"王烁", role:"A 系主要股东", items:[
      ["可信智能（无锡）","直接持股 40%","A"],["上海洛克思","合伙人 25%","A"]]},
    { name:"刘艳", role:"B / D 系股东", items:[
      ["深度垂域（上海）","直接持股 20%","B"],["上海合信方略","合伙人 26.25%","D"]]},
    { name:"谷益冰", role:"跨 A / B 系持股平台合伙人", items:[
      ["上海洛克思","合伙人 25%","A"],["上海兰致矩阵","合伙人 25%","B"]]},
    { name:"王兰心", role:"A 系持股平台合伙人", items:[
      ["上海洛克思","合伙人 25%","A"]]},
    { name:"岳国繁", role:"B 系持股平台合伙人", items:[
      ["上海兰致矩阵","合伙人 25%","B"]]},
    { name:"贺超翔", role:"B 系持股平台合伙人", items:[
      ["上海兰致矩阵","合伙人 25%","B"]]},
    { name:"乔晓芳", role:"E 系持股平台合伙人", items:[
      ["舟行听澜","合伙人 1%","E"]]},
    { name:"赵海平", role:"E 系持股平台合伙人", items:[
      ["长沙鸿澜智汇","合伙人 49%","E"]]}
  ],
  keyPersonsNote:"第 1–9 位为担任法定代表人 / 执行事务合伙人 / 委派代表的负责人；第 10–17 位为自然人股东与持股平台合伙人（按持股比例与出现频次排序）。"
};
