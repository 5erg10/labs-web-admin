<style>
	.sticky {
		position: sticky !important;
		float: left;
		height: auto;
		top: 2rem;
	}
</style>

<template>
	<div class="container my-5">
		<Navbar/>
		<div class="row align-items-start">
			<div class="sticky col-2 my-5">
				<Sidebar/>
			</div>
			<div class="col-10 my-5">
				<transition name="fade">
					<router-view></router-view>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default {
	components: {
		Navbar,
		Sidebar
	}
}
</script>
