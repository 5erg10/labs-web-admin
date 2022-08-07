<style>
	.multiselect-form {
		display: inline-block;
		vertical-align: top;
		width: 100%;
	}

	.tags {
		display: inline-block;
		vertical-align: top;
		max-width: 200px;
		height: auto;
	}

	.input {
		display: inline-block;
		vertical-align: top;
		border: 0;
		outline: 0;
		color: #495057;
		font-family: inherit;
	}

	.options {
		position: absolute;
		top: 100%; left: -1px;
		width: calc(100% + 2px);
		background: white;
		border: 1px solid #becad6;
		border-bottom-left-radius: .375rem;
		border-bottom-right-radius: .375rem;
		margin-top: -0.375rem;
		overflow: hidden;
		z-index: 10;
	}

	.options .option {
		display: inline-block;
		vertical-align: top;
		width: 100%;
		height: auto;
		padding: 5px 10px;
		color: #495057;
		border-bottom: 1px solid #becad6;
		transition: all .2s ease-in-out;
	}

	.options .option:last-child { border: none; }
	.options .option:hover, .options .option:active { 
		background: #007bff; 
		color: white;
		cursor: pointer;
	}
</style>


<template>
	<div class="form-group multiselect-form">                                           
		<label :for="name">
			<i v-if="label.iconClass" class="mr-2" :class="label.iconClass"></i>
			{{ label.text }} <span v-if="required" class="text-danger">*</span>
		</label>
		
		<div class="form-control position-relative d-flex flex-wrap" 
			:class="{ 'is-invalid': error }">
			<div class="tags">
				<span class="badge badge-primary mb-1 mr-1 d-inline-block" 
					v-for="(option, index) in tempList" 
					:key="`index-${ index }`">
						{{ option }}<i class="ml-2 fas fa-times" @click="optionDiscared(option)"></i>
				</span>
			</div>
			<input type="text" 
				class="input flex-grow-1" 
				v-model="temp"
				@blur="dirty = true"
				:class="{ 'mb-1': tempList.length > 0 }"> 

			<div class="options" v-if="temp && selectable.length">
				<span class="option" 
					v-for="(option, index) in selectable" 
					:key="`index-${ index }`"
					@click="optionSelected(option)">
						{{ option }}
				</span>
			</div>
		</div>
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
		placeholder: {
			type: String,
			required: false
		},
		value: {
			required: false,
			deep: true,
			default() {
				return [];
			},
		}
	},
	watch: {
		temp(i) {
			if (i) {
				this.selectable = this.options.filter(option => {
					let index = this.tempList.indexOf(option);
					return option.toLowerCase().includes(i.toLowerCase()) && index === -1;
				});
			} else this.selectable = this.options;
		},
		value(val) {
			if (val) {
				if (Array.isArray(val)) this.tempList = val; 
				else this.tempList = [ val ];
			}
		},
		dirty(val) {
			this.error = this.required && val && this.tempList.length === 0; 
		},
		tempList(val) {
			this.error = this.required && val.length === 0;
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
	data() {
		return {
			dirty: false,
			tempList: [],
			selectable: [],
			temp: null,
			error: false
		}
	},
	methods: {
		optionSelected(option) {
			this.tempList.push(option);
			this.temp = null;
			this.$parent.$emit("change", {
				name: this.name,
				value: this.tempList
			});
		},
		optionDiscared(option) {
			this.tempList.splice(this.tempList.indexOf(option), 1);
			this.$parent.$emit("change", {
				name: this.name,
				value: this.tempList
			});
		}
	}
}
</script>