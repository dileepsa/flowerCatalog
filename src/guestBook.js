class GuestBook {
  #comments;
  #template;

  constructor(comments, template) {
    this.#comments = comments;
    this.#template = template;
  }

  addComment(comment) {
    this.#comments.unshift(comment);
  }

  getComments() {
    return this.#comments;
  }

  toHtml() {
    const rows = this.#comments.map((record) => {
      const { name, date, comment } = record;
      return `<tr><td>${name}</td><td>${comment}</td><td>${date.toLocaleString()}</td></tr>`;
    });

    return this.#template.replace('__TABLE__BODY__', rows.join(''));
  }
};

module.exports = { GuestBook };
