<template>
	<button type="button" class="btn btn-primary btn-lg btn-pill" @click="login">
		Login
		<i class="fas fa-sign-in-alt ml-2"></i>
	</button>
</template>

<script>
export default {
	methods: {
		logged(user) {
			this.$database.get(`users/members/${ user.id }`)
				.then(allowed => {
					if (allowed) this.$parent.$emit("logged", user);
				})
				.catch(err => this.$parent.$emit("error", err));
		},
		login() {
			this.$auth.login()
				.then(this.logged)
				.catch(err => this.$parent.$emit("error", err));
		}
	}
}
</script>