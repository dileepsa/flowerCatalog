class GuestBook {
  #commentsDataPath;
  #load;
  #store;
  #comments;
  #template;

  constructor(commentsDataPath, load, store) {
    this.#commentsDataPath = commentsDataPath;
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
    this.#template = this.#load('./templates/guestBook.html', 'utf-8');
  }

  store(content) {
    this.#store(this.#commentsDataPath, JSON.stringify(content), 'utf8');
  }

  toHtml(username) {
    const rows = this.#comments.map((record) => {
      const { username, date, comment } = record;
      return `<tr><td>${username}</td><td>${comment}</td><td>${date}</td></tr>`;
    });

    const nameHtml = `<div class='row'>Name:${username}</div>`
    let table = this.#template.replace('__TABLE__BODY__', rows.join(''));
    return table.replace('__USERNAME__', nameHtml);
  }
};

module.exports = { GuestBook };
