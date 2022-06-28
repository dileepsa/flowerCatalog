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
};

module.exports = { GuestBook };
