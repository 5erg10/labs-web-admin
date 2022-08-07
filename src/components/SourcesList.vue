<template>
	<table class="table">
		<thead>
			<tr>
				<th scope="col">Title</th>
				<th scope="col">Tag</th>
				<th scope="col">Actions</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in items" 
				:key="`item-${ index }`">
				<td scope="row">{{ item.title }}</td>
				<td>{{ item.tag | capitalize  }}</td>
				<td>
					<router-link tag="button" class="btn btn-outline-primary btn-pill btn-sm py-1 mr-3" :to="{ name: `edit-${ type }`, params: { id: item.id } }" custom v-slot="{ navigate }">
						<span @click="navigate" @keypress.enter="navigate" role="link">
							<i class="fa fa-edit mr-2"></i>
							Edit
						</span>
					</router-link>
					<button type="button" 
							class="btn btn-outline-danger btn-pill btn-sm py-1" 
							@click.prevent="remove(item)">
								<i class="fa fa-trash mr-2"></i>
								Delete
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	props: {
		items: {
			type: Array,
			required: true,
			deep: true
		},
		type: {
			type: String,
			required: true
		}
	},
	methods: {
		remove(item) {
			this.$parent.$emit("remove", item);
		}
	}
}
</script>