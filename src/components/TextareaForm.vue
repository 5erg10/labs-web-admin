<template>
	<div class="form-group">
		<label :for="name">
			<i v-if="label.iconClass" class="mr-2" :class="label.iconClass"></i>
			{{ label.text }} <span v-if="required" class="text-danger">*</span>
		</label>
		<textarea :id="name" 
			class="form-control" 
			v-model="temp"
			:placeholder="placeholder"
			:required="required"
			@blur="dirty = true"
			:class="{ 'is-invalid': error }">
		</textarea>
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
			dirty: false,
			temp: null,
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
	}
}
</script>