abstract class AbstractControl {
  abstract getValue(): any;
}

// Leaf: FormControl
class FormControl extends AbstractControl {
  constructor(private value: any) {
    super();
  }

  getValue() {
    return this.value;
  }
}

// Composite: FormGroup
class FormGroup extends AbstractControl {
  private controls: { [key: string]: AbstractControl } = {};

  addControl(name: string, control: AbstractControl) {
    this.controls[name] = control;
  }

  getValue() {
    const result: any = {};
    for (const key in this.controls) {
      result[key] = this.controls[key].getValue();
    }
    return result;
  }
}

export function compositePlayground() {
  const form = new FormGroup();
  form.addControl('username', new FormControl('namnguyen'));
  form.addControl('age', new FormControl(24));

  const addressGroup = new FormGroup();
  addressGroup.addControl('city', new FormControl('HCM'));
  addressGroup.addControl('zip', new FormControl('70000'));

  form.addControl('address', addressGroup);

  console.log('Form value:', form.getValue());
}
