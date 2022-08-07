<template>
	<div class="card">
		<div class="card-body">
			<div class="row justify-content-between mb-3 px-3">
				<h4 class="card-title">
					<i class="fas fa-database mr-2"></i>
					{{ type | capitalize }}s
				</h4>
				<div class="col-auto">
					<router-link :to="{ name: `new-${ type }` }" tag="button" type="button" class="btn btn-primary btn-pill btn-sm" custom v-slot="{ navigate }">
						<span @click="navigate" @keypress.enter="navigate" role="link">
							<i class="fa fa-plus mr-2"></i>
							Add new {{ type }}
						</span>
					</router-link>
				</div>
			</div>

			<div class="my-5">
				<SearchInput :timeout="400"/>
			</div>

			<p v-if="items.length == 0" class="card-text">No {{ type }}s stored on database. Create one now!</p>
			<div class="table-responsive" v-if="filter().length">
				<SourcesList :type="type" :items="filter()"/>
			</div>
		</div>
	</div>
</template>

<script>
import SearchInput from '@/components/SearchInput'
import SourcesList from '@/components/SourcesList'

export default {
	props: {
		type: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			items: [],
			query: null
		}
	},
	watch: {
		"$route": 'sync'
	},
	mounted() {
		this.sync();
		
		this.$on("search-query", q => this.query = q);
		this.$on("remove", this.remove);
	},
	methods: {
		filter() {
			let res = this.items;
			if (this.query) {
				res = this.items.filter(item => {
					let inTitle = item.title.toLowerCase().includes(this.query);

					let inTag = false;
					if (Array.isArray(item.tag)) inTag = item.tag.filter(t => t.toLowerCase().includes(this.query)).length > 0;
					else inTag = item.tag.toLowerCase().includes(this.query);

					return inTitle || inTag;
				});
			}

			return res;
		},
		sync() {
			this.items = [];
			
			let source = `${ this.type }s`;
			this.$database.get(source) 
				.then(values => {
					if (values) {
						Object.keys(values).forEach(id => {
							let item = values[id];
							item.id = id;

							this.items.push(item);
						});
					}
				})
				.catch(err => {
					this.$eventbus.$emit("alert", { type: "danger", message: "Error synchronizing stacks. Check console for more details" });
					console.error(err);
				});
		},
		remove(item) {
			if (item) {
				let ref = `${ this.type }s/${ item.id }`;
				this.$database.remove(ref) 
					.then(() => {
						this.$eventbus.$emit("alert", { type: "success", message: `stack deleted!` });
						this.items.forEach((i, index) => {
							if (i.id === item.id) this.items.splice(index, 1);
						});
					})
					.catch(err => {
						this.$eventbus.$emit("alert", { type: "danger", message: "Error deleting stack. Check console for more details" });
						console.error(err);
					});
			}

        }
	},
	components: {
		SearchInput,
		SourcesList
	}
}
</script>