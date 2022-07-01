const createSubRouter = (handlers) => {
  let index = -1;
  const nextHandler = (req, res) => {
    index++;
    const currentHandler = handlers[index];
    if (currentHandler) {
      currentHandler(req, res, () => nextHandler(req, res));
    }
  }
  return nextHandler;
};

const createAsyncRouter = (handlers) => {
  return (req, res) => {
    const nextHandler = createSubRouter(handlers);
    nextHandler(req, res);
  }
};

module.exports = { createAsyncRouter };
