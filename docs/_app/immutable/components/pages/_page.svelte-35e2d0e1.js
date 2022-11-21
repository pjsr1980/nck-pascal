import{S as ft,i as nt,s as at,k as w,q as C,a as g,l as k,m as F,r as S,h as d,c as L,n as v,b as U,G as h,I as M,J as D,K as W,B as rt,L as ot,M as ct,u as st}from"../../chunks/index-2b4179a2.js";function Z(a){return a+7>>3}const ht=[255,1,3,7,15,31,63,127];class G{constructor(r){this._nbits=r,this._data=new Uint8Array(Z(r))}clone(){let r=new G(this._nbits);return r._data=new Uint8Array(this._data),r}get nbits(){return this._nbits}get nbytes(){return Z(this._nbits)}setAll(r){r?this._data.fill(255):this._data.fill(0)}get(r){let s=!1;return r>=0&&r<this._nbits&&(s=(this._data[r>>3]&1<<(r&7))!=0),s}set(r,s){r>=0&&r<this._nbits&&(s?this._data[r>>3]|=1<<(r&7):this._data[r>>3]&=~(1<<(r&7)))}countTrue(){let r=0,s=0,l=this._nbits;for(;l>=8;){let e=this._data[s];for(let i=0;i<8;i++)e&1<<i&&r++;l-=8,s++}if(l>0){let e=this._data[s];for(let i=0;i<l;i++)e&1<<i&&r++}return r}countFalse(){return this._nbits-this.countTrue()}getTrue(){let r=[],s=0,l=this._nbits;for(;l>=8;){let e=this._data[s];for(let i=0;i<8;i++)e&1<<i&&r.push(s*8+i);l-=8,s++}if(l>0){let e=this._data[s];for(let i=0;i<l;i++)e&1<<i&&r.push(s*8+i)}return r}getFalse(){let r=[],s=0,l=this._nbits;for(;l>=8;){let e=this._data[s];for(let i=0;i<8;i++)e&1<<i||r.push(s*8+i);l-=8,s++}if(l>0){let e=this._data[s];for(let i=0;i<l;i++)e&1<<i||r.push(s*8+i)}return r}toString(){let r=[],s=0,l=this._nbits;for(;l>=8;){let e=this._data[s];for(let i=0;i<8;i++)e&1<<i?r.push("1"):r.push("0");l-=8,s++}if(l>0){let e=this._data[s];for(let i=0;i<l;i++)e&1<<i?r.push("1"):r.push("0")}return r.join("")}equal(r){if(this._nbits!=r._nbits)return!1;if(this._nbits==0)return!0;let s=Z(this._nbits)-1;for(let e=0;e<s;e++)if(this._data[e]!=r._data[e])return!1;let l=ht[this._nbits&7];return(this._data[s]&l)==(r._data[s]&l)}}class _t{constructor(r){this._n=0,this._buf=[],r&&this._bufferFill(r)}get N(){return this._n}set N(r){this._bufferFill(r)}nCk(r,s){return r>this._n||s>r||this._n<=0?0n:this._buf[this._bufferPos(r,s)]}reset(){this._n=0,this._buf=[]}map(r,s){return r*(r+1)+s}unmap(r){let s=Math.sqrt(4*r+1)-1>>1;return{n:s,k:r-(s+s*s)}}_bufferPos(r,s){let l=r>>1,e=r+1>>1;return s>l&&(s=r-s),(l*(l+1)+e*(e+1)>>1)+s}_bufferFill(r){if(r<=this._n)return;let s=this._n<2?2:this._n+1;for(this._bufferPos(r+1,0),this._n<2&&(this._buf[0]=1n,this._buf[1]=1n),this._n=r;s<=r;s++){let l=s>>1;this._buf[this._bufferPos(s,0)]=1n;for(let e=1;e<=l;e++)this._buf[this._bufferPos(s,e)]=this._buf[this._bufferPos(s-1,e-1)]+this._buf[this._bufferPos(s-1,e)]}}}function bt(a,r,s,l){if(r<0||s<0||s>r)return;let e={result:new G(r),tr:0,tc:0,rv:0,l1:!0};e.result.setAll(!1),l&&(e.pascal=l,l.N=r,e.row=1n);let i=new ut(r+1),f=!1,n=0,t=i.at(n);if(t.il=!0,t.st=0,t.tr=r,t.tc=s,t.rv=-1,s==0){a.onResult(e);return}for(;n>=0;)if(f)n-=1,f=!1;else if(t=i.at(n),t.il)if(t.st==0)t.tc==0||t.tr==0?f=!0:(t.st=1,t.tr-=1,t.tc-=1,t.rv+=1);else if(t.st==1){if(t.st=2,e.tr=t.tr,e.tc=t.tc,e.rv=t.rv,e.result.set(e.rv,!0),a.goTrue(e))if(t.tc==0)a.onResult(e);else{n++;let u=i.at(n);u.st=0,u.il=!0,u.rv=t.rv,u.tc=t.tc,u.tr=t.tr}}else if(t.st==2)if(t.st=3,e.result.set(t.rv,!1),t.tr>t.tc)if(e.tr=t.tr,e.tc=t.tc,e.rv=t.rv,a.goFalse(e)){l&&e.row&&(e.row+=l.nCk(t.tr,t.tc)),n++;let u=i.at(n);u.st=0,u.il=!1,u.rv=t.rv,u.tc=t.tc,u.tr=t.tr}else f=!0;else f=!0;else l&&e.row&&(e.row-=l.nCk(t.tr,t.tc)),f=!0;else if(t.st==0)t.tr==0?f=!0:(t.st=1,t.tr-=1,t.rv+=1);else if(t.st==1){if(t.st=2,e.tr=t.tr,e.tc=t.tc,e.rv=t.rv,e.result.set(e.rv,!0),a.goTrue(e))if(t.tc==0)a.onResult(e);else{n++;let u=i.at(n);u.st=0,u.il=!0,u.rv=t.rv,u.tc=t.tc,u.tr=t.tr}}else if(t.st==2)if(t.st=3,e.result.set(t.rv,!1),t.tr>t.tc)if(e.tr=t.tr,e.tc=t.tc,e.rv=t.rv,a.goFalse(e)){l&&e.row&&(e.row+=l.nCk(t.tr,t.tc)),n++;let u=i.at(n);u.st=0,u.il=!1,u.rv=t.rv,u.tc=t.tc,u.tr=t.tr}else f=!0;else f=!0;else l&&e.row&&(e.row-=l.nCk(t.tr,t.tc)),f=!0}function vt(a,r,s,l){if(r<0||s>r)return;let e={result:new G(r),tr:0,tc:0,rv:0,l1:!1};e.result.setAll(!0),l&&(e.pascal=l,l.N=r,e.row=1n);let i=new ut(r+1),f=!1,n=0,t=i.at(n);if(t.il=!1,t.st=0,t.tr=r,t.tc=s,t.rv=-1,r==s){a.onResult(e);return}for(;n>=0;)if(f)n-=1,f=!1;else if(t=i.at(n),t.il)if(t.st==0)t.tc==0||t.tr==0?f=!0:(t.st=1,t.tr-=1,t.tc-=1,t.rv+=1);else if(t.st==1){if(t.st=2,e.tr=t.tr,e.tc=t.tc,e.rv=t.rv,e.result.set(e.rv,!1),a.goFalse(e))if(t.tc==t.tr)a.onResult(e);else{n++;let u=i.at(n);u.st=0,u.il=!1,u.rv=t.rv,u.tc=t.tc,u.tr=t.tr}}else if(t.st==2)if(t.st=3,e.result.set(t.rv,!0),t.tr>=t.tc)if(e.tr=t.tr,e.tc=t.tc,e.rv=t.rv,a.goTrue(e)){l&&e.row&&(e.row+=l.nCk(t.tr,t.tc)),n++;let u=i.at(n);u.st=0,u.il=!0,u.rv=t.rv,u.tc=t.tc,u.tr=t.tr}else f=!0;else f=!0;else l&&e.row&&(e.row-=l.nCk(t.tr,t.tc)),f=!0;else if(t.st==0)t.tr==0?f=!0:(t.st=1,t.tr-=1,t.rv+=1);else if(t.st==1){if(t.st=2,e.tr=t.tr,e.tc=t.tc,e.rv=t.rv,e.result.set(e.rv,!1),a.goFalse(e))if(t.tc==t.tr)a.onResult(e);else{n++;let u=i.at(n);u.st=0,u.il=!1,u.rv=t.rv,u.tc=t.tc,u.tr=t.tr}}else if(t.st==2)if(t.st=3,e.result.set(t.rv,!0),t.tr>=t.tc)if(e.tr=t.tr,e.tc=t.tc,e.rv=t.rv,a.goTrue(e)){l&&e.row&&(e.row+=l.nCk(t.tr,t.tc)),n++;let u=i.at(n);u.st=0,u.il=!0,u.rv=t.rv,u.tc=t.tc,u.tr=t.tr}else f=!0;else f=!0;else l&&e.row&&(e.row-=l.nCk(t.tr,t.tc)),f=!0}const x=6;class ut{constructor(r){let s=r>>x,l=r-s*(1<<x);this._n=r,this._cnt=l>0?s+1:s,this._stk=new Array(this._cnt);let e=this._cnt-1;for(let i=0;i<e;i++){this._stk[i]=new Array(1<<x);for(let f=0;f<1<<x;f++)this._stk[i][f]={st:0,il:!1,rv:0,tr:0,tc:0}}this._stk[e]=new Array(l>0?l:1<<x);for(let i=0;i<this._stk[e].length;i++)this._stk[e][i]={st:0,il:!1,rv:0,tr:0,tc:0}}at(r){let s=r>>x,l=r-s*(1<<x);return this._stk[s][l]}}function lt(a,r,s){const l=a.slice();return l[13]=r[s],l}function it(a){let r,s,l=a[13].row+"",e,i,f=a[13].value+"",n,t;return{c(){r=w("li"),s=w("span"),e=C(l),i=g(),n=C(f),t=g(),this.h()},l(u){r=k(u,"LI",{});var _=F(r);s=k(_,"SPAN",{class:!0});var N=F(s);e=S(N,l),N.forEach(d),i=L(_),n=S(_,f),t=L(_),_.forEach(d),this.h()},h(){v(s,"class","row svelte-c5fcxd")},m(u,_){U(u,r,_),h(r,s),h(s,e),h(r,i),h(r,n),h(r,t)},p(u,_){_&1&&l!==(l=u[13].row+"")&&st(e,l),_&1&&f!==(f=u[13].value+"")&&st(n,f)},d(u){u&&d(r)}}}function dt(a){let r,s,l,e,i,f,n,t,u,_,N,I,p,B,y,q,T,A,H,K,J,j,E,P,O,z,R=a[0],b=[];for(let o=0;o<R.length;o+=1)b[o]=it(lt(a,R,o));return{c(){r=w("h1"),s=C("Welcome nck-pascal test"),l=g(),e=w("div"),i=w("label"),f=C("N"),n=g(),t=w("input"),u=g(),_=w("label"),N=C("K"),I=g(),p=w("input"),B=g(),y=w("label"),q=C("L1"),T=g(),A=w("input"),H=g(),K=w("button"),J=C("Calculate"),j=g(),E=w("div"),P=w("ul");for(let o=0;o<b.length;o+=1)b[o].c();this.h()},l(o){r=k(o,"H1",{});var m=F(r);s=S(m,"Welcome nck-pascal test"),m.forEach(d),l=L(o),e=k(o,"DIV",{});var c=F(e);i=k(c,"LABEL",{for:!0});var V=F(i);f=S(V,"N"),V.forEach(d),n=L(c),t=k(c,"INPUT",{type:!0,min:!0,max:!0,id:!0}),u=L(c),_=k(c,"LABEL",{for:!0});var Q=F(_);N=S(Q,"K"),Q.forEach(d),I=L(c),p=k(c,"INPUT",{type:!0,min:!0,max:!0,id:!0}),B=L(c),y=k(c,"LABEL",{for:!0});var Y=F(y);q=S(Y,"L1"),Y.forEach(d),T=L(c),A=k(c,"INPUT",{type:!0,id:!0}),H=L(c),K=k(c,"BUTTON",{});var $=F(K);J=S($,"Calculate"),$.forEach(d),c.forEach(d),j=L(o),E=k(o,"DIV",{class:!0});var tt=F(E);P=k(tt,"UL",{class:!0});var et=F(P);for(let X=0;X<b.length;X+=1)b[X].l(et);et.forEach(d),tt.forEach(d),this.h()},h(){v(i,"for","N"),v(t,"type","number"),v(t,"min","0"),v(t,"max","100"),v(t,"id","N"),v(_,"for","K"),v(p,"type","number"),v(p,"min","0"),v(p,"max","100"),v(p,"id","K"),v(y,"for","L1"),v(A,"type","checkbox"),v(A,"id","L1"),v(P,"class","svelte-c5fcxd"),v(E,"class","result svelte-c5fcxd")},m(o,m){U(o,r,m),h(r,s),U(o,l,m),U(o,e,m),h(e,i),h(i,f),h(e,n),h(e,t),M(t,a[1]),h(e,u),h(e,_),h(_,N),h(e,I),h(e,p),M(p,a[2]),h(e,B),h(e,y),h(y,q),h(e,T),h(e,A),A.checked=a[3],h(e,H),h(e,K),h(K,J),U(o,j,m),U(o,E,m),h(E,P);for(let c=0;c<b.length;c+=1)b[c].m(P,null);O||(z=[D(t,"input",a[5]),D(p,"input",a[6]),D(A,"change",a[7]),D(K,"click",a[4])],O=!0)},p(o,[m]){if(m&2&&W(t.value)!==o[1]&&M(t,o[1]),m&4&&W(p.value)!==o[2]&&M(p,o[2]),m&8&&(A.checked=o[3]),m&1){R=o[0];let c;for(c=0;c<R.length;c+=1){const V=lt(o,R,c);b[c]?b[c].p(V,m):(b[c]=it(V),b[c].c(),b[c].m(P,null))}for(;c<b.length;c+=1)b[c].d(1);b.length=R.length}},i:rt,o:rt,d(o){o&&d(r),o&&d(l),o&&d(e),o&&d(j),o&&d(E),ot(b,o),O=!1,ct(z)}}}function mt(a,r,s){let l=[],e="6",i="2",f=!0,n=!1,t=!0;class u{constructor(){}onResult(T){T.row&&l.push({row:T.row,value:T.result.toString()})}goFalse(T){return!n}goTrue(T){return!n}}const _=new _t,N=new u;async function I(){if(!n){if(!t)for(n=!0;!t;)setTimeout(()=>{},1e3);n=!1,s(0,l=[]),t=!1,f?bt(N,+e,+i,_):vt(N,+e,+i,_),t=!0}}I();function p(){e=W(this.value),s(1,e)}function B(){i=W(this.value),s(2,i)}function y(){f=this.checked,s(3,f)}return[l,e,i,f,I,p,B,y]}class wt extends ft{constructor(r){super(),nt(this,r,mt,dt,at,{})}}export{wt as default};