<template>
	<div class="form-group">                                           
		<label :for="name">
			<i v-if="label.iconClass" class="mr-2" :class="label.iconClass"></i>
			{{ label.text }} <span v-if="required" class="text-danger">*</span>
		</label>
		<select class="form-control" 
			:id="name" 
			v-model="temp"
			@focus="dirty = true" 
			:required="required"
			:class="{ 'is-invalid': error }">
			<option value=""></option>
			<option v-for="(option, index) in options" :key="`o-${ index }`">{{ option }}</option>
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
		options: {
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
			this.temp = val;
		},
		dirty(val) {
			this.error = this.required && val && (this.temp === null || this.temp === "");
		},
		temp(val) {
			this.error = this.required && this.dirty && (val === null || val === "");
			this.$parent.$emit("change", {
				name: this.name,
				value: this.temp || null
			});
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
					value: this.temp || null
				});
			}
		});

		this.temp = this.value;
	}
}
</script>