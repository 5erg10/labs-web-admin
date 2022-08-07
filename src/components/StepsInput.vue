<style>
	.dragging {
		opacity: 0.4;
	}
</style>

<template>
	<div class="my-4">
		<label v-if="label">
			<i v-if="label.iconClass" class="mr-2" :class="label.iconClass"></i>
			{{ label.text }} <span class="text-danger" v-if="required">*</span>
		</label>

		<ul class="list-group my-3">
			<li class="list-group-item d-flex justify-content-between align-items-center" 
				v-for="(item, index) in tempList"
				:key="`i-${ index }`"
				draggable="true"
				@dragstart="e => dragStart(e, index)"
				@dragover.prevent="dragOver"
				@dragleave="dragLeave"
				@dragend="dragEnd"
				@drop="e => dragDrop(e, index)"
				style="cursor: move">
				<span>
					<i class="fas fa-grip-vertical mr-3 text-black-50"></i>
					{{ index + 1 }}.&emsp;{{ item }}
				</span>
				<a href="#" class="text-danger" @click.prevent="removeItem(item)">
					<i class="fas fa-trash"></i>
				</a>
			</li>
			
			<li class="list-group-item"
				:class="{ 'border-danger': error }">
				<form class="d-flex m-0" @submit.prevent="addItem">
					<div class="flex-grow-1">
						<input type="text" 
							class="form-control-plaintext py-0" 
							placeholder="Type to add new step..."
							style="outline: none"
							@blur="dirty = true"
							v-model="temp">
					</div>
					<button type="submit"
						class="d-inline-block btn btn-link py-0 px-3 mx-2"
						:class="[ this.temp ? 'text-primary' : 'text-muted' ]"
						style="white-space: nowrap">
						Add step
					</button>
				</form>
			</li>
		</ul>
		<div v-if="error"
			class="d-inline-block invalid-feedback">
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
			this.tempList = val.map(item => item.content);
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
			temp: null,
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
					value: this.tempList.map((content, order) => { 
						return { order, content };
					})
				});
			}
		});
	},
	methods: {
		dragStart(e, index) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData("current", index)
			e.target.style.opacity = 0.4;
		},
		dragOver(e) {
			e.target.classList.add("bg-light");
		},
		dragLeave(e) {
			e.target.classList.remove("bg-light");
		},
		dragEnd(e) {
			e.target.style.opacity = 1;
		},
		dragDrop(e, index) {
			e.target.classList.remove("bg-light");
			let current = e.dataTransfer.getData("current");
			this.sort(current, index);	
		},
		sort(from, to) {
			this.tempList.splice(to, 0, this.tempList.splice(from, 1)[0]);
		},
		addItem() {
			if (this.temp) {
				this.tempList.push(this.temp);
				this.temp = null;
			}
		},
		removeItem(item) {
			let index = this.tempList.indexOf(item);
			this.tempList.splice(index, 1);
		}
	}
}
</script> 