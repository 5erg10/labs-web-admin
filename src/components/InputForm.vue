<template>
	<div class="form-group">
		<label :for="name">
			<i v-if="label.iconClass" class="mr-2" :class="label.iconClass"></i>
			{{ label.text }} <span v-if="required" class="text-danger">*</span>
		</label>
		<input class="form-control"
			:id="name" 
			:type="type"
			v-model="temp"
			:placeholder="placeholder"
			@blur="dirty = true"
			:class="{ 'is-invalid': error }">
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
		type: {
			type: String,
			required: true,
			validator: val => {
				let valid = [ "text", "email", "url", "tel", "search" ];
				return valid.filter(v => v === val).length > 0;
			}
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
		placeholder: {
			type: String,
			required: false
		},
		value: {
			required: false
		}
	},
	watch: {
		value(val) {
			this.temp = val;
		},
		dirty(val) {
			this.error = this.required && val && (this.temp === null || this.temp === ""); 
		},
		temp(val) {
			this.error = this.required && this.dirty && (val === null || val === "");
		}
	},
	data() {
		return {
			temp: null,
			dirty: false,
			error: false
		}
	},
	created() {
		this.$parent.$on("submit", () => {
			if (this.required && (this.temp === null || this.temp === "")) {
				this.error = true;
				this.$parent.$emit("invalid", { name: this.name });
			} else {
				this.$parent.$emit("value", {
					name: this.name,
					value: this.temp
				});
			}
		});
	},
	methods: {
		validator() {
			if (!this.dirty) this.dirty 
		}
 	}
}
</script>