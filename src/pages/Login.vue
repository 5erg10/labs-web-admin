<template>
	<div class="container" style="height: 100vh">
		<div class="h-100 d-flex justify-content-center">
			<div class="row align-self-center justify-content-center">
				<div class="col-5 text-center">
					<div class="card my-5">
						<div class="card-header">
							<img class="w-75" src="/assets/img/logo.png"/>
						</div>
						<div class="card-body">
							<h5 class="card-title">LabsWeb Dashboard</h5>
							<p class="card-text">Manage all resources of LabsWeb.</p>

							<LoginButton class="my-2"/>
							<span class="mx-3 my-2">or</span>
							<RequestAccessButton class="my-2"/>

							<small class="d-block card-text mt-4">Powered by <i class="fab fa-lg fa-google"></i></small>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import LoginButton from '@/components/LoginButton'
import RequestAccessButton from '@/components/RequestAccessButton'

export default {
	created() {
		this.$on("logged", user => {
			this.$storage.set("user", user);
			this.$router.push({ name: "home" });
		});

		this.$on("signed", user => {
			this.$eventbus.$emit("alert", {
				type: "success",
				message: `Access request registered. Thanks ${ user.name }`
			});
		});

		this.$on("error", err => {
			if (err.code === "PERMISSION_DENIED") {
				this.$eventbus.$emit("alert", {
					type: "danger",
					message: "Sorry, permission denied. Try with valid account."
				});
			} else if (err.code === "auth/popup-closed-by-user") {
				this.$eventbus.$emit("alert", {
					type: "danger",
					message: "Ops! Wait for Google Auth popup."
				});
			} else {
				console.error(err);
				this.$eventbus.$emit("alert", {
					type: "danger",
					message: "Error during users login. Check console for more details."
				});
			}
		});
	},
	components: {
		LoginButton,
		RequestAccessButton
	}
}
</script>