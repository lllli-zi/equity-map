/* ============================================================
 * 公司股权关系图谱 —— 渲染与交互
 * 数据见 data.js（window.ORGDATA），本文件一般无需修改
 * ============================================================ */
(function(){
  var D = window.ORGDATA;
  var NS='http://www.w3.org/2000/svg';
  var COLORS={blue:'#2563EB',green:'#16A34A',rose:'#DB2777',violet:'#7C3AED',amber:'#D97706',teal:'#0D9488'};
  var SYSCOLOR={A:'#2563EB',B:'#16A34A',C:'#DB2777',D:'#7C3AED',E:'#D97706',F:'#0D9488',X:'#64748b'};
  var el=function(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e};

  /* ---------------- 节点渲染 ---------------- */
  function nodeHTML(item, sys){
    /* 跨体系引用卡 */
    if(typeof item==='object' && item.cross){
      var c=D.companies[item.cross];
      var nt=c.nature==='lp'?'<span class="nt nt-lp">有限合伙</span>':'<span class="nt nt-ltd">有限公司</span>';
      var meta=item.info.map(function(r){return '<div><i>'+r[0]+'</i>'+r[1]+'</div>'}).join('');
      return '<div class="node x'+item.home.toLowerCase()+'" id="'+item.id+'" data-key="'+item.cross+'">'+
             '<span class="xb '+item.home.toLowerCase()+'">'+item.home+' 系公司</span>'+nt+
             '<div class="nm">'+c.name+'</div><div class="meta">'+meta+'</div></div>';
    }
    /* 自然人 */
    if(D.persons[item]) return '<div class="node person" id="'+item+'"><span class="nt nt-psn">自然人</span><div class="nm">'+D.persons[item].name+'</div></div>';
    /* 外部机构 */
    if(D.externals[item]) return '<div class="node ext" id="'+item+'"><span class="nt nt-ext">外部机构</span><div class="nm">'+D.externals[item].name+'</div></div>';
    /* 公司 */
    var c=D.companies[item]; if(!c) return '';
    var isCore = sys && sys.core===item;
    var nt = c.nature==='lp' ? '<span class="nt nt-lp">有限合伙</span>' : '<span class="nt nt-ltd">有限公司</span>';
    if(isCore) nt += '<span class="nt nt-core">核心</span>';
    var who = c.cardLegal || c.legal;
    var lbl = c.nature==='lp' ? '执行事务合伙人' : '法定代表人';
    var capL= c.nature==='lp' ? '认缴出资' : '注册资本';
    var meta = '<div><i>'+lbl+'</i>'+who+'</div>'
             + '<div><i>'+capL+'</i>'+c.cap+' 万元</div>'
             + '<div><i>成立</i>'+(c.est||'—')+'</div>'
             + '<div><i>定位</i>'+c.role+'</div>';
    var chips='';
    if(c.partners&&c.partners.length)
      chips+='<div class="chips">'+c.partners.map(function(p){return '<span class="chip">'+p[0]+' <b>'+p[1]+'</b></span>'}).join('')+'</div>';
    if(c.extChips&&c.extChips.length)
      chips+='<div class="chips">'+c.extChips.map(function(p){return '<span class="chip extc">'+p+'</span>'}).join('')+'</div>';
    if(c.xnote) chips+='<div class="chips"><span class="xchip">'+c.xnote+'</span></div>';
    var badge=(c.badge&&sys&&sys.core===item)?'<span class="xb '+c.badge.cls+'">'+c.badge.text+'</span>':'';
    return '<div class="node'+(isCore?' core':'')+'" id="'+item+'" data-key="'+item+'">'+badge+nt+
           '<div class="nm">'+c.name+'</div><div class="meta">'+meta+'</div>'+chips+'</div>';
  }

  function buildDiagram(dg, sys){
    var box=el('div','diagram');
    box.dataset.color=dg.color;
    box.dataset.edges=JSON.stringify(dg.edges);
    var svg=document.createElementNS(NS,'svg');
    svg.setAttribute('class','edges');
    box.appendChild(svg);
    var rows=el('div','rows');
    dg.rows.forEach(function(r){
      var row=el('div','row');
      r.forEach(function(item){row.insertAdjacentHTML('beforeend',nodeHTML(item,dg))});
      rows.appendChild(row);
    });
    box.appendChild(rows);
    return box;
  }

  /* ---------------- 各板块渲染 ---------------- */
  function renderOverview(){
    var grid=document.getElementById('sysgrid');
    grid.className='syslist';
    D.overviewCards.forEach(function(c){
      var core=c.core.replace(/^核心：/,'');
      grid.insertAdjacentHTML('beforeend',
        '<a class="srow" data-goto="'+c.href.slice(1)+'" style="--acc:'+c.acc+'">'+
        '<span class="pdot2" style="background:'+c.acc+'"></span>'+
        '<span class="sname">'+c.title+'</span>'+
        '<span class="score">核心：'+core+'</span>'+
        '<span class="sdesc">'+c.desc+'</span>'+
        '<span class="scnt">'+c.cnt+'</span></a>');
    });
  }

  function renderSystems(){
    var main=document.getElementById('sections');
    D.systems.forEach(function(sys){
      var sec=el('section','panel '+sys.secClass); sec.id=sys.secId;
      sec.insertAdjacentHTML('beforeend',
        '<h2 class="sec"><span class="no" style="background:'+sys.noBg+'">'+sys.letter+'</span>'+sys.title+
        '<span class="tag">'+sys.tag+'</span></h2><p class="secdesc">'+sys.desc+'</p>');
      var diagrams = sys.diagrams || [{rows:sys.rows, edges:sys.edges, color:sys.color, boxClass:sys.boxClass, core:sys.core}];
      diagrams.forEach(function(dg,i){
        if(dg.sub) sec.insertAdjacentHTML('beforeend',
          '<div class="subh"><span class="sq" style="background:'+(i? 'var(--f)':'var(--acc)')+'"></span>'+dg.sub+'</div><div class="subdesc">'+dg.subdesc+'</div>');
        var box=el('div','sysbox '+(dg.boxClass||''));
        box.appendChild(buildDiagram(dg,sys));
        sec.appendChild(box);
      });
      main.appendChild(sec);
    });
  }

  function renderCross(){
    var list=document.getElementById('crosslist');
    D.cross.forEach(function(c){
      list.insertAdjacentHTML('beforeend',
        '<div class="xr"><span class="pdot2" style="background:'+SYSCOLOR[c.fromSys]+'"></span>'+
        '<span class="xn">'+c.fromSys+' · '+c.from+'<small>'+c.fromSub+'</small></span>'+
        '<span class="xa">持股 '+c.p+' →</span>'+
        '<span class="pdot2" style="background:'+SYSCOLOR[c.toSys]+'"></span>'+
        '<span class="xn">'+c.to+'<small>'+c.toSub+'</small></span></div>');
    });
  }

  function renderPersons(){
    var grid=document.getElementById('pgrid');
    D.keyPersons.forEach(function(p){
      var card=el('div','pcard');
      card.insertAdjacentHTML('beforeend','<div class="pname">'+p.name+'</div><div class="prole">'+p.role+'</div>');
      p.items.forEach(function(it){
        card.insertAdjacentHTML('beforeend',
          '<div class="pi"><span class="pdot" style="background:'+SYSCOLOR[it[2]]+'"></span>'+it[0]+'<span class="po">'+it[1]+'</span></div>');
      });
      grid.appendChild(card);
    });
    document.getElementById('pnote').textContent=D.keyPersonsNote;
  }

  function renderTable(){
    var tb=document.querySelector('#tbl tbody');
    D.tableOrder.forEach(function(id,i){
      var c=D.companies[id];
      tb.insertAdjacentHTML('beforeend',
        '<tr data-key="'+id+'" data-nature="'+c.nature+'" data-sys="'+c.sys+'">'+
        '<td class="num">'+(i+1)+'</td><td class="nm">'+c.name+'</td>'+
        '<td><span class="syspill" style="background:'+SYSCOLOR[c.sys]+'">'+(c.sys==='X'?'其他':c.sys)+'</span></td>'+
        '<td>'+c.region+'</td><td class="mono">'+(c.code||'—')+'</td><td>'+c.legal+'</td>'+
        '<td>'+c.cap+'</td><td>'+(c.est||'—')+'</td><td>'+(c.tax||'—')+'</td><td>'+c.addr+'</td></tr>');
    });
    document.getElementById('qinfo').textContent='共 '+D.tableOrder.length+' 条';
  }

  /* ---------------- 连线绘制（总线式 + 避让 + 胶囊） ---------------- */
  function drawAll(){
    document.querySelectorAll('.diagram').forEach(function(box){
      var svg=box.querySelector('svg.edges'); if(!svg)return;
      var edges=[]; try{edges=JSON.parse(box.dataset.edges||'[]')}catch(e){}
      while(svg.firstChild)svg.removeChild(svg.firstChild);
      var br=box.getBoundingClientRect();
      svg.setAttribute('width',box.scrollWidth);
      svg.setAttribute('height',box.scrollHeight);
      svg.setAttribute('viewBox','0 0 '+box.scrollWidth+' '+box.scrollHeight);
      var col=COLORS[box.dataset.color||'blue']||COLORS.blue;

      function addPath(d,fid,tid,arrow){
        var p=document.createElementNS(NS,'path');
        p.setAttribute('d',d);p.setAttribute('fill','none');
        p.setAttribute('stroke',col);p.setAttribute('stroke-width','2');
        p.setAttribute('stroke-opacity','.75');
        if(arrow)p.setAttribute('marker-end','url(#mk-'+(box.dataset.color||'blue')+')');
        p.dataset.f=fid||'';p.dataset.t=tid||'';
        svg.appendChild(p);
      }

      /* 1) 每张被持股卡片顶部挂百分比胶囊 */
      box.querySelectorAll('.holdgrp').forEach(function(g){g.remove()});
      var holds=[];
      edges.forEach(function(e){
        var t=box.querySelector('#'+e.t);
        if(!t){holds.push(null);return}
        var grp=t.querySelector('.holdgrp');
        if(!grp){grp=document.createElement('div');grp.className='holdgrp';t.appendChild(grp)}
        var h=document.createElement('span');h.className='hold';h.textContent=e.p;
        h.dataset.f=e.f;h.dataset.t=e.t;
        grp.appendChild(h);holds.push(h);
      });

      /* 2) 总线式连线：同一股东的各条出资线共用一条干线 + 一条水平分配线 */
      var groups={},order=[];
      edges.forEach(function(e,i){
        if(!groups[e.f]){groups[e.f]=[];order.push(e.f)}
        groups[e.f].push(i);
      });
      order.forEach(function(fid){
        var list=groups[fid].filter(function(i){return holds[i]});
        if(!list.length)return;
        var f=box.querySelector('#'+fid); if(!f)return;
        var fr=f.getBoundingClientRect();
        var srcX=fr.left-br.left+fr.width/2, y1=fr.bottom-br.top+2;
        var txs=[],y2=0;
        list.forEach(function(i){
          var hr=holds[i].getBoundingClientRect();
          txs.push({x:hr.left-br.left+hr.width/2,i:i});
          y2=hr.top-br.top-1;
        });
        txs.sort(function(a,b){return a.x-b.x});
        var lo=Math.min(srcX,txs[0].x), hi=Math.max(srcX,txs[txs.length-1].x);
        var my=(y1+y2)/2;
        /* 水平段避让：压到同排中与水平区间相交的其他卡片底边之下，防止横线穿卡 */
        var row=f.closest('.row');
        if(row)row.querySelectorAll(':scope > .node').forEach(function(nd){
          if(nd===f)return;
          var nr=nd.getBoundingClientRect();
          var nl=nr.left-br.left, nri=nr.right-br.left;
          if(nri<lo-2||nl>hi+2)return;            /* 水平方向不相交 */
          if(nr.bottom-br.top<=y1)return;          /* 底边不低于源卡底，不会遮挡 */
          my=Math.max(my,nr.bottom-br.top+10);
        });
        my=Math.min(my,y2-4);                      /* 不越过胶囊顶部 */
        if(txs.length===1 && Math.abs(srcX-txs[0].x)<10){ /* 单线直连：对准胶囊中心 */
          addPath('M '+txs[0].x+' '+y1+' L '+txs[0].x+' '+y2, fid, edges[txs[0].i].t, true);
        }else{
          addPath('M '+srcX+' '+y1+' L '+srcX+' '+my, fid, '');
          addPath('M '+lo+' '+my+' L '+hi+' '+my, fid, '');
          txs.forEach(function(o){
            addPath('M '+o.x+' '+my+' L '+o.x+' '+y2, fid, edges[o.i].t, true);
          });
        }
      });
    });
  }

  /* ---------------- 悬停联动（高亮某股东的全部出资线） ---------------- */
  function highlight(box,fid,tid){
    box.classList.add('dim');
    box.querySelectorAll('svg.edges path').forEach(function(p){
      if(p.dataset.f!==fid)return;
      if(tid && p.dataset.t && p.dataset.t!==tid)return;
      p.classList.add('hl');
    });
  }
  function unhighlight(box){
    box.classList.remove('dim');
    box.querySelectorAll('svg.edges path.hl').forEach(function(p){p.classList.remove('hl')});
  }

  /* ---------------- 点击联动（高亮同一公司的全部出现位置） ---------------- */
  function bindClickLink(){
    var cur=null;
    document.addEventListener('click',function(ev){
      var node=ev.target.closest('.node');
      if(!node||!node.dataset.key){ clear(); return }
      var key=node.dataset.key;
      if(key===cur){ clear(); return }
      clear();
      cur=key;
      document.querySelectorAll('.node[data-key="'+key+'"]').forEach(function(n){n.classList.add('linked')});
      document.querySelectorAll('tr[data-key="'+key+'"]').forEach(function(tr){tr.classList.add('linked')});
    });
    function clear(){
      cur=null;
      document.querySelectorAll('.linked').forEach(function(n){n.classList.remove('linked')});
    }
  }

  /* ---------------- 速查表筛选（关键词 + 性质 + 体系） ---------------- */
  function bindFilter(){
    var q=document.getElementById('q'),fn=document.getElementById('fNature'),fs=document.getElementById('fSys'),
        info=document.getElementById('qinfo'),tbl=document.getElementById('tbl');
    function apply(){
      var kw=q.value.trim().toLowerCase(), nat=fn.value, sy=fs.value, n=0;
      tbl.querySelectorAll('tbody tr').forEach(function(tr){
        var ok=(!kw||tr.textContent.toLowerCase().indexOf(kw)>-1)
            &&(!nat||tr.dataset.nature===nat)
            &&(!sy||tr.dataset.sys===sy);
        tr.style.display=ok?'':'none'; if(ok)n++;
      });
      info.textContent='共 '+n+' 条';
    }
    [q,fn,fs].forEach(function(inp){inp.addEventListener('input',apply);inp.addEventListener('change',apply)});
  }

  /* ---------------- 导出 PNG / PDF ---------------- */
  var h2cLoading=false;
  function loadH2C(cb){
    if(window.html2canvas)return cb(true);
    if(h2cLoading)return;
    h2cLoading=true;
    var sc=document.createElement('script');
    sc.src='https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
    sc.onload=function(){cb(true)};sc.onerror=function(){cb(false)};
    document.head.appendChild(sc);
  }
  function snap(node,name,whole){
    loadH2C(function(ok){
      if(!ok){alert('导出 PNG 需联网加载组件，请检查网络后重试；或使用「导出 PDF」功能。');return}
      if(whole)document.body.classList.add('export-all');
      var target=whole?document.querySelector('.panels'):node;
      var done=function(){if(whole)document.body.classList.remove('export-all')};
      window.html2canvas(target,{scale:2,backgroundColor:'#f8fafc',useCORS:true}).then(function(cv){
        done();
        var a=document.createElement('a');
        a.download=name+'-'+D.updated+'.png';
        a.href=cv.toDataURL('image/png');
        a.click();
      }).catch(done);
    });
  }
  function bindExport(){
    document.getElementById('btnPng').addEventListener('click',function(){snap(null,'公司股权关系图谱',true)});
    document.getElementById('btnPdf').addEventListener('click',function(){window.print()});
    document.querySelectorAll('.sysbox').forEach(function(box,i){
      var b=el('button','exp','导出 PNG');
      b.addEventListener('click',function(ev){ev.stopPropagation();
        var sec=box.closest('section').querySelector('h2.sec').textContent.slice(0,12);
        snap(box,'体系图-'+sec);
      });
      box.appendChild(b);
    });
  }

  /* ---------------- 左右切换面板 ---------------- */
  var panelsBox=document.getElementById('panels');
  var panels=[];   /* 在 bindNav（渲染完成后）时收集，保证包含体系面板 */
  var navLinks=[].slice.call(document.querySelectorAll('#topnav a'));
  var cur=0;
  function applyNav(){
    navLinks.forEach(function(a){a.classList.toggle('on',a.dataset.goto===panels[cur].id)});
    document.getElementById('btnPrev').hidden = cur===0;
    document.getElementById('btnNext').hidden = cur===panels.length-1;
    document.getElementById('pager').textContent=(cur+1)+' / '+panels.length;
  }
  function goTo(i,instant){
    cur=Math.max(0,Math.min(panels.length-1,i));
    if(instant)panelsBox.style.transition='none';
    panelsBox.style.transform='translateX('+(-cur*100)+'%)';
    if(instant){panelsBox.offsetHeight;panelsBox.style.transition=''}
    panels[cur].scrollTop=0;
    applyNav();
    try{history.replaceState(null,'','#'+panels[cur].id)}catch(e){}
  }
  function bindNav(){
    panels=[].slice.call(document.querySelectorAll('.panel'));
    navLinks.forEach(function(a){
      a.addEventListener('click',function(ev){ev.preventDefault();goTo(panels.findIndex(function(p){return p.id===a.dataset.goto}))});
    });
    document.addEventListener('click',function(ev){
      var g=ev.target.closest('[data-goto]');
      if(g&&!g.dataset.key){goTo(panels.findIndex(function(p){return p.id===g.dataset.goto}))}
    });
    document.getElementById('btnPrev').addEventListener('click',function(){goTo(cur-1)});
    document.getElementById('btnNext').addEventListener('click',function(){goTo(cur+1)});
    document.addEventListener('keydown',function(ev){
      if(ev.key==='ArrowRight')goTo(cur+1);
      else if(ev.key==='ArrowLeft')goTo(cur-1);
    });
    /* 触摸左右滑动 */
    var tx=0,ty=0;
    document.addEventListener('touchstart',function(ev){tx=ev.touches[0].clientX;ty=ev.touches[0].clientY},{passive:true});
    document.addEventListener('touchend',function(ev){
      var dx=ev.changedTouches[0].clientX-tx, dy=ev.changedTouches[0].clientY-ty;
      if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)goTo(cur+(dx<0?1:-1));
    },{passive:true});
    /* 初始定位（支持 #hash 直达） */
    var h=(location.hash||'').slice(1);
    var init=panels.findIndex(function(p){return p.id===h});
    goTo(init>=0?init:0,true);
  }

  /* ---------------- 悬停绑定 + 启动 ---------------- */
  function bindHover(){
    document.querySelectorAll('.diagram').forEach(function(box){
      box.addEventListener('mouseover',function(ev){
        var h=ev.target.closest('.hold');
        if(h){highlight(box,h.dataset.f,h.dataset.t);return}
        var n=ev.target.closest('.node');
        if(n)highlight(box,n.id,null);
      });
      box.addEventListener('mouseout',function(){unhighlight(box)});
    });
  }

  function renderAll(){
    renderOverview();
    renderSystems();
    renderCross();
    renderPersons();
    renderTable();
    bindHover();
    bindClickLink();
    bindFilter();
    bindExport();
    bindNav();
  }

  function drawSafe(){try{drawAll()}catch(e){console.error(e)}}

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){renderAll();drawSafe()});
  }else{renderAll();drawSafe()}
  window.addEventListener('load',function(){drawSafe();setTimeout(drawSafe,250)});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(drawSafe);
  var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(drawSafe,150)});
})();
