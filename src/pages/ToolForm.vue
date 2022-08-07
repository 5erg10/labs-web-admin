<template>
	<form class="m-0" @submit.prevent="submitForm">
		<div class="card">
			<div class="card-body">
				<h4 class="card-title">Tool Form</h4>
				<p class="card-text text-danger mt-3 mb-5"><i class="fas fa-lock mr-2"></i>Required information</p>

				<div class="row my-3">
					<div class="col">
						<InputForm name="title" 
							type="text" 
							:label="{ text: 'Title', iconClass: 'fas fa-file-alt' }" 
							:required="true" 
							placeholder="Tool title or name" 
							:value="tool.title"/>
					</div>
					<div class="col">
						<SelectForm name="status"
							:label="{ text: 'Status', iconClass: 'fa fa-thermometer-full' }"
							:options="states"
							:required="true"
							:value="tool.status"/>
					</div>
				</div>  

				<div class="row my-3">
					<div class="col-6">
						<MultipleSelectForm name="tag"
							:label="{ text: 'Primary Tag', iconClass: 'fa fa-tags' }"
							:options="Object.keys(tags)"
							:required="true"
							:value="tool.tag"/>
					</div>
					<div class="col-6">
						<SelectForm name="subtag"
							v-if="availableSubtags.length > 0"
							:label="{ text: 'Secondary Tag', iconClass: 'fa fa-tag' }"
							:options="availableSubtags"
							:required="false"
							:value="tool.subtag"/>
					</div>  
				</div>

				<div class="row my-3">
					<div class="col">
						<TextareaForm name="twitter"
							:label="{ text: 'Description for Twitter', iconClass: 'fab fa-twitter' }"
							:required="true"
							placeholder="Short description to share in twitter and other social networks..."
							:value="tool.twitter"/>
					</div>
				</div>

				<div class="row my-3">
					<div class="col">
						<TextareaForm name="description"
							:label="{ text: 'Description', iconClass: 'fa fa-align-left' }"
							:required="true"
							placeholder="Short description to introduce tool applications..."
							:value="tool.description"/>
					</div>
				</div>

				<LinkListInput name="links" 
					:label="{ text: 'Links', iconClass: 'fa fa-link' }" 
					:value="tool.links" 
					:required="true"/>
			</div>

			<div class="card-footer">
				<p class="card-text text-info"><i class="fas fa-lock-open mr-2"></i> Optional information</p>

				<div class="row my-3">
					<div class="col">
						<LinkListInput name="graphics" 
							:label="{ text: 'Graphic material', iconClass: 'far fa-chart-bar'}"
							:value="tool.graphics"/>
					</div>
				</div>

				<div class="row my-3">
					<div class="col">
						<InputForm name="demo"
							type="url"
							:label="{ text: 'Demo', iconClass: 'fa fa-film' }"
							:required="false"
							placeholder="Url address to demo resource (video, ppt, ...)"
							:value="tool.demo"/>
					</div>
				</div>

				<div class="row my-3">
					<div class="col">
						<InputForm name="logo"
							type="url"
							:label="{ text: 'Logo url', iconClass: 'far fa-bookmark' }"
							:required="false"
							placeholder="Tecnology brand logo"
							:value="tool.logo"/>
					</div>
				</div>

				<div class="row my-3">
					<div class="col">
						<StepsInput name="steps"
							:label="{ text: 'First steps', iconClass:'fa fa-list-ol' }" 
							:value="tool.steps"/>
					</div>
				</div>
					
				<button type="submit" class="btn btn-pill btn-primary btn-block mt-5 mb-4">
					<i class="fas fa-save mr-2"></i>
					Save
				</button>
			</div>
		</div>
	</form>
</template>

<script>
import InputForm from '@/components/InputForm'
import SelectForm from '@/components/SelectForm'
import MultipleSelectForm from '@/components/MultipleSelectForm'
import TextareaForm from '@/components/TextareaForm'
import LinkListInput from '@/components/LinkListInput'
import StepsInput from '@/components/StepsInput'

export default {
	data() {
		return {
			toolKey: "",
			availableSubtags: [],
			tool: {
				title: "",
				twitter: "",
				description: "",
				tag: "",
				tags: [],
				subtag: "",
				status: "",
				demo: "",
				logo: "",
				graphics: "",
				steps: ""
			},
			tags: {
				"Frontend": [], 
				"Backend": [], 
				"Mobile": [], 
				"Big Data": [],
				"IoT": [],
				"Cloud": [], 
				"DevOps": [], 
				"Security": [], 
				"Blockchain": [], 
				"DevOps": [], 
				"Human Computer Interfaces": [
					"VR", 
					"AR", 
					"Chatbots", 
					"Voice conversationals"
				], 
				"UX": [], 
				"UI": [],
				"Machine Intelligence": [
					"Reinforcement learning", 
					"Natural Lenguaje Proccesing", 
					"Recomender System", 
				  	"Artificial Vision", 
					"Cloud Machine Learning",
					"Data Augmented",
				  	"Generative Models",
					"Deep Learning"
				] 
			},
			states: [
				"Adopt", 
				"Wait", 
				"Work in progress"
			]
		}
	},
	mounted() {
		if (this.$route.params.id && this.$route.params.id !== "new") this.loadTool(this.$route.params.id);
		
		this.$on("change", data => {
			if (data.name === "tag") this.loadSubtags(data.value);
		});
	},
	beforeRouteLeave(to, from, next) {
		if (this.$el.classList.contains("submited")) next();
		else if (confirm("Changes will be discared... Do you want to continue?")) next();
	},
	methods: {
		loadTool(id) {
			this.$database.get(`tools/${ id }`) 
				.then(tool => {
					tool.id = id;
					this.tool = tool;

					if (tool.tag) this.loadSubtags(tool.tag);
				}) 
				.catch(err => {
					console.error(err);
					this.$eventbus.$emit("alert", { type: "danger", message: "Error getting tool info. Check console for more details" })
				});
		},
		loadSubtags(tag) {
			if (!Array.isArray(tag)) tag = [ tag ];

			this.tool.tag = tag;
			this.availableSubtags = [];

			if (tag.length > 0) {
				this.tool.tag.forEach(tag => {
					if (Object.prototype.hasOwnProperty.call(this.tags, tag)) this.availableSubtags.push(...this.tags[tag])
				});
			}

			if (this.availableSubtags.length === 0) this.tool.subtag = null;
		},
		valuesWaiter() {
			let waiter = new Promise((resolve, reject) => {
				this.$on("invalid", reject);
				this.$on("value", data => this.tool[data.name] = data.value || null);
				setInterval(resolve, 200);
			});

			this.$emit("submit");
			return waiter;
		},
		submitForm() {
			this.valuesWaiter().then(() => {
				if (!this.$route.params.id || this.$route.params.id === "new") {
					this.$database.append('tools/', this.tool)
						.then(() => {
							this.$eventbus.$emit("alert", { type: "success", message: `Tool ${ this.tool.title } created!` });
						}) 
						.catch((err) => {
							console.error(err);
							this.$eventbus.$emit("alert", { type: "danger", message: "Error creating tool. Check console for more details" });
						});
				} else {
					this.$database.update('tools/', this.$route.params.id, this.tool)
						.then(() => {
							this.$eventbus.$emit("alert", { type: "success", message: `Tool ${ this.tool.title } updated!` });
						})
						.catch((err) => {
							console.error(err);
							this.$eventbus.$emit("alert", { type: "danger", message: "Error updating tool. Check console for more details" });
						});
				}

				this.$el.classList.add("submited");
				this.$router.push({ name: "tools" });
			}).catch(console.error);
		}
	},
	components: {
		InputForm,
		SelectForm,
		MultipleSelectForm,
		TextareaForm,
		LinkListInput,
		StepsInput
	}
}
</script>