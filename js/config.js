/* Central site configuration.
   Everything that still needs a real value is a clearly marked placeholder in square brackets.
   Replace the values here and they update everywhere (footer, legal pages, mailto fallback). */
window.PD_CONFIG = {
  kvk: '[KvK]',
  btw: '[BTW]',
  email: '[email]',
  phone: '[phone]',

  // Registration form: POST JSON to this endpoint. The Web3Forms access key is public by design
  // (it only lets the form deliver to the inbox it was created for).
  FORM_ENDPOINT: 'https://api.web3forms.com/submit',
  FORM_ACCESS_KEY: 'fe9f8c84-09c5-4b3f-8d23-d21589cfe188',

  // Proof strip. Left empty on purpose: add only real, provable numbers, for example
  // [{ value: '1', label: 'Fixed contact per client' }]. Nothing is shown while the list is empty.
  proof: [],

  // Facts & figures band (shown right after the statement). Edit values here; set show: false to hide a tile.
  FACTS: [
    { prefix: '€', value: 5, suffix: 'M+', unit_en: '', unit_nl: '', label_en: 'Rental contract value', label_nl: 'Huurcontractwaarde', show: true },
    { value: 8, suffix: '+', unit_en: 'years', unit_nl: 'jaar', label_en: 'Experience in residential renting', label_nl: 'Ervaring in residentieel huren', show: true },
    { value: 5, suffix: '', unit_en: 'regions', unit_nl: 'regio’s', label_en: 'Amsterdam · Rotterdam · The Hague · Utrecht · Groningen — and active nationwide', label_nl: 'Amsterdam · Rotterdam · Den Haag · Utrecht · Groningen — en actief in heel Nederland', show: true },
    { value: 30, suffix: '+', unit_en: 'partners', unit_nl: 'partners', label_en: 'Landlords, property professionals and business contacts in our network', label_nl: 'Verhuurders, vastgoedprofessionals en zakelijke contacten in ons netwerk', show: true }
  ]
};
