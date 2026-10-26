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

  // Montage reel: the four words (search, check, sign, move in) are shown in HTML on top of
  // assets/media/reel.mp4. Set this to false if you replace the reel with one that has its own type.
  reelOverlay: true,

  // Proof strip. Left empty on purpose: add only real, provable numbers, for example
  // [{ value: '1', label: 'Fixed contact per client' }]. Nothing is shown while the list is empty.
  proof: [],

  // Founder portraits. Add the photo to assets/team/ and put its path here, for example
  // 'assets/team/luuk.jpg'. While a value is empty, an elegant monogram is shown instead
  // (and no request for a missing file is made).
  portraits: { luuk: '', jalal: '' }
};
