const template = document.createElement('template');

template.innerHTML = `
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
    this.attachShadow({ mode : 'open' }); // attaches a shadow DOM . mode:open means you can access and manipulate the shadow DOM.
    this.shadowRoot.appendChild(template.content.cloneNode(true)); // clones the contents of template then appends the clone to the document.
  }

  static get observedAttributes() {
    return ('')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot.querySelector('.details h2').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('.avatar img').src = this.getAttribute('avatar');
    this.shadowRoot.querySelector('.avatar img').alt = this.getAttribute('name');

  }

}

export default PetCard;
