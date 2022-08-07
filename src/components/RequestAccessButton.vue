<template>
	<div class="d-inline-block position-relative">
		<button type="button" 
			class="btn btn-secondary btn-pill px-4"
			@mouseover="over = true"
			@mouseout="over = false" 
			@click="signin">
			Signup
			<i class="fas fa-key ml-2"></i>
		</button>

		<div class="card position-absolute mt-2" v-if="over">
			<div class="card-body text-left p-2">
				<small>Signup with <b>BBVA or BEEVA</b> Google account to request access to WebLabs Dashboard.</small>
				
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			over: false
		}
	},
	methods: {
		signed(user) {
			if (Object.prototype.hasOwnProperty.call(user, "credential")) delete user.credential;
			this.$database.put("users/pending", user.id, user)
				.then(res => this.$parent.$emit("signed", user))
				.catch(err => this.$parent.$emit("error", err));
		},
		signin() {
			this.$auth.login()
				.then(this.signed)
				.catch(err => this.$parent.$emit("error", err));
		}
	}
}
</script>