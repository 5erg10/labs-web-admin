<template>
	<aside class="card">
		<div class="card-body px-0 py-2">
			<div class="d-block item" v-for="(link, index) in links" :key="`l-${ index }`">
				<router-link class="nav-link nabvar-item" :tag="link.tag" :to="link.to" active-class="text-primary" :exact="link.exact" custom v-slot="{ navigate }">
					<span @click="navigate" @keypress.enter="navigate" role="link">
						<i v-if="link.icon" class="mr-2" :class="link.icon"></i>
						{{ link.label }}
					</span>
				</router-link>
			</div>
		</div>
	</aside>
</template>

<script>
export default {
	data() {
		return {
			links: [
				{
					tag: "a",
					to: "/",
					icon: "fa fa-home",
					label: "Home",
					exact: true
				},
				{
					tag: "a",
					to: "/prototypes",
					icon: "fas fa-flask",
					label: "Protos",
					exact: false
				},
				{
					tag: "a",
					to: "/tools",
					icon: "fas fa-toolbox",
					label: "Tools",
					exact: false
				},
				{
					tag: "a",
					to: "/stacks",
					icon: "fas fa-database",
					label: "Stacks",
					exact: false
				},
				{
					tag: "a",
					to: "/users",
					icon: "fas fa-user-shield",
					label: "Users",
					exact: false
				}
			]
		}
	}
}
</script>

<style>
	.nabvar-item,
	.nabvar-item:hover,
	.nabvar-item:active,
	.nabvar-item:visited {
		color: inherit;
		cursor: pointer;
	}
</style>
