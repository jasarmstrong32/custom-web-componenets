const template = document.createElement('template');

template.innerHTML = `
    <link rel='stylesheet' href='pet-card/style.css' />
    <div clsss='pet-card'>
      <div class='avatar'>
        <img />
      </div>
      <div class='details'>
        <h2></h2>
        <div class='info'>
          <p>Breed: <slot name='breed' /></p>
          <p>Age: <slot name='age' /></p>
        </div>
        <div class='actions'>
          <button id='greet'>Say Hi!</button>
          <button id='toggle'>View Details</button>
        </div>
      </div>
    </div>
`

// creates the PetCard class.
class PetCard extends HTMLElement {
  constructor() {
    super(); // needed whenever a class extends the HTMLElement class.
    this.showInfo = false;
    this.attachShadow({ mode : 'open' }); // attaches a shadow DOM . mode:open means you can access and manipulate the shadow DOM.
    this.shadowRoot.appendChild(template.content.cloneNode(true)); // clones the contents of template then appends the clone to the document.
  }

  // looks for a change in the listed atributes of the custom HTML element.
  static get observedAttributes() {
    return ['name', 'avatar'];
  }
  // updates the displayed value in the template to match the new attribute value.
  attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot.querySelector('.details h2').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('.avatar img').src = this.getAttribute('avatar');
    this.shadowRoot.querySelector('.avatar img').alt = this.getAttribute('name');
  }
  toggleInfo = () => {
    this.showInfo = !this.showInfo;
    this.shadowRoot.querySelector('.info').style.display = this.showInfo ? 'block' : 'none';
    this.shadowRoot.querySelector('#toggle').innerHTML = this.showInfo ? 'Hide Details' : 'View Details';
  };
  connectedCallback() {
    this.shadowRoot.querySelector('#toggle').addEventListener('click', this.toggleInfo);
    this.shadowRoot.querySelector('#greet').addEventListener('click', () => {
      alert('Hi there! ' + this.getAttribute('name'));
    });
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle').removeEventListener('click', this.toggle);
    this.shadowRoot.querySelector('#greet').removeEventListener('click', this.greet);
  }
}

export default PetCard;
