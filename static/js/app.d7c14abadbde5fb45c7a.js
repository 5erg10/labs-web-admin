webpackJsonp([10],{"2NDV":function(t,e){t.exports={firebase:{apiKey:"AIzaSyDzroyIhzE_ffwClPkbtrx3g9lSA79b1OA",authDomain:"labs-data-resources.firebaseapp.com",databaseURL:"https://labs-data-resources-default-rtdb.firebaseio.com",projectId:"labs-data-resources",storageBucket:"labs-data-resources.appspot.com",messagingSenderId:"538411256404",appId:"1:538411256404:web:bfa3977676296f703a7bc1"}}},"9UCZ":function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),o=(n("jKqc"),n("qb6w"),n("yipc"),n("yviF")),r=n.n(o),i=(n("dih4"),n("hZls"),n("2NDV")),s=n.n(i);a.a.filter("capitalize",function(t){if(!t)return"";var e=t.toString().toLowerCase().split(" ");return(e=e.map(function(t){return t.charAt(0).toUpperCase()+t.slice(1)})).join(" ")}),a.a.filter("formatName",function(t){return t?(t=t.toString().replace(" ","")).toLowerCase():""});var u=n("//Fk"),c=n.n(u),p=n("Zrlr"),l=n.n(p),f=n("wxAW"),h=n.n(f),d=function(){function t(e){l()(this,t),this.provider=new r.a.auth.GoogleAuthProvider,this.auth2=e.auth()}return h()(t,[{key:"currentUser",value:function(){return this.auth2.currentUser}},{key:"login",value:function(){var t=this;return new c.a(function(e,n){t.auth2.signInWithPopup(t.provider).then(function(t){var n=t.user,a=t.credential;e({credential:a,id:n.uid,name:n.displayName,email:n.email,picture:n.photoURL})}).catch(n)})}},{key:"logout",value:function(){return this.auth2.signOut()}}]),t}(),m=n("mvHQ"),v=n.n(m),y=n("pFYg"),b=n.n(y),w=function(){function t(){l()(this,t),window.localStorage&&(this.storage=window.localStorage||window.sessionStorage)}return h()(t,[{key:"set",value:function(t,e){"object"!==(void 0===e?"undefined":b()(e))||e.constructor!==Array&&e.constructor!==Object||(e=v()(e)),this.storage.setItem(t,e)}},{key:"remove",value:function(t){this.storage.removeItem(t)}},{key:"get",value:function(t){var e=this.storage.getItem(t),n=!1;if(e)try{n=JSON.parse(e)}catch(t){console.error(t),n=e}return n}}]),t}(),g=function(){function t(e){l()(this,t),this.database=e.database()}return h()(t,[{key:"get",value:function(t){var e=this;return new c.a(function(n,a){e.database.ref(t).once("value").then(function(t){return n(t.val(),t.key)}).catch(a)})}},{key:"stop",value:function(t){this.database.ref(t).off()}},{key:"put",value:function(t,e,n){var a=t+"/"+e;return this.database.ref(a).set(n)}},{key:"append",value:function(t,e){return this.database.ref(t).push().set(e)}},{key:"update",value:function(t,e,n){var a=""+t+e;return this.database.ref(a).update(n)}},{key:"remove",value:function(t){return this.database.ref(t).set(null)}}]),t}(),k={props:{timeout:{type:Number,default:3e3}},data:function(){return{show:!1,message:"",type:"",types:["success","warning","danger"]}},created:function(){var t=this;this.$eventbus.$on("alert",function(e){var n=e.type,a=e.message;-1!==t.types.indexOf(n)&&t.alert(n,a)})},methods:{alert:function(t,e){this.type="alert-"+t,this.message=e,this.in().then(this.out)},in:function(){var t=this;return new c.a(function(e){t.$el.style.display="block",setTimeout(function(){t.show=!0,e()},100)})},out:function(){var t=this;return new c.a(function(e){setTimeout(function(){t.show=!1,setTimeout(function(){t.$el.style.display="none",e()},300)},t.timeout)})}}},A={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card shadow rounded fade toast-alert",class:[{show:this.show},this.type]},[e("div",{staticClass:"card-body py-3 px-4"},[this._v("\n\t\t"+this._s(this.message)+"\n\t")])])},staticRenderFns:[]};var I={name:"App",data:function(){return{config:s.a}},created:function(){a.a.prototype.$eventbus=new a.a,a.a.prototype.$storage=new w;var t=r.a.initializeApp(this.config.firebase);a.a.prototype.$auth=new d(t),a.a.prototype.$database=new g(t)},components:{Alert:n("VU/8")(k,A,!1,function(t){n("ji5T")},null,null).exports}},$={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("transition",{attrs:{name:"fade"}},[e("router-view")],1)],1)},staticRenderFns:[]};var j=n("VU/8")(I,$,!1,function(t){n("9UCZ")},null,null).exports,C=n("/ocq"),N=function(){return n.e(6).then(n.bind(null,"0VGv"))},S=function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"X9C9"))},U=function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"1Fk8"))},_=function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"Yfn7"))},x=function(){return n.e(5).then(n.bind(null,"v+uL"))};a.a.use(C.a);var P=[{path:"/",component:function(){return n.e(4).then(n.bind(null,"eYrN"))},children:[{name:"home",path:"",component:function(){return n.e(8).then(n.bind(null,"HXef"))}},{name:"tools",path:"tools",component:N,props:{type:"tool"}},{name:"edit-tool",path:"tools/:id",component:S},{name:"new-tool",path:"tools/new",component:S},{name:"stacks",path:"stacks",component:N,props:{type:"stack"}},{name:"edit-stack",path:"stacks/:id",component:U},{name:"new-stack",path:"stacks/new",component:U},{name:"prototypes",path:"prototypes",component:N,props:{type:"prototype"}},{name:"edit-prototype",path:"prototypes/:id",component:_},{name:"new-prototype",path:"prototypes/new",component:_},{name:"users",path:"users",component:x,children:[{name:"signup-accept",path:"accept/:userId",component:x},{name:"signup-revoke",path:"revoke/:userId",component:x}]}]},{name:"notfound",path:"*",component:function(){return n.e(7).then(n.bind(null,"odg4"))}}],F=new C.a({routes:P});F.beforeEach(function(t,e,n){n()});var O=F;a.a.config.productionTip=!1,new a.a({el:"#app",router:O,components:{App:j},template:"<App/>"})},jKqc:function(t,e){},ji5T:function(t,e){},qb6w:function(t,e){},yipc:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.d7c14abadbde5fb45c7a.js.map