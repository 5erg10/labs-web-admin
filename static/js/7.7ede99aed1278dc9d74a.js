webpackJsonp([7],{lZ5c:function(t,s,e){"use strict";var a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("aside",{staticClass:"card"},[e("div",{staticClass:"card-body px-0 py-2"},t._l(t.links,function(s,a){return e("div",{key:"l-"+a,staticClass:"d-block item"},[e("router-link",{staticClass:"nav-link nabvar-item",attrs:{tag:s.tag,to:s.to,"active-class":"text-primary",exact:s.exact,custom:""},scopedSlots:t._u([{key:"default",fn:function(a){var i=a.navigate;return[e("span",{attrs:{role:"link"},on:{click:i,keypress:function(s){return!s.type.indexOf("key")&&t._k(s.keyCode,"enter",13,s.key,"Enter")?null:i.apply(null,arguments)}}},[s.icon?e("i",{staticClass:"mr-2",class:s.icon}):t._e(),t._v("\n\t\t\t\t\t"+t._s(s.label)+"\n\t\t\t\t")])]}}],null,!0)})],1)}),0)])},staticRenderFns:[]};var i=e("VU/8")({data:function(){return{links:[{tag:"a",to:"/",icon:"fa fa-home",label:"Home",exact:!0},{tag:"a",to:"/prototypes",icon:"fas fa-flask",label:"Protos",exact:!1},{tag:"a",to:"/tools",icon:"fas fa-toolbox",label:"Tools",exact:!1},{tag:"a",to:"/stacks",icon:"fas fa-database",label:"Stacks",exact:!1},{tag:"a",to:"/users",icon:"fas fa-user-shield",label:"Users",exact:!1}]}}},a,!1,function(t){e("wpOV")},null,null);s.a=i.exports},lfLh:function(t,s,e){"use strict";var a={data:function(){return{user:{}}},mounted:function(){var t=this.$storage.get("user");t&&(this.user=t)},methods:{logout:function(){var t=this;this.$auth.logout().then(function(){t.$storage.remove("user"),t.$eventbus.$emit("alert",{type:"success",message:"Bye!"}),t.$router.push("login")}).catch(function(s){console.error(s),t.$eventbus.$emit("alert",{type:"danger",message:"Error logging out. Check console for more details!"})})}}},i={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"d-flex justify-content-between align-items-center"},[this._m(0),this._v(" "),s("div",{staticClass:"col-auto"},[s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-auto"},[s("img",{staticClass:"rounded-circle shadow-sm mr-3",attrs:{src:this.user.picture,width:"60"}})]),this._v(" "),s("div",{staticClass:"col-auto"},[s("span",{staticClass:"d-block"},[this._v(this._s(this.user.name||"Admin name"))])])])])])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"col-auto"},[s("img",{staticClass:"d-inline-block",attrs:{height:"50",src:"/static/img/logo.png"}})])}]},n=e("VU/8")(a,i,!1,null,null,null);s.a=n.exports},odg4:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("lfLh"),i=e("lZ5c"),n={components:{Navbar:a.a,Sidebar:i.a}},l={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"container my-5"},[s("Navbar"),this._v(" "),s("div",{staticClass:"row my-5"},[s("div",{staticClass:"col-2"},[s("Sidebar")],1),this._v(" "),this._m(0)])],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"col-10"},[s("div",{staticClass:"jumbotron"},[s("h2",{staticClass:"display-8"},[this._v("Ops! Something was wrong")]),this._v(" "),s("p",{staticClass:"lead"},[this._v("The page you have requested has not been found :(")])])])}]},r=e("VU/8")(n,l,!1,null,null,null);s.default=r.exports},wpOV:function(t,s){}});
//# sourceMappingURL=7.7ede99aed1278dc9d74a.js.map