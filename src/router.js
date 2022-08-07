import Vue from 'vue'
import VueRouter from 'vue-router'

//import Storage from '@/libs/storage'

//const Login = () => import(/* webpackChunkName: "login" */ '@/pages/Login')
const Main = () => import(/* webpackChunkName: "main" */ '@/pages/Main');
const Home = () => import(/* webpackChunkName: "home" */ '@/pages/Home');
const Sources = () => import(/* webpackChunkName: "sources" */ '@/pages/Sources');
const ToolForm = () => import(/* webpackChunkName: "toolForm" */ '@/pages/ToolForm');
const StackForm = () => import(/* webpackChunkName: "stackForm" */ '@/pages/StackForm');
const PrototypeForm = () => import(/* webpackChunkName: "prototypeForm" */ '@/pages/PrototypeForm');
const Users = () => import(/* webpackChunkName: "users" */ '@/pages/Users');
const NotFound = () => import(/* webpackChunkName: "notfound" */ '@/pages/NotFound');

Vue.use(VueRouter)

const routes = [
	/*{ name: "login", path: "/login", component: Login },*/
	{ 
		path: "/", 
		component: Main,
		children: [
			{ name: "home", path: "", component: Home },
			{ name: "tools", path: "tools", component: Sources, props: { type: "tool" } },
			{ name: "edit-tool", path: "tools/:id", component: ToolForm },
			{ name: "new-tool", path: "tools/new", component: ToolForm },
			{ name: "stacks", path: "stacks", component: Sources, props: { type: "stack" }  },
			{ name: "edit-stack", path: "stacks/:id", component: StackForm },
			{ name: "new-stack", path: "stacks/new", component: StackForm },			
			{ name: "prototypes", path: "prototypes", component: Sources, props: { type: "prototype" }  },
			{ name: "edit-prototype", path: "prototypes/:id", component: PrototypeForm },
			{ name: "new-prototype", path: "prototypes/new", component: PrototypeForm },
			{
				name: "users", 
				path: "users", 
				component: Users,
				children: [
					{ name: "signup-accept", path: "accept/:userId", component: Users },
					{ name: "signup-revoke", path: "revoke/:userId", component: Users }
				]
			}
		]
	},
	{ name: "notfound", path: "*", component: NotFound },
]

const Router = new VueRouter({ routes });

Router.beforeEach((to, _, next) => {
	next();
	/*const $storage = new Storage();

	let user = $storage.get("user");
	if (!user && to.path !== "/login") {
		next("login");
	} else {
		next();
	}*/
});

export default Router;