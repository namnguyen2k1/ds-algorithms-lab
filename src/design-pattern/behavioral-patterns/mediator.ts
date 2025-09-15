// Mediator interface
interface Mediator {
  notify(sender: object, event: string): void;
}

// Base Component
abstract class BaseComponent {
  protected mediator!: Mediator;
  setMediator(m: Mediator) {
    this.mediator = m;
  }
}

// Components
class Step1ServiceType extends BaseComponent {
  private selected: string | null = null;

  selectService(service: string) {
    console.log(`Step1: Selected service = ${service}`);
    this.selected = service;
    this.mediator.notify(this, 'service_selected');
  }

  getSelected() {
    return this.selected;
  }
}

class Step2Details extends BaseComponent {
  private fields: Record<string, string> = {};
  private enabled = false;

  enable() {
    this.enabled = true;
    console.log('Step2: Enabled fields');
  }

  disable() {
    this.enabled = false;
    this.fields = {};
    console.log('Step2: Disabled fields');
  }

  fillField(name: string, value: string) {
    if (!this.enabled) {
      console.log('Step2: Cannot fill, disabled');
      return;
    }
    this.fields[name] = value;
    console.log(`Step2: Field [${name}] = ${value}`);
    this.mediator.notify(this, 'field_changed');
  }

  isValid(): boolean {
    if (!this.enabled) return false;
    return Object.values(this.fields).every(v => v.trim().length > 0);
  }
}

class Step3Submit extends BaseComponent {
  private enabled = false;

  enable() {
    this.enabled = true;
    console.log('Step3: Submit button enabled');
  }

  disable() {
    this.enabled = false;
    console.log('Step3: Submit button disabled');
  }

  submit() {
    if (!this.enabled) {
      console.log('Step3: Cannot submit, disabled');
      return;
    }
    console.log('Step3: Form submitted successfully!');
  }
}

// Mediator
class FormMediator implements Mediator {
  constructor(private step1: Step1ServiceType, private step2: Step2Details, private step3: Step3Submit) {
    this.step1.setMediator(this);
    this.step2.setMediator(this);
    this.step3.setMediator(this);
  }

  notify(sender: object, event: string): void {
    if (event === 'service_selected') {
      if (this.step1.getSelected() === 'home_loan') {
        console.log('Mediator: Service = Home Loan → Enable income & property fields.');
        this.step2.enable();
      } else if (this.step1.getSelected() === 'personal_loan') {
        console.log('Mediator: Service = Personal Loan → Enable job & contract fields.');
        this.step2.enable();
      } else {
        this.step2.disable();
      }
      this.step3.disable();
    }

    if (event === 'field_changed') {
      if (this.step2.isValid()) {
        this.step3.enable();
      } else {
        this.step3.disable();
      }
    }
  }
}

export function mediatorPlayground() {
  const step1 = new Step1ServiceType();
  const step2 = new Step2Details();
  const step3 = new Step3Submit();
  const mediator = new FormMediator(step1, step2, step3);

  step1.selectService('home_loan');
  step2.fillField('income', '2000 USD');
  step2.fillField('property_value', '100000 USD');
  step3.submit();

  console.log('\n--- Switch service ---\n');

  step1.selectService('personal_loan');
  step2.fillField('job', 'Developer');
  step2.fillField('contract_duration', '2 years');
  step3.submit();
}
