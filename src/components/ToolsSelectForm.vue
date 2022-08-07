<template>
	<div class="form-group">                                           
		<label :for="name">
			<i v-if="label.iconClass" class="mr-2" :class="label.iconClass"></i>
			{{ label.text }} <span v-if="required" class="text-danger">*</span>
		</label>
		<p class="card-text my-4 text-muted" v-if="!tempList.length">No items added.</p>
		<ul class="list-group my-3">
			<li class="list-group-item d-flex justify-content-between align-items-center" 
				v-for="(item, index) in tempList"
				:key="`i-${ index }`">
				{{ item.title }}
				<a href="#" class="text-danger" @click.prevent="removeItem(item)">
					<i class="fas fa-trash mr-2"></i>
				</a>
			</li>
		</ul>
		
		<select :id="name" 
			class="form-control" 
			v-model="temp" 
			@change="addItem"
			@click.prevent="dirty = true"
			:class="{ 'is-invalid': error }">
			<option v-for="(option, index) in tools" 
				:value="option" 
				:key="`o-${ index }`">
				{{ option.title }}
			</option>
		</select>
		<div v-if="error"
			class="invalid-feedback">
			Required or invalid value.
		</div>
	</div>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			required: true
		},
		tools: {
			type: Array,
			required: true
		},
		required: {
			type: Boolean,
			required: false,
			default: false
		},
		label: {
			type: Object,
			required: false,
			validator: val => {
				return Object.prototype.hasOwnProperty.call(val, "text") && typeof val.text === "string";
			}
		},
		value: {
			required: false
		}
	},
	watch: {
		value(val) {
			this.tempList = val;
		},
		dirty(val) {
			this.error = this.required && val && this.tempList.length === 0;
		},
		tempList(val) {
			this.error = this.required && val.length === 0;
		}
	},
	data() {
		return {
			dirty: false,
			temp: { 
				title: null,
				id: null
			},
			tempList: [],
			error: false
		}
	},
	created() {
		this.$parent.$on("submit", () => {
			if (this.required && this.tempList.length === 0) {
				this.error = true;
				this.$parent.$emit("invalid", { name: this.name });
			} else {
				this.$parent.$emit("value", {
					name: this.name,
					value: this.tempList
				});
			}
		});
	},
	methods: {
		addItem() {
			if (this.temp.title && this.temp.id) {
				let founded = this.tempList.filter(t => t.title === this.temp.title);
				if (founded.length == 0) this.tempList.push(this.temp);
				this.temp = { 
					title: null,
					id: null
				}
			}
		},
		removeItem(item) {
			let index = this.tempList.indexOf(item);
			this.tempList.splice(index, 1);
		}
	}
}
</script> 