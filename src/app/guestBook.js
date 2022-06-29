class GuestBook {
  #commentsDataPath;
  #templatePath;
  #load;
  #store;
  #comments;
  #template;

  constructor(commentsDataPath, templatePath, load, store) {
    this.#commentsDataPath = commentsDataPath;
    this.#templatePath = templatePath;
    this.#load = load;
    this.#store = store;
    this.#comments = [];
    this.#template = '';
  }

  addComment(comment) {
    this.#comments.unshift(comment);
  }

  getComments() {
    return this.#comments;
  }

  load() {
    this.#comments = JSON.parse(this.#load(this.#commentsDataPath, 'utf8'));
    this.#template = this.#load(this.#templatePath, 'utf-8');
  }

  store(content) {
    this.#store(this.#commentsDataPath, JSON.stringify(content), 'utf8');
  }

  toHtml() {
    const rows = this.#comments.map((record) => {
      const { name, date, comment } = record;
      return `<tr><td>${name}</td><td>${comment}</td><td>${date}</td></tr>`;
    });

    return this.#template.replace('__TABLE__BODY__', rows.join(''));
  }
};

module.exports = { GuestBook };
