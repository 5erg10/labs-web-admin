<template>
	<div class="my-4">
		<label v-if="label">
			<i v-if="label.iconClass" class="mr-2" :class="label.iconClass"></i>
			{{ label.text }} <span class="text-danger" v-if="required">*</span>
		</label>
		<ul class="list-group my-3">
			<li class="list-group-item d-flex justify-content-between align-items-center" 
				v-for="(item, index) in tempList"
				:key="`i-${ index }`">
				<a :href="item.url" target="_blank">{{ item.title }}</a>
				<a href="#" class="text-danger" @click.prevent="removeItem(item)">
					<i class="fas fa-trash mr-2"></i>
				</a>
			</li>
			<li class="list-group-item d-flex justify-content-between align-items-center" 
				:class="{ 'border-danger': error }">
				<a href="#" 
					:class="{ 'text-danger': error }"
					@click.prevent="modal = true">
					<i class="fas fa-plus mr-2"></i>
					Add new link
				</a>
			</li>
		</ul>

		<div v-if="error"
			class="invalid-feedback d-block">
			Required or invalid value.
		</div>

		<div class="modal d-block" style="background: rgba(0, 0, 0, 0.3);" v-if="modal">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Add new link</h5>
						<button type="button" class="close"  @click.prevent="() => { modal = false; dirty = true; }">
							<span>&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label for="text">
								<i class="fas fa-tag mr-2"></i>
								Link text
							</label>
							<input type="text" v-model="temp.title" class="form-control" placeholder="Type here the link title">
						</div>
						<div class="form-group">
							<label for="text">
								<i class="fas fa-link mr-2"></i>
								Link URL
							</label>
							<input type="url" v-model="temp.url" class="form-control" placeholder="Type here the link url">
						</div>
						<div class="form-group">
							<label for="type">
								<i class="fas fa-link mr-2"></i>
								Type
							</label>
							<input type="text" v-model="temp.type" class="form-control" placeholder="media type (video, audio or image)">
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" 
							class="btn btn-pill btn-primary"
							:class="{ 'disabled': !(this.temp.title && this.temp.url) }"
							@click="addItem">
							<i class="fas fa-plus mr-2"></i>
							Add link
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import SelectForm from '@/components/SelectForm'
export default {
	props: {
		name: {
			type: String,
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
			validator(val) {
				return Object.prototype.hasOwnProperty.call(val, "text") && typeof val.text === "string";
			}
		},
		value: {
			required: false,
			default() {
				return [];
			}
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
			modal: false,
			temp: { 
				title: null,
				url: null,
				type: null
			},
			tempList: [],
			error: false,
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
			if (this.temp.title && this.temp.url && this.temp.type) {
				this.tempList.push(this.temp);
				this.temp = { 
					title: null,
					url: null,
					type: null
				};

				this.modal = false;
			}
		},
		removeItem(item) {
			let index = this.tempList.indexOf(item);
			this.tempList.splice(index, 1);
		}
	},
	components: {
		SelectForm
	}
}
</script>