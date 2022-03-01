(function(){"use strict";var e={4013:function(e,t,n){n(6992),n(8674),n(9601),n(7727);var r=n(144),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("div",{staticClass:"px-xl-16 pt-10",attrs:{id:"bg"}},[r("v-app-bar",{attrs:{elevation:"1",fixed:"",src:n(8373),height:"110"}},[r("router-link",{staticClass:"logo mt-6 hidden-xs",attrs:{to:"/"}},[r("v-img",{attrs:{src:n(9574),alt:"logo",contain:""}})],1),r("v-dialog",{attrs:{"close-on-content-click":!1,"max-width":"30vh"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,o=t.attrs;return[r("v-tabs",{staticClass:"mt-6",attrs:{right:"","hide-slider":"",dark:"",height:"80","active-class":"fontColor"}},[r("v-tabs-slider"),r("v-tab",{staticClass:"px-md-6",attrs:{to:"/"}},[r("h2",[e._v("商品")])]),r("v-tab",{staticClass:"px-md-6",attrs:{to:"/grouppage",disabled:""}},[r("h2",[e._v("團體募集")])]),r("v-tab",e._g(e._b({directives:[{name:"show",rawName:"v-show",value:!e.user.isLogin,expression:"!user.isLogin"}],staticClass:"px-md-6 none"},"v-tab",o,!1),n),[r("h2",[e._v("會員登入")])]),e.user.isLogin?r("v-menu",{attrs:{bottom:"","offset-y":"","open-on-hover":"","close-on-click":!0,"close-on-content-click":!0,transition:"fade-transition"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,o=t.attrs;return[r("v-tab",e._g(e._b({staticClass:"px-md-6",attrs:{to:"/memberpage"}},"v-tab",o,!1),n),[r("h2",[e._v("會員專區")])])]}}],null,!0)},[r("v-list",{staticClass:"text-center py-0"},[r("v-list-item-group",e._l(e.lists,(function(t,n){return r("span",{key:n},[r("v-list-item",3==n?{staticClass:"red--text",on:{click:e.logout}}:{staticClass:"orange--text text--darken-2",attrs:{to:e.lists[n].url}},[r("v-list-item-title",[e._v(e._s(e.lists[n].name))])],1),2==n?r("v-divider"):e._e()],1)})),0)],1)],1):e._e(),r("v-tab",{staticClass:"px-md-6",attrs:{to:"/about"}},[r("h2",[e._v("關於我們")])])],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[r("v-card",{staticClass:"pa-8 text-center"},[r("h2",{directives:[{name:"show",rawName:"v-show",value:e.logining,expression:"logining"}],staticClass:"animate__animated animate__fadeIn animate__fast"},[e._v(" 會員登入 ")]),r("h2",{directives:[{name:"show",rawName:"v-show",value:!e.logining,expression:"!logining"}],staticClass:"animate__animated animate__fadeIn animate__fast"},[e._v(" 會員註冊 ")]),r("v-form",{directives:[{name:"show",rawName:"v-show",value:e.logining,expression:"logining"}],ref:"form",staticClass:"animate__animated animate__fadeIn animate__fast",attrs:{"lazy-validation":""},on:{submit:function(t){return t.preventDefault(),e.login.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-text-field",{attrs:{counter:20,rules:e.accountRules,label:"帳號",required:""},model:{value:e.form.account,callback:function(t){e.$set(e.form,"account",t)},expression:"form.account"}}),r("v-text-field",{attrs:{rules:e.passwordRules,label:"密碼",required:"","append-icon":e.show?"mdi-eye":"mdi-eye-off",type:e.show?"text":"password",counter:""},on:{"click:append":function(t){e.show=!e.show}},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}}),r("v-btn",{staticClass:"ma-4",attrs:{disabled:!e.valid,outlined:"",rounded:"",color:"orange",type:"submit"},on:{click:function(t){e.accountvalidate,e.dialog=!1}}},[e._v(" 登入 ")]),r("br"),r("v-btn",{attrs:{text:"",color:"error"},on:{click:function(t){e.logining=!1}}},[e._v(" 還沒有帳號? 立即註冊 ")])],1),r("v-form",{directives:[{name:"show",rawName:"v-show",value:!e.logining,expression:"!logining"}],ref:"form2",staticClass:"animate__animated animate__fadeIn animate__fast",attrs:{"lazy-validation":""},on:{submit:function(t){return t.preventDefault(),e.register.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-text-field",{attrs:{counter:20,rules:e.accountRules,label:"帳號",required:""},model:{value:e.form2.account,callback:function(t){e.$set(e.form2,"account",t)},expression:"form2.account"}}),r("v-text-field",{attrs:{rules:e.passwordRules,label:"密碼",required:"","append-icon":e.show?"mdi-eye":"mdi-eye-off",type:e.show?"text":"password",counter:""},on:{"click:append":function(t){e.show=!e.show}},model:{value:e.form2.password,callback:function(t){e.$set(e.form2,"password",t)},expression:"form2.password"}}),r("v-btn",{staticClass:"ma-4",attrs:{disabled:!e.valid,outlined:"",rounded:"",color:"orange",type:"submit"},on:{click:e.accountvalidate2}},[e._v(" 註冊 ")]),r("br"),r("v-btn",{attrs:{text:"",color:"error"},on:{click:function(t){e.logining=!0}}},[e._v(" 已有帳號? 立即登入 ")])],1)],1)],1),r("v-spacer"),r("VueToggles",{staticClass:"right ml-md-8 ml-sm-2 pr-12",attrs:{value:e.isToggled,width:"50","checked-text":" 🌛 ","unchecked-text":" 🌞 ",checkedBg:"blue",uncheckedBg:"white"},on:{click:e.turnOn}})],1),[r("div",{staticClass:"text-center"},[r("v-snackbar",{staticClass:"mt-16",attrs:{top:"",color:e.sColor,"multi-line":"",timeout:"1500",transition:"scale-transition"},scopedSlots:e._u([{key:"action",fn:function(t){var n=t.attrs;return[r("v-btn",e._b({attrs:{color:"blue lighten-5",text:""},on:{click:function(t){e.snackbar=!1}}},"v-btn",n,!1),[e._v(" Close ")])]}}]),model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[r("h3",{staticClass:"ml-4"},[e._v(e._s(e.sText))])]),r("v-snackbar",{staticClass:"mt-16",attrs:{top:"",color:"red","multi-line":"",timeout:"1500",transition:"scale-transition"},scopedSlots:e._u([{key:"action",fn:function(t){var n=t.attrs;return[r("v-btn",e._b({attrs:{color:"blue lighten-5",text:""},on:{click:function(t){e.snackbar3=!1}}},"v-btn",n,!1),[e._v(" Close ")])]}}]),model:{value:e.snackbar3,callback:function(t){e.snackbar3=t},expression:"snackbar3"}},[r("h3",{staticClass:"ml-4"},[e._v("已登出")])])],1)],[r("div",{staticClass:"text-center"},[r("v-snackbar",{staticClass:"mt-16",attrs:{top:"",color:e.reColor,"multi-line":"",timeout:"1500",transition:"scale-transition"},scopedSlots:e._u([{key:"action",fn:function(t){var n=t.attrs;return[r("v-btn",e._b({attrs:{color:"blue lighten-5",text:""},on:{click:function(t){e.snackbar2=!1}}},"v-btn",n,!1),[e._v(" Close ")])]}}]),model:{value:e.snackbar2,callback:function(t){e.snackbar2=t},expression:"snackbar2"}},[r("h3",{staticClass:"ml-4"},[e._v(e._s(e.reText))])])],1)],r("v-main",{staticClass:"mt-8"},[r("router-view")],1)],2),r("v-footer",{attrs:{padless:"",color:"transparent"}},[r("v-col",{staticClass:"text-center footer",attrs:{cols:"12"}},[e._v(" Copyright © "+e._s((new Date).getFullYear())+" "),r("strong",[e._v("Swapper")]),e._v(". All rights reserved. 版權所有© "+e._s((new Date).getFullYear())+" "),r("strong",[e._v("Swapper")])])],1)],1)},a=[],s=n(6198),i=(n(5666),{name:"App",data:function(){return{valid:!0,form:{account:"",password:""},form2:{account:"",password:""},accountRules:[function(e){return!!e||"請輸入帳號"},function(e){return e&&e.length<=10||"帳號需介於4~20個字元之間"},function(e){return e&&e.length>=4||"帳號需介於4~20個字元之間"}],passwordRules:[function(e){return!!e||"請輸入密碼"}],isToggled:!1,logining:!0,lists:[{name:"商品刊登",url:"/memberpage/memberpost"},{name:"上架商品編輯",url:"/memberpage/postedit"},{name:"訊息",url:"/memberpage/membermessage"},{name:"會員登出"}],show:!1,snackbar:!1,snackbar2:!1,snackbar3:!1,reText:"",reColor:"",dialog:!1,state:""}},methods:{accountvalidate:function(){this.$refs.form.validate()},accountvalidate2:function(){this.$refs.form2.validate()},turnOn:function(){this.isToggled=!this.isToggled,!0===this.isToggled?this.$vuetify.theme.dark=!0:this.$vuetify.theme.dark=!1},register:function(){var e=this;return(0,s.Z)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=e.$refs.form2.validate(),n){t.next=3;break}return t.abrupt("return");case 3:return t.prev=3,t.next=6,e.api.post("/users",e.form2);case 6:e.reText="註冊成功",e.reColor="success",e.snackbar2=!0,e.logining=!0,t.next=17;break;case 12:t.prev=12,t.t0=t["catch"](3),e.reText="帳號重複",e.reColor="red",e.snackbar2=!0;case 17:case"end":return t.stop()}}),t,null,[[3,12]])})))()},login:function(){this.$store.dispatch("login",this.form),this.snackbar=!0},logout:function(){this.$store.dispatch("logout"),this.snackbar3=!0}},computed:{user:function(){return this.$store.getters.user},sColor:function(){return this.$store.state.sColor},sText:function(){return this.$store.state.sText}},created:function(){var e=this;return(0,s.Z)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$store.dispatch("getInfo");case 1:case"end":return t.stop()}}),t)})))()}}),c=i,u=n(1001),l=n(3453),d=n.n(l),p=n(303),f=n(1466),m=n(6847),v=n(2026),g=n(7024),h=n(9497),b=n(5596),k=n(7718),x=n(3240),w=n(5288),_=n(893),C=n(907),Z=n(3080),y=n(8218),I=n(4021),V=n(5842),T=n(4654),S=n(2515),R=n(756),L=n(1469),N=n(7731),E=n(4980),O=(0,u.Z)(c,o,a,!1,null,"c48105a0",null),P=O.exports;d()(O,{VApp:p.Z,VAppBar:f.Z,VBtn:m.Z,VCard:v.Z,VCol:g.Z,VDialog:h.Z,VDivider:b.Z,VFooter:k.Z,VForm:x.Z,VImg:w.Z,VList:_.Z,VListItem:C.Z,VListItemGroup:Z.Z,VListItemTitle:y.V9,VMain:I.Z,VMenu:V.Z,VSnackbar:T.Z,VSpacer:S.Z,VTab:R.Z,VTabs:L.Z,VTabsSlider:N.Z,VTextField:E.Z});var $=n(5205);(0,$.z)("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var j=n(8816),A=n(615),M=n(5121);r.Z.use(M.Z);var B=new M.Z({}),F=n(4268),D=(n(4408),n(6106));r.Z.component("VueToggles",F.Z),r.Z.component("ImgInputer",D.Z),r.Z.config.productionTip=!1,new r.Z({router:j.Z,store:A.Z,vuetify:B,render:function(e){return e(P)}}).$mount("#app")},4408:function(e,t,n){n.d(t,{h:function(){return u}});n(1539),n(6699),n(2023);var r=n(144),o=n(9669),a=n.n(o),s=n(2346),i=n(615),c=n(8816),u=a().create({baseURL:"https://sodfnfnccccc.herokuapp.com/"});u.interceptors.response.use((function(e){return e}),(function(e){if(e.response){if(401===e.response.status&&"/users/extend"!==e.config.url){var t=e.config;return u.post("/users/extend",{},{headers:{authorization:"Bearer "+i.Z.state.token}}).then((function(e){var n=e.data;return i.Z.commit("extend",n.result.token),t.headers.authorization="Bearer "+i.Z.state.token,a()(t)})).catch((function(e){return i.Z.commit("logout"),c.Z.push("/"),Promise.reject(e)}))}}else"ECONNABORTED"===e.code&&e.message.includes("timeout")?alert("連線逾時"):alert("網路不穩定");return Promise.reject(e)})),r.Z.use(s.Z,{axios:a(),api:u})},8816:function(e,t,n){n.d(t,{Z:function(){return L}});n(1539),n(8783),n(3948);var r=n(144),o=n(4903),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("v-row",{staticClass:"mt-12 mx-8 pt-sm-8 pt-md-0",attrs:{justify:"center"}},[n("v-col",{attrs:{cols:3}},[n("v-text-field",{staticClass:"mb-2",attrs:{label:"搜尋商品名稱",color:"pink"},model:{value:e.searchtext,callback:function(t){e.searchtext=t},expression:"searchtext"}})],1),n("v-col",{staticClass:"pa-0 colHeight",attrs:{cols:"12"}},[n("v-row",[n("v-col",{attrs:{cols:2}},[[n("v-card",{staticClass:"ml-lg-16",attrs:{"max-width":"120"}},[n("v-list",{staticClass:"text-center pa-0",attrs:{nav:"",flat:""}},[n("v-list-item-group",{attrs:{mandatory:""}},e._l(e.items,(function(t,r){return n("div",{key:t[r]},[n("v-list-item",{staticClass:"mb-0",attrs:{color:"pink","active-class":"select"},on:{click:function(n){return e.type(t)}}},[n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:e._s(t)}})],1)],1),"衣鞋包錶"!=t?n("v-divider"):e._e()],1)})),0)],1)],1)]],2),n("v-col",[n("v-row",[n("v-col",{attrs:{cols:12}},[n("v-row",{staticClass:"px-lg-16"},e._l(e.search,(function(t){return n("v-col",{key:t.name,attrs:{lg:3}},[[n("v-card",{staticClass:"overflow-hidden mx-sm-auto",attrs:{"max-width":"250",height:"280",hover:""},on:{click:function(n){return e.into(t)}}},[n("template",{slot:"progress"},[n("v-progress-linear",{attrs:{color:"deep-purple",height:"10",indeterminate:""}})],1),n("v-img",{attrs:{height:"185",src:t.image}}),n("v-card-title",{staticClass:"py-1 font-weight-bold"},[e._v(e._s(t.name))]),n("v-card-text",[e._v(e._s(t.introTitle))])],2)]],2)})),1)],1)],1)],1)],1)],1),n("v-col",{staticClass:"mt-sm-4",attrs:{cols:"12"}},[n("div",{staticClass:"mt-md-6 mt-sm-12 mb-sm-8 mb-md-0"},[n("v-pagination",{attrs:{length:e.productQ,color:"pink"},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}})],1)])],1)],1)},s=[],i=n(6198),c=(n(5666),n(4916),n(4765),n(7327),n(6699),n(2023),n(8309),{name:"HomeView",data:function(){return{items:["全部","電腦","通訊","數位","家電","日用","生活","運動戶外","美妝","衣鞋包錶"],searchtext:"",productQ:1,productP:[],page:1,products:[]}},methods:{type:function(e){var t=this;return(0,i.Z)(regeneratorRuntime.mark((function n(){var r,o,a,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("全部"!==e){n.next=15;break}return n.prev=1,n.next=4,t.api.get("/showProducts");case 4:r=n.sent,o=r.data,t.products=o.result,n.next=12;break;case 9:n.prev=9,n.t0=n["catch"](1),alert("網路錯誤");case 12:t.products.length>8?t.productQ=Math.floor(t.search.length/8)+1:t.productQ=1,n.next=27;break;case 15:return n.prev=15,n.next=18,t.api.get("/showProducts/"+e);case 18:a=n.sent,s=a.data,t.products=s.result,n.next=26;break;case 23:n.prev=23,n.t1=n["catch"](15),alert("網路錯誤");case 26:t.products.length>8?t.productQ=Math.floor(t.search.length/8)+1:t.productQ=1;case 27:case"end":return n.stop()}}),n,null,[[1,9],[15,23]])})))()},into:function(e){this.$store.commit("into",e)}},created:function(){var e=this;return(0,i.Z)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.api.get("/showProducts");case 3:n=t.sent,r=n.data,e.products=r.result,t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),alert("網路錯誤");case 11:e.products.length>8?e.productQ=Math.floor(e.search.length/8)+1:e.productQ=1;case 12:case"end":return t.stop()}}),t,null,[[0,8]])})))()},computed:{search:function(){var e=this,t=this.products.filter((function(t){if(t.name.toLowerCase().includes(e.searchtext.toLowerCase()))return!0}));return t.filter((function(n,r){return t.length<8||(t.length>=8&&r>=8*(e.page-1)&&r<8*(e.page-1)+8||void 0)}))}},watch:{search:function(e,t){(""!==this.searchtext||e>t&&""===this.searchtext)&&(this.products.length>8?this.productQ=Math.floor(this.search.length/8)+1:this.productQ=1)},searchtext:function(){this.page=1}}}),u=c,l=n(1001),d=n(3453),p=n.n(d),f=n(2026),m=n(5255),v=n(7024),g=n(5596),h=n(5288),b=n(893),k=n(907),x=n(8218),w=n(3080),_=n(2791),C=n(510),Z=n(7894),y=n(4980),I=(0,l.Z)(u,a,s,!1,null,null,null),V=I.exports;p()(I,{VCard:f.Z,VCardText:m.ZB,VCardTitle:m.EB,VCol:v.Z,VDivider:g.Z,VImg:h.Z,VList:b.Z,VListItem:k.Z,VListItemContent:x.km,VListItemGroup:w.Z,VListItemTitle:x.V9,VPagination:_.Z,VProgressLinear:C.Z,VRow:Z.Z,VTextField:y.Z});var T=n(615);r.Z.use(o.Z);var S=[{path:"/",name:"home",component:V,meta:{title:"Swapper"}},{path:"/about",name:"about",component:function(){return n.e(443).then(n.bind(n,2237))},meta:{title:"關於我們 | Swapper"}},{path:"/grouppage",name:"grouppage",component:function(){return n.e(318).then(n.bind(n,8124))},meta:{title:"團體募集 | Swapper"}},{path:"/memberpage",component:function(){return n.e(490).then(n.bind(n,9109))},children:[{path:"",name:"memberpage",component:function(){return n.e(490).then(n.bind(n,4112))},meta:{title:"會員專區 | Swapper",login:!0}},{path:"memberpost",name:"memberpost",component:function(){return n.e(490).then(n.bind(n,5277))},meta:{title:"商品刊登 | Swapper",login:!0}},{path:"postedit",name:"postedit",component:function(){return n.e(490).then(n.bind(n,2853))},meta:{title:"商品管理 | Swapper",login:!0}},{path:"membermessage",name:"membermessage",component:function(){return n.e(490).then(n.bind(n,3894))},meta:{title:"訊息 | Swapper",login:!0}}]},{path:"/productpage",name:"productpage",component:function(){return n.e(233).then(n.bind(n,2864))},meta:{title:"商品頁 | Swapper"}}],R=new o.Z({routes:S});R.beforeEach((function(e,t,n){var r=T.Z.getters.user;e.meta.login&&!r.isLogin?n("/"):n()})),R.afterEach((function(e){document.title=e.meta.title}));var L=R},615:function(e,t,n){var r=n(6198),o=n(3019),a=(n(5666),n(144)),s=n(629),i=n(4408),c=n(4702),u=n(8816);a.Z.use(s.ZP),t["Z"]=new s.ZP.Store({state:{userId:"",token:"",account:"",role:0,userInfo:{userName:"",aboutMe:"",image:""},userImg:"",sColor:"",sText:"",uploadText:"上傳成功，請稍後．．．",product:{},chatid:""},getters:{user:function(e){return(0,o.Z)({isLogin:e.token.length>0,isAdmin:1===e.role},e)}},mutations:{login:function(e,t){e.userId=t._id,e.token=t.token,e.account=t.account,e.role=t.role,e.userInfo.userName=t.userName,e.userInfo.aboutMe=t.aboutMe,e.userImg=t.image},logout:function(e){e.userId="",e.token="",e.account="",e.role=0,e.userInfo.userName="",e.userInfo.aboutMe="",e.userImg=""},getInfo:function(e,t){e.userId=t._id,e.account=t.account,e.role=t.role,e.userInfo.userName=t.userName,e.userInfo.aboutMe=t.aboutMe,e.userImg=t.image},extend:function(e,t){e.token=t},uploadimg:function(e,t){e.userInfo.image=t.image},into:function(e,t){e.product=t,u.Z.push("/productpage")}},actions:{login:function(e,t){return(0,r.Z)(regeneratorRuntime.mark((function n(){var r,o,a,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.commit,o=e.state,n.prev=1,n.next=4,i.h.post("/users/login",t);case 4:a=n.sent,s=a.data,r("login",s.result),o.sColor="success",o.sText="登入成功",n.next=15;break;case 11:n.prev=11,n.t0=n["catch"](1),o.sColor="red",o.sText="帳號或密碼錯誤";case 15:case"end":return n.stop()}}),n,null,[[1,11]])})))()},updateInfo:function(e,t){var n=this;return(0,r.Z)(regeneratorRuntime.mark((function r(){var a,s,c,u,l;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:for(c in a=e.state,n.commit("uploadimg",t),s=new FormData,a.userInfo)"_id"!==c&&s.append(c,a.userInfo[c]);return r.prev=4,r.next=7,i.h.patch("/users/"+a.userId,s,{headers:{authorization:"Bearer "+a.token}});case 7:u=r.sent,l=u.data,a.userInfo[a.userInfo.index]=(0,o.Z)((0,o.Z)({},a.userInfo),{},{image:l.result.image}),location.reload(),r.next=16;break;case 13:r.prev=13,r.t0=r["catch"](4),console.log(r.t0);case 16:case"end":return r.stop()}}),r,null,[[4,13]])})))()},logout:function(e){return(0,r.Z)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,r=e.state,t.prev=1,t.next=4,i.h["delete"]("/users/logout",{headers:{authorization:"Bearer "+r.token}});case 4:n("logout"),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](1),t.t0;case 10:case"end":return t.stop()}}),t,null,[[1,7]])})))()},getInfo:function(e){return(0,r.Z)(regeneratorRuntime.mark((function t(){var n,r,o,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=e.commit,r=e.state,0!==r.token.length){t.next=3;break}return t.abrupt("return");case 3:return t.prev=3,t.next=6,i.h.get("/users/me",{headers:{authorization:"Bearer "+r.token}});case 6:o=t.sent,a=o.data,n("getInfo",a.result),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](3),n("logout");case 14:case"end":return t.stop()}}),t,null,[[3,11]])})))()}},modules:{},plugins:[(0,c.Z)({key:"user",paths:["token"]})]})},8373:function(e,t,n){e.exports=n.p+"img/bar.a8381ded.svg"},9574:function(e,t,n){e.exports=n.p+"img/logo.f92da142.svg"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={id:r,loaded:!1,exports:{}};return e[r](a,a.exports,n),a.loaded=!0,a.exports}n.m=e,function(){n.amdO={}}(),function(){var e=[];n.O=function(t,r,o,a){if(!r){var s=1/0;for(l=0;l<e.length;l++){r=e[l][0],o=e[l][1],a=e[l][2];for(var i=!0,c=0;c<r.length;c++)(!1&a||s>=a)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(i=!1,a<s&&(s=a));if(i){e.splice(l--,1);var u=o();void 0!==u&&(t=u)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[r,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+{233:"productpage",318:"grouppage",443:"about",490:"memberpage"}[e]+"-legacy."+{233:"86db47bb",318:"361dfe4e",443:"65e30619",490:"1c924fff"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+{233:"productpage",490:"memberpage"}[e]+"."+{233:"4780d8ac",490:"890fbc22"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.hmd=function(e){return e=Object.create(e),e.children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e}}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="final_front:";n.l=function(r,o,a,s){if(e[r])e[r].push(o);else{var i,c;if(void 0!==a)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var d=u[l];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==t+a){i=d;break}}i||(c=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,n.nc&&i.setAttribute("nonce",n.nc),i.setAttribute("data-webpack",t+a),i.src=r),e[r]=[o];var p=function(t,n){i.onerror=i.onload=null,clearTimeout(f);var o=e[r];if(delete e[r],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((function(e){return e(n)})),t)return t(n)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=p.bind(null,i.onerror),i.onload=p.bind(null,i.onload),c&&document.head.appendChild(i)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p=""}(),function(){var e=function(e,t,n,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var a=function(a){if(o.onerror=o.onload=null,"load"===a.type)n();else{var s=a&&("load"===a.type?"missing":a.type),i=a&&a.target&&a.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=s,c.request=i,o.parentNode.removeChild(o),r(c)}};return o.onerror=o.onload=a,o.href=t,document.head.appendChild(o),o},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===t))return o}var s=document.getElementsByTagName("style");for(r=0;r<s.length;r++){o=s[r],a=o.getAttribute("data-href");if(a===e||a===t)return o}},r=function(r){return new Promise((function(o,a){var s=n.miniCssF(r),i=n.p+s;if(t(s,i))return o();e(r,i,o,a)}))},o={143:0};n.f.miniCss=function(e,t){var n={233:1,490:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=a);var s=n.p+n.u(t),i=new Error,c=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=r&&("load"===r.type?"missing":r.type),s=r&&r.target&&r.target.src;i.message="Loading chunk "+t+" failed.\n("+a+": "+s+")",i.name="ChunkLoadError",i.type=a,i.request=s,o[1](i)}};n.l(s,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,a,s=r[0],i=r[1],c=r[2],u=0;if(s.some((function(t){return 0!==e[t]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(c)var l=c(n)}for(t&&t(r);u<s.length;u++)a=s[u],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(l)},r=self["webpackChunkfinal_front"]=self["webpackChunkfinal_front"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(4013)}));r=n.O(r)})();
//# sourceMappingURL=app-legacy.363a9035.js.map