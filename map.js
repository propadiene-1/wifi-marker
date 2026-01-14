class WifiSpot {
  constructor(latlng) {
    this.lat = latlng.lat;
    this.lng = latlng.lng;
    this.label = "";
  }

  setLabel(text) {
    this.label = text;
  }

  getPopupHtml() {
    return `<b>${escapeHtml(this.label)}</b>`;
  }
}