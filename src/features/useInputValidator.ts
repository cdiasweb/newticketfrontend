import { ref, watch } from "vue";

export default function (startVal: any, validators: Array<any>, onValidate: any) {
  const input = ref(startVal);
  const errors: any = ref([]);
  watch(input, (value: any) => {
      if(validators instanceof Array && validators.length > 0) { 
        errors.value = validators.map((validator: any) => validator(value));
      }
      onValidate(value, errors);
   });
  return {
    input,
    errors
  };
}
